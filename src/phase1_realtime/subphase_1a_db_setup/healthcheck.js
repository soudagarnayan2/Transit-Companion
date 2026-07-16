/**
 * Health Check Script (Sub-Phase 1A)
 * ----------------------------------
 * Verifies connectivity to both PostgreSQL (with PostGIS)
 * and Redis. Exits with code 0 on success, 1 on failure.
 */

const db = require("../../shared/db");
const redisModule = require("../../shared/redis");

const SEP = "─".repeat(50);

async function run() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║       TRASSIT COMPANION — Infrastructure Health        ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  let allHealthy = true;

  // ── PostgreSQL ──────────────────────────────────────────
  console.log(SEP);
  console.log("  PostgreSQL + PostGIS");
  console.log(SEP);
  const pgHealth = await db.healthCheck();
  if (pgHealth.connected) {
    console.log("  Status:   ✓  Connected");
    console.log(`  PostGIS:  ${pgHealth.postgis ? `✓  v${pgHealth.postgis}` : "⚠  Extension not yet enabled (run migrations first)"}`);
  } else {
    console.log("  Status:   ✗  UNREACHABLE");
    console.log(`  Error:    ${pgHealth.error}`);
    allHealthy = false;
  }

  // ── Redis ───────────────────────────────────────────────
  console.log(`\n${SEP}`);
  console.log("  Redis");
  console.log(SEP);
  const redisHealth = await redisModule.healthCheck();
  if (redisHealth.connected) {
    console.log("  Status:   ✓  Connected");
    console.log(`  Latency:  ${redisHealth.latencyMs}ms`);
  } else {
    console.log("  Status:   ✗  UNREACHABLE");
    console.log(`  Error:    ${redisHealth.error}`);
    allHealthy = false;
  }

  // ── Summary ─────────────────────────────────────────────
  console.log(`\n${"═".repeat(50)}`);
  if (allHealthy) {
    console.log("  ✓  All infrastructure services are healthy.");
  } else {
    console.log("  ⚠  One or more services are unreachable.");
    console.log("     Make sure Docker containers are running:");
    console.log("     → docker-compose up -d");
  }
  console.log("═".repeat(50) + "\n");

  // Clean up connections.
  await db.pool.end().catch(() => {});
  await redisModule.redis.quit().catch(() => {});

  process.exit(allHealthy ? 0 : 1);
}

run().catch((err) => {
  console.error("Health check fatal error:", err.message);
  process.exit(1);
});
