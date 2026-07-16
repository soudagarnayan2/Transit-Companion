/**
 * Migration Runner (Sub-Phase 1A)
 * -------------------------------
 * Reads SQL files from the migrations/ directory in sorted order
 * and applies any that haven't been recorded in `schema_migrations`.
 */

const fs = require("fs");
const path = require("path");
const { pool, query } = require("../../shared/db");

const MIGRATIONS_DIR = path.resolve(__dirname, "migrations");

async function run() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║    TRASSIT COMPANION — Sub-Phase 1A Migration Runner     ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Step 1: Bootstrap — run the first migration directly to create
  // the schema_migrations table and PostGIS extension.
  const bootstrapFile = "001_init_postgis.sql";
  const bootstrapSql = fs.readFileSync(path.join(MIGRATIONS_DIR, bootstrapFile), "utf-8");
  await pool.query(bootstrapSql);
  console.log(`  ✓  Bootstrap: ${bootstrapFile} (PostGIS + schema_migrations)`);

  // Record bootstrap migration if not already tracked.
  await query(
    `INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING`,
    [bootstrapFile]
  );

  // Step 2: Determine which migrations are pending.
  const allFiles = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const { rows: applied } = await query("SELECT filename FROM schema_migrations");
  const appliedSet = new Set(applied.map((r) => r.filename));

  const pending = allFiles.filter((f) => !appliedSet.has(f));

  if (pending.length === 0) {
    console.log("\n  ℹ  All migrations are up to date. Nothing to apply.\n");
    await pool.end();
    return;
  }

  console.log(`\n  ℹ  ${pending.length} pending migration(s) to apply:\n`);

  // Step 3: Apply pending migrations inside a transaction per file.
  for (const filename of pending) {
    const filePath = path.join(MIGRATIONS_DIR, filename);
    const sql = fs.readFileSync(filePath, "utf-8");

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1)",
        [filename]
      );
      await client.query("COMMIT");
      console.log(`  ✓  Applied: ${filename}`);
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(`  ✗  FAILED: ${filename} — ${err.message}`);
      throw err; // Stop on first failure.
    } finally {
      client.release();
    }
  }

  console.log(`\n  ✓  All ${pending.length} migration(s) applied successfully.\n`);
  await pool.end();
}

run().catch((err) => {
  console.error("\nMigration runner aborted:", err.message);
  process.exit(1);
});
