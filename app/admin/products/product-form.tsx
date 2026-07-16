'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductFormData {
  id?: number;
  name: string;
  price: string;
  category: string;
  description: string;
  emoji: string;
  stock: string;
}

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: ProductFormData;
}

const categories = ['Корми', 'Іграшки', 'Аксесуари', 'Меблі', 'Екіпіровка', 'Здоров\'я'];
const emojis = ['🐱', '🐶', '🐠', '🐹', '🦜', '🐢', '🐭', '🐇', '🛏️', '🎾', '⛓️', '🌳', '🚽', '🎒', '💊', '🥩'];

export default function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>(
    product || {
      name: '',
      price: '',
      category: 'Корми',
      description: '',
      emoji: '🐾',
      stock: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const selectEmoji = (emoji: string) => {
    setFormData(prev => ({
      ...prev,
      emoji
    }));
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валідація
    if (!formData.name.trim()) {
      setError('Введіть назву товару');
      return;
    }

    if (!formData.price) {
      setError('Введіть ціну');
      return;
    }

    if (isNaN(Number(formData.price))) {
      setError('Ціна повинна бути числом');
      return;
    }

    if (!formData.description.trim()) {
      setError('Введіть опис товару');
      return;
    }

    if (!formData.stock) {
      setError('Введіть залишок на складі');
      return;
    }

    if (isNaN(Number(formData.stock))) {
      setError('Залишок повинен бути числом');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        emoji: formData.emoji,
        stock: Number(formData.stock)
      };

      const res = await fetch(
        mode === 'create' ? '/api/products' : `/api/products/${formData.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Помилка при збереженні товару');
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      router.refresh();

      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } catch (err) {
      setError('Помилка при збереженні товару');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-2">
          {mode === 'create' ? 'Товар додано!' : 'Товар оновлено!'}
        </h2>
        <p style={{ color: 'rgb(119, 119, 119)' }}>Перенаправлення на список товарів...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Lato, sans-serif' }} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Emoji Selection */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-3">Іконка товару</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{ borderColor: 'rgb(220, 180, 210)' }}
            className="w-full border-2 rounded-lg px-4 py-3 text-3xl transition text-center hover:opacity-80"
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(220, 180, 210)'; }}
          >
            {formData.emoji}
          </button>

          {showEmojiPicker && (
            <div style={{ borderColor: 'rgb(220, 180, 210)' }} className="absolute top-full mt-2 w-full bg-white border-2 rounded-lg p-4 grid grid-cols-4 gap-2 z-10 shadow-lg">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => selectEmoji(emoji)}
                  style={{
                    backgroundColor: formData.emoji === emoji ? 'rgb(240, 220, 235)' : 'transparent',
                  }}
                  className="text-3xl p-2 rounded hover:opacity-70 transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Назва товару *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Сухий корм для котів"
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Ціна (₴) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="350"
            style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
            className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(220, 180, 210)'; }}
          />
        </div>
        <div>
          <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Залишок (шт) *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="45"
            style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
            className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(175, 62, 143)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(220, 180, 210)'; }}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Категорія *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-4 py-3 outline-none transition"
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(220, 180, 210)'; }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label style={{ color: 'rgb(119, 119, 119)' }} className="block text-sm font-semibold mb-2">Опис товару *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Збалансований сухий корм преміум якості для котів..."
          rows={5}
          style={{ borderColor: 'rgb(220, 180, 210)', color: 'rgb(119, 119, 119)' }}
          className="w-full border-2 rounded-lg px-4 py-3 outline-none transition resize-none"
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(175, 62, 143)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(220, 180, 210)'; }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ backgroundColor: 'rgb(255, 240, 240)', borderColor: 'rgb(220, 180, 210)', color: 'rgb(200, 80, 100)' }} className="border-2 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: 'rgb(175, 62, 143)' }}
          className="flex-1 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting
            ? 'Збереження...'
            : mode === 'create'
              ? '➕ Додати товар'
              : '✏️ Оновити товар'}
        </button>
        <Link
          href="/admin/products"
          style={{ backgroundColor: 'rgb(245, 245, 245)', color: 'rgb(119, 119, 119)' }}
          className="flex-1 py-3 rounded-lg font-bold hover:opacity-80 transition text-center"
        >
          ❌ Скасувати
        </Link>
      </div>

      <p className="text-xs text-gray-500 text-center">* Обов'язкові поля</p>
    </form>
  );
}
