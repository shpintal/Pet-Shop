import Footer from 'components/layout/footer';

export const metadata = {
  title: 'Про нас',
  description: 'Дізнайтеся більше про наш Pet Shop магазин для домашніх тварин'
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '56px', fontWeight: 700 }} className="mb-4">Про нас</h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)' }}>Ваш надійний партнер у догляді домашніх тварин</p>
        </div>
      </section>

      {/* About Section 1: Our Vision */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                🐱
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              <div style={{ borderColor: 'rgb(175, 62, 143)' }} className="mb-8 border-4 p-8 bg-white rounded-lg">
                <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 700 }} className="mb-6">
                  Наше бачення в Pet Shop
                </h2>
                <p style={{ color: 'rgb(119, 119, 119)', fontSize: '18px', lineHeight: '1.8' }} className="mb-4">
                  Ми прагнемо стати найкращим зоомагазином в регіоні, пропонуючи якісні товари та послуги для домашніх тварин за доступними цінами.
                </p>
                <p style={{ color: 'rgb(119, 119, 119)', fontSize: '18px', lineHeight: '1.8' }}>
                  Кожна тварина заслуговує на любов, турботу та якісний догляд. Наша місія — допомогти вам дати своїм улюбленцям найкраще.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 style={{ color: 'rgb(175, 62, 143)' }} className="text-3xl font-bold mb-2">01</h3>
                  <p style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">НАШЕ БАЧЕННЯ</p>
                </div>
                <div>
                  <h3 style={{ color: 'rgb(200, 180, 200)' }} className="text-3xl font-bold mb-2">02</h3>
                  <p style={{ color: 'rgb(119, 119, 119)' }} className="font-semibold">НАШІ ЦІННОСТІ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 2: Our Values */}
      <section style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <div style={{ borderColor: 'rgb(175, 62, 143)' }} className="mb-8 border-4 p-8 bg-white rounded-lg">
                <h2 style={{ color: 'rgb(119, 119, 119)', fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 700 }} className="mb-6">
                  Наші цінності
                </h2>
                <ul className="space-y-4 text-lg" style={{ color: 'rgb(119, 119, 119)' }}>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span><strong>Якість:</strong> Ми обираємо товари найвищої якості для ваших улюбленців</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span><strong>Доступність:</strong> Справедливі ціни без компромісу на якості</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span><strong>Експертиза:</strong> Наша команда - лояльні поклонники тварин з багатим досвідом</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span><strong>Сервіс:</strong> Вчуйливе ставлення до кожного клієнта та їхніх потреб</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Image */}
            <div style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                🐾
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="py-16 md:py-24 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="text-center mb-12">Наші досягнення</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Доволених клієнтів</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Товарів в асортименті</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10+</div>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Років досвіду</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Онлайн підтримка</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700, color: 'rgb(119, 119, 119)' }} className="mb-6">Залишилися питання?</h2>
          <p style={{ fontSize: '18px', color: 'rgb(119, 119, 119)' }} className="mb-8">
            Зв'яжіться з нами та дізнайтеся все про наші товари та послуги
          </p>
          <a
            href="/#contact"
            style={{ backgroundColor: 'rgb(175, 62, 143)' }}
            className="inline-block text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Зв'яжіться з нами
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
