# Architectural & Technology Decisions (decision.md)

This document catalogs key technological, architectural, and business decisions made during the development of Trassit Companion.

---

## 1. Architectural Decisions

### ADR 01: Transparent In-Memory Fallback Wrappers (Self-Healing Cache)
*   **Context:** Commuters and developers often run apps in environments where Redis or PostgreSQL instances are temporarily unavailable or credentials fail.
*   **Decision:** Build a custom transparent fallback wrapper directly inside [redis.js](file:///d:/NAYAN-Nextleap/Trassit_Companion/src/shared/redis.js) and the wallet services.
*   **Consequences:** If database connection drops, the app intercepts the call and falls back to a thread-safe, local Map storage. The API server continues running and verifying flows without throwing 500 errors.

### ADR 02: Offline scannable JWS / HMAC Fares
*   **Context:** Passengers boarding subways or buses in India often experience network dead-zones, preventing standard API-based ticket validations.
*   **Decision:** Generate time-bound tokens signed with an HMAC-SHA256 signature containing compact user/route info.
*   **Consequences:** Gate validators can confirm ticket integrity completely offline simply by parsing the token and validating the HMAC signature with the shared gate secret.

---

## 2. Technology Choices

### ADR 03: Groq Cloud API for Real-Time NLP
*   **Context:** State RTC handles post service updates as raw tweets, and users write unstructured text reports. These must be structured with sub-second latencies to maintain real-time validity.
*   **Decision:** Use **Groq Cloud API** with Llama-3.
*   **Consequences:** Achieves sub-300ms inference speeds for structured JSON extraction. We also implemented a local regex/keyword parser fallback to handle API key configuration omissions gracefully.

### ADR 04: Streaming Chunk-and-Flush Parser for GTFS
*   **Context:** timetables (like `stop_times.txt`) grow to millions of rows, causing OOM errors in Node.js on standard arrays.
*   **Decision:** Pipe zip file readstreams directly to `csv-parser`, pausing the stream every 2000 rows to flush transaction batches to PostgreSQL before resuming.
*   **Consequences:** Flat line-by-line memory usage regardless of GTFS file size.
