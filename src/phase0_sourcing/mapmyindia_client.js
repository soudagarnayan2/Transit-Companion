/**
 * MapMyIndia (Mappls) API Client
 * ------------------------------
 * Authenticates via OAuth2 client-credentials flow and provides
 * geocoding, reverse-geocoding, and nearby search capabilities
 * using the Mappls Atlas APIs.
 *
 * Docs: https://about.mappls.com/api/
 *
 * Usage:
 *   const mappls = require("./mapmyindia_client");
 *   const token = await mappls.authenticate();
 *   const results = await mappls.geocode("Rajiv Chowk Metro Station");
 */

const axios = require("axios");
const config = require("../shared/config");

const { clientId, clientSecret, tokenUrl, baseUrl } = config.mapMyIndia;

let _cachedToken = null;
let _tokenExpiry = 0;

/**
 * Authenticate with Mappls OAuth2 and cache the access token.
 * @returns {Promise<string>} – Bearer access token.
 */
async function authenticate() {
  if (!clientId || !clientSecret) {
    console.warn("[Mappls] ⚠  MAPMYINDIA credentials not set – running in demo mode.");
    return "DEMO_TOKEN";
  }

  // Return cached token if still valid (with 60-second buffer).
  if (_cachedToken && Date.now() < _tokenExpiry - 60000) {
    return _cachedToken;
  }

  try {
    const { data } = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }, timeout: 10000 }
    );

    _cachedToken = data.access_token;
    _tokenExpiry = Date.now() + data.expires_in * 1000;
    console.log("[Mappls] ✓  Authenticated successfully (token cached).");
    return _cachedToken;
  } catch (err) {
    console.error(`[Mappls] ✗  Authentication failed: ${err.message}`);
    throw err;
  }
}

/**
 * Geocode a text address into coordinates.
 * @param {string} address – e.g. "Rajiv Chowk Metro Station, Delhi"
 * @returns {Promise<object[]>} – array of matching places.
 */
async function geocode(address) {
  const token = await authenticate();
  if (token === "DEMO_TOKEN") {
    return _demoGeocode(address);
  }

  try {
    const { data } = await axios.get(`${baseUrl}/geocode`, {
      params: { address },
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    });

    const results = data.copResults ? [data.copResults] : [];
    console.log(`[Mappls] ✓  Geocoded "${address}" → ${results.length} result(s).`);
    return results;
  } catch (err) {
    console.error(`[Mappls] ✗  Geocode failed: ${err.message}`);
    return [];
  }
}

/**
 * Search for nearby places (transit stops, stations) around a coordinate.
 * @param {number} lat
 * @param {number} lng
 * @param {string} [keywords="bus stop"]
 * @returns {Promise<object[]>}
 */
async function nearbySearch(lat, lng, keywords = "bus stop") {
  const token = await authenticate();
  if (token === "DEMO_TOKEN") {
    return _demoNearby(lat, lng, keywords);
  }

  try {
    const { data } = await axios.get(`${baseUrl}/nearby/json`, {
      params: { keywords, refLocation: `${lat},${lng}` },
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    });

    const places = data.suggestedLocations || [];
    console.log(`[Mappls] ✓  Nearby "${keywords}" at (${lat},${lng}) → ${places.length} result(s).`);
    return places;
  } catch (err) {
    console.error(`[Mappls] ✗  Nearby search failed: ${err.message}`);
    return [];
  }
}

/** Demo fallback. */
function _demoGeocode(address) {
  console.log(`[Mappls] ℹ  Demo geocode for "${address}".`);
  return [{ latitude: 28.6328, longitude: 77.2197, formattedAddress: `[DEMO] ${address}` }];
}

function _demoNearby(lat, lng, keywords) {
  console.log(`[Mappls] ℹ  Demo nearby search for "${keywords}" at (${lat},${lng}).`);
  return [
    { placeName: `[DEMO] Nearby ${keywords}`, distance: "350m", latitude: lat + 0.001, longitude: lng + 0.001 },
  ];
}

module.exports = {
  authenticate,
  geocode,
  nearbySearch,
};
