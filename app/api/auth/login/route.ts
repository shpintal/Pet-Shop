import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from 'lib/prisma';
import { USER_COOKIE_NAME, signUserSession } from 'lib/user-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email?.includes('@') || !body.password) {
      return NextResponse.json({ error: 'Email або пароль невірні' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return NextResponse.json({ error: 'Email або пароль невірні' }, { status: 401 });
    }

    if (user.isBlocked) {
      return NextResponse.json({ error: 'Цей аккаунт заблоковано' }, { status: 403 });
    }

    const response = NextResponse.json({
      success: true,
      user: {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

    const sessionSecret = process.env.ADMIN_SESSION_SECRET;
    if (sessionSecret) {
      const token = await signUserSession(sessionSecret, user.id, user.role);
      response.cookies.set(USER_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Помилка при вході' }, { status: 500 });
  }
}
