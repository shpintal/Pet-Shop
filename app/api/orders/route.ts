import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';
import { getCurrentUser } from 'lib/user-auth';

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Не авторизовано' }, { status: 401 });
  }

  try {
    const body: OrderData = await request.json();

    if (!body.firstName?.trim()) {
      return NextResponse.json({ error: 'Ім\'я є обов\'язковим' }, { status: 400 });
    }
    if (!body.lastName?.trim()) {
      return NextResponse.json({ error: 'Прізвище є обов\'язковим' }, { status: 400 });
    }
    if (!body.email?.includes('@')) {
      return NextResponse.json({ error: 'Невалідний email' }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Телефон є обов\'язковим' }, { status: 400 });
    }
    if (!body.address?.trim()) {
      return NextResponse.json({ error: 'Адреса є обов\'язковою' }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Кошик порожній' }, { status: 400 });
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 100;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId: user.userId,
          total,
          firstName: body.firstName.trim(),
          lastName: body.lastName.trim(),
          email: body.email.trim(),
          phone: body.phone.trim(),
          address: body.address.trim(),
          city: body.city?.trim() || 'Тернопіль',
          postalCode: body.postalCode?.trim() || '',
          orderItems: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        }
      });

      await tx.cartItem.deleteMany({ where: { userId: user.userId } });

      return created;
    });

    return NextResponse.json(
      { success: true, message: 'Замовлення успішно оформлено!', orderId: String(order.id), order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Помилка при оформленні замовлення' }, { status: 500 });
  }
}
