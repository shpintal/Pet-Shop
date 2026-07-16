'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../product-form';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  emoji: string;
  description: string;
}

export default function EditProductPage() {
  const params = useParams();
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const { product: found } = await res.json();
        setProduct({
          ...found,
          price: found.price.toString(),
          stock: found.stock.toString()
        } as any);
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: 'Lato, sans-serif' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p style={{ color: 'rgb(119, 119, 119)' }}>Завантаження...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: 'Lato, sans-serif' }}>
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4">❌</div>
          <h1 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-2">Товар не знайдено</h1>
          <p style={{ color: 'rgb(119, 119, 119)' }}>Товар з ID {id} не існує</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">✏️ Редагувати товар</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Оновіть інформацію про товар</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <ProductForm mode="edit" product={product as any} />
        </div>
      </section>
    </div>
  );
}
