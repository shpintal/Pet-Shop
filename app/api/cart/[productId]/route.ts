import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';
import { getCurrentUser } from 'lib/user-auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const { productId } = await params;
    const body = await request.json();
    const quantity = Number(body.quantity);

    if (!Number.isFinite(quantity)) {
      return NextResponse.json({ error: 'Некоректні дані' }, { status: 400 });
    }

    const where = { userId_productId: { userId: user.userId, productId: Number(productId) } };

    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({ where: { userId: user.userId, productId: Number(productId) } });
      return NextResponse.json({ success: true });
    }

    const item = await prisma.cartItem.update({
      where,
      data: { quantity },
      include: { product: true }
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Помилка при оновленні кошика' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const { productId } = await params;
    await prisma.cartItem.deleteMany({
      where: { userId: user.userId, productId: Number(productId) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json({ error: 'Помилка при видаленні товару' }, { status: 500 });
  }
}
