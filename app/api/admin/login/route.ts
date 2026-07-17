import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, signAdminSession } from 'lib/admin-auth';

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !secret) {
    return NextResponse.json({ error: 'Пароль адміністратора не налаштовано' }, { status: 500 });
  }

  const { password } = await request.json();

  if (typeof password !== 'string' || password !== adminPassword) {
    return NextResponse.json({ error: 'Невірний пароль' }, { status: 401 });
  }

  const token = await signAdminSession(secret);
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
