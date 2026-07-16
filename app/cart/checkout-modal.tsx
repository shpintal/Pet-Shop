'use client';

import { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: OrderData) => Promise<void>;
  total: number;
}

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export default function CheckoutModal({ isOpen, onClose, onSubmit, total }: CheckoutModalProps) {
  const [formData, setFormData] = useState<OrderData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Тернопіль',
    postalCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

    // Валідація
    if (!formData.firstName.trim()) {
      setError('Будь ласка, введіть ім\'я');
      return;
    }
    if (!formData.lastName.trim()) {
      setError('Будь ласка, введіть прізвище');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Введіть правильний email');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Будь ласка, введіть номер телефону');
      return;
    }
    if (!formData.address.trim()) {
      setError('Будь ласка, введіть адресу');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Помилка при оформленні замовлення');
        setIsSubmitting(false);
        return;
      }

      await onSubmit(formData);

      // Очистити форму
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Тернопіль',
        postalCode: ''
      });

      setIsSubmitting(false);
    } catch (err) {
      setError('Помилка мережі при оформленні замовлення');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Оформлення замовлення</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ім'я</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Іван"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Прізвище</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Петренко"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ivan@example.com"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+380 98 123 45 67"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Адреса</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="вул. Лесі Українки, 15"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
            />
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Місто</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Індекс</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="46000"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Order Total */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Сума замовлення:</span>
              <span className="text-2xl font-bold text-purple-600">{total} ₴</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-purple-500 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Обробка...' : 'Замовити'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
