import Footer from 'components/layout/footer';
import Link from 'next/link';
import CartClient from './cart-client';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: 'Сухий корм для котів',
    price: 350,
    quantity: 2,
    emoji: '🐟'
  },
  {
    id: 3,
    name: 'Лоток для котів',
    price: 450,
    quantity: 1,
    emoji: '🚽'
  },
  {
    id: 7,
    name: 'Когтеточка',
    price: 580,
    quantity: 1,
    emoji: '🌳'
  }
];

export const metadata = {
  title: 'Кошик',
  description: 'Ваш кошик покупок'
};

export default function CartPage() {
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
