import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from 'lib/prisma';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from 'lib/admin-auth';
import { USER_COOKIE_NAME, verifyUserSession } from 'lib/user-auth';

async function requireProductManager(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const jar = await cookies();

  const adminToken = jar.get(ADMIN_COOKIE_NAME)?.value;
  if (await verifyAdminSession(adminToken, secret)) return true;

  const userToken = jar.get(USER_COOKIE_NAME)?.value;
  const userSession = await verifyUserSession(userToken, secret);
  return userSession?.role === 'ADMIN' || userSession?.role === 'SELLER';
}

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!(await requireProductManager())) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Введіть назву товару' }, { status: 400 });
    }
    if (!body.price || isNaN(Number(body.price))) {
      return NextResponse.json({ error: 'Введіть коректну ціну' }, { status: 400 });
    }
    if (!body.category?.trim()) {
      return NextResponse.json({ error: 'Виберіть категорію' }, { status: 400 });
    }
    if (body.stock === undefined || isNaN(Number(body.stock))) {
      return NextResponse.json({ error: 'Введіть залишок на складі' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name.trim(),
        price: Number(body.price),
        category: body.category.trim(),
        stock: Number(body.stock),
        emoji: body.emoji || '🐾',
        description: body.description?.trim() || null,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Помилка при створенні товару' }, { status: 500 });
  }
}
