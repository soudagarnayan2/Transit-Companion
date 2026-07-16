/**
 * GTFS Real-Time Ingestion Processor (Sub-Phase 1C)
 * -------------------------------------------------
 * Periodically polls a GTFS-RT Protocol Buffer (protobuf) feed,
 * decodes entities using gtfs-realtime-bindings, and normalizes them.
 */

const axios = require("axios");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

/**
 * Polls and parses a GTFS-RT endpoint.
 * @param {string} url – HTTP url to the binary protobuf feed.
 * @returns {Promise<object[]>} – normalized real-time updates.
 */
async function pollRealtimeFeed(url) {
  console.log(`[RT Poller] Fetching GTFS-RT feed from: ${url}`);
  
  try {
    const response = await axios({
      method: "get",
      url,
      responseType: "arraybuffer",
      timeout: 10000,
      headers: {
        "Accept": "application/x-protobuf, application/octet-stream",
        "User-Agent": "TrassitCompanion/0.2"
      }
    });

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    );

    const normalizedEntities = [];

    feed.entity.forEach((entity) => {
      // ── A. Vehicle Positions ──────────────────────────────
      if (entity.vehicle) {
        const vp = entity.vehicle;
        normalizedEntities.push({
          type: "VEHICLE",
          id: entity.id,
          vehicleId: vp.vehicle ? vp.vehicle.id : null,
          tripId: vp.trip ? vp.trip.tripId : null,
          routeId: vp.trip ? vp.trip.routeId : null,
          latitude: vp.position ? vp.position.latitude : null,
          longitude: vp.position ? vp.position.longitude : null,
          bearing: vp.position ? vp.position.bearing : null,
          speed: vp.position ? vp.position.speed : null,
          stopId: vp.stopId || null,
          timestamp: vp.timestamp ? new Date(vp.timestamp.low * 1000) : new Date(),
        });
      }

      // ── B. Trip Updates ──────────────────────────────────
      if (entity.tripUpdate) {
        const tu = entity.tripUpdate;
        const delays = [];
        if (tu.stopTimeUpdate) {
          tu.stopTimeUpdate.forEach((stu) => {
            delays.push({
              stopId: stu.stopId,
              stopSequence: stu.stopSequence,
              arrivalDelay: stu.arrival && stu.arrival.delay !== undefined ? stu.arrival.delay : null,
              departureDelay: stu.departure && stu.departure.delay !== undefined ? stu.departure.delay : null,
            });
          });
        }

        normalizedEntities.push({
          type: "TRIP_UPDATE",
          id: entity.id,
          tripId: tu.trip.tripId,
          routeId: tu.trip.routeId,
          timestamp: tu.timestamp ? new Date(tu.timestamp.low * 1000) : new Date(),
          delays,
        });
      }

      // ── C. Alerts ────────────────────────────────────────
      if (entity.alert) {
        const alert = entity.alert;
        normalizedEntities.push({
          type: "ALERT",
          id: entity.id,
          headerText: alert.headerText && alert.headerText.translation ? alert.headerText.translation[0].text : "",
          descriptionText: alert.descriptionText && alert.descriptionText.translation ? alert.descriptionText.translation[0].text : "",
          cause: alert.cause,
          effect: alert.effect,
        });
      }
    });

    console.log(`[RT Poller] ✓ Decoded ${normalizedEntities.length} entities from GTFS-RT feed.`);
    return normalizedEntities;
  } catch (err) {
    console.error(`[RT Poller] ✗ Failed to decode protobuf feed: ${err.message}`);
    return [];
  }
}

module.exports = { pollRealtimeFeed };
