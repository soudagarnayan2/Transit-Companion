# Phase Evaluation (eval.md) & Exit Criteria

This document defines the verification matrix, automated test scripts, and transition gate parameters for each deployment phase of the Trassit Companion.

---

## 1. Test Verification Scripts Catalog
We have established automated verification scripts in the workspace to evaluate each layer:

| Script | Location | Evaluates | Run Command |
| :--- | :--- | :--- | :--- |
| **Infrastructure Health** | [healthcheck.js](file:///d:/NAYAN-Nextleap/Trassit_Companion/src/phase1_realtime/subphase_1a_db_setup/healthcheck.js) | PostgreSQL, PostGIS, and Redis connectivity. | `npm run healthcheck` |
| **GTFS-RT Poller** | [rt_run.js](file:///d:/NAYAN-Nextleap/Trassit_Companion/src/phase1_realtime/subphase_1c_live_processor/rt_run.js) | Protobuf decoding and live telemetry mapping. | `npm run phase1:rt` |
| **Ticketing & Wallet** | [test_ticketing.js](file:///d:/NAYAN-Nextleap/Trassit_Companion/src/phase3_ticketing/test_ticketing.js) | Fares, top-ups, offline JWT checks, PII redactions. | `node src/phase3_ticketing/test_ticketing.js` |
| **Crowdsourced NLP** | [test_analytics.js](file:///d:/NAYAN-Nextleap/Trassit_Companion/src/phase4_analytics/test_analytics.js) | Groq fallback parsing, geofenced validations, and cache updates. | `node src/phase4_analytics/test_analytics.js` |

---

## 2. Phase-Wise Exit Criteria & Testing Matrices

### Phase 0 & 1 Exit Criteria
1.  **Schema Integrity:** All 10 SQL migration blocks successfully run. PostGIS extension is loaded.
2.  **Telemetry Flow:** GTFS-RT poller decodes 100+ coordinates per fetch from MBTA binary streams.
3.  **Graceful Degradation:** Redis/PostgreSQL offline state triggers the transparent [redis.js](file:///d:/NAYAN-Nextleap/Trassit_Companion/src/shared/redis.js) in-memory fallback wrapper, returning simulated routes without crashing.

### Phase 2 & 3 Exit Criteria
1.  **Multimodal Consistency:** Combined legs (Walk -> Transit -> Scooter) calculate total duration, applying the weather multiplier (2.5x) when IMD weather alerts trigger.
2.  **Cryptographic Integrity:** Scannable JWS tokens correctly validate offline. Altering a single character in the token results in verification rejection.
3.  **PII Leak Prevention:** Any invalid signature or wallet charge failure returns a generic error containing zero user profile details or URLs.

### Phase 4 Exit Criteria
1.  **NLP Accuracy:** Commuter text (e.g. "Route 335A crowded") maps to the correct `routeId: "335A"` and `occupancy: "HIGH"`.
2.  **Proof of Transit validation:** Coordinates further than 1.5km from the reported route shapes are flagged as `isVerified: false` to prevent spoofing.
