import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from 'lib/prisma';

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

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Помилка при вході' }, { status: 500 });
  }
}
