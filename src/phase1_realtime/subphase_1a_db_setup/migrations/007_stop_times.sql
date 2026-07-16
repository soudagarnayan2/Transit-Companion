-- ============================================================
-- Migration 007: Stop Times Table
-- ============================================================
-- Maps to GTFS stop_times.txt
-- This is typically the largest table (millions of rows).
-- ============================================================

CREATE TABLE IF NOT EXISTS stop_times (
    trip_id             VARCHAR(255) NOT NULL,
    arrival_time        INTERVAL,           -- stored as interval to handle times > 24:00:00
    departure_time      INTERVAL,
    stop_id             VARCHAR(255) NOT NULL,
    stop_sequence       INTEGER NOT NULL,
    stop_headsign       VARCHAR(512),
    pickup_type         SMALLINT DEFAULT 0,  -- 0=regular, 1=none, 2=phone, 3=driver
    drop_off_type       SMALLINT DEFAULT 0,
    shape_dist_traveled DOUBLE PRECISION,
    timepoint           SMALLINT DEFAULT 1,  -- 1=exact, 0=approximate
    feed_version_id     INTEGER,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (trip_id, stop_sequence)
);

CREATE INDEX IF NOT EXISTS idx_stop_times_stop  ON stop_times (stop_id);
CREATE INDEX IF NOT EXISTS idx_stop_times_trip  ON stop_times (trip_id);
-- Composite index for "upcoming arrivals at a stop" queries.
CREATE INDEX IF NOT EXISTS idx_stop_times_stop_arr ON stop_times (stop_id, arrival_time);
