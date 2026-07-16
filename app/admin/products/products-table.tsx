'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  emoji: string;
  description?: string | null;
}

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const avgPrice = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0;

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full">
          <thead style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Товар</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Категорія</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Ціна</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Залишок</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Вартість</th>
              <th className="px-6 py-4 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } border-b hover:bg-purple-50 transition`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{product.emoji}</span>
                    <div>
                      <p style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="font-semibold">{product.name}</p>
                      <p style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="text-xs">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span style={{ backgroundColor: 'rgb(220, 180, 210)', color: 'rgb(175, 62, 143)' }} className="px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold" style={{ color: 'rgb(175, 62, 143)' }}>₴{product.price}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.stock > 20
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock} шт.
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold" style={{ color: 'rgb(175, 62, 143)' }}>₴{product.price * product.stock}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      style={{ color: 'rgb(175, 62, 143)' }}
                      className="font-semibold px-2 py-1 hover:opacity-80 rounded transition"
                    >
                      ✏️ Редагувати
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="text-red-600 hover:text-red-800 font-semibold px-2 py-1 hover:bg-red-50 rounded transition"
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: 'rgb(175, 62, 143)' }}>
          <div style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="text-sm">Всього товарів</div>
          <div className="text-3xl font-bold mt-2" style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif' }}>{products.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: 'rgb(175, 62, 143)' }}>
          <div style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="text-sm">Середня ціна</div>
          <div className="text-3xl font-bold mt-2" style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif' }}>₴{avgPrice}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: 'rgb(175, 62, 143)' }}>
          <div style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="text-sm">Всього на складі</div>
          <div className="text-3xl font-bold mt-2" style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif' }}>{totalStock} шт.</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: 'rgb(175, 62, 143)' }}>
          <div style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="text-sm">Вартість складу</div>
          <div className="text-3xl font-bold mt-2" style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif' }}>₴{totalValue}</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif' }} className="text-2xl font-bold mb-4">
              ⚠️ Видалити товар?
            </h2>
            <p style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Lato, sans-serif' }} className="mb-6">
              Ви впевнені, що хочете видалити цей товар? Цю дію неможливо скасувати.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition disabled:opacity-50"
              >
                {isDeleting ? 'Видалення...' : '🗑️ Видалити'}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
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
