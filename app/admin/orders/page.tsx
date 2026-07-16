import { cookies } from 'next/headers';
import * as fs from 'fs';
import * as path from 'path';
import OrdersList from './orders-list';

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items?: any[];
  total?: number;
  createdAt: string;
}

async function getOrders(): Promise<Order[]> {
  try {
    const ordersDir = path.join(process.cwd(), 'data');
    const ordersFile = path.join(ordersDir, 'orders.json');

    if (!fs.existsSync(ordersFile)) {
      return [];
    }

    const data = fs.readFileSync(ordersFile, 'utf-8');
    const orders = JSON.parse(data || '[]') as Order[];
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

export const metadata = {
  title: 'Замовлення | Pet Shop Admin',
  description: 'Управління замовленнями'
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">Замовлення</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Управління замовленнями покупців</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {orders.length > 0 ? (
            <OrdersList orders={orders} />
          ) : (
            <div className="bg-white rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h2 style={{ color: 'rgb(119, 119, 119)' }} className="text-2xl font-bold mb-2">Немає замовлень</h2>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Поки що замовлень не надходило</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
