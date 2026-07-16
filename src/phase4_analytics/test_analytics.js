/**
 * Integration Test for Phase 4 Crowdsourced Analytics and NLP parsing.
 * ---------------------------------------------------------------------
 * Runs automated requests against Express API endpoints.
 */

const axios = require("axios");

const SEP = "─".repeat(60);

async function run() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║      TRASSIT COMPANION — Phase 4 API Verification       ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const baseUrl = "http://localhost:3000/api/v1";

  try {
    // ── 1. Submit User Report ────────────────────────────────
    console.log(SEP);
    console.log("  Testing POST /api/v1/crowdsource/report (NLP + Location)");
    console.log(SEP);

    const reportRes = await axios.post(`${baseUrl}/crowdsource/report`, {
      userId: "user_commuter_88",
      text: "Line 335A is completely packed and delayed by 15min due to a block near Chakala Station.",
      lat: 19.1114, // coordinates near Chakala stop (Verified)
      lon: 72.8604
    });

    console.log("  Status:   ✓  Success");
    console.log("  Verified: ", reportRes.data.isVerified);
    console.log("  Message:  ", reportRes.data.verificationMessage);
    console.log("  Extracted Data:");
    console.log(JSON.stringify(reportRes.data.data, null, 2));

    // ── 2. Get Route Occupancy State ─────────────────────────
    console.log(`\n${SEP}`);
    console.log("  Testing GET /api/v1/routes/335A/occupancy");
    console.log(SEP);

    const occupancyRes = await axios.get(`${baseUrl}/routes/335A/occupancy`);
    console.log("  Status:   ✓  Success");
    console.log(`  Route ID:  ${occupancyRes.data.routeId}`);
    console.log(`  Occupancy: ${occupancyRes.data.occupancy}`);
    console.log(`  Updated:   ${occupancyRes.data.lastUpdated}`);

    console.log(`\n${"═".repeat(60)}`);
    console.log("  ✓  Phase 4 crowdsourcing & analytics validated successfully.");
    console.log(`${"═".repeat(60)}\n`);

  } catch (err) {
    console.error("\n  ✗  Verification failed:", err.message);
    if (err.response) {
      console.error("[Error details]:", err.response.data);
    }
  }
}

// Give Express server 1 second to start before running tests
setTimeout(run, 1000);
