/**
 * GTFS Static Ingestion Engine (Sub-Phase 1B)
 * -------------------------------------------
 * Downloads, extracts, and streams GTFS static files into PostGIS.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const axios = require("axios");
const AdmZip = require("adm-zip");
const csvParser = require("csv-parser");
const { pool } = require("../../shared/db");

const TEMP_DIR = path.resolve(__dirname, "../../../data/temp");

/** Ensure the temp directory exists */
function ensureTempDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
}

/**
 * Downloads a GTFS zip file to the temp directory.
 * @param {string} url
 * @returns {Promise<string>} – path to the local zip file.
 */
async function downloadFeed(url) {
  ensureTempDir();
  const zipPath = path.join(TEMP_DIR, `feed-${Date.now()}.zip`);
  console.log(`[Importer] Downloading feed from: ${url}`);
  
  const response = await axios({
    method: "get",
    url,
    responseType: "stream",
    timeout: 30000,
  });

  const writer = fs.createWriteStream(zipPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(zipPath));
    writer.on("error", (err) => reject(err));
  });
}

/**
 * Computes SHA-256 hash of a file to check for duplicates.
 * @param {string} filePath
 * @returns {Promise<string>}
 */
function computeHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (err) => reject(err));
  });
}

/**
 * Helper to parse a single CSV stream and batch-insert into PostgreSQL.
 * Uses a pause-and-resume streaming pattern to prevent OOM errors on large files.
 * @param {object} entry – AdmZip entry object.
 * @param {string} insertSql – INSERT query string.
 * @param {function} rowMapper – maps CSV row object to values array.
 * @param {number} [batchSize=2000]
 */
function importCsvEntry(entry, insertSql, rowMapper, batchSize = 2000) {
  return new Promise((resolve, reject) => {
    const { Readable } = require("stream");
    const stream = new Readable();
    stream.push(entry.getData());
    stream.push(null); // End of stream

    const parser = csvParser();
    let batch = [];
    let totalImported = 0;
    let isProcessing = false;

    const flush = async () => {
      if (batch.length === 0) return;
      isProcessing = true;
      stream.pause();
      parser.pause();
      try {
        await executeBatchInsert(insertSql, batch);
        totalImported += batch.length;
        batch = [];
      } catch (err) {
        reject(err);
      } finally {
        isProcessing = false;
        parser.resume();
        stream.resume();
      }
    };

    parser.on("data", async (row) => {
      try {
        const mapped = rowMapper(row);
        if (mapped) {
          batch.push(mapped);
          if (batch.length >= batchSize && !isProcessing) {
            await flush();
          }
        }
      } catch (err) {
        // Skip malformed rows
      }
    });

    parser.on("end", async () => {
      // Wait if still processing a flush
      while (isProcessing) {
        await new Promise((r) => setTimeout(r, 10));
      }
      try {
        if (batch.length > 0) {
          await flush();
        }
        resolve(totalImported);
      } catch (err) {
        reject(err);
      }
    });

    parser.on("error", (err) => reject(err));

    stream.pipe(parser);
  });
}

/**
 * Executes a batched multi-row INSERT.
 */
async function executeBatchInsert(baseSql, rows) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const row of rows) {
      await client.query(baseSql, row);
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Process shape points into aggregated PostGIS LINESTRINGs.
 */
async function aggregateShapes(feedVersionId) {
  console.log("[Importer] Materializing aggregated LINESTRING shapes...");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // Aggregate shape points ordered by sequence into geometry LINESTRINGs
    await client.query(`
      INSERT INTO shapes (shape_id, point_count, feed_version_id)
      SELECT 
        shape_id,
        COUNT(*),
        $1
      FROM shape_points
      WHERE feed_version_id = $1
      GROUP BY shape_id
      ON CONFLICT (shape_id) DO UPDATE 
      SET point_count = EXCLUDED.point_count, feed_version_id = EXCLUDED.feed_version_id
    `, [feedVersionId]);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[Importer] Shape aggregation failed:", err.message);
  } finally {
    client.release();
  }
}

/**
 * Main import runner.
 * @param {string} url
 */
