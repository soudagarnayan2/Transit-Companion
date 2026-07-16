/**
 * Transit.land API Client
 * -----------------------
 * Queries the Transit.land v2 REST API to look up transit
 * operators, routes, and GTFS feed URLs within India.
 *
 * Docs: https://www.transit.land/documentation
 *
 * Usage:
 *   const tl = require("./transit_land_client");
 *   const operators = await tl.searchOperators("India");
 *   const feeds = await tl.getFeeds("o-tdr-delhitransportcorporation");
 */

const axios = require("axios");
const config = require("../shared/config");

const { apiKey, baseUrl } = config.transitLand;

/** Build Axios instance with default headers. */
function _client() {
  const headers = {};
  if (apiKey) {
    headers["apikey"] = apiKey;
  }
  return axios.create({ baseURL: baseUrl, headers, timeout: 20000 });
}

/**
 * Search for transit operators by name or country.
 * @param {string} query – e.g. "India", "Delhi Metro".
 * @param {number} [limit=10]
 * @returns {Promise<object[]>}
 */
async function searchOperators(query, limit = 10) {
  if (!apiKey) {
    console.warn("[TransitLand] ⚠  TRANSITLAND_API_KEY not set – returning demo data.");
    return _demoOperators(query);
  }

  try {
    const { data } = await _client().get("/operators", {
      params: { search: query, limit },
    });
    const operators = data.operators || [];
    console.log(`[TransitLand] ✓  Found ${operators.length} operator(s) for "${query}".`);
    return operators;
  } catch (err) {
    console.error(`[TransitLand] ✗  Operator search failed: ${err.message}`);
    return [];
  }
}

/**
 * Retrieve GTFS feeds for a given operator onestop_id.
 * @param {string} onestopId – e.g. "o-tdr-delhitransportcorporation"
 * @returns {Promise<object[]>}
 */
async function getFeeds(onestopId) {
  if (!apiKey) {
    console.warn("[TransitLand] ⚠  TRANSITLAND_API_KEY not set – returning demo feed.");
    return _demoFeeds(onestopId);
  }

  try {
    const { data } = await _client().get("/feeds", {
      params: { operator_onestop_id: onestopId },
    });
    const feeds = data.feeds || [];
    console.log(`[TransitLand] ✓  Found ${feeds.length} feed(s) for operator "${onestopId}".`);
    return feeds;
  } catch (err) {
    console.error(`[TransitLand] ✗  Feed lookup failed: ${err.message}`);
    return [];
  }
}

/** Demo fallback. */
function _demoOperators(query) {
  console.log(`[TransitLand] ℹ  Demo: sample operator for "${query}".`);
  return [
    {
      onestop_id: "o-demo-operator",
      name: `[DEMO] Transit Operator – ${query}`,
      country: "IN",
    },
  ];
}

function _demoFeeds(onestopId) {
  return [
    {
      onestop_id: `f-demo-feed-${onestopId}`,
      url: "https://example.com/gtfs.zip",
      spec: "GTFS",
    },
  ];
}

module.exports = {
  searchOperators,
  getFeeds,
};
