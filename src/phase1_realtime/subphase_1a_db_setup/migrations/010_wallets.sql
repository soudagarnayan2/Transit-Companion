-- ============================================================
-- Migration 010: Wallets and Ticketing Ledger (Phase 3)
-- ============================================================

CREATE TABLE IF NOT EXISTS wallets (
    user_id         VARCHAR(255) PRIMARY KEY,
    balance         DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    currency        VARCHAR(3) NOT NULL DEFAULT 'INR',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
    id              SERIAL PRIMARY KEY,
    user_id         VARCHAR(255) NOT NULL REFERENCES wallets(user_id) ON DELETE CASCADE,
    amount          DECIMAL(12, 2) NOT NULL,
    tx_type         VARCHAR(32) NOT NULL, -- 'topup' | 'purchase'
    reference_id    VARCHAR(255),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id       VARCHAR(255) PRIMARY KEY,
    user_id         VARCHAR(255) NOT NULL REFERENCES wallets(user_id) ON DELETE CASCADE,
    route_id        VARCHAR(255) REFERENCES routes(route_id) ON DELETE SET NULL,
    fare            DECIMAL(12, 2) NOT NULL,
    token           TEXT NOT NULL, -- Cryptographic JWS ticket representation
    status          VARCHAR(32) NOT NULL DEFAULT 'active', -- 'active' | 'used' | 'expired'
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    validated_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
