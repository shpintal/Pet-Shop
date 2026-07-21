import { prisma } from 'lib/prisma';
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
  const orders = await prisma.order.findMany({
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return orders.map((order) => ({
    id: String(order.id),
    firstName: order.firstName,
    lastName: order.lastName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    city: order.city,
    postalCode: order.postalCode,
    total: order.total,
    createdAt: order.createdAt.toISOString(),
    items: order.orderItems.map((item) => ({
      id: item.productId,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      emoji: item.product.emoji
    }))
  }));
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
