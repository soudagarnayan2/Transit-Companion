/**
 * Redis Cache Client (Sub-Phase 1D)
 * ---------------------------------
 * Handles caching of real-time GTFS-RT entities using pipelined writes
 * to minimize round-trip latency and avoid network overhead.
 */

const { redis } = require("../../shared/redis");

/**
 * Caches vehicle positions using pipelining.
 * @param {object[]} vehicles – array of normalized vehicle position objects.
 */
async function saveVehiclePositions(vehicles) {
  if (!vehicles || vehicles.length === 0) return;

  const pipeline = redis.pipeline();

  vehicles.forEach((vp) => {
    const vehicleKey = `vehicle:${vp.vehicleId}`;
    
    // 1. Cache vehicle detail hash
    pipeline.hset(vehicleKey, {
      vehicleId: vp.vehicleId || "",
      tripId: vp.tripId || "",
      routeId: vp.routeId || "",
      latitude: vp.latitude !== null ? vp.latitude.toString() : "",
      longitude: vp.longitude !== null ? vp.longitude.toString() : "",
      bearing: vp.bearing !== null ? vp.bearing.toString() : "",
      speed: vp.speed !== null ? vp.speed.toString() : "",
      stopId: vp.stopId || "",
      timestamp: vp.timestamp ? vp.timestamp.toISOString() : new Date().toISOString(),
    });
    
    // Set details TTL (60 seconds)
    pipeline.expire(vehicleKey, 60);

    // 2. Add vehicle to the route's active vehicle set
    if (vp.routeId) {
      const routeVehiclesKey = `route:${vp.routeId}:vehicles`;
      pipeline.sadd(routeVehiclesKey, vp.vehicleId);
      // Set route set TTL (60 seconds)
      pipeline.expire(routeVehiclesKey, 60);
    }
  });

  try {
    const results = await pipeline.exec();
    // Validate that pipeline executed without errors
    const errors = results.filter(([err]) => err);
    if (errors.length > 0) {
      console.error(`[Redis Cache] ✗ Pipelined vehicle write had ${errors.length} errors.`);
    } else {
      console.log(`[Redis Cache] ✓ Pipelined write for ${vehicles.length} vehicle positions completed.`);
    }
  } catch (err) {
    console.error("[Redis Cache] ✗ Failed to run vehicle pipeline:", err.message);
  }
}

/**
 * Caches trip updates/delays using pipelining.
 * @param {object[]} updates – array of normalized trip update objects.
 */
async function saveTripDelays(updates) {
  if (!updates || updates.length === 0) return;

  const pipeline = redis.pipeline();

  updates.forEach((update) => {
    if (!update.tripId) return;

    // We store the overall trip delay based on the first delay coordinate
    // or aggregate stop time update delays.
    const tripDelayKey = `trip:${update.tripId}:delay`;

    let primaryDelay = 0;
    if (update.delays && update.delays.length > 0) {
      // Find the first valid delay reported (arrival or departure)
      const firstValidUpdate = update.delays.find(
        (stu) => stu.arrivalDelay !== null || stu.departureDelay !== null
      );
      if (firstValidUpdate) {
        primaryDelay = firstValidUpdate.arrivalDelay !== null 
          ? firstValidUpdate.arrivalDelay 
          : firstValidUpdate.departureDelay;
      }
    }

    pipeline.set(tripDelayKey, primaryDelay.toString());
    // TTL of 5 minutes (300 seconds)
    pipeline.expire(tripDelayKey, 300);
  });

  try {
    const results = await pipeline.exec();
    const errors = results.filter(([err]) => err);
    if (errors.length > 0) {
      console.error(`[Redis Cache] ✗ Pipelined delay write had ${errors.length} errors.`);
    } else {
      console.log(`[Redis Cache] ✓ Pipelined write for ${updates.length} trip delays completed.`);
    }
  } catch (err) {
    console.error("[Redis Cache] ✗ Failed to run delay pipeline:", err.message);
  }
}

/**
 * Caches active service alerts using pipelining.
 * @param {object[]} alerts – array of normalized alert objects.
 */
async function saveAlerts(alerts) {
  if (!alerts || alerts.length === 0) return;

  const pipeline = redis.pipeline();

  // Clear existing active alerts first to avoid staleness
  pipeline.del("alerts:active");

  alerts.forEach((alert) => {
    const alertKey = `alert:${alert.id}`;
    pipeline.hset(alertKey, {
      id: alert.id,
      headerText: alert.headerText || "",
      descriptionText: alert.descriptionText || "",
      cause: alert.cause !== undefined ? alert.cause.toString() : "",
      effect: alert.effect !== undefined ? alert.effect.toString() : "",
    });
    // TTL of 1 hour (3600 seconds)
    pipeline.expire(alertKey, 3600);

    // Track active alert ID in global set
    pipeline.sadd("alerts:active", alert.id);
  });

  // Expire active alerts catalog set in 1 hour
  pipeline.expire("alerts:active", 3600);

  try {
    const results = await pipeline.exec();
    const errors = results.filter(([err]) => err);
    if (errors.length > 0) {
      console.error(`[Redis Cache] ✗ Pipelined alert write had ${errors.length} errors.`);
    } else {
      console.log(`[Redis Cache] ✓ Pipelined write for ${alerts.length} active alerts completed.`);
    }
  } catch (err) {
    console.error("[Redis Cache] ✗ Failed to run alert pipeline:", err.message);
  }
}

module.exports = {
  saveVehiclePositions,
  saveTripDelays,
  saveAlerts,
};
