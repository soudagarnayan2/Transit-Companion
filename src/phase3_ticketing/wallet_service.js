/**
 * Wallet and Ledger Service (Phase 3)
 * -----------------------------------
 * Manages balance topups, transaction ledgers, and ticket deductions.
 * Automatically degrades to in-memory state if PostgreSQL is unreachable.
 *
 * Security constraint: On transaction failure, no PII URLs are logged or returned.
 */

const db = require("../shared/db");

// Memory fallback store for offline/demo run
const _memoryWallets = new Map();
const _memoryTransactions = [];
const _memoryTickets = [];

/**
 * Ensures a wallet exists for a user and returns details.
 * @param {string} userId
 * @returns {Promise<object>}
 */
async function getOrCreateWallet(userId) {
  try {
    const { rows } = await db.query(
      "INSERT INTO wallets (user_id, balance) VALUES ($1, 0.00) ON CONFLICT (user_id) DO UPDATE SET updated_at = NOW() RETURNING *",
      [userId]
    );
    return rows[0];
  } catch (err) {
    // In-memory fallback
    if (!_memoryWallets.has(userId)) {
      _memoryWallets.set(userId, { user_id: userId, balance: 0.00, currency: "INR" });
    }
    return _memoryWallets.get(userId);
  }
}

/**
 * Tops up a user's wallet.
 * @param {string} userId
 * @param {number} amount
 * @returns {Promise<object>} – updated wallet details.
 */
async function topupWallet(userId, amount) {
  if (amount <= 0) throw new Error("Invalid topup amount.");

  const client = await db.pool.connect().catch(() => null);

  if (!client) {
    // Memory fallback execution
    const wallet = await getOrCreateWallet(userId);
    wallet.balance += amount;
    _memoryTransactions.push({ userId, amount, tx_type: "topup", created_at: new Date() });
    return wallet;
  }

  try {
    await client.query("BEGIN");
    
    // Increment balance
    const walletRes = await client.query(
      "UPDATE wallets SET balance = balance + $1, updated_at = NOW() WHERE user_id = $2 RETURNING *",
      [amount, userId]
    );

    // Write audit ledger
    await client.query(
      "INSERT INTO wallet_transactions (user_id, amount, tx_type) VALUES ($1, $2, 'topup')",
      [userId, amount]
    );

    await client.query("COMMIT");
    return walletRes.rows[0];
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw _sanitizeError(err, `Topup failed for user: ${userId}`);
  } finally {
    client.release();
  }
}

/**
 * Charges a user wallet for a ticket purchase.
 * @param {string} userId
 * @param {number} amount
 * @param {string} referenceId
 */
async function chargeWallet(userId, amount, referenceId) {
  const client = await db.pool.connect().catch(() => null);

  if (!client) {
    const wallet = await getOrCreateWallet(userId);
    if (wallet.balance < amount) throw new Error("Insufficient wallet balance.");
    wallet.balance -= amount;
    _memoryTransactions.push({ userId, amount: -amount, tx_type: "purchase", referenceId, created_at: new Date() });
    return wallet;
  }

  try {
    await client.query("BEGIN");

    // Fetch balance with lock
    const lockRes = await client.query(
      "SELECT balance FROM wallets WHERE user_id = $1 FOR UPDATE",
      [userId]
    );

    if (lockRes.rows.length === 0 || parseFloat(lockRes.rows[0].balance) < amount) {
      throw new Error("Insufficient wallet balance.");
    }

    // Deduct balance
    const walletRes = await client.query(
      "UPDATE wallets SET balance = balance - $1, updated_at = NOW() WHERE user_id = $2 RETURNING *",
      [amount, userId]
    );

    // Ledger entry
    await client.query(
      "INSERT INTO wallet_transactions (user_id, amount, tx_type, reference_id) VALUES ($1, $2, 'purchase', $3)",
      [userId, -amount, referenceId]
    );

    await client.query("COMMIT");
    return walletRes.rows[0];
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw _sanitizeError(err, `Deduction failed for user: ${userId}`);
  } finally {
    client.release();
  }
}

/**
 * Security helper to scrub PII from logs and failures.
 * Ensures no URL containing user details is ever logged or returned.
 */
function _sanitizeError(err, contextMsg) {
  // Regex to strip any patterns looking like url containing email, username, token
  const piiUrlRegex = /https?:\/\/[^\s]+(email|user|token|key|auth|pass)[^\s]+/gi;
  let cleanMessage = err.message.replace(piiUrlRegex, "[REDACTED_SECURE_URL]");
  
  console.error(`[Secure Logger] Transaction Failure: ${contextMsg}. Reason: ${cleanMessage}`);
  
  return new Error(cleanMessage);
}

module.exports = {
  getOrCreateWallet,
  topupWallet,
  chargeWallet,
  _memoryTickets,
};
