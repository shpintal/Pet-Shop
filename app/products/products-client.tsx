'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  price: number | string;
  category: string;
  description?: string | null;
  emoji: string;
  stock?: number;
}

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'price-desc'>('name');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Корми', 'Іграшки', 'Аксесуари', 'Меблі', 'Екіпіровка', 'Здоров\'я'];

  // Фільтрування та сортування товарів
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const price = typeof product.price === 'string' ? parseInt(product.price) : product.price;

      // Фільтр по категорії
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    // Сортування
    filtered.sort((a, b) => {
      const aPrice = typeof a.price === 'string' ? parseInt(a.price) : a.price;
      const bPrice = typeof b.price === 'string' ? parseInt(b.price) : b.price;

      switch (sortBy) {
        case 'price':
          return aPrice - bPrice;
        case 'price-desc':
          return bPrice - aPrice;
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'uk');
      }
    });

    return filtered;
  }, [products, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product.id);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    const price = typeof product.price === 'string' ? parseInt(product.price) : product.price;

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: price,
        quantity: 1,
        emoji: product.emoji
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    setTimeout(() => {
      router.push('/cart');
    }, 300);
  };

  return (
    <>
      {/* Filter Section */}
      <section style={{ fontFamily: 'Lato, sans-serif', backgroundColor: 'rgb(245, 240, 248)', borderBottomColor: 'rgb(220, 180, 210)' }} className="py-6 border-b-2">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{ backgroundColor: 'rgb(175, 62, 143)' }}
              className="w-full text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {showFilters ? '🔽 Приховати фільтри' : '🔼 Показати фільтри'}
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-gray-700 mb-3">📂 Категорії</h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    backgroundColor: selectedCategory === null ? 'rgb(175, 62, 143)' : 'white',
                    color: selectedCategory === null ? 'white' : 'rgb(119, 119, 119)',
                    borderColor: 'rgb(220, 180, 210)'
                  }}
                  className={`px-4 py-2 rounded-full font-semibold transition border-2 ${
                    selectedCategory === null ? '' : 'hover:bg-purple-50'
                  }`}
                >
                  ✓ Все ({products.length})
                </button>
                {categories.map((category) => {
                  const count = products.filter(p => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        backgroundColor: selectedCategory === category ? 'rgb(175, 62, 143)' : 'white',
                        color: selectedCategory === category ? 'white' : 'rgb(119, 119, 119)',
                        borderColor: 'rgb(220, 180, 210)'
                      }}
                      className={`px-4 py-2 rounded-full font-semibold transition whitespace-nowrap border-2 ${
                        selectedCategory === category ? '' : 'hover:opacity-80'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div style={{ borderColor: 'rgb(220, 180, 210)' }} className="bg-white rounded-lg p-4 border-2">
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="font-bold mb-3">📊 Сортування</h3>
              <div className="space-y-2">
                {[
                  { value: 'name', label: '🔤 За назвою (A-Z)' },
                  { value: 'price', label: '💰 Ціна: від дешевших' },
                  { value: 'price-desc', label: '💵 Ціна: від дорожчих' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSortBy('name');
              }}
              style={{ backgroundColor: 'rgb(255, 240, 240)', color: 'rgb(200, 80, 100)' }}
              className="w-full py-2 rounded-lg font-semibold hover:opacity-80 transition"
            >
              ❌ Скинути фільтри
            </button>
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <p style={{ color: 'rgb(119, 119, 119)' }}>
            <span style={{ color: 'rgb(175, 62, 143)' }} className="font-bold">{filteredProducts.length}</span> товарів знайдено
            {selectedCategory && ` у категорії "${selectedCategory}"`}
            {selectedCategory && ' • '}
            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSortBy('name');
                }}
                style={{ color: 'rgb(175, 62, 143)' }}
                className="hover:underline ml-2"
              >
                Очистити фільтри
              </button>
            )}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ borderColor: 'rgb(220, 180, 210)' }}
                  className="bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  {/* Product Image Placeholder */}
                  <div className="bg-gradient-to-br purple-300 h-48 flex items-center justify-center">
                    <span className="text-6xl">{product.emoji}</span>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    </div>

                    <span style={{ backgroundColor: 'rgb(240, 220, 235)', color: 'rgb(175, 62, 143)' }} className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {product.category}
                    </span>

                    <p style={{ color: 'rgb(119, 119, 119)' }} className="mb-4 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <span style={{ color: 'rgb(175, 62, 143)' }} className="text-2xl font-bold">
                        ₴{typeof product.price === 'string' ? product.price.replace(' ₴', '') : product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={selectedProduct === product.id}
                        style={{
                          backgroundColor: selectedProduct === product.id ? 'rgb(34, 197, 94)' : 'rgb(175, 62, 143)'
                        }}
                        className="px-4 py-2 rounded-lg font-semibold transition text-white hover:opacity-90"
                      >
                        {selectedProduct === product.id ? '✓ Додано' : 'У кошик'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-2xl font-bold mb-2">Товарів не знайдено</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }} className="mb-6">Спробуйте змінити фільтри або переглянути інші категорії</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSortBy('name');
                }}
                style={{ backgroundColor: 'rgb(175, 62, 143)' }}
                className="inline-block text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
              >
                ↺ Скинути фільтри
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold mb-2">Швидка доставка</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Доставка по Тернополю за 24 години</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✓</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold mb-2">Якість гарантована</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Тільки оригінальні товари від перевірених виробників</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold mb-2">Консультація</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Наша команда завжди готова допомогти</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
