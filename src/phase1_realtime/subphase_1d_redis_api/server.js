/**
 * Express REST API Server (Sub-Phase 1D)
 * -------------------------------------
 * Merges static database records (PostgreSQL) with volatile,
 * live real-time caching layers (Redis).
 */

const express = require("express");
const path = require("path");
const db = require("../../shared/db");
const { redis } = require("../../shared/redis");

// Phase 2 & 3 Module Imports
const { computeMultimodalRoute } = require("../../../src/phase2_multimodal/routing_orchestrator");
const { getOrCreateWallet, topupWallet } = require("../../../src/phase3_ticketing/wallet_service");
const { purchaseTicket, validateOfflineToken } = require("../../../src/phase3_ticketing/ticket_validator");

// Phase 4 Module Imports
const { processCommuterReport } = require("../../../src/phase4_analytics/crowdsource_processor");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Static Frontend Map UI
app.use(express.static(path.join(__dirname, "../subphase_1e_map_ui/public")));

// Logger middleware
app.use((req, res, next) => {
  console.log(`[API Request] ${req.method} ${req.url}`);
  next();
});

/**
 * 1. GET /api/v1/routes
 * Returns list of all routes from PostgreSQL.
 */
app.get("/api/v1/routes", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT route_id, agency_id, route_short_name, route_long_name, route_type, route_color FROM routes ORDER BY route_short_name ASC"
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error("[API] Get routes failed:", err.message);
    res.status(500).json({ success: false, error: "Database query failed" });
  }
});

/**
 * 2. GET /api/v1/routes/:routeId/stops
 * Returns ordered stops for a route with PostGIS geometries from PostgreSQL.
 */
app.get("/api/v1/routes/:routeId/stops", async (req, res) => {
  const { routeId } = req.params;
  try {
    const queryStr = `
      SELECT DISTINCT ON (s.stop_id)
        s.stop_id,
        s.stop_name,
        s.stop_lat,
        s.stop_lon,
        st.stop_sequence
      FROM stop_times st
      JOIN trips t ON t.trip_id = st.trip_id
      JOIN stops s ON s.stop_id = st.stop_id
      WHERE t.route_id = $1
      ORDER BY s.stop_id, st.stop_sequence ASC
    `;
    const { rows } = await db.query(queryStr, [routeId]);
    
    // Re-sort strictly by sequence number
    rows.sort((a, b) => a.stop_sequence - b.stop_sequence);

    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error("[API] Get route stops failed:", err.message);
    res.status(500).json({ success: false, error: "Database query failed" });
  }
});

/**
 * Helper to convert INTERVAL time string (HH:MM:SS) to milliseconds relative to today
 */
function intervalToEpoch(intervalStr) {
  if (!intervalStr) return Date.now();
  const parts = intervalStr.split(":");
  const hours = parseInt(parts[0] || "0", 10);
  const minutes = parseInt(parts[1] || "0", 10);
  const seconds = parseInt(parts[2] || "0", 10);

  const d = new Date();
  d.setHours(hours, minutes, seconds, 0);
  return d.getTime();
}

/**
 * 3. GET /api/v1/stops/:stopId/arrivals
 * Merges static scheduled arrival times from PostgreSQL with trip delays in Redis.
 */
