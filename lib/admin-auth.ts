export const ADMIN_COOKIE_NAME = 'admin_session';

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmac(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return bufToHex(signature);
}

export async function signAdminSession(secret: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const signature = await hmac(secret, String(expiresAt));
  return `${expiresAt}.${signature}`;
}

export async function verifyAdminSession(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split('.');
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSignature = await hmac(secret, expiresAtRaw);
  return expectedSignature === signature;
}
