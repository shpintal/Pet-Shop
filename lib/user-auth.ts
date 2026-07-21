import { cookies } from 'next/headers';

export const USER_COOKIE_NAME = 'user_session';

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export type Role = 'CUSTOMER' | 'SELLER' | 'ADMIN';

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

export async function signUserSession(secret: string, userId: number, role: Role): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${expiresAt}.${userId}.${role}`;
  const signature = await hmac(secret, payload);
  return `${payload}.${signature}`;
}

export async function verifyUserSession(
  token: string | undefined,
  secret: string
): Promise<{ userId: number; role: Role } | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 4) return null;
  const [expiresAtRaw, userIdRaw, role, signature] = parts;

  const expiresAt = Number(expiresAtRaw);
  const userId = Number(userIdRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;
  if (!Number.isFinite(userId)) return null;
  if (role !== 'CUSTOMER' && role !== 'SELLER' && role !== 'ADMIN') return null;

  const payload = `${expiresAtRaw}.${userIdRaw}.${role}`;
  const expectedSignature = await hmac(secret, payload);
  if (expectedSignature !== signature) return null;

  return { userId, role };
}

export async function getCurrentUser(): Promise<{ userId: number; role: Role } | null> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const jar = await cookies();
  const token = jar.get(USER_COOKIE_NAME)?.value;
  return verifyUserSession(token, secret);
}
