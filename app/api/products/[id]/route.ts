import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });

  if (!product) {
    return NextResponse.json({ error: 'Товар не знайдено' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: body.name.trim(),
        price: Number(body.price),
        category: body.category.trim(),
        stock: Number(body.stock),
        emoji: body.emoji || '🐾',
        description: body.description?.trim() || null,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Помилка при оновленні товару' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Помилка при видаленні товару' }, { status: 500 });
  }
}
