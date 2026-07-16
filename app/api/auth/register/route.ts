import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from 'lib/prisma';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.username?.trim()) {
      return NextResponse.json({ error: "Ім'я користувача є обов'язковим" }, { status: 400 });
    }
    if (body.username.length < 3) {
      return NextResponse.json(
        { error: "Ім'я користувача повинно містити щонайменше 3 символи" },
        { status: 400 }
      );
    }
    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Невалідна email адреса' }, { status: 400 });
    }
    if (!body.password?.trim()) {
      return NextResponse.json({ error: "Пароль є обов'язковим" }, { status: 400 });
    }
    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль повинен містити щонайменше 6 символів' },
        { status: 400 }
      );
    }
    if (!body.firstName?.trim()) {
      return NextResponse.json({ error: "Ім'я є обов'язковим" }, { status: 400 });
    }
    if (!body.lastName?.trim()) {
      return NextResponse.json({ error: "Прізвище є обов'язковим" }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: body.email }, { username: body.username }] },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Користувач з цим email або іменем вже існує" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: body.username.trim(),
        email: body.email.trim(),
        password: passwordHash,
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
      },
    });

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(
      { success: true, message: 'Реєстрація успішна!', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Помилка при реєстрації' }, { status: 500 });
  }
}
