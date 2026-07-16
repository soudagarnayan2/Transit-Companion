/**
 * CLI command runner for GTFS static feed importing.
 *
 * Usage:
 *   node import_cli.js --url https://example.com/gtfs.zip
 */

const { importFeed } = require("./importer");
const { pool } = require("../../shared/db");

// Default sample feed for testing (provided by Blinktag Inc)
const DEFAULT_URL = "https://github.com/blinktaginc/gtfs-test-feeds/raw/master/sample-feed.zip";

function getArg(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
}

async function main() {
  const url = getArg("--url") || DEFAULT_URL;

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║         TRASSIT COMPANION — Static GTFS Importer        ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  console.log(`URL target: ${url}\n`);

  try {
    const feedId = await importFeed(url);
    console.log(`\n  ✓  Successfully finished. Feed ID: ${feedId}\n`);
  } catch (err) {
    console.error(`\n  ✗  Import failed: ${err.message}\n`);
    process.exitCode = 1;
  } finally {
    // End PG connection pool so script exits cleanly
    await pool.end();
  }
}

main();
