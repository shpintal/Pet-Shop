'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface WishlistItem {
  id: number;
  name: string;
}

export default function WishlistClient() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">❤️ Обране</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>{wishlist.length} товарів в обраному</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {wishlist.length > 0 ? (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  style={{ borderColor: 'rgb(220, 180, 210)' }}
                  className="bg-white border-2 rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition"
                >
                  <div>
                    <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold">{item.name}</h3>
                    <p style={{ color: 'rgb(119, 119, 119)' }} className="text-sm mt-1">ID: {item.id}</p>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href="/products"
                      style={{ backgroundColor: 'rgb(175, 62, 143)' }}
                      className="px-4 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Перейти до товару
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{ backgroundColor: 'rgb(255, 240, 240)', color: 'rgb(200, 80, 100)' }}
                      className="px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🤍</div>
              <h2 style={{ color: 'rgb(119, 119, 119)' }} className="text-2xl font-bold mb-2">Обране порожнє</h2>
              <p style={{ color: 'rgb(119, 119, 119)' }} className="mb-6">Додайте товари до обраного щоб легше їх знайти пізніше</p>
              <Link
                href="/products"
                style={{ backgroundColor: 'rgb(175, 62, 143)' }}
                className="inline-block text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition"
              >
                Перейти до каталогу →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
