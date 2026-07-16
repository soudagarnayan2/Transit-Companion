/**
 * Trassit Companion — Map UI Orchestration
 * -----------------------------------------
 * Manages Leaflet map state, coordinates routing/stop rendering,
 * and polls live bus positions and ETAs.
 */

// Coordinates centered around Mumbai/Andheri area
const DEFAULT_CENTER = [19.1136, 72.8696];
const DEFAULT_ZOOM = 13;

let map;
let routePolyline = null;
let stopMarkers = [];
let busMarkers = {};
let selectedStopId = null;
let selectedRouteId = "";
let isDemoMode = false;

// Phase 2 Planner Globals
let activeMode = "explorer"; // 'explorer' | 'planner'
let originMarker = null;
let destMarker = null;
let originCoords = null;
let destCoords = null;
let routeSegments = [];

// Mock Data for Demo Fallback
const MOCK_ROUTES = {
  "335A": {
    id: "335A",
    name: "Route 335A",
    desc: "Andheri Station – Powai",
    color: "#3b82f6",
    stops: [
      { id: "stop_101", name: "Andheri Station (E)", lat: 19.1197, lon: 72.8464 },
      { id: "stop_102", name: "Chakala Metro", lat: 19.1114, lon: 72.8604 },
      { id: "stop_103", name: "Marol Naka", lat: 19.1098, lon: 72.8732 },
      { id: "stop_104", name: "Saki Naka", lat: 19.0984, lon: 72.8879 },
      { id: "stop_105", name: "Powai Lake", lat: 19.1176, lon: 72.9059 },
    ]
  },
  "101": {
    id: "101",
    name: "Route 101",
    desc: "CST – Bandra",
    color: "#10b981",
    stops: [
      { id: "stop_201", name: "CST Terminal", lat: 18.9402, lon: 72.8354 },
      { id: "stop_202", name: "Byculla Station", lat: 18.9750, lon: 72.8331 },
      { id: "stop_203", name: "Dadar TT", lat: 19.0178, lon: 72.8478 },
      { id: "stop_204", name: "Mahim Interchange", lat: 19.0413, lon: 72.8431 },
      { id: "stop_205", name: "Bandra Collectorate", lat: 19.0607, lon: 72.8540 },
    ]
  }
};

const MOCK_ALERTS = [
  { id: "alert-01", headerText: "Route 335A Delays", descriptionText: "Buses running 10-15 mins late near Saki Naka due to heavy traffic waterlogging." }
];

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initListeners();
  checkApiConnectivity();
});

/**
 * Initializes Leaflet Map with OpenStreetMap tiles.
 */
function initMap() {
  map = L.map("map", {
    zoomControl: true,
    attributionControl: false
  }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

  // CartoDB Dark Matter tiles match the dark-theme aesthetic beautifully
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19
  }).addTo(map);
}

/**
 * Checks API connectivity to decide whether to run in live or fallback demo mode.
 */
async function checkApiConnectivity() {
  try {
    const res = await fetch("/api/v1/routes");
    if (!res.ok) throw new Error("API status non-200");
    const json = await res.json();
    console.log("[Map UI] Connected to live API endpoints.");
    loadAlerts();
  } catch (err) {
    console.warn("[Map UI] API disconnected or unreachable. Swapping to Offline Demo Simulation.");
    enableDemoMode();
  }
}

/**
 * Sets up demo simulation mode.
 */
function enableDemoMode() {
  isDemoMode = true;
  document.getElementById("system-status-dot").className = "status-indicator live";
  document.getElementById("system-status-text").textContent = "Simulation Mode";
  
  // Load mock alerts
  showAlertBanner(MOCK_ALERTS[0].descriptionText);
  
  // Start simulation loop for bus movements
  simulateBusMovement();
  setInterval(simulateBusMovement, 5000);
}

/**
 * Registers events for select boxes and alerts banners.
 */
