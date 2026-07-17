'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
}

const roles: { value: UserFormData['role']; label: string; description: string }[] = [
  { value: 'CUSTOMER', label: 'Клієнт', description: 'Звичайний покупець' },
  { value: 'SELLER', label: 'Продавець', description: 'Може додавати та редагувати товари' },
  { value: 'ADMIN', label: 'Адміністратор', description: 'Повний доступ до адмін-панелі' }
];

export default function UserForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'SELLER'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim() || formData.username.length < 3) {
      setError("Ім'я користувача повинно містити щонайменше 3 символи");
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Введіть правильний email');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Пароль повинен містити щонайменше 6 символів');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Помилка при створенні користувача');
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      router.refresh();

      setTimeout(() => {
        router.push('/admin/users');
      }, 1200);
    } catch {
      setError('Помилка при створенні користувача');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-2">
          Користувача створено!
        </h2>
        <p style={{ color: 'rgb(119, 119, 119)' }}>Перенаправлення до списку користувачів...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">
            Ім&apos;я
          </label>
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
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">
            Прізвище
          </label>
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

      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">
          Ім&apos;я користувача
        </label>
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
      </div>

      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">
          Email
        </label>
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

      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">
          Пароль
        </label>
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
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-3">
          Роль
        </label>
        <div className="grid grid-cols-1 gap-3">
          {roles.map((r) => (
            <label
              key={r.value}
              style={{
                borderColor: formData.role === r.value ? 'rgb(175, 62, 143)' : 'rgb(220, 180, 210)',
                backgroundColor: formData.role === r.value ? 'rgb(240, 220, 235)' : 'white'
              }}
              className="flex items-center gap-3 border-2 rounded-lg px-4 py-3 cursor-pointer transition"
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={formData.role === r.value}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <div>
                <div style={{ color: 'rgb(175, 62, 143)' }} className="font-semibold">
                  {r.label}
                </div>
                <div style={{ color: 'rgb(119, 119, 119)' }} className="text-sm">
                  {r.description}
                </div>
              </div>
            </label>
          ))}
        </div>
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
        {isSubmitting ? 'Створення...' : '➕ Створити користувача'}
      </button>
    </form>
  );
}
