/**
 * Multimodal Routing Orchestrator (Phase 2)
 * -----------------------------------------
 * Combines walking, transit schedules, and micro-mobility (GBFS)
 * into a single multimodal route itinerary. Applies cost weights
 * for delays and extreme weather conditions.
 */

const db = require("../shared/db");
const { redis } = require("../shared/redis");
const { fetchNearbyScooters } = require("./gbfs_client");
const imdScraper = require("../phase0_sourcing/imd_scraper");
const axios = require("axios");

/**
 * Calculates a simple haversine distance in meters.
 */
function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Helper to fetch route/leg details from Google Directions API (Walking or Transit)
 */async function fetchGoogleDirectionsLeg(startLat, startLon, endLat, endLon, mode = 'walking') {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey || apiKey.startsWith("your_")) {
    return null;
  }
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLon}&destination=${endLat},${endLon}&mode=${mode}&key=${apiKey}`;
  try {
    const res = await axios.get(url);
    if (res.data.status === 'OK' && res.data.routes && res.data.routes[0]) {
      const route = res.data.routes[0];
      const leg = route.legs[0];
      return {
        distanceMeters: leg.distance.value,
        durationSeconds: leg.duration.value,
        polyline: route.overview_polyline.points,
        instruction: leg.steps.map(s => s.html_instructions.replace(/<[^>]*>/g, '')).join(', ')
      };
    } else if (res.data.status && res.data.status !== 'OK') {
      console.warn(`[Google Directions API] API returned status "${res.data.status}":`, res.data.error_message || "No error message");
    }
  } catch (err) {
    console.error(`[Google Directions API] Request failed for mode ${mode}:`, err.message);
  }
  return null;
}
/**
 * Checks weather alerts to return cost multiplier for outdoor legs.
 */
async function getWeatherMultiplier() {
  try {
    const alerts = await imdScraper.fetchWeatherAlerts();
    const transitImpactful = imdScraper.filterTransitImpactAlerts(alerts);
    if (transitImpactful.length > 0) {
      console.log("[Routing] ⚠ Extreme weather detected. Increasing outdoor walking/cycling weight.");
      return 2.5; // Multiplier: walks take longer / are discouraged
    }
  } catch (err) {
    // Graceful fallback if IMD check fails
  }
  return 1.0;
}

/**
 * Computes multimodal itinerary.
 */
const MOCK_STOPS = [
  // --- MUMBAI ---
  { stop_id: "mumbai_andheri", stop_name: "Andheri Station (E)", stop_lat: 19.1197, stop_lon: 72.8464, city: "Mumbai", network: "BEST", line: "335A", aliases: ["andheri", "andheristation", "andherieast"] },
  { stop_id: "mumbai_powai", stop_name: "Powai Lake", stop_lat: 19.1176, stop_lon: 72.9059, city: "Mumbai", network: "BEST", line: "335A", aliases: ["powai", "powailake", "hiranandani"] },
  { stop_id: "mumbai_cst", stop_name: "Chhatrapati Shivaji Terminus (CSMT)", stop_lat: 18.9401, stop_lon: 72.8355, city: "Mumbai", network: "Central Railway", line: "CR-FAST", aliases: ["cst", "csmt", "cstmumbai", "chhatrapatishivajijunction"] },
  { stop_id: "mumbai_dadar", stop_name: "Dadar Station", stop_lat: 19.0195, stop_lon: 72.8431, city: "Mumbai", network: "Western Railway", line: "WR-FAST", aliases: ["dadar", "dadarstation"] },
  { stop_id: "mumbai_bandra", stop_name: "Bandra Terminus", stop_lat: 19.0559, stop_lon: 72.8398, city: "Mumbai", network: "BEST", line: "101", aliases: ["bandra", "bandraterminus"] },

  // --- PUNE & PIMPRI CHINCHWAD ---
  { stop_id: "pune_station", stop_name: "Pune Railway Station", stop_lat: 18.5284, stop_lon: 73.8742, city: "Pune", network: "PMPML", line: "PMPML-1", aliases: ["pune", "punestation", "punerailway", "punerailwaystation"] },
  { stop_id: "pune_swargate", stop_name: "Swargate Bus Stand", stop_lat: 18.5018, stop_lon: 73.8604, city: "Pune", network: "Pune Metro", line: "PM1", aliases: ["swargate", "swargatebus", "swargatebusstand", "swargatemetro"] },
  { stop_id: "pune_pcmc", stop_name: "PCMC Bhavan (Pimpri)", stop_lat: 18.6279, stop_lon: 73.8009, city: "Pimpri Chinchwad", network: "PMPML", line: "42", aliases: ["pcmc", "pcmcbhavan", "pimpri", "pimprichinchwad"] },
  { stop_id: "pune_chinchwad_station", stop_name: "Chinchwad Railway Station Stop", stop_lat: 18.6222, stop_lon: 73.7785, city: "Pimpri Chinchwad", network: "PMPML", line: "312", aliases: ["chinchwad", "chinchwadstation", "chinchwadjunction"] },
  { stop_id: "pune_rahatni", stop_name: "Rahatni Bus Stop", stop_lat: 18.6227, stop_lon: 73.7916, city: "Pimpri Chinchwad", network: "PMPML", line: "103", aliases: ["rahatni", "rahatnichowk", "rahatnipc"] },
  { stop_id: "pune_kokane_chowk", stop_name: "Kokane Chowk Bus Stop", stop_lat: 18.5910, stop_lon: 73.7972, city: "Pimpri Chinchwad", network: "PMPML", line: "103", aliases: ["kokane", "kokanechowk", "kokanesquare"] },
  { stop_id: "pune_nigdi", stop_name: "Nigdi Bus Terminus", stop_lat: 18.6487, stop_lon: 73.7762, city: "Pimpri Chinchwad", network: "PMPML", line: "101", aliases: ["nigdi", "nigditerminus", "nigdiganesh", "nigdiprerna"] },
  { stop_id: "pune_akurdi", stop_name: "Akurdi Station", stop_lat: 18.6487, stop_lon: 73.7638, city: "Pimpri Chinchwad", network: "Central Railway", line: "Pune Local", aliases: ["akurdi", "akurdistation", "akrudi"] },
  { stop_id: "pune_sangvi", stop_name: "Sangvi", stop_lat: 18.6003, stop_lon: 73.8037, city: "Pimpri Chinchwad", network: "PMPML", line: "55", aliases: ["sangvi", "sangvipc", "newsangvi"] },
  { stop_id: "pune_wakadpc", stop_name: "Wakad Phata", stop_lat: 18.5991, stop_lon: 73.7601, city: "Pimpri Chinchwad", network: "PMPML", line: "AC-14", aliases: ["wakad", "wakadphata", "wakadpc"] },
  { stop_id: "pune_jagtap_dairy", stop_name: "Jagtap Dairy Chowk Stop", stop_lat: 18.5950, stop_lon: 73.7850, city: "Pimpri Chinchwad", network: "PMPML", line: "AC-14", aliases: ["jagtap", "jagtapdairy", "jagtapdairychowk"] },
  { stop_id: "pune_bijali_nagar", stop_name: "Bijali Nagar Stop", stop_lat: 18.6434, stop_lon: 73.7712, city: "Pimpri Chinchwad", network: "PMPML", line: "101", aliases: ["bijali", "bijalinagar", "bijalinagarchowk"] },
  { stop_id: "pune_dehuroad", stop_name: "Dehu Road Camp", stop_lat: 18.6817, stop_lon: 73.7542, city: "Pimpri Chinchwad", network: "Central Railway", line: "Pune Local", aliases: ["dehuroad", "dehu", "dehuroadcamp"] },
  { stop_id: "pune_chikhali", stop_name: "Chikhali", stop_lat: 18.6649, stop_lon: 73.8067, city: "Pimpri Chinchwad", network: "PMPML", line: "357", aliases: ["chikhali", "chikhalipc"] },
  { stop_id: "pune_moshi", stop_name: "Moshi Chowk", stop_lat: 18.6706, stop_lon: 73.8532, city: "Pimpri Chinchwad", network: "PMPML", line: "357", aliases: ["moshi", "moshichowk", "moshitoll"] },
  { stop_id: "pune_pradhikaran", stop_name: "Pradhikaran Bus Stop", stop_lat: 18.6544, stop_lon: 73.7905, city: "Pimpri Chinchwad", network: "PMPML", line: "101", aliases: ["pradhikaran", "newpradhikaran", "pradhikarannigdi"] },
  { stop_id: "pune_hinjewadi", stop_name: "Hinjewadi IT Park Phase 3", stop_lat: 18.5912, stop_lon: 73.7389, city: "Pune", network: "PMPML", line: "AC-41", aliases: ["hinjewadi", "hinj", "hinjewadiitpark", "hinjawadi"] },
  { stop_id: "pune_alandi", stop_name: "Alandi Devachi Bus Stand", stop_lat: 18.6789, stop_lon: 73.8882, city: "Alandi", network: "PMPML", line: "20", aliases: ["alandi", "alandidevachi"] },
  { stop_id: "pune_chakan", stop_name: "Chakan Chowk (Khed)", stop_lat: 18.7562, stop_lon: 73.8504, city: "Chakan", network: "PMPML", line: "357", aliases: ["chakan", "chakanphata", "chakanchowk"] },
  { stop_id: "pune_rajgurunagar", stop_name: "Rajgurunagar Bus Stand (Khed)", stop_lat: 18.8550, stop_lon: 73.8860, city: "Khed", network: "PMPML", line: "358", aliases: ["rajgurunagar", "khed", "khedbusstand", "rajgugrunagar"] },
  { stop_id: "pune_bhosari", stop_name: "Bhosari Chowk", stop_lat: 18.6125, stop_lon: 73.8488, city: "Pimpri Chinchwad", network: "PMPML", line: "357", aliases: ["bhosari", "bhosarichowk"] },
  { stop_id: "pune_lonavala", stop_name: "Lonavala Station", stop_lat: 18.7523, stop_lon: 73.4057, city: "Lonavala", network: "Central Railway", line: "LNL Local", aliases: ["lonavala", "lonavalastation", "lonavlalocal"] },

  // --- DELHI ---
  { stop_id: "delhi_dwarka", stop_name: "Dwarka Sector 21", stop_lat: 28.5530, stop_lon: 77.0585, city: "Delhi", network: "Delhi Metro", line: "Blue Line", aliases: ["dwarka", "dwarkasector21"] },
  { stop_id: "delhi_rajiv_chowk", stop_name: "Rajiv Chowk (Connaught Place)", stop_lat: 28.6328, stop_lon: 77.2197, city: "Delhi", network: "Delhi Metro", line: "Yellow Line", aliases: ["rajivchowk", "connaughtplace", "cpdelhi"] },
  { stop_id: "delhi_kashmere_gate", stop_name: "Kashmere Gate ISBT", stop_lat: 28.6671, stop_lon: 77.2282, city: "Delhi", network: "Delhi Metro", line: "Red Line", aliases: ["kashmeregate", "kashmeregateisbt"] },
  { stop_id: "delhi_noida_sec51", stop_name: "Noida Sector 51", stop_lat: 28.6124, stop_lon: 77.3681, city: "Noida", network: "Noida Metro", line: "Aqua Line", aliases: ["noida", "noidasector51"] },

  // --- BENGALURU ---
  { stop_id: "blr_majestic", stop_name: "Majestic Interchange (Kempegowda)", stop_lat: 12.9756, stop_lon: 77.5728, city: "Bengaluru", network: "Namma Metro", line: "Purple Line", aliases: ["majestic", "kempegowda", "bengalurumajestic"] },
  { stop_id: "blr_kengeri", stop_name: "Kengeri Terminal", stop_lat: 12.9043, stop_lon: 77.5014, city: "Bengaluru", network: "Namma Metro", line: "Purple Line", aliases: ["kengeri", "kengeriterminal"] }
];

/**
 * Computes multimodal itinerary.
 */
async function computeMultimodalRoute(origin, destination) {
  const weatherMultiplier = await getWeatherMultiplier();

  // Helper to parse comma-separated lat/lon or match stop name in MOCK_STOPS
  function parseLocation(str) {
    if (typeof str !== "string") return { lat: 18.5284, lon: 73.8742 };
    if (str.includes(",")) {
      const parts = str.split(",").map(Number);
      if (!isNaN(parts[0]) && !isNaN(parts[1])) {
        return { lat: parts[0], lon: parts[1] };
      }
    }
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Priority 1: Exact alias match (prevents Nigdi matching Rahatni and vice versa)
    const exactAliasMatch = MOCK_STOPS.find(s =>
      s.aliases && s.aliases.some(a => a === cleanStr)
    );
    if (exactAliasMatch) {
      return { lat: exactAliasMatch.stop_lat, lon: exactAliasMatch.stop_lon };
    }

    // Priority 2: Stop name starts-with or cleanStr starts-with stop name key token
    const nameMatch = MOCK_STOPS.find(s => {
      const firstToken = s.stop_name.split(/[\s(]/)[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      return firstToken === cleanStr || cleanStr.startsWith(firstToken) || firstToken.startsWith(cleanStr);
    });
    if (nameMatch) {
      return { lat: nameMatch.stop_lat, lon: nameMatch.stop_lon };
    }

    // Priority 3: Alias partial match (alias contains the query or query contains alias)
    const partialAliasMatch = MOCK_STOPS.find(s =>
      s.aliases && s.aliases.some(a => a.includes(cleanStr) || cleanStr.includes(a))
    );
    if (partialAliasMatch) {
      return { lat: partialAliasMatch.stop_lat, lon: partialAliasMatch.stop_lon };
    }

    // Fallback based on city keyword if present, otherwise default to Pune Station
    if (cleanStr.includes("rahatni") || cleanStr.includes("kokane")) {
      return { lat: 18.6227, lon: 73.7916 }; // Rahatni/Kokane Chowk
    }
    if (cleanStr.includes("chakan")) {
      return { lat: 18.7562, lon: 73.8504 };
    }
    if (cleanStr.includes("rajgurunagar") || cleanStr.includes("rajgugrunagar")) {
      return { lat: 18.8550, lon: 73.8860 };
    }
    if (cleanStr.includes("moshi")) {
      return { lat: 18.6706, lon: 73.8532 };
    }
    if (cleanStr.includes("jagtap")) {
      return { lat: 18.5950, lon: 73.7850 };
    }
    if (cleanStr.includes("bijali")) {
      return { lat: 18.6434, lon: 73.7712 };
    }
    if (cleanStr.includes("akrudi") || cleanStr.includes("akurdi")) {
      return { lat: 18.6487, lon: 73.7638 };
    }
    if (cleanStr.includes("chinchwad") || cleanStr.includes("pcmc") || cleanStr.includes("pimpri")) {
      return { lat: 18.6222, lon: 73.7785 }; // Chinchwad / PCMC / Pimpri
    }
    if (cleanStr.includes("mumbai") || cleanStr.includes("andheri") || cleanStr.includes("powai") || cleanStr.includes("bandra") || cleanStr.includes("dadar")) {
      return { lat: 19.1197, lon: 72.8464 };
    }
    if (cleanStr.includes("nigdi") || cleanStr.includes("pradhikaran") || cleanStr.includes("sangvi") || cleanStr.includes("chikhali")) {
      // PCMC area — snap to Nigdi Terminus
      return { lat: 18.6487, lon: 73.7762 };
    }
    if (cleanStr.includes("delhi") || cleanStr.includes("noida") || cleanStr.includes("gurgaon") || cleanStr.includes("gurugram")) {
      return { lat: 28.6329, lon: 77.2197 };
    }
    if (cleanStr.includes("bengaluru") || cleanStr.includes("bangalore") || cleanStr.includes("blr")) {
      return { lat: 12.9756, lon: 77.5728 };
    }
    return { lat: 18.5284, lon: 73.8742 }; // Pune Station default
  }

  const origLoc = parseLocation(origin);
  const originLat = origLoc.lat;
  const originLon = origLoc.lon;

  const destLoc = parseLocation(destination);
  const destLat = destLoc.lat;
  const destLon = destLoc.lon;

  // 1. Locate nearest static transit stops to origin & destination
  let originStop = null;
  let destStop = null;
  let activeRouteId = "335A";
  let activeRouteShort = "335A";
  let activeRouteLong = "Andheri Station - Powai";
  let operatorName = "BEST";

  let allStops = [...MOCK_STOPS];

  try {
    const { rows: dbStops } = await db.query(
      "SELECT stop_id, stop_name, stop_lat, stop_lon FROM stops"
    );
    if (dbStops && dbStops.length > 0) {
      const mappedDbStops = dbStops.map(s => ({
        ...s,
        city: "Nevada",
        network: "Nevada Transit",
        line: "Shuttle",
        aliases: []
      }));
      allStops = [...allStops, ...mappedDbStops];
    }
  } catch (err) {
    console.warn("[Routing] ℹ DB connection failed. Using mock transit networks.");
  }

  // Find closest stops from combined list
  let minOrigDist = Infinity;
  let minDestDist = Infinity;

  allStops.forEach((s) => {
    const dOrig = getDistanceMeters(originLat, originLon, s.stop_lat, s.stop_lon);
    const dDest = getDistanceMeters(destLat, destLon, s.stop_lat, s.stop_lon);

    if (dOrig < minOrigDist) {
      minOrigDist = dOrig;
      originStop = s;
    }
    if (dDest < minDestDist) {
      minDestDist = dDest;
      destStop = s;
    }
  });

  // Dynamically adjust operator details based on stops' location
  const sameCity = originStop.city === destStop.city || 
                   (originStop.city === "Pune" && destStop.city === "Pimpri Chinchwad") ||
                   (originStop.city === "Pimpri Chinchwad" && destStop.city === "Pune") ||
                   (originStop.city === "Chakan" || originStop.city === "Khed" || originStop.city === "Alandi" || destStop.city === "Chakan" || destStop.city === "Khed" || destStop.city === "Alandi");

  if (sameCity) {
    if (originStop.city === "Delhi" || originStop.city === "Noida") {
      operatorName = "Delhi Metro";
      activeRouteId = "DMRC-YELLOW-L2";
      activeRouteShort = "Yellow Line";
      activeRouteLong = "HUDA City Centre - Samaypur Badli";
    } else if (originStop.city === "Bengaluru") {
      operatorName = "Namma Metro";
      activeRouteId = "BMRCL-PURPLE-L1";
      activeRouteShort = "Purple Line";
      activeRouteLong = "Challaghatta - Baiyappanahalli";
    } else if (originStop.city === "Mumbai") {
      operatorName = "BEST";
      activeRouteId = "BEST-335A";
      activeRouteShort = "335A";
      activeRouteLong = "Andheri Station - Powai Hiranandani";
    } else if (originStop.city === "Nevada") {
      operatorName = "Nevada Transit";
      activeRouteId = "AB";
      activeRouteShort = "AB";
      activeRouteLong = "Airport - Bullfrog Shuttle";
    } else {
      // Pune Metro / PMPML
      if (originStop.network === "Pune Metro" || destStop.network === "Pune Metro") {
        operatorName = "Pune Metro";
        activeRouteId = "PUNE-METRO-1";
        activeRouteShort = "PM1";
        activeRouteLong = "Line 1: PCMC - Swargate";
      } else {
        operatorName = "PMPML";
        activeRouteId = "PMPML-42";
        activeRouteShort = "42";
        activeRouteLong = "PCMC - Swargate Express Bus";
      }
    }
  } else {
    // Intercity
    const isTrain = originStop.network === "Central Railway" || destStop.network === "Central Railway";
    if (isTrain) {
      operatorName = "Indian Railways";
      activeRouteId = "TRAIN-DECCAN-EXP";
      activeRouteShort = "Deccan Queen";
      activeRouteLong = "Pune Jn - Mumbai CSMT Express";
    } else {
      operatorName = "MSRTC";
      activeRouteId = "MSRTC-MUM-PUN";
      activeRouteShort = "Shivneri";
      activeRouteLong = "AC Shivneri: Mumbai - Pune";
    }
  }

  // 2. Resolve delay offsets from Redis
  let delaySeconds = 0;
  try {
    const delayVal = await redis.get(`trip:trip-999:delay`);
    if (delayVal) delaySeconds = parseInt(delayVal, 10);
  } catch (err) {
    // Redis unreachable — ignore delays
  }

  // 3. Fetch e-scooter hubs near the destination stop (Last Mile)
  const scooters = await fetchNearbyScooters(destStop.stop_lat, destStop.stop_lon, 500);
  const bestScooter = scooters[0];

  // 4. Construct itinerary segments (Legs)
  const legs = [];
  // Leg A: Walk from origin to transit stop (First Mile)
  const gLegA = await fetchGoogleDirectionsLeg(originLat, originLon, originStop.stop_lat, originStop.stop_lon, 'walking');
  if (gLegA) {
    legs.push({
      mode: "WALK",
      instruction: `Walk: ${gLegA.instruction}`,
      distanceMeters: gLegA.distanceMeters,
      durationSeconds: gLegA.durationSeconds,
      polyline: gLegA.polyline,
      startCoords: { lat: originLat, lon: originLon },
      endCoords: { lat: originStop.stop_lat, lon: originStop.stop_lon }
    });
  } else {
    const walk1Dist = getDistanceMeters(originLat, originLon, originStop.stop_lat, originStop.stop_lon);
    const walk1DurationSec = Math.round((walk1Dist / 1.3) * weatherMultiplier); // 1.3 m/s walking speed
    legs.push({
      mode: "WALK",
      instruction: `Walk from origin to ${originStop.stop_name}`,
      distanceMeters: Math.round(walk1Dist),
      durationSeconds: walk1DurationSec,
      polyline: null,
      startCoords: { lat: originLat, lon: originLon },
      endCoords: { lat: originStop.stop_lat, lon: originStop.stop_lon }
    });
  }

  // Leg B: Public Transit ride
  const gLegB = await fetchGoogleDirectionsLeg(originStop.stop_lat, originStop.stop_lon, destStop.stop_lat, destStop.stop_lon, 'transit');
  const transitDist = getDistanceMeters(originStop.stop_lat, originStop.stop_lon, destStop.stop_lat, destStop.stop_lon);
  const transitBaseDurationSec = Math.round(transitDist / 8.0); // 8 m/s average speed
  legs.push({
    mode: "TRANSIT",
    instruction: `Board Line ${activeRouteShort} from ${originStop.stop_name} to ${destStop.stop_name}`,
    distanceMeters: Math.round(transitDist),
    durationSeconds: transitBaseDurationSec + delaySeconds,
    routeId: activeRouteId,
    routeShortName: activeRouteShort,
    routeLongName: activeRouteLong,
    delaySeconds,
    polyline: gLegB ? gLegB.polyline : null,
    startCoords: { lat: originStop.stop_lat, lon: originStop.stop_lon },
    endCoords: { lat: destStop.stop_lat, lon: destStop.stop_lon }
  });

  // Leg C: Last Mile (Use e-scooter if available and weather is dry, otherwise walk)
  const lastMileDist = getDistanceMeters(destStop.stop_lat, destStop.stop_lon, destLat, destLon);
  if (bestScooter && weatherMultiplier < 2.0) {
    const gLegC = await fetchGoogleDirectionsLeg(destStop.stop_lat, destStop.stop_lon, destLat, destLon, 'bicycling');
    const scooterDurationSec = Math.round(lastMileDist / 4.5); // 4.5 m/s scooter speed
    legs.push({
      mode: "SCOOTER",
      instruction: `Pick up ${bestScooter.provider} e-scooter (Battery: ${bestScooter.batteryLevel}%) and ride to destination`,
      distanceMeters: gLegC ? gLegC.distanceMeters : Math.round(lastMileDist),
      durationSeconds: gLegC ? gLegC.durationSeconds : scooterDurationSec,
      scooterId: bestScooter.id,
      provider: bestScooter.provider,
      polyline: gLegC ? gLegC.polyline : null,
      startCoords: { lat: destStop.stop_lat, lon: destStop.stop_lon },
      endCoords: { lat: destLat, lon: destLon }
    });
  } else {
    const gLegC = await fetchGoogleDirectionsLeg(destStop.stop_lat, destStop.stop_lon, destLat, destLon, 'walking');
    const walk2DurationSec = Math.round((lastMileDist / 1.3) * weatherMultiplier);
    legs.push({
      mode: "WALK",
      instruction: gLegC ? `Walk: ${gLegC.instruction}` : `Walk from ${destStop.stop_name} to destination${weatherMultiplier > 1.0 ? ' (Slowed due to heavy rain)' : ''}`,
      distanceMeters: gLegC ? gLegC.distanceMeters : Math.round(lastMileDist),
      durationSeconds: gLegC ? gLegC.durationSeconds : walk2DurationSec,
      polyline: gLegC ? gLegC.polyline : null,
      startCoords: { lat: destStop.stop_lat, lon: destStop.stop_lon },
      endCoords: { lat: destLat, lon: destLon }
    });
  }
  const totalDuration = legs.reduce((acc, leg) => acc + leg.durationSeconds, 0);
  const totalDistance = legs.reduce((acc, leg) => acc + leg.distanceMeters, 0);

  return {
    summary: {
      totalDurationMinutes: Math.round(totalDuration / 60),
      totalDistanceMeters: totalDistance,
      weatherMultiplierUsed: weatherMultiplier,
    },
    legs,
  };
}

module.exports = { computeMultimodalRoute };
