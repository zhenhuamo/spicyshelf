/**
 * Admin authentication module
 *
 * Token format: `{timestamp}.{hmac_signature}`
 * - timestamp: Unix milliseconds when the token was created
 * - hmac_signature: HMAC-SHA256(timestamp, password) hex-encoded
 * - Token expires after 7 days
 *
 * Uses Web Crypto API for Cloudflare Workers compatibility.
 */

const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const encoder = new TextEncoder();

/**
 * Import password as an HMAC-SHA256 CryptoKey.
 */
async function getHmacKey(password: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Convert an ArrayBuffer to a hex string.
 */
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Convert a hex string back to a Uint8Array.
 */
function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Create a signed admin token.
 *
 * @param password - The admin password (from ADMIN_PASSWORD env var)
 * @returns Token string in format `{timestamp}.{hmac_hex}`
 */
export async function createAdminToken(password: string): Promise<string> {
  const timestamp = Date.now().toString();
  const key = await getHmacKey(password);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
  return `${timestamp}.${bufferToHex(signature)}`;
}

/**
 * Verify an admin token's signature and expiration.
 *
 * @param token - The token string to verify
 * @param password - The admin password to verify against
 * @returns true if the token is valid and not expired
 */
export async function verifyAdminToken(
  token: string,
  password: string
): Promise<boolean> {
  if (!token || !password) return false;

  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;

  const timestamp = token.substring(0, dotIndex);
  const signatureHex = token.substring(dotIndex + 1);

  // Validate timestamp is a number
  const timestampNum = Number(timestamp);
  if (isNaN(timestampNum)) return false;

  // Check expiration (7 days)
  if (Date.now() - timestampNum > TOKEN_EXPIRY_MS) return false;

  // Verify by re-signing and comparing (avoids workerd SubtleCrypto.verify buffer issues)
  try {
    const key = await getHmacKey(password);
    const expected = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
    const expectedHex = bufferToHex(expected);
    return expectedHex === signatureHex;
  } catch {
    return false;
  }
}