function initListeners() {
  const selector = document.getElementById("route-selector");
  selector.addEventListener("change", (e) => {
    selectedRouteId = e.target.value;
    if (selectedRouteId) {
      loadRouteDetails(selectedRouteId);
    } else {
      clearRouteDisplay();
    }
  });

  document.getElementById("close-alert-btn").addEventListener("click", () => {
    document.getElementById("alerts-banner").classList.add("hidden");
  });

  document.getElementById("submit-report-btn").addEventListener("click", () => {
    submitCrowdsourceReport();
  });

  // Tab switching
  const tabExplorer = document.getElementById("tab-explorer");
  const tabPlanner = document.getElementById("tab-planner");
  const ctrlExplorer = document.getElementById("explorer-controls");
  const ctrlPlanner = document.getElementById("planner-controls");

  tabExplorer.addEventListener("click", () => {
    activeMode = "explorer";
    tabExplorer.classList.add("active");
    tabPlanner.classList.remove("active");
    ctrlExplorer.classList.remove("hidden");
    ctrlPlanner.classList.add("hidden");
    clearRouteDisplay();
    clearPlannerDisplay();
  });

  tabPlanner.addEventListener("click", () => {
    activeMode = "planner";
    tabPlanner.classList.add("active");
    tabExplorer.classList.remove("active");
    ctrlPlanner.classList.remove("hidden");
    ctrlExplorer.classList.add("hidden");
    clearRouteDisplay();
    clearPlannerDisplay();
  });

  // Map Click coordinate picker
  map.on("click", (e) => {
    if (activeMode !== "planner") return;
    handleMapClick(e.latlng);
  });

  // Multimodal query button
  document.getElementById("find-multimodal-btn").addEventListener("click", () => {
    findMultimodalRoutes();
  });
}

/**
 * Renders alerts bar.
 */
function showAlertBanner(text) {
  const banner = document.getElementById("alerts-banner");
  document.getElementById("alert-text").textContent = text;
  banner.classList.remove("hidden");
}

/**
 * Loads route stops and maps them as a polyline and circles.
 */
async function loadRouteDetails(routeId) {
  clearRouteDisplay();
  
  let stops = [];
  let color = "#3b82f6";
  
  if (isDemoMode) {
    const routeObj = MOCK_ROUTES[routeId];
    stops = routeObj.stops;
    color = routeObj.color;
  } else {
    try {
      const res = await fetch(`/api/v1/routes/${routeId}/stops`);
      const json = await res.json();
      stops = json.data;
    } catch (err) {
      console.error("Failed to fetch route stops:", err);
      return;
    }
  }

  if (stops.length === 0) return;

  const latlngs = stops.map(s => [s.stop_lat || s.lat, s.stop_lon || s.lon]);

  // Render polyline
  routePolyline = L.polyline(latlngs, {
    color: color,
    weight: 5,
    opacity: 0.8
  }).addTo(map);

  // Zoom map to cover the route bounds
  map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

  // Add stop markers
  stops.forEach((stop) => {
    const lat = stop.stop_lat || stop.lat;
    const lon = stop.stop_lon || stop.lon;
    const name = stop.stop_name || stop.name;
    const id = stop.stop_id || stop.id;

    const stopMarker = L.circleMarker([lat, lon], {
      radius: 8,
      fillColor: "#0f172a",
      fillOpacity: 0.9,
      color: color,
      weight: 3
    }).addTo(map);

    stopMarker.bindTooltip(name, { direction: "top", offset: [0, -5] });
    
    stopMarker.on("click", () => {
      handleStopClick(id, name);
    });

    stopMarkers.push(stopMarker);
  });

  // Pull vehicle locations immediately
  pollLiveVehicles(routeId);
}

/**
 * Resets map layers.
 */
function clearRouteDisplay() {
  if (routePolyline) map.removeLayer(routePolyline);
  stopMarkers.forEach(m => map.removeLayer(m));
  stopMarkers = [];
  
  // Clear buses
  Object.values(busMarkers).forEach(m => map.removeLayer(m));
  busMarkers = {};

  const infoPanel = document.getElementById("info-panel");
  infoPanel.className = "empty-state";
  document.getElementById("panel-content").classList.add("hidden");
}

/**
 * Handles clicks on stop markers, loading arrivals.
 */
async function handleStopClick(stopId, stopName) {
  selectedStopId = stopId;
  const infoPanel = document.getElementById("info-panel");
  const panelContent = document.getElementById("panel-content");
  
  infoPanel.className = ""; // remove empty state layout
  panelContent.classList.remove("hidden");
  document.getElementById("panel-title").textContent = stopName;

  let arrivals = [];
  
  if (isDemoMode) {
    arrivals = _generateMockArrivals(stopId);
  } else {
    try {
      const res = await fetch(`/api/v1/stops/${stopId}/arrivals`);
      const json = await res.json();
      arrivals = json.data;
    } catch (err) {
      console.error("Arrival fetch failed:", err);
    }
  }

  renderArrivals(arrivals);
}

/**
 * Resolves crowdsourced route occupancy from live backend or local simulation state.
 */
async function getRouteOccupancy(routeId) {
  if (isDemoMode) {
    const simOcc = localStorage.getItem(`sim_occupancy_${routeId}`);
    return simOcc || "MEDIUM";
  }
  try {
    const res = await fetch(`/api/v1/routes/${routeId}/occupancy`);
    const json = await res.json();
    return json.occupancy || "UNKNOWN";
  } catch (err) {
    return "UNKNOWN";
  }
}

