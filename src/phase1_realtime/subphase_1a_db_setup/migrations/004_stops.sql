-- ============================================================
-- Migration 004: Stops Table (PostGIS Geography)
-- ============================================================
-- Maps to GTFS stops.txt
-- Uses PostGIS GEOGRAPHY(POINT, 4326) for lat/lon storage,
-- enabling efficient spatial queries (e.g. "stops within 500m").
-- ============================================================

CREATE TABLE IF NOT EXISTS stops (
    stop_id         VARCHAR(255) PRIMARY KEY,
    stop_code       VARCHAR(64),
    stop_name       VARCHAR(512) NOT NULL,
    stop_desc       TEXT,
    stop_lat        DOUBLE PRECISION NOT NULL,
    stop_lon        DOUBLE PRECISION NOT NULL,
    -- geom            GEOGRAPHY(POINT, 4326),
    zone_id         VARCHAR(64),
    stop_url        VARCHAR(1024),
    location_type   SMALLINT DEFAULT 0,  -- 0=stop, 1=station, 2=entrance
    parent_station  VARCHAR(255),
    stop_timezone   VARCHAR(64),
    wheelchair_boarding SMALLINT DEFAULT 0,
    platform_code   VARCHAR(64),
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Spatial index for proximity queries.
-- CREATE INDEX IF NOT EXISTS idx_stops_geom ON stops USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_stops_name ON stops (stop_name);
CREATE INDEX IF NOT EXISTS idx_stops_parent ON stops (parent_station);

-- Trigger to auto-populate geom from lat/lon on insert/update.
-- CREATE OR REPLACE FUNCTION fn_stops_set_geom()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.geom := ST_SetSRID(ST_MakePoint(NEW.stop_lon, NEW.stop_lat), 4326)::GEOGRAPHY;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS trg_stops_set_geom ON stops;
-- CREATE TRIGGER trg_stops_set_geom
--     BEFORE INSERT OR UPDATE OF stop_lat, stop_lon ON stops
--     FOR EACH ROW
--     EXECUTE FUNCTION fn_stops_set_geom();