app.get("/api/v1/stops/:stopId/arrivals", async (req, res) => {
  const { stopId } = req.params;
  try {
    // 1. Fetch upcoming scheduled stop times from SQL
    const staticQuery = `
      SELECT 
        st.trip_id,
        st.arrival_time::text as scheduled_arrival,
        st.stop_sequence,
        t.route_id,
        r.route_short_name,
        r.route_long_name
      FROM stop_times st
      JOIN trips t ON t.trip_id = st.trip_id
      JOIN routes r ON r.route_id = t.route_id
      WHERE st.stop_id = $1
      ORDER BY st.arrival_time ASC
      LIMIT 10
    `;
    const { rows: scheduled } = await db.query(staticQuery, [stopId]);

    if (scheduled.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 2. Fetch delays from Redis in a pipeline
    const pipeline = redis.pipeline();
    scheduled.forEach((item) => {
      pipeline.get(`trip:${item.trip_id}:delay`);
    });
    const delayResults = await pipeline.exec();

    // 3. Merge delay offsets with scheduled times
    const merged = scheduled.map((item, index) => {
      const [err, delayValue] = delayResults[index];
      const delaySeconds = (!err && delayValue) ? parseInt(delayValue, 10) : 0;
      
      const scheduledEpoch = intervalToEpoch(item.scheduled_arrival);
      const estimatedEpoch = scheduledEpoch + (delaySeconds * 1000);

      return {
        tripId: item.trip_id,
        routeId: item.route_id,
        routeShortName: item.route_short_name,
        routeLongName: item.route_long_name,
        scheduledArrival: item.scheduled_arrival,
        delaySeconds,
        estimatedArrival: new Date(estimatedEpoch).toISOString(),
        isRealtime: delaySeconds !== 0 || !!delayValue,
      };
    });

    res.json({ success: true, data: merged });
  } catch (err) {
    console.error("[API] Get stop arrivals failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4. GET /api/v1/vehicles/live
 * Resolves active vehicle positions on a given route from Redis.
 */
app.get("/api/v1/vehicles/live", async (req, res) => {
  const { route } = req.query;
  if (!route) {
    return res.status(400).json({ success: false, error: "Missing required query parameter: route" });
  }

  try {
    // 1. Get set of active vehicles for the route
    const vehicleIds = await redis.smembers(`route:${route}:vehicles`);
    if (vehicleIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 2. Fetch hashes of all active vehicles
    const pipeline = redis.pipeline();
    vehicleIds.forEach((vid) => {
      pipeline.hgetall(`vehicle:${vid}`);
    });
    const results = await pipeline.exec();

    const activeVehicles = [];
    results.forEach(([err, data]) => {
      if (!err && data && Object.keys(data).length > 0) {
        activeVehicles.push({
          vehicleId: data.vehicleId,
          tripId: data.tripId,
          routeId: data.routeId,
          latitude: data.latitude ? parseFloat(data.latitude) : null,
          longitude: data.longitude ? parseFloat(data.longitude) : null,
          bearing: data.bearing ? parseFloat(data.bearing) : null,
          speed: data.speed ? parseFloat(data.speed) : null,
          stopId: data.stopId || null,
          timestamp: data.timestamp,
        });
      }
    });

    res.json({ success: true, count: activeVehicles.length, data: activeVehicles });
  } catch (err) {
    console.error("[API] Get live vehicles failed:", err.message);
    res.status(500).json({ success: false, error: "Redis lookup failed" });
  }
});

/**
 * 5. GET /api/v1/alerts
 * Returns active alerts cached in Redis.
 */
app.get("/api/v1/alerts", async (req, res) => {
  try {
    // 1. Fetch active alert IDs
    const alertIds = await redis.smembers("alerts:active");
    if (alertIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 2. Fetch hashes of active alerts
    const pipeline = redis.pipeline();
    alertIds.forEach((aid) => {
      pipeline.hgetall(`alert:${aid}`);
    });
    const results = await pipeline.exec();

    const alerts = [];
    results.forEach(([err, data]) => {
      if (!err && data && Object.keys(data).length > 0) {
        alerts.push({
          id: data.id,
          headerText: data.headerText,
          descriptionText: data.descriptionText,
          cause: data.cause || null,
          effect: data.effect || null,
        });
      }
    });

    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (err) {
    console.error("[API] Get alerts failed:", err.message);
    res.status(500).json({ success: false, error: "Redis lookup failed" });
  }
});

// Expose public API configuration (Google Maps API Key)
app.get("/api/v1/config", (req, res) => {
  res.json({
    success: true,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ""
  });
});

// ── PHASE 2: Multimodal Routing ─────────────────────────────
app.get("/api/v1/route/multimodal", async (req, res) => {
  const { origin, destination } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ success: false, error: "Missing required parameters: origin, destination" });
  }

  try {
    const itinerary = await computeMultimodalRoute(origin, destination);
    res.json({ success: true, data: itinerary });
  } catch (err) {
    const scrubbedMsg = err.message.replace(/https?:\/\/[^\s]+(email|user|token|key|auth|pass)[^\s]+/gi, "[REDACTED]");
    res.status(500).json({ success: false, error: scrubbedMsg });
  }
});

// ── PHASE 3: Wallet & Ticketing ─────────────────────────────

// Helper to scrub error logs of PII URLs
function secureError(err) {
  return err.message.replace(/https?:\/\/[^\s]+(email|user|token|key|auth|pass)[^\s]+/gi, "[REDACTED_URL]");
}

/**
 * Get wallet balance
 */
app.get("/api/v1/wallet/balance/:userId", async (req, res) => {
  try {
    const wallet = await getOrCreateWallet(req.params.userId);
    res.json({ success: true, balance: parseFloat(wallet.balance), currency: wallet.currency });
  } catch (err) {
    res.status(500).json({ success: false, error: secureError(err) });
  }
});

/**
 * Top up wallet balance
 */
app.post("/api/v1/wallet/topup", async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || amount === undefined) {
    return res.status(400).json({ success: false, error: "Missing userId or amount" });
  }
  try {
    const wallet = await topupWallet(userId, parseFloat(amount));
    res.json({ success: true, balance: parseFloat(wallet.balance), currency: wallet.currency });
  } catch (err) {
    res.status(500).json({ success: false, error: secureError(err) });
  }
});

/**
 * Purchase ticket using wallet balance
 */
app.post("/api/v1/tickets/purchase", async (req, res) => {
  const { userId, routeId, fare } = req.body;
  if (!userId || !routeId || fare === undefined) {
    return res.status(400).json({ success: false, error: "Missing required fields: userId, routeId, fare" });
  }
  try {
    const ticket = await purchaseTicket(userId, routeId, parseFloat(fare));
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: secureError(err) });
  }
});

/**
 * Validate offline cryptographically-signed JWS ticket token
 */
app.post("/api/v1/tickets/validate", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, error: "Missing ticket token" });
  }
  try {
    const verification = validateOfflineToken(token);
    if (verification.valid) {
      res.json({ success: true, valid: true, payload: verification.payload });
    } else {
      res.status(400).json({ success: false, valid: false, error: verification.error });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: secureError(err) });
  }
});

