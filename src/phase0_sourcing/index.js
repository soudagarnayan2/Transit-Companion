/**
 * Phase 0 — Sourcing Orchestrator
 * --------------------------------
 * Entry point that runs every Phase 0 scraper / API client in
 * sequence, logs a status report, and validates connectivity.
 *
 * Run:  node src/phase0_sourcing/index.js
 *   or: npm run phase0
 */

const openData = require("./open_data_downloader");
const transitLand = require("./transit_land_client");
const mappls = require("./mapmyindia_client");
const imd = require("./imd_scraper");
const rtc = require("./state_rtc_listener");
const chalo = require("./chalo_scraper");

/** Separator for log readability. */
const SEP = "─".repeat(60);

async function run() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║   TRASSIT COMPANION — Phase 0 Sourcing Orchestrator    ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const report = {};

  // ── 1. Open Data (data.gov.in & datameet) ─────────────────
  console.log(SEP);
  console.log("1/6  Open Data — data.gov.in & datameet.org");
  console.log(SEP);
  try {
    const records = await openData.fetchDataGovCatalog("bus routes");
    report["data.gov.in"] = { status: "OK", records: records.length };
  } catch (err) {
    report["data.gov.in"] = { status: "FAIL", error: err.message };
  }

  // ── 2. Transit.land ───────────────────────────────────────
  console.log(`\n${SEP}`);
  console.log("2/6  Transit.land — Operator & Feed Lookup");
  console.log(SEP);
  try {
    const operators = await transitLand.searchOperators("India");
    report["transit.land"] = { status: "OK", operators: operators.length };
  } catch (err) {
    report["transit.land"] = { status: "FAIL", error: err.message };
  }

  // ── 3. MapMyIndia / Mappls ────────────────────────────────
  console.log(`\n${SEP}`);
  console.log("3/6  MapMyIndia (Mappls) — Geocoding");
  console.log(SEP);
  try {
    const geo = await mappls.geocode("Rajiv Chowk Metro Station, Delhi");
    report["MapMyIndia"] = { status: "OK", results: geo.length };
  } catch (err) {
    report["MapMyIndia"] = { status: "FAIL", error: err.message };
  }

  // ── 4. IMD Weather ────────────────────────────────────────
  console.log(`\n${SEP}`);
  console.log("4/6  IMD — Weather Alerts");
  console.log(SEP);
  try {
    const alerts = await imd.fetchWeatherAlerts();
    const impactful = imd.filterTransitImpactAlerts(alerts);
    report["IMD Weather"] = { status: "OK", totalAlerts: alerts.length, transitImpact: impactful.length };
  } catch (err) {
    report["IMD Weather"] = { status: "FAIL", error: err.message };
  }

  // ── 5. State RTC — X / Twitter ────────────────────────────
  console.log(`\n${SEP}`);
  console.log("5/6  State RTC — X / Twitter Disruptions");
  console.log(SEP);
  try {
    const disruptions = await rtc.fetchRecentDisruptions();
    report["State RTC (Twitter)"] = { status: "OK", disruptions: disruptions.length };
  } catch (err) {
    report["State RTC (Twitter)"] = { status: "FAIL", error: err.message };
  }

  // ── 6. Chalo ──────────────────────────────────────────────
  console.log(`\n${SEP}`);
  console.log("6/6  Chalo — Live Bus Tracking");
  console.log(SEP);
  try {
    const buses = await chalo.fetchLiveBuses("mumbai");
    report["Chalo"] = { status: "OK", buses: buses.length };
  } catch (err) {
    report["Chalo"] = { status: "FAIL", error: err.message };
  }

  // ── Summary Report ────────────────────────────────────────
  console.log(`\n${"═".repeat(60)}`);
  console.log("  PHASE 0 — SOURCE CONNECTIVITY REPORT");
  console.log("═".repeat(60));
  for (const [source, info] of Object.entries(report)) {
    const icon = info.status === "OK" ? "✓" : "✗";
    console.log(`  ${icon}  ${source.padEnd(22)} ${info.status}`);
  }
  console.log("═".repeat(60));
  console.log("  Phase 0 orchestration complete.\n");
}

run().catch((err) => {
  console.error("Fatal error in Phase 0 orchestrator:", err);
  process.exit(1);
});
