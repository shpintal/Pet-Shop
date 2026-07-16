'use client';

import Link from 'next/link';

export default function HomePage() {
  const stores = [
    { address: 'вул. Руська 27', phone: '+380 (67) 975 90 96' },
    { address: 'вул. Злуки 45 б (Грумінг)', phone: '+380 (67) 975 90 96' },
    { address: 'вул. Енергетична 3а (Грумінг)', phone: '+380 (67) 975 90 96' },
    { address: 'вул. Митрополита Шептицького 11', phone: '+380 (67) 975 90 96' },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '80px', fontWeight: 700 }} className="mb-4 leading-tight">
            Зоомагазин
          </h1>
          <h2 style={{ fontSize: '48px', fontWeight: 600 }} className="mb-6">
            Порадуйте своїх улюбленців
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }} className="mb-8 max-w-2xl leading-relaxed">
            Наш Зоомагазин цінує якість, комфорт та індивідуальність наших товарів
          </p>
          <Link
            href="/products"
            style={{ backgroundColor: 'white', color: 'rgb(175, 62, 143)' }}
            className="inline-block font-bold px-8 py-3 rounded hover:opacity-90 transition text-lg"
          >
            Дізнатися більше
          </Link>
        </div>
      </section>

      {/* Offer Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700 }} className="mb-4">
            Поспішай!
          </h2>
          <h3 style={{ fontSize: '32px', fontWeight: 600 }} className="mb-6">
            Купуй сьогодні та отримай
          </h3>
          <p style={{ fontSize: '24px', fontWeight: 600 }} className="mb-8">
            Безкоштовну доставку
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }} className="mb-6">
            в межах Тернополя при замовленні на суму більше 500 грн
          </p>
          <Link
            href="/products"
            style={{ backgroundColor: 'white', color: 'rgb(175, 62, 143)' }}
            className="inline-block font-bold px-8 py-3 rounded hover:opacity-90 transition text-lg"
          >
            Дізнатися більше
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700, color: 'rgb(175, 62, 143)' }} className="mb-12">
            Про нас
          </h2>

          <div className="mb-16">
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 600, color: 'rgb(119, 119, 119)' }} className="mb-6">
              Наше бачення в Зоомагазині
            </h3>
            <p style={{ color: 'rgb(119, 119, 119)', fontSize: '18px', lineHeight: '1.8' }} className="mb-4 max-w-3xl">
              Стати зоомагазином #1 для домашніх тварин, а також простором, де власники можуть отримати будь-які товари, що пов'язані з їхніми улюбленцями.
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 600, color: 'rgb(119, 119, 119)' }} className="mb-6">
              Наші цінності
            </h3>
            <p style={{ color: 'rgb(119, 119, 119)', fontSize: '18px', lineHeight: '1.8' }} className="max-w-3xl">
              Досконалість, турбота, професіоналізм, інновації та послідовність. Ми прагнемо надати найкращий сервіс для вас та ваших домашніх улюбленців.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700 }} className="mb-6">
            Ласощі для всіх тварин
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }} className="mb-8 max-w-2xl leading-relaxed">
            Побалуйте своїх домашніх улюбленців нашим асортиментом якісних ласощів для собак, котів, папуг, риб та гризунів
          </p>
          <Link
            href="/products"
            style={{ backgroundColor: 'white', color: 'rgb(175, 62, 143)' }}
            className="inline-block font-bold px-8 py-3 rounded hover:opacity-90 transition text-lg"
          >
            Перейти до каталогу
          </Link>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700, color: 'rgb(175, 62, 143)' }} className="mb-12">
            Адреси наших магазинів
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stores.map((store, index) => (
              <div key={index} style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="p-6 rounded">
                <h3 style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 600 }} className="mb-3">
                  Зоомагазин Віскас
                </h3>
                <p style={{ color: 'rgb(119, 119, 119)', fontSize: '16px', lineHeight: '1.6' }} className="mb-4">
                  м. Тернопіль<br />
                  {store.address}
                </p>
                <a href={`tel:${store.phone}`} style={{ color: 'rgb(175, 62, 143)' }} className="hover:underline font-semibold">
                  {store.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700, color: 'rgb(175, 62, 143)' }} className="mb-12">
            Наші контакти
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }} className="mb-4">
                Телефон
              </h3>
              <a href="tel:+380679759096" style={{ color: 'rgb(175, 62, 143)' }} className="hover:underline text-lg font-semibold">
                +380 (67) 975 90 96
              </a>
            </div>

            <div>
              <h3 style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }} className="mb-4">
                Email
              </h3>
              <div className="space-y-2">
                <a href="mailto:zootovarizlyki@gmail.com" style={{ color: 'rgb(175, 62, 143)' }} className="hover:underline block font-semibold">
                  zootovarizlyki@gmail.com
                </a>
                <a href="mailto:zoomag.ter@gmail.com" style={{ color: 'rgb(175, 62, 143)' }} className="hover:underline block font-semibold">
                  zoomag.ter@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }} className="mb-4">
                Графік роботи
              </h3>
              <p style={{ color: 'rgb(119, 119, 119)', fontSize: '16px', lineHeight: '1.8' }}>
                пн-сб: 10:00 - 20:00<br />
                нд: 10:00 - 17:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: 'rgb(175, 62, 143)' }} className="mb-8">
            Ми в соціальних мережах
          </h3>
          <div className="flex justify-center gap-8">
            <a
              href="https://instagram.com/zoomagviskas"
              style={{ color: 'rgb(175, 62, 143)' }}
              className="hover:opacity-70 transition text-2xl font-semibold"
            >
              📷 Instagram
            </a>
            <a
              href="https://www.facebook.com/zoomagviskas"
              style={{ color: 'rgb(175, 62, 143)' }}
              className="hover:opacity-70 transition text-2xl font-semibold"
            >
              👍 Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'rgb(245, 245, 245)', color: 'rgb(119, 119, 119)' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Pet Shop. Всі права захищені.
          </p>
          <p className="text-sm mt-2">
            Зоотовари • Зоомагазин • Товари для тварин
          </p>
        </div>
      </footer>
    </div>
  );
}
