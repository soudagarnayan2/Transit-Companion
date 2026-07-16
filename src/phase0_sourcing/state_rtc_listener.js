/**
 * State RTC Twitter / X Listener
 * --------------------------------
 * Queries the X (formerly Twitter) API v2 for recent tweets
 * from official State Road Transport Corporation handles and
 * extracts service disruption information using keyword matching.
 *
 * NOTE: This module uses the official X API — NO HTML scraping.
 *
 * Usage:
 *   const rtc = require("./state_rtc_listener");
 *   const disruptions = await rtc.fetchRecentDisruptions();
 */

const axios = require("axios");
const config = require("../shared/config");

const { bearerToken, baseUrl, rtcHandles } = config.twitter;

/** Keywords that signal a service disruption or delay. */
const DISRUPTION_KEYWORDS = [
  "cancel",
  "cancelled",
  "delay",
  "delayed",
  "suspend",
  "suspended",
  "divert",
  "diverted",
  "breakdown",
  "strike",
  "bandh",
  "flood",
  "waterlog",
  "accident",
  "block",
  "disruption",
  "road block",
  "not operational",
  "out of service",
];

/**
 * Fetch recent tweets from a single RTC handle.
 * @param {string} handle – Twitter username without "@".
 * @param {number} [maxResults=10]
 * @returns {Promise<object[]>}
 */
async function _fetchTweets(handle, maxResults = 10) {
  const query = `from:${handle}`;
  try {
    const { data } = await axios.get(`${baseUrl}/tweets/search/recent`, {
      params: {
        query,
        max_results: maxResults,
        "tweet.fields": "created_at,text,author_id",
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
      timeout: 15000,
    });

    return data.data || [];
  } catch (err) {
    // 429 = rate limited; log and move on.
    if (err.response && err.response.status === 429) {
      console.warn(`[Twitter] ⚠  Rate limited while fetching @${handle}. Skipping.`);
    } else {
      console.error(`[Twitter] ✗  Failed to fetch @${handle}: ${err.message}`);
    }
    return [];
  }
}

/**
 * Scan tweet text for disruption-related keywords.
 * @param {string} text
 * @returns {string[]} – matched keywords.
 */
function _extractDisruptionKeywords(text) {
  const lower = text.toLowerCase();
  return DISRUPTION_KEYWORDS.filter((kw) => lower.includes(kw));
}

/**
 * Fetch recent disruption-related tweets from all configured
 * State RTC handles.
 * @returns {Promise<object[]>} – array of disruption objects
 *   { handle, tweetText, keywords, createdAt }
 */
async function fetchRecentDisruptions() {
  if (!bearerToken) {
    console.warn("[Twitter] ⚠  TWITTER_BEARER_TOKEN not set – returning demo disruptions.");
    return _demoDisruptions();
  }

  // De-duplicate handles (config may contain duplicates / placeholders).
  const uniqueHandles = [...new Set(rtcHandles.map((h) => h.toLowerCase()))];
  console.log(`[Twitter] ℹ  Polling ${uniqueHandles.length} unique RTC handle(s)…`);

  const allDisruptions = [];

  for (const handle of uniqueHandles) {
    const tweets = await _fetchTweets(handle, 15);

    for (const tweet of tweets) {
      const keywords = _extractDisruptionKeywords(tweet.text);
      if (keywords.length > 0) {
        allDisruptions.push({
          handle,
          tweetText: tweet.text,
          keywords,
          createdAt: tweet.created_at,
        });
      }
    }
  }

  console.log(`[Twitter] ✓  Found ${allDisruptions.length} disruption tweet(s) across all handles.`);
  return allDisruptions;
}

/** Demo fallback. */
function _demoDisruptions() {
  console.log("[Twitter] ℹ  Demo mode: returning sample disruption tweets.");
  return [
    {
      handle: "MSRTCHQ",
      tweetText: "[DEMO] Due to heavy rainfall, Pune-Mumbai Expressway services are temporarily suspended. Passengers are advised to check updates.",
      keywords: ["suspended"],
      createdAt: new Date().toISOString(),
    },
    {
      handle: "KSRTCBus",
      tweetText: "[DEMO] Route 335A Bengaluru–Mysuru cancelled today due to road block near Ramanagara.",
      keywords: ["cancelled", "road block"],
      createdAt: new Date().toISOString(),
    },
  ];
}

module.exports = {
  fetchRecentDisruptions,
};
