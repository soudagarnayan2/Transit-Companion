# Phase-Wise Implementation Plan & MCP AI Agent Integration

This document outlines the engineering plan for **Trassit Companion** and details how the AI Agent leverages Model Context Protocol (MCP) servers for cloud deployment and resource indexing.

---

## 1. AI Agent & MCP Integration
The Trassit Companion development agent utilizes MCP servers to interface with environment registries, deploy testing builds, and monitor telemetry.

*   **CloudRun MCP Server (`cloudrun`):**
    *   Used during deployment phases to push backend docker containers directly to Google Cloud Run.
    *   Tools leveraged: `deploy_local_folder`, `list_services`, `get_service_log` to monitor and audit server logs during execution.
*   **Database & Cache Registry MCP:**
    *   Manages connection bounds and telemetry reporting, fetching health matrices in real-time.

---

## 2. Phase-Wise Engineering Rollout

### Phase 0: Data Sourcing & Ingestion (Sourcing Pipelines)
*   **Objective:** Scrape datasets from IMD, state RTC Twitter feeds, and geo databases.
*   **Status:** Complete.

### Phase 1: Real-time Ingestion Engine (Static & Live RT Feeds)
*   **Sub-Phase 1A:** Database PostGIS Migrations & Redis Healthcheck.
*   **Sub-Phase 1B:** GTFS Static Stream-and-Flush Parser (OOM-resilient).
*   **Sub-Phase 1C:** GTFS-RT Protobuf Poller and Normalizer.
*   **Sub-Phase 1D:** Express REST API server + Pipelined Cache Layer.
*   **Sub-Phase 1E:** Web Map UI Leaflet client with dynamic simulation fallback.
*   **Status:** Complete.

### Phase 2: Multimodal Integration & First/Last Mile Routing
*   **Objective:** Combine walking legs, transit lines, and GBFS e-scooter positions. Use Groq LLM to adapt route segment weights during weather disruptions.
*   **Status:** Backend complete, UI integration in progress.

### Phase 3: Unified Ticketing & Digital Wallet
*   **Objective:** Core balance ledgers, fare deduction, secure cryptographically signed scannable offline tickets, and PII URL leak protection filters.
*   **Status:** Complete.

### Phase 4: Crowdsourcing, AI Predictions & Scaling
*   **Objective:** Allow commuters to submit raw alerts, parse them via Groq Llama-3, run Proof-of-Transit geofence checks, and visualize crowdsourced occupancy.
*   **Status:** Complete.
