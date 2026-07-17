import Link from 'next/link';
import * as fs from 'fs';
import * as path from 'path';
import AdminLogoutButton from './logout-button';

interface Order {
  id: string;
  total?: number;
  createdAt: string;
}

async function getOrderStats() {
  try {
    const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
    if (!fs.existsSync(ordersFile)) return { total: 0, revenue: 0, orders: 0 };

    const data = fs.readFileSync(ordersFile, 'utf-8');
    const orders = JSON.parse(data || '[]') as Order[];

    const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    return {
      total: revenue,
      revenue: revenue,
      orders: orders.length
    };
  } catch (error) {
    return { total: 0, revenue: 0, orders: 0 };
  }
}

export const metadata = {
  title: 'Адміністрація | Pet Shop',
  description: 'Адмін-панель управління магазином'
};

export default async function AdminPage() {
  const stats = await getOrderStats();

  const menuItems = [
    {
      title: 'Замовлення',
      description: 'Управління замовленнями покупців',
      icon: '📋',
      href: '/admin/orders',
      count: stats.orders,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Товари',
      description: 'Управління каталогом товарів',
      icon: '🛍️',
      href: '/admin/products',
      count: '12',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Користувачі',
      description: 'Управління аккаунтами користувачів',
      icon: '👥',
      href: '/admin/users',
      count: '24',
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Статистика',
      description: 'Аналітика продаж',
      icon: '📊',
      href: '/admin/analytics',
      count: `₴${stats.revenue}`,
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex items-start justify-between">
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700 }} className="mb-4">🔧 Адміністрація</h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Управління Pet Shop магазином</p>
          </div>
          <AdminLogoutButton />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Total Revenue */}
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-8 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm mb-2">Загальний дохід</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold">₴{stats.revenue}</div>
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-xs mt-2">💰 За всі часи</div>
            </div>

            {/* Total Orders */}
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-8 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm mb-2">Замовлень</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold">{stats.orders}</div>
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-xs mt-2">📋 Завершено</div>
            </div>

            {/* Products */}
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-8 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm mb-2">Товари</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold">12</div>
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-xs mt-2">🛍️ В каталозі</div>
            </div>

            {/* Users */}
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-8 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm mb-2">Користувачі</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold">24</div>
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-xs mt-2">👥 Зареєстровано</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-3xl font-bold mb-8">Менеджмент</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition transform hover:-translate-y-2"
              >
                <div style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="h-20 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-125 transition">{item.icon}</span>
                </div>
                <div className="p-6">
                  <h3 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-xl font-bold mb-2">{item.title}</h3>
                  <p style={{ color: 'rgb(119, 119, 119)' }} className="text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgb(175, 62, 143)' }} className="text-2xl font-bold">{item.count}</span>
                    <span style={{ color: 'rgb(200, 180, 200)' }} className="group-hover:text-gray-600 transition">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-3xl font-bold mb-8">Швидкі дії</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="p-6 text-white rounded-lg hover:shadow-lg transition font-semibold">
              ✉️ Відправити розсилку користувачам
            </button>
            <button style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="p-6 text-white rounded-lg hover:shadow-lg transition font-semibold">
              📊 Завантажити звіт продаж
            </button>
            <button style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="p-6 text-white rounded-lg hover:shadow-lg transition font-semibold">
              🎁 Створити промо-акцію
            </button>
            <button style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="p-6 text-white rounded-lg hover:shadow-lg transition font-semibold">
              ⚙️ Налаштування магазину
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section style={{ borderTopColor: 'rgb(220, 180, 210)' }} className="py-8 px-4 text-center border-t">
        <p style={{ color: 'rgb(119, 119, 119)' }}>Pet Shop Admin Panel v1.0 • Останнє оновлення: сьогодні</p>
      </section>
    </div>
  );
}
