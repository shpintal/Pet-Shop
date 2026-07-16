import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
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
