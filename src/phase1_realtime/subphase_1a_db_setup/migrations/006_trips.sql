-- ============================================================
-- Migration 006: Trips Table
-- ============================================================
-- Maps to GTFS trips.txt
-- Links routes → service calendars → shapes.
-- ============================================================

CREATE TABLE IF NOT EXISTS trips (
    trip_id         VARCHAR(255) PRIMARY KEY,
    route_id        VARCHAR(255) NOT NULL REFERENCES routes(route_id) ON DELETE CASCADE,
    service_id      VARCHAR(255) NOT NULL,
    trip_headsign   VARCHAR(512),
    trip_short_name VARCHAR(128),
    direction_id    SMALLINT,            -- 0=outbound, 1=inbound
    block_id        VARCHAR(255),
    shape_id        VARCHAR(255),
    wheelchair_accessible SMALLINT DEFAULT 0,
    bikes_allowed   SMALLINT DEFAULT 0,
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trips_route    ON trips (route_id);
CREATE INDEX IF NOT EXISTS idx_trips_service  ON trips (service_id);
CREATE INDEX IF NOT EXISTS idx_trips_shape    ON trips (shape_id);