// ── PHASE 4: Crowdsourcing & Anomaly Analytics ──────────────

/**
 * Submit user report for NLP parsing (Groq) and spatial validation
 */
app.post("/api/v1/crowdsource/report", async (req, res) => {
  const { userId, text, lat, lon } = req.body;
  if (!userId || !text || lat === undefined || lon === undefined) {
    return res.status(400).json({ success: false, error: "Missing required fields: userId, text, lat, lon" });
  }

  try {
    const result = await processCommuterReport(userId, text, parseFloat(lat), parseFloat(lon));
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: secureError(err) });
  }
});

/**
 * Get crowdsourced occupancy levels for a route
 */
app.get("/api/v1/routes/:routeId/occupancy", async (req, res) => {
  const { routeId } = req.params;
  try {
    const occupancy = await redis.get(`route:${routeId}:occupancy`);
    res.json({
      success: true,
      routeId,
      occupancy: occupancy || "UNKNOWN", // Fallback if no active verified reports exist
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: secureError(err) });
  }
});

/**
 * GET /api/v1/departures
 * Returns upcoming scheduled departures merged with live delay data from Redis.
 */
app.get("/api/v1/departures", async (req, res) => {
  try {
    const staticQuery = `
      SELECT 
        st.trip_id,
        st.arrival_time::text as scheduled_arrival,
        st.stop_sequence,
        s.stop_id,
        s.stop_name,
        s.stop_lat,
        s.stop_lon,
        t.route_id,
        r.route_short_name,
        r.route_long_name,
        r.route_type,
        r.route_color
      FROM stop_times st
      JOIN trips t ON t.trip_id = st.trip_id
      JOIN routes r ON r.route_id = t.route_id
      JOIN stops s ON s.stop_id = st.stop_id
      ORDER BY st.arrival_time ASC
      LIMIT 30
    `;
    const { rows: scheduled } = await db.query(staticQuery);

    if (scheduled.length === 0) {
      return res.json({ success: true, count: 0, data: [] });
    }

    // Fetch delay values and occupancy from Redis
    const pipeline = redis.pipeline();
    scheduled.forEach((item) => {
      pipeline.get(`trip:${item.trip_id}:delay`);
      pipeline.get(`route:${item.route_id}:occupancy`);
    });
    const redisResults = await pipeline.exec();

    // Map and merge with localized Indian city details (Mumbai, Pune, Pimpri Chinchwad, Nagpur, Delhi)
    const LIVE_ROUTE_LOCALIZATION = {
      'BFC': {
        city: 'Mumbai',
        shortName: 'BEST-101',
        longName: 'BEST 101: CST ⇌ Bandra Terminus',
        type: 'BUS',
        color: '#E3000B'
      },
      'CITY': {
        city: 'Pune',
        shortName: 'PMPML-1',
        longName: 'PMPML 1: Pune Station ⇌ Swargate ⇌ Katraj',
        type: 'BUS',
        color: '#0056A7'
      },
      'AB': {
        city: 'Pimpri Chinchwad',
        shortName: 'PCMC-312',
        longName: 'PCMC 312: Chinchwad Station ⇌ Nigdi Depot',
        type: 'BUS',
        color: '#008080'
      },
      'STBA': {
        city: 'Nagpur',
        shortName: 'NAG-M1',
        longName: 'Nagpur Metro Orange Line: Automotive Square ⇌ Airport',
        type: 'METRO',
        color: '#F7941D'
      },
      'AAMV': {
        city: 'Delhi',
        shortName: 'DMRC-YELLOW',
        longName: 'Delhi Metro Yellow Line: HUDA City Centre ⇌ Samaypur Badli',
        type: 'METRO',
        color: '#F7D500'
      }
    };

    const merged = scheduled.map((item, index) => {
      const [errDelay, delayValue] = redisResults[index * 2];
      const [errOcc, occupancyValue] = redisResults[index * 2 + 1];

      const delaySeconds = (!errDelay && delayValue) ? parseInt(delayValue, 10) : 0;
      const scheduledEpoch = intervalToEpoch(item.scheduled_arrival);
      const estimatedEpoch = scheduledEpoch + (delaySeconds * 1000);

      const typeMap = { 0: 'BUS', 1: 'SUBWAY', 2: 'TRAIN', 3: 'BUS', 4: 'FERRY', 5: 'CABLE_TRAM', 6: 'GONDOLA', 7: 'FUNICULAR', 11: 'TROLLEYBUS', 12: 'MONORAIL' };
      const routeType = typeMap[item.route_type] || 'BUS';

      const loc = LIVE_ROUTE_LOCALIZATION[item.route_id] || {
        city: 'Mumbai',
        shortName: item.route_short_name || item.route_id,
        longName: item.route_long_name,
        type: routeType,
        color: item.route_color ? `#${item.route_color}` : 'var(--accent)'
      };

      return {
        tripId: item.trip_id,
        routeId: item.route_id,
        shortName: loc.shortName,
        longName: loc.longName,
        city: loc.city,
        type: loc.type,
        stopId: item.stop_id,
        stopName: item.stop_name,
        scheduledArrival: item.scheduled_arrival,
        delaySeconds,
        estimatedArrival: new Date(estimatedEpoch).toISOString(),
        crowdLevel: (!errOcc && occupancyValue) ? occupancyValue : 'MEDIUM',
        color: loc.color
      };
    });

    res.json({ success: true, count: merged.length, data: merged });
  } catch (err) {
    console.error("[API] Get departures failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── BACKGROUND SIMULATOR FOR LIVE DATA ──
async function runLiveTelemetrySimulator() {
  console.log("[Simulator] Initializing live database/Redis telemetry...");
  try {
    const tripStopsQuery = `
      SELECT st.trip_id, t.route_id, st.stop_sequence, s.stop_lat, s.stop_lon, s.stop_id
      FROM stop_times st
      JOIN trips t ON t.trip_id = st.trip_id
      JOIN stops s ON s.stop_id = st.stop_id
      ORDER BY st.trip_id, st.stop_sequence ASC
    `;
    const { rows } = await db.query(tripStopsQuery);
    
    const trips = {};
    rows.forEach(row => {
      if (!trips[row.trip_id]) {
        trips[row.trip_id] = {
          tripId: row.trip_id,
          routeId: row.route_id,
          stops: []
        };
      }
      trips[row.trip_id].stops.push({
        stopId: row.stop_id,
        lat: parseFloat(row.stop_lat),
        lon: parseFloat(row.stop_lon),
        seq: parseInt(row.stop_sequence)
      });
    });

    const tripIds = Object.keys(trips);
    if (tripIds.length === 0) {
      console.log("[Simulator] No trips found in database. Telemetry simulator skipped.");
      return;
    }

    console.log(`[Simulator] Starting simulator for ${tripIds.length} trips...`);
    let tickCount = 0;

    setInterval(async () => {
      tickCount++;
      const pipeline = redis.pipeline();

      tripIds.forEach((tripId, index) => {
        const trip = trips[tripId];
        const routeId = trip.routeId;
        const stops = trip.stops;
        if (stops.length < 2) return;

        const totalSegments = stops.length - 1;
        const segmentIndex = (tickCount + index) % totalSegments;
        const stepRatio = ((tickCount * 2) % 10) / 10;

        const startStop = stops[segmentIndex];
        const endStop = stops[segmentIndex + 1];

        const lat = startStop.lat + (endStop.lat - startStop.lat) * stepRatio;
        const lon = startStop.lon + (endStop.lon - startStop.lon) * stepRatio;

        const vehicleId = `v-${routeId}-${index}`;

        pipeline.hset(`vehicle:${vehicleId}`, {
          vehicleId,
          tripId,
          routeId,
          latitude: lat.toString(),
          longitude: lon.toString(),
          speed: "12.5",
          bearing: "90",
          stopId: startStop.stopId,
          timestamp: new Date().toISOString()
        });
        pipeline.expire(`vehicle:${vehicleId}`, 30);

        pipeline.sadd(`route:${routeId}:vehicles`, vehicleId);
        pipeline.expire(`route:${routeId}:vehicles`, 30);

        const delaySeconds = ((tickCount + index) % 4 === 0) ? 120 : 0;
        pipeline.set(`trip:${tripId}:delay`, delaySeconds.toString());
        pipeline.expire(`trip:${tripId}:delay`, 30);
      });

      try {
        await pipeline.exec();
      } catch (err) {
        console.error("[Simulator] Error updating Redis telemetry:", err.message);
      }
    }, 5000);

  } catch (err) {
    console.error("[Simulator] Initialization failed:", err.message);
  }
}

// Start listening
const server = app.listen(PORT, () => {
  console.log(`[Express] Trassit Companion API Server running on port ${PORT}`);
  // Start simulator after connection is established
  setTimeout(runLiveTelemetrySimulator, 1000);
});

module.exports = { app, server };
