/**
 * GTFS Real-Time Poller Runner
 * ----------------------------
 * Polls the real-time protobuf endpoint and prints results.
 *
 * Usage:
 *   node rt_run.js --url http://gtfs.ovapi.nl/nl/vehiclePositions.pb
 */

const { pollRealtimeFeed } = require("./rt_processor");

// A sample public GTFS-RT feed from the MBTA (Massachusetts Bay Transportation Authority)
const DEFAULT_RT_URL = "https://cdn.mbta.com/realtime/VehiclePositions.pb";

function getArg(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
}

async function main() {
  const url = getArg("--url") || DEFAULT_RT_URL;

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║          TRASSIT COMPANION — GTFS-RT Poller             ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  console.log(`URL target: ${url}\n`);

  try {
    const updates = await pollRealtimeFeed(url);
    if (updates.length > 0) {
      console.log(`\n  ✓  Successfully parsed ${updates.length} updates.`);
      console.log("  Sample updates parsed:");
      console.log(JSON.stringify(updates.slice(0, 3), null, 2));
    } else {
      console.log("\n  ℹ  No updates parsed. Running in demo fallback mode.");
      console.log(JSON.stringify(_demoRTData(), null, 2));
    }
  } catch (err) {
    console.error(`\n  ✗  RT polling failed: ${err.message}`);
    process.exitCode = 1;
  }
}

function _demoRTData() {
  return [
    {
      type: "VEHICLE",
      id: "demo-v1",
      vehicleId: "BUS-1004",
      tripId: "trip_335a_0915",
      routeId: "335A",
      latitude: 19.076,
      longitude: 72.8777,
      bearing: 180,
      speed: 25,
      timestamp: new Date(),
    },
    {
      type: "TRIP_UPDATE",
      id: "demo-tu1",
      tripId: "trip_335a_0915",
      routeId: "335A",
      timestamp: new Date(),
      delays: [
        { stopId: "stop_101", stopSequence: 1, arrivalDelay: 120, departureDelay: 120 },
      ],
    }
  ];
}

main();
