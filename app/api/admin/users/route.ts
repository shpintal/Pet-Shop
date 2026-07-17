import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from 'lib/prisma';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from 'lib/admin-auth';
import { USER_COOKIE_NAME, verifyUserSession } from 'lib/user-auth';

async function requireAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const jar = await cookies();

  const adminToken = jar.get(ADMIN_COOKIE_NAME)?.value;
  if (await verifyAdminSession(adminToken, secret)) return true;

  const userToken = jar.get(USER_COOKIE_NAME)?.value;
  const userSession = await verifyUserSession(userToken, secret);
  return userSession?.role === 'ADMIN';
}

const ALLOWED_ROLES = ['CUSTOMER', 'SELLER', 'ADMIN'];

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.username?.trim() || body.username.length < 3) {
      return NextResponse.json({ error: "Ім'я користувача повинно містити щонайменше 3 символи" }, { status: 400 });
    }
    if (!body.email?.includes('@')) {
      return NextResponse.json({ error: 'Невалідна email адреса' }, { status: 400 });
    }
    if (!body.password || body.password.length < 6) {
      return NextResponse.json({ error: 'Пароль повинен містити щонайменше 6 символів' }, { status: 400 });
    }
    if (!body.role || !ALLOWED_ROLES.includes(body.role)) {
      return NextResponse.json({ error: 'Некоректна роль' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: body.email }, { username: body.username }] }
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Користувач з цим email або іменем вже існує' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: body.username.trim(),
        email: body.email.trim(),
        password: passwordHash,
        firstName: body.firstName?.trim() || null,
        lastName: body.lastName?.trim() || null,
        role: body.role
      },
      select: { id: true, email: true, username: true, firstName: true, lastName: true, role: true, isBlocked: true, createdAt: true }
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Помилка при створенні користувача' }, { status: 500 });
  }
}
