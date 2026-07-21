import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';
import { getCurrentUser } from 'lib/user-auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  const items = await prisma.cartItem.findMany({
    where: { userId: user.userId },
    include: { product: true }
  });

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const productId = Number(body.productId);
    const quantity = Number(body.quantity) || 1;

    if (!Number.isFinite(productId) || quantity < 1) {
      return NextResponse.json({ error: 'Некоректні дані' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: 'Товар не знайдено' }, { status: 404 });
    }

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: user.userId, productId } }
    });

    const item = existing
      ? await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity },
          include: { product: true }
        })
      : await prisma.cartItem.create({
          data: { userId: user.userId, productId, quantity },
          include: { product: true }
        });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Помилка при додаванні товару в кошик' }, { status: 500 });
  }
}
