/**
 * GBFS (General Bikeshare Feed Specification) Client (Phase 2)
 * -------------------------------------------------------------
 * Simulates and aggregates real-time micro-mobility (scooters, bikes)
 * availability near a coordinate for multimodal route planning.
 */

/**
 * Returns available scooters/bikes close to a location.
 * @param {number} lat
 * @param {number} lon
 * @param {number} [radiusMeters=500]
 * @returns {Promise<object[]>}
 */
async function fetchNearbyScooters(lat, lon, radiusMeters = 500) {
  // In a production setup, this would query public GBFS feeds (e.g. from Lime, Bird, or Smart City APIs).
  // For Phase 2, we generate simulated active mobility devices near the coordinates.
  const scooters = [];
  const providers = ["Lime", "Bird", "Yulu", "MYBYK"];

  for (let i = 0; i < 3; i++) {
    // Generate slight offset coordinates within radius
    const latOffset = (Math.random() - 0.5) * (radiusMeters / 111000);
    const lonOffset = (Math.random() - 0.5) * (radiusMeters / 111000);
    
    scooters.push({
      id: `scooter-sim-${i}-${Math.round(lat*100)}`,
      provider: providers[Math.floor(Math.random() * providers.length)],
      lat: lat + latOffset,
      lon: lon + lonOffset,
      batteryLevel: Math.floor(Math.random() * 60) + 40, // 40% - 100%
      status: "AVAILABLE",
    });
  }

  return scooters;
}

module.exports = { fetchNearbyScooters };
