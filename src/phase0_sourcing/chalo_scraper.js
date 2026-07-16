/**
 * Chalo Scraper
 * -------------
 * Placeholder client for querying live bus positions
 * and route data from Chalo's APIs.
 *
 * Since Chalo does not expose a documented public API,
 * this module is designed to be filled in once a partnership
 * agreement or reverse-engineering of public endpoints is
 * established.
 *
 * Usage:
 *   const chalo = require("./chalo_scraper");
 *   const buses = await chalo.fetchLiveBuses("mumbai");
 */

const axios = require("axios");
const config = require("../shared/config");

const { baseUrl } = config.chalo;

/**
 * Fetch live bus positions for a city.
 * @param {string} city – e.g. "mumbai", "delhi", "pune".
 * @returns {Promise<object[]>} – array of bus position objects.
 */
async function fetchLiveBuses(city) {
  console.warn("[Chalo] ⚠  No public API documentation available. Returning demo data.");
  // When a real endpoint becomes available, uncomment and configure:
  //
  // try {
  //   const { data } = await axios.get(`${baseUrl}/v1/buses/live`, {
  //     params: { city },
  //     timeout: 10000,
  //   });
  //   return data.buses || [];
  // } catch (err) {
  //   console.error(`[Chalo] ✗  Live bus fetch failed: ${err.message}`);
  //   return [];
  // }

  return _demoBuses(city);
}

/**
 * Fetch available routes for a city.
 * @param {string} city
 * @returns {Promise<object[]>}
 */
async function fetchRoutes(city) {
  console.warn("[Chalo] ⚠  Routes endpoint not yet integrated. Returning demo data.");
  return _demoRoutes(city);
}

/** Demo fallback – live buses. */
function _demoBuses(city) {
  console.log(`[Chalo] ℹ  Demo: 2 sample buses for "${city}".`);
  return [
    {
      busId: "MH-01-BT-1234",
      route: "335A",
      city,
      latitude: 19.076,
      longitude: 72.8777,
      speed: 22,
      occupancy: "MEDIUM",
      lastUpdated: new Date().toISOString(),
    },
    {
      busId: "MH-01-BT-5678",
      route: "101",
      city,
      latitude: 19.082,
      longitude: 72.8812,
      speed: 0,
      occupancy: "HIGH",
      lastUpdated: new Date().toISOString(),
    },
  ];
}

/** Demo fallback – routes. */
function _demoRoutes(city) {
  return [
    { routeId: "335A", routeName: "Andheri Station – Powai", city },
    { routeId: "101", routeName: "CST – Bandra", city },
  ];
}

module.exports = {
  fetchLiveBuses,
  fetchRoutes,
};
