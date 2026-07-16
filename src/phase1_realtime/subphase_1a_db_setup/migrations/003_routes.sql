-- ============================================================
-- Migration 003: Routes Table
-- ============================================================
-- Maps to GTFS routes.txt
-- Route types: 0=Tram, 1=Subway, 2=Rail, 3=Bus, 4=Ferry,
--              5=Cable, 6=Gondola, 7=Funicular, 11=Trolleybus, 12=Monorail
-- ============================================================

CREATE TABLE IF NOT EXISTS routes (
    route_id        VARCHAR(255) PRIMARY KEY,
    agency_id       VARCHAR(255) REFERENCES agencies(agency_id) ON DELETE CASCADE,
    route_short_name VARCHAR(64),
    route_long_name  VARCHAR(512),
    route_desc      TEXT,
    route_type      SMALLINT NOT NULL DEFAULT 3,   -- default: Bus
    route_url       VARCHAR(1024),
    route_color     VARCHAR(8)  DEFAULT 'FF0000',
    route_text_color VARCHAR(8) DEFAULT 'FFFFFF',
    route_sort_order INTEGER,
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_routes_agency ON routes (agency_id);
CREATE INDEX IF NOT EXISTS idx_routes_type   ON routes (route_type);
