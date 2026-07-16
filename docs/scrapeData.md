# Data Scraping & Integration Strategy: Trassit Companion

This document details the data acquisition, scraping, and integration strategies for **Trassit Companion** using various national, international, and state-level data sources.

---

## 1. Primary Data Sources & Acquisition Strategy

The following sources provide the geographical, schedule, real-time, and external contextual data required to run the transit platform:

### A. Government & Open Data Portals
*   **[data.gov.in](https://data.gov.in)**
    *   **Data Provided:** National census, geographic boundaries, metro/rail shapefiles, and historical government transit statistics.
    *   **Acquisition Method:** Official APIs (using API keys) and bulk dataset downloads.
    *   **Format:** JSON, CSV, and XML.
*   **[datameet.org](http://datameet.org)**
    *   **Data Provided:** Community-sourced spatial data, including Indian railway maps, city metro shapes, ward boundaries, and open GIS data.
    *   **Acquisition Method:** Downloadable GitHub repositories and shapefiles/GeoJSON files.
    *   **Format:** GeoJSON, Shapefiles (.shp).
*   **Ministry of Housing & Urban Affairs (MoHUA)**
    *   **Data Provided:** Urban transit development plans, Metro rail statistics, and smart city open data portals (IUDX - Indian Urban Data Exchange).
    *   **Acquisition Method:** Accessing IUDX open API portals.
    *   **Format:** REST APIs returning JSON/JSON-LD.

### B. Global Transit Databases (GTFS & Mapping)
*   **[mobilitydatabase.org](https://mobilitydatabase.org)**
    *   **Data Provided:** Global directory of GTFS (General Transit Feed Specification) and GTFS-RT feeds for public transit authorities.
    *   **Acquisition Method:** API integration to fetch download URLs for active transit feeds in India (e.g., Delhi Metro, Bangalore BMTC if available).
    *   **Format:** GTFS zip files (static schedules).
*   **[transit.land](https://www.transit.land)**
    *   **Data Provided:** Global transit registry aggregating feeds.
    *   **Acquisition Method:** Transit.land v2 REST API using an API key. 
    *   **Format:** GeoJSON and GTFS format.

### C. Commercial Transit & Mapping APIs
*   **[chalo.com](https://chalo.com)**
    *   **Data Provided:** Live bus tracking and ticketing systems across various Indian cities.
    *   **Acquisition Method:** Reverse-engineering or partnering to access private mobile API endpoints (where public integration is possible) or consuming state-partnered public endpoints.
    *   **Format:** JSON (lat/lon, speed, ETA, occupancy).
*   **Google Maps Transit Layer**
    *   **Data Provided:** Reference data for routing comparison and station location validation.
    *   **Acquisition Method:** Google Maps Directions and Transit APIs (commercial/paid license). Note: Scraping raw tiles from the transit layer is prohibited by Google's Terms of Service; official API endpoints must be utilized.
    *   **Format:** JSON.
*   **[apis.mapmyindia.com](https://apis.mapmyindia.com) (Mappls)**
    *   **Data Provided:** Highly detailed local Indian road networks, house-level routing, and regional transit stops.
    *   **Acquisition Method:** Mappls REST APIs (Routing API, Search API, Geocoding API).
    *   **Format:** REST APIs returning JSON.

### D. Weather & Service Disruptions
*   **India Meteorological Department (IMD) — [mausam.imd.gov.in](https://mausam.imd.gov.in)**
    *   **Data Provided:** Real-time weather warnings, heavy rain alerts, and cyclonic/monsoon updates that affect urban commuting.
    *   **Acquisition Method:** IMD public weather alerts and regional RSS/XML feeds.
    *   **Format:** XML, RSS feeds, or JSON API wrappers.
*   **State Road Transport Corporations (KSRTC, MSRTC, APSRTC, TSRTC, UPSRTC, etc.)**
    *   **Data Provided:** Route cancellations, highway blocks, strike announcements, and service updates.
    *   **Acquisition Method (Crucial):** **X/Twitter Public API**. Because these corporations publish disruptions primarily on their official X handles, a dedicated listener service must query the X API (`/2/tweets/search/recent`) for specific handler IDs (e.g., `@KSRTC_Journeys`, `@MSRTC_HQ`) rather than performing fragile HTML scraping of web pages.
    *   **Format:** JSON (tweet text parsed using regex and NLP to extract route numbers and disruption keywords).

---

## 2. Ingestion & Scraping Architecture

```
+------------------------------------------------------------------------+
|                            Ingestion Layer                             |
+------------------------------------------------------------------------+
       |                               |                        |
[GTFS/GTFS-RT Feeds]         [REST APIs & Webhooks]      [X/Twitter API Listener]
(mobilitydatabase,           (MapMyIndia, data.gov.in,     (RTC Disruption Alerts)
 transit.land)                Chalo, IMD, MoHUA)                |
       |                               |                        |
       v                               v                        v
+------------------------------------------------------------------------+
|                          Data Parsing & NLP                            |
|       - Extract routes, stations, coordinates                          |
|       - NLP extraction of Twitter text (e.g., "Route 335A cancelled")   |
+------------------------------------------------------------------------+
                                       |
                                       v
+------------------------------------------------------------------------+
|                         Storage & Cache Tier                           |
|       - Redis: Live Vehicle Positions & ETA Updates                    |
|       - PostGIS: Static Geometries & Route Patches                     |
+------------------------------------------------------------------------+
```

---

## 3. Compliance, Rate Limiting & Robustness Guidelines

1.  **Respect Robots.txt & API Terms:** Always inspect `robots.txt` if any supplementary HTML scraping is conducted. For Google Maps and commercial APIs, strictly adhere to official SDK usage.
2.  **No HTML Scraping for X/Twitter:** To prevent IP blocks and guarantee data structure consistency, **never** attempt to scrape raw Twitter HTML pages. Connect using the official X API with proper OAuth credentials.
3.  **Caching Middleware:** Implement aggressive caching using Redis. Static data (like metro stations or census maps) should be cached for 24+ hours, while real-time data should have a time-to-live (TTL) of 15–30 seconds.
4.  **Graceful Fallbacks:** If a live source (like Chalo or MapMyIndia) goes offline, the routing engine must fall back to static GTFS schedules and display a warning banner to the commuter ("Real-time updates currently unavailable").
