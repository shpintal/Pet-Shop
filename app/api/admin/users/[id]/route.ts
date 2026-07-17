import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (typeof body.isBlocked !== 'boolean') {
      return NextResponse.json({ error: 'Некоректні дані' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { isBlocked: body.isBlocked },
      select: { id: true, email: true, username: true, firstName: true, lastName: true, isBlocked: true, createdAt: true }
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Помилка при оновленні користувача' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Помилка при видаленні користувача' }, { status: 500 });
  }
}