/**
 * Renders arrival items in sidebar with dynamic occupancy badges.
 */
async function renderArrivals(arrivals) {
  const list = document.getElementById("arrivals-list");
  list.innerHTML = "";

  if (arrivals.length === 0) {
    list.innerHTML = "<li class='arrival-card'>No scheduled arrivals found.</li>";
    return;
  }

  for (const arr of arrivals) {
    const li = document.createElement("li");
    li.className = "arrival-card";
    
    const minutesLeft = Math.max(0, Math.round((new Date(arr.estimatedArrival) - new Date()) / 60000));
    const etaText = minutesLeft === 0 ? "Due" : `${minutesLeft} min`;
    const isDelayed = arr.delaySeconds > 0;
    
    const occupancy = await getRouteOccupancy(arr.routeId);
    const occClass = occupancy.toLowerCase();
    
    li.innerHTML = `
      <div class="route-badge">${arr.routeShortName}</div>
      <div class="route-desc">
        <div class="route-name" style="display: flex; align-items: center; gap: 8px;">
          ${arr.routeLongName}
          <span class="occ-badge ${occClass}">${occupancy}</span>
        </div>
        <div class="route-dir">Scheduled: ${arr.scheduledArrival}</div>
      </div>
      <div class="arrival-time-block">
        <div class="eta ${isDelayed ? 'delayed' : ''}">${etaText}</div>
        <div class="scheduled-lbl">${isDelayed ? `+${Math.round(arr.delaySeconds / 60)}m delay` : 'On Time'}</div>
      </div>
    `;
    list.appendChild(li);
  }
}

/**
 * Polls live buses for a given route.
 */
async function pollLiveVehicles(routeId) {
  if (isDemoMode) return; // simulated separately

  try {
    const res = await fetch(`/api/v1/vehicles/live?route=${routeId}`);
    const json = await res.json();
    updateBusMarkers(json.data);
  } catch (err) {
    console.error("Failed polling vehicles:", err);
  }
}

/**
 * Updates marker coordinates or creates markers for bus positions.
 */
function updateBusMarkers(buses) {
  // Clear old markers that are not in the new feed
  const newIds = new Set(buses.map(b => b.vehicleId));
  Object.keys(busMarkers).forEach((vid) => {
    if (!newIds.has(vid)) {
      map.removeLayer(busMarkers[vid]);
      delete busMarkers[vid];
    }
  });

  buses.forEach((bus) => {
    const coords = [bus.latitude, bus.longitude];
    
    if (busMarkers[bus.vehicleId]) {
      // Smoothly move marker
      busMarkers[bus.vehicleId].setLatLng(coords);
    } else {
      // Create new custom divIcon
      const busIcon = L.divIcon({
        className: "custom-bus-icon",
        html: `<span>${bus.routeId || 'Bus'}</span>`,
        iconSize: [32, 32]
      });

      const marker = L.marker(coords, { icon: busIcon }).addTo(map);
      marker.bindPopup(`
        <strong>Vehicle ID:</strong> ${bus.vehicleId}<br>
        <strong>Speed:</strong> ${bus.speed ? Math.round(bus.speed * 3.6) : 0} km/h<br>
        <strong>Updated:</strong> ${new Date(bus.timestamp).toLocaleTimeString()}
      `);
      busMarkers[bus.vehicleId] = marker;
    }
  });
}

/**
 * Active simulation of live moving buses in Demo Mode.
 */
let simStep = 0;
function simulateBusMovement() {
  if (!isDemoMode || !selectedRouteId) return;

  const routeObj = MOCK_ROUTES[selectedRouteId];
  if (!routeObj) return;

  simStep = (simStep + 1) % 10;
  
  // Interpolate bus positions along the route segment coordinates
  const simulatedBuses = [
    {
      vehicleId: `sim-bus-${selectedRouteId}-01`,
      routeId: selectedRouteId,
      latitude: _interpolate(routeObj.stops[0], routeObj.stops[routeObj.stops.length - 1], simStep / 10).lat,
      longitude: _interpolate(routeObj.stops[0], routeObj.stops[routeObj.stops.length - 1], simStep / 10).lon,
      speed: 10,
      timestamp: new Date()
    }
  ];

  updateBusMarkers(simulatedBuses);
}

function _interpolate(p1, p2, ratio) {
  return {
    lat: p1.lat + (p2.lat - p1.lat) * ratio,
    lon: p1.lon + (p2.lon - p1.lon) * ratio
  };
}

