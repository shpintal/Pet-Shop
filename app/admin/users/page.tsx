import Link from 'next/link';

const users = [
  { id: 1, name: 'Іван Петренко', email: 'ivan@example.com', registered: '2024-01-15', orders: 5, status: 'Active' },
  { id: 2, name: 'Марія Коваленко', email: 'maria@example.com', registered: '2024-02-20', orders: 3, status: 'Active' },
  { id: 3, name: 'Олег Шевченко', email: 'oleg@example.com', registered: '2024-03-10', orders: 8, status: 'Active' },
  { id: 4, name: 'Анна Іванівна', email: 'anna@example.com', registered: '2024-01-05', orders: 2, status: 'Active' },
  { id: 5, name: 'Сергій Бондаренко', email: 'sergey@example.com', registered: '2024-02-28', orders: 0, status: 'Inactive' },
];

export const metadata = {
  title: 'Користувачі | Pet Shop Admin',
  description: 'Управління користувачами'
};

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">👥 Користувачі</h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Управління аккаунтами користувачів</p>
          </div>
          <div className="text-3xl">👤 {users.length}</div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full">
              <thead style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Користувач</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Зареєстрований</th>
                  <th className="px-6 py-4 text-left font-semibold">Замовлень</th>
                  <th className="px-6 py-4 text-left font-semibold">Статус</th>
                  <th className="px-6 py-4 text-left font-semibold">Дії</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } border-b transition`}
                    style={{ borderColor: 'rgb(220, 180, 210)' }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">{user.name}</p>
                        <p style={{ color: 'rgb(150, 150, 150)' }} className="text-sm">ID: {user.id}</p>
                      </div>
                    </td>
                    <td style={{ color: 'rgb(119, 119, 119)' }} className="px-6 py-4">{user.email}</td>
                    <td style={{ color: 'rgb(119, 119, 119)' }} className="px-6 py-4">{user.registered}</td>
                    <td className="px-6 py-4">
                      <span style={{ backgroundColor: 'rgb(240, 220, 235)', color: 'rgb(175, 62, 143)' }} className="px-3 py-1 rounded-full text-sm font-semibold">
                        {user.orders} замовлень
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        style={{
                          backgroundColor: user.status === 'Active' ? 'rgb(220, 255, 220)' : 'rgb(240, 240, 240)',
                          color: user.status === 'Active' ? 'rgb(30, 150, 30)' : 'rgb(119, 119, 119)'
                        }}
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {user.status === 'Active' ? '✅ Активний' : '❌ Неактивний'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button style={{ color: 'rgb(175, 62, 143)' }} className="hover:opacity-70 font-semibold">
                          👁️ Переглянути
                        </button>
                        <button style={{ color: 'rgb(200, 80, 100)' }} className="hover:opacity-70 font-semibold">
                          🔒 Заблокувати
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-6 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">Активних користувачів</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mt-2">{users.filter(u => u.status === 'Active').length}</div>
            </div>
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-6 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">Середнє замовлень</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mt-2">
                {Math.round(users.reduce((sum, u) => sum + u.orders, 0) / users.length)}
              </div>
            </div>
            <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-6 border-l-4">
              <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">Всього замовлень</div>
              <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mt-2">
                {users.reduce((sum, u) => sum + u.orders, 0)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
