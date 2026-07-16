/**
 * Open Data Downloader
 * --------------------
 * Fetches datasets from data.gov.in (via REST API) and
 * datameet.org GitHub repositories (GeoJSON / Shapefiles).
 *
 * Usage:
 *   const downloader = require("./open_data_downloader");
 *   await downloader.fetchDataGovCatalog("transit");
 *   await downloader.fetchDatameetGeoJSON("indian_railways");
 */

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("../shared/config");

const DATA_DIR = path.resolve(__dirname, "../../data/open_data");

/** Ensure the local data directory exists. */
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Search and download datasets from data.gov.in.
 * @param {string} query – keyword to search (e.g. "bus routes").
 * @param {number} [limit=5] – max results to return.
 * @returns {Promise<object[]>} – array of dataset metadata objects.
 */
async function fetchDataGovCatalog(query, limit = 5) {
  const { apiKey, baseUrl } = config.dataGov;

  if (!apiKey) {
    console.warn("[OpenData] ⚠  DATAGOV_API_KEY not set – running in demo mode.");
    return _demoDataGov(query);
  }

  try {
    const url = `${baseUrl}?api-key=${apiKey}&format=json&filters[title]=${encodeURIComponent(query)}&limit=${limit}`;
    const { data } = await axios.get(url, { timeout: 15000 });

    const records = data.records || [];
    console.log(`[OpenData] ✓  data.gov.in returned ${records.length} record(s) for "${query}".`);
    return records;
  } catch (err) {
    console.error(`[OpenData] ✗  data.gov.in request failed: ${err.message}`);
    return [];
  }
}

/**
 * Download a GeoJSON file from a datameet GitHub repo.
 * @param {string} repoPath – e.g. "maps/india/india_state.geojson"
 * @returns {Promise<string|null>} – local file path on success.
 */
async function fetchDatameetGeoJSON(repoPath) {
  ensureDataDir();

  const rawUrl = `https://raw.githubusercontent.com/datameet/${repoPath}`;
  const localFile = path.join(DATA_DIR, path.basename(repoPath));

  try {
    const { data } = await axios.get(rawUrl, { timeout: 30000, responseType: "arraybuffer" });
    fs.writeFileSync(localFile, data);
    console.log(`[OpenData] ✓  Saved datameet file → ${localFile}`);
    return localFile;
  } catch (err) {
    console.error(`[OpenData] ✗  datameet download failed (${repoPath}): ${err.message}`);
    return null;
  }
}

/** Demo placeholder when no API key is configured. */
function _demoDataGov(query) {
  console.log(`[OpenData] ℹ  Demo mode: returning sample record for "${query}".`);
  return [
    {
      title: `[DEMO] Sample dataset for "${query}"`,
      source: "data.gov.in",
      format: "CSV",
      updated: new Date().toISOString(),
    },
  ];
}

module.exports = {
  fetchDataGovCatalog,
  fetchDatameetGeoJSON,
};