function _generateMockArrivals(stopId) {
  const d1 = new Date();
  d1.setMinutes(d1.getMinutes() + 5);
  const d2 = new Date();
  d2.setMinutes(d2.getMinutes() + 18);

  return [
    {
      routeShortName: selectedRouteId || "335A",
      routeLongName: "Simulation Run",
      scheduledArrival: d1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: d1.toISOString(),
      delaySeconds: 120
    },
    {
      routeShortName: selectedRouteId || "335A",
      routeLongName: "Simulation Run",
      scheduledArrival: d2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: d2.toISOString(),
      delaySeconds: 0
    }
  ];
}

/**
 * Handles crowdsourced report submission.
 * Sends user text and current map center coordinates to the processor endpoint.
 */
async function submitCrowdsourceReport() {
  const inputEl = document.getElementById("report-input");
  const statusEl = document.getElementById("report-status");
  const text = inputEl.value.trim();

  if (!text) {
    statusEl.className = "error";
    statusEl.textContent = "Please enter some details before submitting.";
    statusEl.classList.remove("hidden");
    return;
  }

  // Capture current center coordinates as reporting location
  const center = map.getCenter();
  const payload = {
    userId: `user_uid_${Math.round(Math.random()*1000)}`,
    text,
    lat: center.lat,
    lon: center.lng
  };

  statusEl.className = "";
  statusEl.textContent = "Submitting alert for verification...";
  statusEl.classList.remove("hidden");

  if (isDemoMode) {
    // Client-side mock parsing for simulation sandbox
    setTimeout(() => {
      let routeId = "335A";
      if (text.toLowerCase().includes("101")) routeId = "101";

      let occupancy = "HIGH";
      if (text.toLowerCase().includes("empty")) occupancy = "LOW";
      else if (text.toLowerCase().includes("medium")) occupancy = "MEDIUM";

      localStorage.setItem(`sim_occupancy_${routeId}`, occupancy);
      
      statusEl.className = "success";
      statusEl.textContent = `Report verified! Route ${routeId} marked as ${occupancy} occupancy.`;
      inputEl.value = "";

      // Force UI refresh
      if (selectedStopId) {
        handleStopClick(selectedStopId, document.getElementById("panel-title").textContent);
      }
    }, 1200);
    return;
  }

  try {
    const res = await fetch("/api/v1/crowdsource/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (json.isVerified) {
      statusEl.className = "success";
      statusEl.textContent = `Alert Verified! ${json.verificationMessage}`;
      inputEl.value = "";
      
      // If incident alert was created, show alert banner
      if (json.data && json.data.isIncident) {
        showAlertBanner(json.data.summaryText);
      }

      // Force UI update on current arrivals panel to show new occupancy badge
      if (selectedStopId) {
        handleStopClick(selectedStopId, document.getElementById("panel-title").textContent);
      }
    } else {
      statusEl.className = "error";
      statusEl.textContent = `Report rejected: ${json.verificationMessage}`;
    }
  } catch (err) {
    statusEl.className = "error";
    statusEl.textContent = `Submission failed: ${err.message}`;
  }
}

/**
 * Handles map selection clicks to pick Origin & Destination.
 */
function handleMapClick(latlng) {
  if (!originCoords) {
    originCoords = latlng;
    document.getElementById("origin-coord").value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
    
    // Drop marker
    originMarker = L.marker(latlng, {
      icon: L.divIcon({
        className: "custom-bus-icon",
        html: `<span style="background:#3b82f6;">A</span>`,
        iconSize: [28, 28]
      })
    }).addTo(map);
  } else if (!destCoords) {
    destCoords = latlng;
    document.getElementById("dest-coord").value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
    
    // Drop marker
    destMarker = L.marker(latlng, {
      icon: L.divIcon({
        className: "custom-bus-icon",
        html: `<span style="background:#ef4444;">B</span>`,
        iconSize: [28, 28]
      })
    }).addTo(map);
  } else {
    // Reset and select again
    clearPlannerDisplay();
    handleMapClick(latlng);
  }
}

/**
 * Reset planner markers and polylines.
 */
function clearPlannerDisplay() {
  if (originMarker) map.removeLayer(originMarker);
  if (destMarker) map.removeLayer(destMarker);
  routeSegments.forEach(seg => map.removeLayer(seg));
  
  originMarker = null;
  destMarker = null;
  originCoords = null;
  destCoords = null;
  routeSegments = [];

  document.getElementById("origin-coord").value = "";
  document.getElementById("dest-coord").value = "";

  const infoPanel = document.getElementById("info-panel");
  infoPanel.className = "empty-state";
  document.getElementById("panel-content").classList.add("hidden");
}

