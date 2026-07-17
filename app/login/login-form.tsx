'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email.includes('@')) {
      setError('Введіть правильний email');
      return;
    }

    if (!formData.password) {
      setError('Введіть пароль');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Email або пароль невірні');
        setIsLoading(false);
        return;
      }

      // Зберегти поточного користувача (лише для відображення в UI)
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      setSuccess(true);
      const destination = data.user.role === 'ADMIN' || data.user.role === 'SELLER' ? '/admin' : '/';
      setTimeout(() => {
        router.push(destination);
      }, 1500);
    } catch (err) {
      setError('Помилка при вході');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-2">Ви увійшли!</h2>
        <p style={{ color: 'rgb(119, 119, 119)' }}>Перенаправлення на головну...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Email */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ivan@example.com"
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
          onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
      </div>

      {/* Password */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Пароль</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••"
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
          onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ backgroundColor: 'rgb(255, 240, 240)', borderColor: 'rgb(220, 180, 210)', color: 'rgb(200, 80, 100)' }} className="border-2 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{ backgroundColor: 'rgb(175, 62, 143)' }}
        className="w-full text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
      >
        {isLoading ? 'Вхід...' : 'Увійти'}
      </button>

      {/* Register Link */}
      <p style={{ color: 'rgb(119, 119, 119)' }} className="text-center text-sm">
        Немає аккаунту?{' '}
        <Link href="/register" style={{ color: 'rgb(175, 62, 143)' }} className="font-semibold hover:underline">
          Зареєструватися
        </Link>
      </p>

      {/* Demo Info */}
      <div style={{ backgroundColor: 'rgb(220, 255, 220)', borderColor: 'rgb(150, 200, 150)', color: 'rgb(30, 100, 30)' }} className="border-2 p-4 rounded-lg text-sm">
        <p className="font-semibold mb-2">📝 Для тестування:</p>
        <p>Email: test@example.com</p>
        <p>Пароль: 123456</p>
        <p className="mt-2 text-xs">(Спочатку зареєструйтесь на сторінці реєстрації)</p>
      </div>
    </form>
  );
}
