import * as fs from 'fs';
import * as path from 'path';
import Link from 'next/link';
import { prisma } from 'lib/prisma';
import UsersTable from './users-table';

interface OrderRecord {
  email: string;
  total?: number;
}

function getOrderCountsByEmail(): Record<string, number> {
  try {
    const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
    if (!fs.existsSync(ordersFile)) return {};

    const data = fs.readFileSync(ordersFile, 'utf-8');
    const orders = JSON.parse(data || '[]') as OrderRecord[];

    return orders.reduce<Record<string, number>>((counts, order) => {
      const email = order.email?.toLowerCase();
      if (!email) return counts;
      counts[email] = (counts[email] || 0) + 1;
      return counts;
    }, {});
  } catch {
    return {};
  }
}

export const metadata = {
  title: 'Користувачі | Pet Shop Admin',
  description: 'Управління користувачами'
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  const orderCounts = getOrderCountsByEmail();

  const usersWithOrders = users.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isBlocked: user.isBlocked,
    createdAt: user.createdAt.toISOString(),
    orders: orderCounts[user.email.toLowerCase()] || 0
  }));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">
              👥 Користувачі
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Управління аккаунтами користувачів</p>
          </div>
          <Link
            href="/admin/users/add"
            style={{ backgroundColor: 'white', color: 'rgb(175, 62, 143)' }}
            className="px-6 py-3 rounded-lg font-bold hover:shadow-lg transition inline-block"
          >
            ➕ Створити користувача
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {usersWithOrders.length > 0 ? (
            <UsersTable users={usersWithOrders} />
          ) : (
            <div className="bg-white rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h2 style={{ color: 'rgb(119, 119, 119)' }} className="text-2xl font-bold mb-2">
                Немає користувачів
              </h2>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Поки що ніхто не зареєструвався</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