/**
 * Fetches multimodal routes from backend API.
 */
async function findMultimodalRoutes() {
  if (!originCoords || !destCoords) {
    alert("Please select both Origin and Destination coordinates by clicking on the map.");
    return;
  }

  const originParam = `${originCoords.lat},${originCoords.lng}`;
  const destParam = `${destCoords.lat},${destCoords.lng}`;

  const infoPanel = document.getElementById("info-panel");
  const panelContent = document.getElementById("panel-content");
  
  infoPanel.className = "";
  panelContent.classList.remove("hidden");
  document.getElementById("panel-title").textContent = "Multimodal Itinerary";

  const list = document.getElementById("arrivals-list");
  list.innerHTML = "<li class='arrival-card'>Calculating best route combinations...</li>";

  // Clear previous route polylines
  routeSegments.forEach(seg => map.removeLayer(seg));
  routeSegments = [];

  try {
    const res = await fetch(`/api/v1/route/multimodal?origin=${originParam}&destination=${destParam}`);
    const json = await res.json();
    
    if (json.success && json.data) {
      renderItinerary(json.data);
    } else {
      list.innerHTML = "<li class='arrival-card'>Failed to generate multimodal options.</li>";
    }
  } catch (err) {
    list.innerHTML = `<li class='arrival-card'>Error contacting routing engine: ${err.message}</li>`;
  }
}

/**
 * Renders calculated legs and draws color-coded lines.
 */
function renderItinerary(itinerary) {
  const list = document.getElementById("arrivals-list");
  list.innerHTML = "";

  // 1. Add Summary Row
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "multimodal-summary";
  summaryDiv.innerHTML = `
    <div class="summary-item">
      <div class="summary-val">${itinerary.summary.totalDurationMinutes} min</div>
      <div class="summary-lbl">Est. Duration</div>
    </div>
    <div class="summary-item">
      <div class="summary-val">${(itinerary.summary.totalDistanceMeters / 1000).toFixed(2)} km</div>
      <div class="summary-lbl">Distance</div>
    </div>
  `;
  list.appendChild(summaryDiv);

  // 2. Render each leg card and draw paths
  const bounds = [];
  itinerary.legs.forEach((leg, index) => {
    const li = document.createElement("li");
    
    let modeClass = "walk";
    let icon = "🚶";
    let color = "#64748b";
    let isDash = true;

    if (leg.mode === "TRANSIT") {
      modeClass = "transit";
      icon = "🚌";
      color = "#3b82f6";
      isDash = false;
    } else if (leg.mode === "SCOOTER") {
      modeClass = "scooter";
      icon = "🛴";
      color = "#10b981";
      isDash = false;
    }

    li.className = `leg-card ${modeClass}`;
    li.innerHTML = `
      <div class="leg-icon">${icon}</div>
      <div class="leg-info">
        <div class="leg-title">${leg.mode}</div>
        <div class="leg-detail">${leg.instruction}</div>
      </div>
      <div class="leg-metrics">
        <div>${Math.round(leg.durationSeconds / 60)} min</div>
        <div>${leg.distanceMeters} m</div>
      </div>
    `;
    list.appendChild(li);

    // Draw segment polyline
    // We generate straight interpolation path or read coordinates from stops
    let startCoords, endCoords;
    if (index === 0) {
      startCoords = [originCoords.lat, originCoords.lng];
      // End at next transit stop (or dest if walk-only)
      const nextLeg = itinerary.legs[index + 1];
      if (nextLeg && nextLeg.mode === "TRANSIT") {
        // Mock station coords based on Mumbai stop positions
        startCoords = [originCoords.lat, originCoords.lng];
        endCoords = [19.1197, 72.8464]; // Andheri Station default
      } else {
        endCoords = [destCoords.lat, destCoords.lng];
      }
    } else if (leg.mode === "TRANSIT") {
      startCoords = [19.1197, 72.8464];
      endCoords = [19.1176, 72.9059]; // Powai Lake stop default
    } else {
      startCoords = [19.1176, 72.9059];
      endCoords = [destCoords.lat, destCoords.lng];
    }

    const poly = L.polyline([startCoords, endCoords], {
      color,
      weight: 6,
      opacity: 0.9,
      dashArray: isDash ? "10, 10" : null
    }).addTo(map);

    routeSegments.push(poly);
    bounds.push(startCoords, endCoords);
  });

  // Fit bounds to show route
  if (bounds.length > 0) {
    map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] });
  }
}


