'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Невірний пароль');
        setIsSubmitting(false);
        return;
      }

      const from = searchParams.get('from') || '/admin';
      router.push(from);
      router.refresh();
    } catch {
      setError('Помилка при вході');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: 'Lato, sans-serif' }}>
      <div className="w-full max-w-sm">
        <h1
          style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif' }}
          className="text-2xl font-bold mb-2 text-center"
        >
          🔒 Адмін-панель
        </h1>
        <p style={{ color: 'rgb(119, 119, 119)' }} className="text-center mb-8 text-sm">
          Введіть пароль для доступу
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-4">
          <div>
            <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              autoFocus
              style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
              className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
              onFocus={(e) => {
                e.target.style.borderColor = 'rgb(175, 62, 143)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgb(220, 180, 210)';
              }}
            />
          </div>

          {error && (
            <div
              style={{ backgroundColor: 'rgb(255, 240, 240)', borderColor: 'rgb(220, 180, 210)', color: 'rgb(200, 80, 100)' }}
              className="border-2 p-3 rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: 'rgb(175, 62, 143)' }}
            className="w-full text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Перевірка...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
