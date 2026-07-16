import Link from 'next/link';
import { prisma } from 'lib/prisma';
import ProductsTable from './products-table';

export const metadata = {
  title: 'Товари | Pet Shop Admin',
  description: 'Управління товарами'
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">🛍️ Товари</h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Управління каталогом товарів</p>
          </div>
          <Link
            href="/admin/products/add"
            style={{ backgroundColor: 'white', color: 'rgb(175, 62, 143)' }}
            className="px-6 py-3 rounded-lg font-bold hover:shadow-lg transition inline-block"
          >
            ➕ Додати товар
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ProductsTable products={products} />
        </div>
      </section>
    </div>
  );
}