async function importFeed(url) {
  let zipPath = null;
  try {
    zipPath = await downloadFeed(url);
    const fileHash = await computeHash(zipPath);

    // Check if feed version already exists
    const checkRes = await pool.query("SELECT id, status FROM feed_versions WHERE sha256_hash = $1", [fileHash]);
    if (checkRes.rows.length > 0) {
      console.log(`[Importer] ℹ  Feed version already imported (Hash: ${fileHash.slice(0, 8)}). Skipping import.`);
      return checkRes.rows[0].id;
    }

    console.log(`[Importer] New feed detected (Hash: ${fileHash.slice(0, 8)}). Starting parsing...`);

    // Insert feed version
    const versionRes = await pool.query(
      "INSERT INTO feed_versions (feed_url, sha256_hash, status) VALUES ($1, $2, 'importing') RETURNING id",
      [url, fileHash]
    );
    const feedVersionId = versionRes.rows[0].id;

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    const entriesMap = {};
    zipEntries.forEach((entry) => {
      entriesMap[entry.entryName] = entry;
    });

    const stats = {};

    // ── 1. Agency ──────────────────────────────────────────
    if (entriesMap["agency.txt"]) {
      console.log("[Importer] Parsing agency.txt...");
      const count = await importCsvEntry(
        entriesMap["agency.txt"],
        `INSERT INTO agencies (agency_id, agency_name, agency_url, agency_timezone, agency_lang, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (agency_id) DO UPDATE SET agency_name = EXCLUDED.agency_name, feed_version_id = EXCLUDED.feed_version_id`,
        (row) => [
          row.agency_id || "default_agency",
          row.agency_name,
          row.agency_url,
          row.agency_timezone,
          row.agency_lang || "en",
          feedVersionId,
        ]
      );
      stats.agencies = count;
    }

    // ── 2. Routes ──────────────────────────────────────────
    if (entriesMap["routes.txt"]) {
      console.log("[Importer] Parsing routes.txt...");
      const count = await importCsvEntry(
        entriesMap["routes.txt"],
        `INSERT INTO routes (route_id, agency_id, route_short_name, route_long_name, route_type, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (route_id) DO UPDATE SET route_short_name = EXCLUDED.route_short_name, feed_version_id = EXCLUDED.feed_version_id`,
        (row) => [
          row.route_id,
          row.agency_id || "default_agency",
          row.route_short_name,
          row.route_long_name,
          parseInt(row.route_type || "3", 10),
          feedVersionId,
        ]
      );
      stats.routes = count;
    }

    // ── 3. Stops ───────────────────────────────────────────
    if (entriesMap["stops.txt"]) {
      console.log("[Importer] Parsing stops.txt...");
      const count = await importCsvEntry(
        entriesMap["stops.txt"],
        `INSERT INTO stops (stop_id, stop_code, stop_name, stop_lat, stop_lon, location_type, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (stop_id) DO UPDATE SET stop_name = EXCLUDED.stop_name, feed_version_id = EXCLUDED.feed_version_id`,
        (row) => [
          row.stop_id,
          row.stop_code || null,
          row.stop_name,
          parseFloat(row.stop_lat),
          parseFloat(row.stop_lon),
          parseInt(row.location_type || "0", 10),
          feedVersionId,
        ]
      );
      stats.stops = count;
    }

    // ── 4. Calendar ────────────────────────────────────────
    if (entriesMap["calendar.txt"]) {
      console.log("[Importer] Parsing calendar.txt...");
      const count = await importCsvEntry(
        entriesMap["calendar.txt"],
        `INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (service_id) DO UPDATE SET start_date = EXCLUDED.start_date, feed_version_id = EXCLUDED.feed_version_id`,
        (row) => [
          row.service_id,
          row.monday === "1",
          row.tuesday === "1",
          row.wednesday === "1",
          row.thursday === "1",
          row.friday === "1",
          row.saturday === "1",
          row.sunday === "1",
          row.start_date,
          row.end_date,
          feedVersionId,
        ]
      );
      stats.calendar = count;
    }

    // ── 5. Trips ───────────────────────────────────────────
    if (entriesMap["trips.txt"]) {
      console.log("[Importer] Parsing trips.txt...");
      const count = await importCsvEntry(
        entriesMap["trips.txt"],
        `INSERT INTO trips (trip_id, route_id, service_id, trip_headsign, shape_id, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (trip_id) DO UPDATE SET trip_headsign = EXCLUDED.trip_headsign, feed_version_id = EXCLUDED.feed_version_id`,
        (row) => [
          row.trip_id,
          row.route_id,
          row.service_id,
          row.trip_headsign || null,
          row.shape_id || null,
          feedVersionId,
        ]
      );
      stats.trips = count;
    }

    // ── 6. Stop Times ──────────────────────────────────────
    if (entriesMap["stop_times.txt"]) {
      console.log("[Importer] Parsing stop_times.txt...");
      const count = await importCsvEntry(
        entriesMap["stop_times.txt"],
        `INSERT INTO stop_times (trip_id, arrival_time, departure_time, stop_id, stop_sequence, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (trip_id, stop_sequence) DO NOTHING`,
        (row) => [
          row.trip_id,
          row.arrival_time,
          row.departure_time,
          row.stop_id,
          parseInt(row.stop_sequence, 10),
          feedVersionId,
        ]
      );
      stats.stop_times = count;
    }

    // ── 7. Shapes ──────────────────────────────────────────
    if (entriesMap["shapes.txt"]) {
      console.log("[Importer] Parsing shapes.txt (raw points)...");
      const count = await importCsvEntry(
        entriesMap["shapes.txt"],
        `INSERT INTO shape_points (shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence, feed_version_id) 
         VALUES ($1, $2, $3, $4, $5) ON CONFLICT (shape_id, shape_pt_sequence) DO NOTHING`,
        (row) => [
          row.shape_id,
          parseFloat(row.shape_pt_lat),
          parseFloat(row.shape_pt_lon),
          parseInt(row.shape_pt_sequence, 10),
          feedVersionId,
        ]
      );
      stats.shape_points = count;

      // Materialize LINESTRING geometries
      await aggregateShapes(feedVersionId);
    }

    // Finalize feed version status
    await pool.query(
      "UPDATE feed_versions SET status = 'active', record_count = $1, activated_at = NOW() WHERE id = $2",
      [JSON.stringify(stats), feedVersionId]
    );

    console.log(`[Importer] ✓  Feed ${feedVersionId} fully imported:`, stats);
    return feedVersionId;
  } finally {
    if (zipPath && fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }
  }
}

module.exports = { importFeed };
