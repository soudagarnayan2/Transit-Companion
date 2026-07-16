/**
 * IMD Weather Scraper
 * -------------------
 * Fetches and parses the India Meteorological Department (IMD)
 * RSS feed from mausam.imd.gov.in to extract active weather
 * advisories that may impact urban transit operations.
 *
 * Usage:
 *   const imd = require("./imd_scraper");
 *   const alerts = await imd.fetchWeatherAlerts();
 *   const filtered = imd.filterTransitImpactAlerts(alerts);
 */

const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const config = require("../shared/config");

/** Weather keywords that typically impact transit. */
const TRANSIT_IMPACT_KEYWORDS = [
  "heavy rain",
  "very heavy rain",
  "extremely heavy rain",
  "thunderstorm",
  "cyclone",
  "flood",
  "waterlogging",
  "fog",
  "dense fog",
  "heatwave",
  "landslide",
  "storm surge",
];

/**
 * Fetch and parse the IMD RSS feed.
 * @returns {Promise<object[]>} – array of alert objects
 *   { title, description, pubDate, link }
 */
async function fetchWeatherAlerts() {
  const { rssUrl } = config.imd;

  try {
    const { data: xml } = await axios.get(rssUrl, {
      timeout: 15000,
      headers: { "User-Agent": "TrassitCompanion/0.1" },
    });

    const parsed = await parseStringPromise(xml, { explicitArray: false });
    const channel = parsed?.rss?.channel;

    if (!channel || !channel.item) {
      console.warn("[IMD] ⚠  RSS feed returned no items.");
      return [];
    }

    // Normalize to array (single-item feeds come as an object).
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];

    const alerts = items.map((item) => ({
      title: item.title || "",
      description: item.description || "",
      pubDate: item.pubDate || "",
      link: item.link || "",
    }));

    console.log(`[IMD] ✓  Fetched ${alerts.length} weather alert(s) from IMD RSS.`);
    return alerts;
  } catch (err) {
    // IMD's servers occasionally time out – log and gracefully degrade.
    console.error(`[IMD] ✗  RSS fetch failed: ${err.message}`);
    return _demoAlerts();
  }
}

/**
 * Filter alerts to only those likely to disrupt transit.
 * @param {object[]} alerts – output from fetchWeatherAlerts().
 * @returns {object[]}
 */
function filterTransitImpactAlerts(alerts) {
  const impactful = alerts.filter((alert) => {
    const text = `${alert.title} ${alert.description}`.toLowerCase();
    return TRANSIT_IMPACT_KEYWORDS.some((kw) => text.includes(kw));
  });
  console.log(`[IMD] ℹ  ${impactful.length} of ${alerts.length} alert(s) are transit-impacting.`);
  return impactful;
}

/** Demo fallback when RSS is unreachable. */
function _demoAlerts() {
  console.log("[IMD] ℹ  Demo mode: returning sample alert.");
  return [
    {
      title: "[DEMO] Heavy Rainfall Warning – Mumbai",
      description: "Very heavy rain expected in Mumbai and Thane districts over the next 24 hours.",
      pubDate: new Date().toISOString(),
      link: "https://mausam.imd.gov.in",
    },
  ];
}

module.exports = {
  fetchWeatherAlerts,
  filterTransitImpactAlerts,
};
