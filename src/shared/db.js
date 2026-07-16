/**
 * Shared PostgreSQL Connection Pool
 * ----------------------------------
 * Creates and exports a singleton pg.Pool configured from
 * environment variables. Used by migration scripts and all
 * Phase 1+ services.
 */

const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
      max: parseInt(process.env.PG_POOL_MAX || "10", 10),
      ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: false },
    })
  : new Pool({
      host: process.env.PGHOST || "localhost",
      port: parseInt(process.env.PGPORT || "5432", 10),
      user: process.env.PGUSER || "trassit",
      password: process.env.PGPASSWORD || "trassit_dev",
      database: process.env.PGDATABASE || "trassit_db",
      max: parseInt(process.env.PG_POOL_MAX || "10", 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

pool.on("error", (err) => {
  console.error("[DB] Unexpected pool error:", err.message);
});

/**
 * Execute a parameterized query.
 * @param {string} text – SQL statement with $1, $2, … placeholders.
 * @param {any[]}  [params] – parameter values.
 * @returns {Promise<import("pg").QueryResult>}
 */
async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  if (duration > 500) {
    console.warn(`[DB] Slow query (${duration}ms): ${text.slice(0, 80)}…`);
  }
  return result;
}

/**
 * Check database connectivity and PostGIS availability.
 * @returns {Promise<{connected: boolean, postgis: string|null}>}
 */
async function healthCheck() {
  try {
    const pgRes = await pool.query("SELECT 1 AS ok");
    let postgisVersion = null;
    try {
      const gisRes = await pool.query("SELECT PostGIS_Version() AS version");
      postgisVersion = gisRes.rows[0].version;
    } catch {
      // PostGIS extension may not be installed yet — that's ok pre-migration.
    }
    return { connected: pgRes.rows[0].ok === 1, postgis: postgisVersion };
  } catch (err) {
    return { connected: false, postgis: null, error: err.message };
  }
}

module.exports = { pool, query, healthCheck };
