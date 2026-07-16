-- ============================================================
-- Migration 008: Shapes Table (PostGIS Linestrings)
-- ============================================================
-- Maps to GTFS shapes.txt
-- Stores individual shape points AND a materialized
-- LINESTRING geometry per shape_id for efficient rendering.
-- ============================================================

-- Individual shape points (raw from shapes.txt)
CREATE TABLE IF NOT EXISTS shape_points (
    shape_id            VARCHAR(255) NOT NULL,
    shape_pt_lat        DOUBLE PRECISION NOT NULL,
    shape_pt_lon        DOUBLE PRECISION NOT NULL,
    shape_pt_sequence   INTEGER NOT NULL,
    shape_dist_traveled DOUBLE PRECISION,
    feed_version_id     INTEGER,
    PRIMARY KEY (shape_id, shape_pt_sequence)
);

CREATE INDEX IF NOT EXISTS idx_shape_points_id ON shape_points (shape_id);

-- Materialized aggregated shapes (one LINESTRING per shape_id)
CREATE TABLE IF NOT EXISTS shapes (
    shape_id        VARCHAR(255) PRIMARY KEY,
    -- geom            GEOGRAPHY(LINESTRING, 4326),
    point_count     INTEGER,
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CREATE INDEX IF NOT EXISTS idx_shapes_geom ON shapes USING GIST (geom);
