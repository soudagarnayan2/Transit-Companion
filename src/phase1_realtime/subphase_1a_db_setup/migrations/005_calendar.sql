-- ============================================================
-- Migration 005: Calendar & Calendar Dates
-- ============================================================
-- Maps to GTFS calendar.txt and calendar_dates.txt
-- ============================================================

CREATE TABLE IF NOT EXISTS calendar (
    service_id      VARCHAR(255) PRIMARY KEY,
    monday          BOOLEAN NOT NULL DEFAULT FALSE,
    tuesday         BOOLEAN NOT NULL DEFAULT FALSE,
    wednesday       BOOLEAN NOT NULL DEFAULT FALSE,
    thursday        BOOLEAN NOT NULL DEFAULT FALSE,
    friday          BOOLEAN NOT NULL DEFAULT FALSE,
    saturday        BOOLEAN NOT NULL DEFAULT FALSE,
    sunday          BOOLEAN NOT NULL DEFAULT FALSE,
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calendar_dates (
    service_id      VARCHAR(255) NOT NULL,
    exception_date  DATE NOT NULL,
    exception_type  SMALLINT NOT NULL,   -- 1=added, 2=removed
    feed_version_id INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (service_id, exception_date)
);

CREATE INDEX IF NOT EXISTS idx_calendar_dates_service ON calendar_dates (service_id);
