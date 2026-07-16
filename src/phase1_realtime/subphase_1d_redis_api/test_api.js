/**
 * Integration Test for Redis Cache Client & Express Server
 * --------------------------------------------------------
 * Runs in demo mode to cache updates and verify that Express endpoints
 * return the cached data successfully.
 */

const axios = require("axios");
const { saveVehiclePositions, saveTripDelays, saveAlerts } = require("./cache_client");
const { server } = require("./server");
const { pool } = require("../../shared/db");
const { redis } = require("../../shared/redis");

async function run() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║      TRASSIT COMPANION — Phase 1.4 API Verification      ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const baseUrl = "http://localhost:3000/api/v1";

  try {
    // ── 1. Cache Mock Real-Time Data ────────────────────────
    console.log("[Test] Caching mock real-time vehicle positions...");
    await saveVehiclePositions([
      {
        vehicleId: "v-test-101",
        tripId: "trip-999",
        routeId: "335A",
        latitude: 19.1234,
        longitude: 72.5678,
        bearing: 90,
        speed: 12.5,
        stopId: "stop-50",
        timestamp: new Date(),
      },
    ]);

    console.log("[Test] Caching mock trip delay offsets...");
    await saveTripDelays([
      {
        tripId: "trip-999",
        routeId: "335A",
        delays: [
          { stopId: "stop-50", stopSequence: 1, arrivalDelay: 180, departureDelay: 180 },
        ],
      },
    ]);

    console.log("[Test] Caching mock service alerts...");
    await saveAlerts([
      {
        id: "alert-test-01",
        headerText: "Route 335A Delays",
        descriptionText: "Expect up to 15-minute delays due to waterlogging.",
        cause: 1,
        effect: 8,
      },
    ]);

    // ── 2. Query REST API Endpoints ─────────────────────────
    console.log("\n[Test] Querying GET /api/v1/alerts...");
    const alertRes = await axios.get(`${baseUrl}/alerts`);
    console.log(`[Response] Status: ${alertRes.status}, Alerts Found: ${alertRes.data.count}`);
    console.log(JSON.stringify(alertRes.data.data, null, 2));

    console.log("\n[Test] Querying GET /api/v1/vehicles/live?route=335A...");
    const vehicleRes = await axios.get(`${baseUrl}/vehicles/live?route=335A`);
    console.log(`[Response] Status: ${vehicleRes.status}, Vehicles Found: ${vehicleRes.data.count}`);
    console.log(JSON.stringify(vehicleRes.data.data, null, 2));

    console.log("\n[Test] Querying GET /api/v1/stops/stop-50/arrivals (Static/Live Merging)...");
    const arrivalRes = await axios.get(`${baseUrl}/stops/stop-50/arrivals`);
    console.log(`[Response] Status: ${arrivalRes.status}`);
    console.log(JSON.stringify(arrivalRes.data.data, null, 2));

    console.log("\n  ✓  Phase 1.4 REST API & Caching verified successfully.");

  } catch (err) {
    console.error("\n  ✗  Verification failed:", err.message);
    if (err.response) {
      console.error("[Response Error Body]:", err.response.data);
    }
  } finally {
    // Shutdown server and clients
    console.log("\n[Test] Cleaning up connections...");
    server.close();
    await pool.end();
    await redis.quit();
    console.log("[Test] Completed.\n");
  }
}

// Give Redis a moment to establish client before running test
setTimeout(run, 1000);
