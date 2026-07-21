import Footer from 'components/layout/footer';
import Link from 'next/link';
import { prisma } from 'lib/prisma';
import { getCurrentUser } from 'lib/user-auth';
import CartClient from './cart-client';

export const metadata = {
  title: 'Кошик',
  description: 'Ваш кошик покупок'
};

export default async function CartPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
        <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '56px', fontWeight: 700 }} className="mb-2">Кошик</h1>
          </div>
        </section>
        <section className="py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Увійдіть, щоб переглянути кошик</h2>
            <p className="text-xl text-gray-600 mb-8">Кошик прив'язаний до вашого акаунту</p>
            <Link
              href="/login?from=/cart"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition"
            >
              Увійти
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.userId },
    include: { product: true }
  });

  const initialCart = cartItems.map((item) => ({
    id: item.productId,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    emoji: item.product.emoji
  }));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '56px', fontWeight: 700 }} className="mb-2">Кошик</h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)' }}>{initialCart.length} товарів в кошику</p>
        </div>
      </section>

      {/* Cart Client Component */}
      <CartClient initialCart={initialCart} />

      {/* Benefits Section */}
      <section style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold mb-2">Безпечні платежі</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Ваші дані захищені новітніми технологіями</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold mb-2">Швидка доставка</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Доставка по Тернополю за 24 години</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💯</div>
              <h3 style={{ color: 'rgb(119, 119, 119)' }} className="text-xl font-bold mb-2">Гарантія якості</h3>
              <p style={{ color: 'rgb(119, 119, 119)' }}>Повне повернення грошей за 30 днів</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
