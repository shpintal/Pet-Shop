'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Валідація на клієнті
    if (!formData.username.trim()) {
      setError('Введіть ім\'я користувача');
      return;
    }

    if (formData.username.length < 3) {
      setError('Ім\'я користувача повинно містити щонайменше 3 символи');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Введіть правильний email');
      return;
    }

    if (!formData.password) {
      setError('Введіть пароль');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль повинен містити щонайменше 6 символів');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не збігаються');
      return;
    }

    if (!formData.firstName.trim()) {
      setError('Введіть ім\'я');
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Введіть прізвище');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Помилка при реєстрації');
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('Помилка при реєстрації');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-2">Реєстрація успішна!</h2>
        <p style={{ color: 'rgb(119, 119, 119)' }} className="mb-6">Перенаправлення на сторінку входу...</p>
        <div style={{ backgroundColor: 'rgb(240, 220, 235)' }} className="rounded-lg p-4">
          <p style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">
            Ваш аккаунт створений. Тепер ви можете увійти з вашим email та паролем.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 space-y-4 cursor-default">
      <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>

      {/* Ім'я та Прізвище */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Ім'я</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Іван"
            style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
            className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
            onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
          />
        </div>
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Прізвище</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Петренко"
            style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
            className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
            onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
          />
        </div>
      </div>

      {/* Ім'я користувача */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Ім'я користувача</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="myusername"
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
          onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
        <p style={{ color: 'rgb(150, 150, 150)' }} className="text-xs mt-1">Мінімум 3 символи</p>
      </div>

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
          className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
          onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
      </div>

      {/* Телефон */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Телефон (необов'язково)</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+380 98 123 45 67"
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
          onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
      </div>

      {/* Пароль та Підтвердження */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••"
            style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
            className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
            onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
          />
          <p style={{ color: 'rgb(150, 150, 150)' }} className="text-xs mt-1">Мінімум 6 символів</p>
        </div>
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Підтверджання пароля</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••"
            style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
            className="w-full border-2 rounded-lg px-3 py-2 outline-none transition"
            onFocus={(e) => { e.target.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgb(220, 180, 210)'; }}
          />
        </div>
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
        disabled={isSubmitting}
        style={{ backgroundColor: 'rgb(175, 62, 143)' }}
        className="w-full text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
      </button>

      {/* Login Link */}
      <p style={{ color: 'rgb(119, 119, 119)' }} className="text-center text-sm">
        Вже маєте аккаунт?{' '}
        <Link href="/login" style={{ color: 'rgb(175, 62, 143)' }} className="font-semibold hover:underline">
          Увійти
        </Link>
      </p>
    </form>
  );
}
