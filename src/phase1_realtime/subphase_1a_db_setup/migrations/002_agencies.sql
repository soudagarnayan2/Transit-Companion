-- ============================================================
-- Migration 002: Agencies Table
-- ============================================================
-- Maps to GTFS agency.txt
-- ============================================================

CREATE TABLE IF NOT EXISTS agencies (
    agency_id       VARCHAR(255) PRIMARY KEY,
    agency_name     VARCHAR(512) NOT NULL,
    agency_url      VARCHAR(1024),
    agency_timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata',
    agency_lang     VARCHAR(8)  DEFAULT 'en',
    agency_phone    VARCHAR(64),
    agency_email    VARCHAR(255),
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agencies_name ON agencies (agency_name);
