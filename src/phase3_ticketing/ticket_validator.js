/**
 * Ticket Cryptographic Validator (Phase 3)
 * -----------------------------------------
 * Generates and validates time-bound, offline-scannable transit ticket tokens.
 * Uses HMAC-SHA256 signatures to confirm ticket integrity offline.
 */

const crypto = require("crypto");
const db = require("../shared/db");
const { _memoryTickets } = require("./wallet_service");

// HMAC secret for signature validation
const SECRET = process.env.TICKET_HMAC_SECRET || "trassit_secret_salt_10485";

/**
 * Generates a signed offline transit ticket token.
 * @param {string} userId
 * @param {string} routeId
 * @param {number} fare
 * @returns {string} – cryptographically signed token string.
 */
function generateOfflineToken(userId, routeId, fare) {
  const payload = {
    u: userId,
    r: routeId,
    f: fare,
    c: Date.now(), // creation timestamp
    e: Date.now() + 3 * 3600 * 1000, // expires in 3 hours
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  
  // Create signature
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payloadStr);
  const signature = hmac.digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Validates a ticket token offline.
 * @param {string} token – payload.signature token.
 * @returns {object} – { valid: boolean, payload: object, error: string }
 */
function validateOfflineToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) {
      return { valid: false, error: "Invalid token format." };
    }

    const [payloadStr, signature] = parts;

    // Verify signature
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(payloadStr);
    const expectedSignature = hmac.digest("base64url");

    if (signature !== expectedSignature) {
      return { valid: false, error: "Cryptographic signature mismatch." };
    }

    const payload = JSON.parse(
      Buffer.from(payloadStr, "base64url").toString("utf8")
    );

    // Check expiration
    if (Date.now() > payload.e) {
      return { valid: false, error: "Ticket token expired." };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: "Token decoding failed." };
  }
}

/**
 * Purchases a ticket, deducting from the wallet and storing record.
 */
async function purchaseTicket(userId, routeId, fare) {
  const ticketId = `tkt-${crypto.randomBytes(6).toString("hex")}`;
  const token = generateOfflineToken(userId, routeId, fare);

  const client = await db.pool.connect().catch(() => null);

  if (!client) {
    // Memory fallback
    const ticketRecord = { ticket_id: ticketId, user_id: userId, route_id: routeId, fare, token, status: "active", created_at: new Date() };
    _memoryTickets.push(ticketRecord);
    return ticketRecord;
  }

  try {
    await client.query("BEGIN");

    // Deduct ticket price from wallet (delegates to transaction rules)
    await client.query(
      "UPDATE wallets SET balance = balance - $1, updated_at = NOW() WHERE user_id = $2",
      [fare, userId]
    );

    // Ledger record
    await client.query(
      "INSERT INTO wallet_transactions (user_id, amount, tx_type, reference_id) VALUES ($1, $2, 'purchase', $3)",
      [userId, -fare, ticketId]
    );

    // Store Ticket
    const ticketRes = await client.query(
      "INSERT INTO tickets (ticket_id, user_id, route_id, fare, token, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *",
      [ticketId, userId, routeId, fare, token]
    );

    await client.query("COMMIT");
    return ticketRes.rows[0];
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    // Scrub error PII
    throw new Error(err.message.replace(/https?:\/\/[^\s]+(email|user|token)[^\s]+/gi, "[REDACTED]"));
  } finally {
    client.release();
  }
}

module.exports = {
  generateOfflineToken,
  validateOfflineToken,
  purchaseTicket,
};
