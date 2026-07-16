-- ============================================================
-- Migration 009: Feed Versions Table
-- ============================================================
-- Tracks imported GTFS feed versions to prevent redundant
-- re-imports and enable rollback.
-- ============================================================

CREATE TABLE IF NOT EXISTS feed_versions (
    id              SERIAL PRIMARY KEY,
    feed_url        VARCHAR(2048) NOT NULL,
    sha256_hash     VARCHAR(64) NOT NULL,
    agency_id       VARCHAR(255),
    source          VARCHAR(128),        -- e.g. "transitland", "mobilitydatabase", "manual"
    record_count    JSONB,               -- {"agencies":1,"routes":42,"stops":310,...}
    status          VARCHAR(32) NOT NULL DEFAULT 'imported',  -- imported | active | archived
    imported_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    activated_at    TIMESTAMPTZ,
    UNIQUE (sha256_hash)
);

CREATE INDEX IF NOT EXISTS idx_feed_versions_agency ON feed_versions (agency_id);
CREATE INDEX IF NOT EXISTS idx_feed_versions_status ON feed_versions (status);
