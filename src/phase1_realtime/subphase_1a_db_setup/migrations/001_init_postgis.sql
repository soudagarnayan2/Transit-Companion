-- ============================================================
-- Migration 001: Enable PostGIS & Create Migration Tracking
-- ============================================================
-- This must run first. Enables the PostGIS extension and
-- creates a `schema_migrations` table to track applied files.
-- ============================================================

-- CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS schema_migrations (
    id              SERIAL PRIMARY KEY,
    filename        VARCHAR(255) NOT NULL UNIQUE,
    applied_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
