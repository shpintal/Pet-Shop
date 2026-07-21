import Footer from 'components/layout/footer';
import { prisma } from 'lib/prisma';
import { getCurrentUser } from 'lib/user-auth';
import ProductsClient from './products-client';

export const metadata = {
  title: 'Продукція',
  description: 'Каталог товарів для домашніх тварин'
};

export default async function ProductsPage() {
  const [products, user] = await Promise.all([
    prisma.product.findMany({ orderBy: { id: 'asc' } }),
    getCurrentUser()
  ]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '56px', fontWeight: 700 }} className="mb-4">Продукція</h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)' }}>Всього що потрібно вашим улюбленцям</p>
        </div>
      </section>

      {/* Client Component with interactive functionality */}
      <ProductsClient products={products} isLoggedIn={!!user} />

      <Footer />
    </div>
  );
}
