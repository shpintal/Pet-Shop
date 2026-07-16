import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items?: any[];
  total?: number;
}

interface Order extends OrderData {
  id: string;
  createdAt: string;
}

const ordersDir = path.join(process.cwd(), 'data');
const ordersFile = path.join(ordersDir, 'orders.json');

function ensureDataDir() {
  if (!fs.existsSync(ordersDir)) {
    fs.mkdirSync(ordersDir, { recursive: true });
  }
}

function getOrders(): Order[] {
  ensureDataDir();
  if (!fs.existsSync(ordersFile)) {
    return [];
  }
  const data = fs.readFileSync(ordersFile, 'utf-8');
  return JSON.parse(data || '[]');
}

function saveOrders(orders: Order[]) {
  ensureDataDir();
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderData = await request.json();

    // Валідація
    if (!body.firstName?.trim()) {
      return NextResponse.json(
        { error: 'Ім\'я є обов\'язковим' },
        { status: 400 }
      );
    }
    if (!body.lastName?.trim()) {
      return NextResponse.json(
        { error: 'Прізвище є обов\'язковим' },
        { status: 400 }
      );
    }
    if (!body.email?.includes('@')) {
      return NextResponse.json(
        { error: 'Невалідний email' },
        { status: 400 }
      );
    }
    if (!body.phone?.trim()) {
      return NextResponse.json(
        { error: 'Телефон є обов\'язковим' },
        { status: 400 }
      );
    }
    if (!body.address?.trim()) {
      return NextResponse.json(
        { error: 'Адреса є обов\'язковою' },
        { status: 400 }
      );
    }

    // Створення замовлення
    const order: Order = {
      ...body,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    // Збереження замовлення
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    return NextResponse.json(
      {
        success: true,
        message: 'Замовлення успішно оформлено!',
        orderId: order.id,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Помилка при оформленні замовлення' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Помилка при отриманні замовлень' },
      { status: 500 }
    );
  }
}
