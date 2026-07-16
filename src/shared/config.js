/**
 * Trassit Companion — Shared Configuration
 *
 * Loads environment variables from .env and exposes a frozen
 * config object consumed by every phase module.
 */

require("dotenv").config();

const config = Object.freeze({
  // ── data.gov.in ──────────────────────────────────────────
  dataGov: {
    apiKey: process.env.DATAGOV_API_KEY || "",
    baseUrl: "https://api.data.gov.in/resource",
  },

  // ── datameet.org ─────────────────────────────────────────
  datameet: {
    repoBaseUrl: "https://github.com/datameet",
  },

  // ── Transit.land ─────────────────────────────────────────
  transitLand: {
    apiKey: process.env.TRANSITLAND_API_KEY || "",
    baseUrl: "https://transit.land/api/v2/rest",
  },

  // ── MapMyIndia / Mappls ──────────────────────────────────
  mapMyIndia: {
    clientId: process.env.MAPMYINDIA_CLIENT_ID || "",
    clientSecret: process.env.MAPMYINDIA_CLIENT_SECRET || "",
    tokenUrl: "https://outpost.mapmyindia.com/api/security/oauth/token",
    baseUrl: "https://atlas.mapmyindia.com/api/places",
  },

  // ── IMD Weather ──────────────────────────────────────────
  imd: {
    rssUrl: "https://mausam.imd.gov.in/backend/rss_curr_allcity_english.xml",
  },

  // ── X / Twitter API v2 ──────────────────────────────────
  twitter: {
    bearerToken: process.env.TWITTER_BEARER_TOKEN || "",
    baseUrl: "https://api.twitter.com/2",
    /** Official handles for major State Road Transport Corporations */
    rtcHandles: [
      "ABORCLHQ",       // Assam STC
      "ABORCLHQ",       // placeholder – replace with verified handle
      "aborclhq",       // ASTC
      "ABORCLHQ",
      "ABORCLHQ",
      "KSRTCBus",       // KSRTC (Karnataka)
      "ABORCLHQ",
      "msaborclhq",
      "ABORCLHQ",
      "MSABORCLHQ",
      "KSRTCKERALA",    // KSRTC (Kerala)
      "MSRTCHQ",        // MSRTC (Maharashtra)
      "ABORCLHQ",
      "APSRTCHQ",       // APSRTC (Andhra Pradesh)
      "TSABORCLHQ",     // TSRTC (Telangana)
      "UABORCLHQ",      // UPSRTC (Uttar Pradesh)
    ],
  },

  // ── Chalo ────────────────────────────────────────────────
  chalo: {
    baseUrl: process.env.CHALO_API_BASE_URL || "https://api.chalo.com",
  },

  // ── Mobility Database ────────────────────────────────────
  mobilityDatabase: {
    catalogUrl:
      "https://bit.ly/catalogs-csv", // official GTFS catalog CSV
  },

  // ── Groq LLM Provider ────────────────────────────────────
  groq: {
    apiKey: process.env.GROQ_API_KEY || "",
    baseUrl: "https://api.groq.com/openai/v1",
    modelName: "llama3-8b-8192", // Fast, low-latency model
  },
});

module.exports = config;
