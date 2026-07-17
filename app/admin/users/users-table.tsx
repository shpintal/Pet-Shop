'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  isBlocked: boolean;
  createdAt: string;
  orders: number;
}

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const toggleBlocked = async (user: User) => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBlocked: !user.isBlocked })
      });
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setIsSubmitting(false);
      setDeleteId(null);
    }
  };

  const fullName = (user: User) => [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username;
  const activeCount = users.filter((u) => !u.isBlocked).length;
  const avgOrders = users.length > 0 ? Math.round(users.reduce((sum, u) => sum + u.orders, 0) / users.length) : 0;
  const totalOrders = users.reduce((sum, u) => sum + u.orders, 0);

  return (
    <>
      {/* Table */}
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
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b transition`}
                style={{ borderColor: 'rgb(220, 180, 210)' }}
              >
                <td className="px-6 py-4">
                  <div>
                    <p style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">
                      {fullName(user)}
                    </p>
                    <p style={{ color: 'rgb(150, 150, 150)' }} className="text-sm">
                      @{user.username}
                    </p>
                  </div>
                </td>
                <td style={{ color: 'rgb(119, 119, 119)' }} className="px-6 py-4">
                  {user.email}
                </td>
                <td style={{ color: 'rgb(119, 119, 119)' }} className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString('uk-UA')}
                </td>
                <td className="px-6 py-4">
                  <span
                    style={{ backgroundColor: 'rgb(240, 220, 235)', color: 'rgb(175, 62, 143)' }}
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {user.orders} замовлень
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    style={{
                      backgroundColor: !user.isBlocked ? 'rgb(220, 255, 220)' : 'rgb(240, 240, 240)',
                      color: !user.isBlocked ? 'rgb(30, 150, 30)' : 'rgb(119, 119, 119)'
                    }}
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {!user.isBlocked ? '✅ Активний' : '🔒 Заблокований'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setViewUser(user)}
                      style={{ color: 'rgb(175, 62, 143)' }}
                      className="hover:opacity-70 font-semibold"
                    >
                      👁️ Переглянути
                    </button>
                    <button
                      onClick={() => toggleBlocked(user)}
                      disabled={isSubmitting}
                      style={{ color: user.isBlocked ? 'rgb(30, 150, 30)' : 'rgb(200, 80, 100)' }}
                      className="hover:opacity-70 font-semibold disabled:opacity-50"
                    >
                      {user.isBlocked ? '🔓 Розблокувати' : '🔒 Заблокувати'}
                    </button>
                    <button
                      onClick={() => setDeleteId(user.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      🗑️ Видалити
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
          <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">
            Активних користувачів
          </div>
          <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mt-2">
            {activeCount}
          </div>
        </div>
        <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-6 border-l-4">
          <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">
            Середнє замовлень
          </div>
          <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mt-2">
            {avgOrders}
          </div>
        </div>
        <div style={{ borderLeftColor: 'rgb(175, 62, 143)' }} className="bg-white rounded-lg shadow-lg p-6 border-l-4">
          <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">
            Всього замовлень
          </div>
          <div style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mt-2">
            {totalOrders}
          </div>
        </div>
      </div>

      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <h2
              style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }}
              className="text-2xl font-bold mb-6"
            >
              👤 {fullName(viewUser)}
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span style={{ color: 'rgb(150, 150, 150)' }}>Логін</span>
                <span style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">
                  @{viewUser.username}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgb(150, 150, 150)' }}>Email</span>
                <span style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">
                  {viewUser.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgb(150, 150, 150)' }}>Зареєстрований</span>
                <span style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">
                  {new Date(viewUser.createdAt).toLocaleDateString('uk-UA')}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgb(150, 150, 150)' }}>Замовлень</span>
                <span style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">
                  {viewUser.orders}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgb(150, 150, 150)' }}>Статус</span>
                <span style={{ color: viewUser.isBlocked ? 'rgb(200, 80, 100)' : 'rgb(30, 150, 30)' }} className="font-semibold">
                  {viewUser.isBlocked ? 'Заблокований' : 'Активний'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setViewUser(null)}
              style={{ backgroundColor: 'rgb(175, 62, 143)' }}
              className="w-full text-white py-2 rounded-lg font-bold hover:opacity-90 transition"
            >
              Закрити
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <h2
              style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }}
              className="text-2xl font-bold mb-4"
            >
              ⚠️ Видалити користувача?
            </h2>
            <p style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="mb-6">
              Ви впевнені, що хочете видалити цей аккаунт? Цю дію неможливо скасувати.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isSubmitting}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Видалення...' : '🗑️ Видалити'}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                disabled={isSubmitting}
                style={{ backgroundColor: 'rgb(245, 245, 245)', color: 'rgb(119, 119, 119)' }}
                className="flex-1 py-2 rounded-lg font-bold hover:opacity-80 transition"
              >
                ❌ Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
