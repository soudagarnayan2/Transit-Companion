# Edge Cases and Fallbacks by Phase: Trassit Companion

This document catalogs critical edge cases, failure modes, and mitigation strategies for each of the four implementation phases defined in the [Architecture.md](file:///d:/NAYAN-Nextleap/Trassit_Companion/docs/Architecture.md).

---

## Phase 1: Foundation & Real-Time Transit Data Aggregation

### 1.1 Out-of-Sync Timestamps & Clock Skew
*   **The Problem:** GPS transponders on buses or trains may send telemetry with incorrect internal timestamps (clock skew) or delayed transmission, making the vehicle appear ahead or behind its actual location.
*   **Mitigation:** 
    *   Compare the GTFS-RT message timestamp with the ingestion server's system time. If the difference is >5 minutes, discard or flag the data as stale.
    *   Use relative "Time Since Last Update" (e.g., "Updated 3 mins ago") in the UI instead of showing absolute, potentially misleading schedules.

### 1.2 "Ghost Buses" and Signal Loss (Urban Canyons & Tunnels)
*   **The Problem:** GPS signals fade in tunnels, subways, or high-rise urban areas. The bus stops transmitting updates, causing it to disappear from the map or freeze.
*   **Mitigation:**
    *   **Dead Reckoning:** Project the vehicle's position along its mapped route shape using its last known speed if no update is received for <2 minutes.
    *   **Stale Data Fade:** If signal is lost for >3 minutes, change the map icon color/opacity to indicate "Uncertain Location" and fall back to scheduled times.

### 1.3 Mismatched IDs between Static GTFS and Live GTFS-RT
*   **The Problem:** Transit operators publish new static GTFS tables weekly, but update live GTFS-RT vehicle IDs asynchronously. This results in live data referencing `trip_id`s that do not exist in the active static database.
*   **Mitigation:**
    *   Maintain the previous two static GTFS versions in the PostGIS database.
    *   Implement an ID mapper fallback: if a `trip_id` is missing in the new database, check the previous schema before discarding the real-time position.

---

## Phase 2: Multimodal Integration & First/Last Mile Routing

### 2.1 "Phantom" Micro-Mobility Vehicles
*   **The Problem:** A commuter is routed to pick up a shared e-scooter or bicycle, but upon arrival, the vehicle is physically damaged, locked in private property, or already reserved by someone else.
*   **Mitigation:**
    *   Display "Last Seen" or "Battery Level" statuses on the UI.
    *   If a scooter hasn't moved or reported battery change in 12 hours, lower its selection probability in the routing algorithm.
    *   Provide a quick "Find Alternative" button on the active navigation screen.

### 2.2 Unrealistic Transfer Times & Pedestrian Barriers
*   **The Problem:** The routing engine assumes a flat, unobstructed walk for transfers, but the passenger encounters physical barriers (e.g., broken escalators, non-wheelchair-accessible stairs, or multi-lane highways without crossings).
*   **Mitigation:**
    *   Implement user-selectable mobility profiles (Standard, Fast, Accessible/Wheelchair).
    *   Incorporate open-source elevator/escalator status feeds from metro operators.
    *   Apply transfer buffer penalties (+3 to 5 minutes) when connecting across different modes.

### 2.3 Extreme Weather Disruption
*   **The Problem:** A multimodal route includes a 15-minute e-scooter ride, but sudden monsoons make micro-mobility unsafe.
*   **Mitigation:**
    *   Integrate the India Meteorological Department (IMD) real-time weather warnings from [mausam.imd.gov.in](https://mausam.imd.gov.in).
    *   When precipitation thresholds are exceeded, automatically disable outdoor micro-mobility routing options and default strictly to covered or enclosed transit modes.

---

## Phase 3: Unified Ticketing & Digital Wallet Integration

### 3.1 Offline Ticket Validation (Underground Stations)
*   **The Problem:** Commuters boarding underground subway stations or buses in cellular dead zones cannot access the internet to load their QR code tickets or validate transactions.
*   **Mitigation:**
    *   **Cryptographic Offline Tokens:** Store purchased tickets as locally encrypted, time-bound JSON Web Signatures (JWS) on the mobile client.
    *   Use TOTP-like (Time-Based One-Time Password) rolling QR codes that can be scanned by the gate's reader without requiring an active network connection on the phone.

### 3.2 Double-Spending & Network Disruption During Payment
*   **The Problem:** A user taps "Buy Ticket" just as their mobile connection drops, causing the payment gateway to charge their credit card but the app to fail to receive the confirmation, tempting the user to tap buy again.
*   **Mitigation:**
    *   Implement strict **Idempotency Keys** generated on the client side for every transaction.
    *   If a transaction hangs, the backend rejects duplicate requests with the same key and returns the state of the initial transaction once connection is re-established.

### 3.3 Multi-Fare Zone Boundary Edge Cases
*   **The Problem:** A commuter taps in at Zone A and taps out at Zone C, but forgets to tap out at intermediate checkpoints, or crosses zone boundaries where pricing rules are complex and dynamic.
*   **Mitigation:**
    *   Use background geofencing to detect if the user has left the transit zone, prompting them via push notifications: "Did you forget to tap out?"
    *   Configure maximum fare defaults for incomplete trips to prevent system exploitation while allowing fair dispute requests.

---

## Phase 4: Crowdsourcing, AI Predictions & Scaling

### 4.1 Crowdsourcing Spam and Coordinates Spoofing
*   **The Problem:** Users report fake delays, overcrowded vehicles, or spoof their location using mock GPS apps to alter transit ratings or reports.
*   **Mitigation:**
    *   **Proof of Transit:** Only accept crowd reports from users whose active geolocations match the speed and path of the vehicle they are reporting on.
    *   Implement a user trust score system. Frequent, validated reports raise the score, while outlier reports from low-trust users require validation from multiple other users before displaying to the public.

### 4.2 AI Delay Prediction Cold Start
*   **The Problem:** A new transit line is opened, meaning the AI models have zero historical data to predict delay offsets.
*   **Mitigation:**
    *   Apply heuristic rules derived from similar lines in the same network (e.g., borrowing metrics from an equivalent-length bus route).
    *   Run in "heuristic mode" until 30 days of data are gathered, then seamlessly transition to the machine learning prediction model.
