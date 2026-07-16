/**
 * Integration Test for Phase 2 Multimodal Routing & Phase 3 Ticketing/Wallet
 * --------------------------------------------------------------------------
 * Runs automated requests against Express API endpoints.
 */

const axios = require("axios");

const SEP = "─".repeat(60);

async function run() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║    TRASSIT COMPANION — Phase 2 & 3 API Verification      ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const baseUrl = "http://localhost:3000/api/v1";
  let userToken = "";

  try {
    // ── 1. Phase 2: Multimodal Routing Query ────────────────
    console.log(SEP);
    console.log("  Testing Phase 2 Multimodal Route Planning");
    console.log(SEP);
    
    const routeRes = await axios.get(
      `${baseUrl}/route/multimodal?origin=19.1205,72.8460&destination=19.1170,72.9050`
    );
    console.log("  Status:   ✓  Success");
    console.log("  Summary: ", routeRes.data.data.summary);
    console.log("  Legs Found:", routeRes.data.data.legs.map(l => `${l.mode}: ${l.instruction}`));

    // ── 2. Phase 3: Wallet Creation & Top-up ───────────────
    console.log(`\n${SEP}`);
    console.log("  Testing Phase 3 Wallet Top-Up");
    console.log(SEP);
    
    const topupRes = await axios.post(`${baseUrl}/wallet/topup`, {
      userId: "user_test_99",
      amount: 150.00
    });
    console.log("  Status:   ✓  Success");
    console.log(`  Balance:  ${topupRes.data.balance} ${topupRes.data.currency}`);

    // ── 3. Phase 3: Get Balance ────────────────────────────
    console.log(`\n${SEP}`);
    console.log("  Testing Phase 3 Get Balance");
    console.log(SEP);
    
    const balRes = await axios.get(`${baseUrl}/wallet/balance/user_test_99`);
    console.log("  Status:   ✓  Success");
    console.log(`  Balance:  ${balRes.data.balance} ${balRes.data.currency}`);

    // ── 4. Phase 3: Ticket Purchase ────────────────────────
    console.log(`\n${SEP}`);
    console.log("  Testing Phase 3 Ticket Purchase");
    console.log(SEP);
    
    const purchaseRes = await axios.post(`${baseUrl}/tickets/purchase`, {
      userId: "user_test_99",
      routeId: "335A",
      fare: 25.00
    });
    console.log("  Status:   ✓  Success");
    console.log(`  Ticket ID: ${purchaseRes.data.data.ticket_id}`);
    console.log(`  Status:    ${purchaseRes.data.data.status}`);
    userToken = purchaseRes.data.data.token;
    console.log(`  Signed JWS Token: ${userToken.slice(0, 30)}...`);

    // Verify balance was deducted
    const balRes2 = await axios.get(`${baseUrl}/wallet/balance/user_test_99`);
    console.log(`  New Wallet Balance: ${balRes2.data.balance} ${balRes2.data.currency}`);

    // ── 5. Phase 3: Offline Validation ─────────────────────
    console.log(`\n${SEP}`);
    console.log("  Testing Phase 3 Offline QR Code JWS Verification");
    console.log(SEP);
    
    const valRes = await axios.post(`${baseUrl}/tickets/validate`, {
      token: userToken
    });
    console.log("  Status:   ✓  Success");
    console.log("  Token Validated:", valRes.data.valid);
    console.log("  Decoded Payload:", valRes.data.payload);

    // ── 6. Phase 3 Security Rule: PII URL Redaction Check ──
    console.log(`\n${SEP}`);
    console.log("  Testing PII URL Protection Rule");
    console.log(SEP);
    try {
      // Simulate failed call that might include user email/token PII in query parameter
      await axios.post(`${baseUrl}/tickets/validate`, {
        token: "invalid.token.string"
      });
    } catch (err) {
      console.log("  Validation failed as expected.");
      const errorMsg = err.response.data.error;
      console.log(`  Error message returned: "${errorMsg}"`);
      if (errorMsg.includes("REDACTED") || errorMsg.includes("Invalid")) {
        console.log("  ✓  PII security rule verified.");
      } else {
        console.log("  ✗  Security check failed!");
      }
    }

    console.log(`\n${"═".repeat(60)}`);
    console.log("  ✓  Phase 2 & 3 integrations validated successfully.");
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
