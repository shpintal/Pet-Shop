'use client';

import Link from 'next/link';

export default function HomePage() {
  const stores = [
    { address: 'вул. Руська 27', phone: '+380 (67) 975 90 96' },
    { address: 'вул. Злуки 45 б (Грумінг)', phone: '+380 (67) 975 90 96' },
    { address: 'вул. Енергетична 3а (Грумінг)', phone: '+380 (67) 975 90 96' },
    { address: 'вул. Митрополита Шептицького 11', phone: '+380 (67) 975 90 96' },
  ];

  const badges = [
    { icon: '🌿', label: '100% Органічно' },
    { icon: '🥗', label: 'Свіжі та якісні' },
    { icon: '📍', label: 'Локальні виробники' },
    { icon: '🌾', label: 'Органічний продукт' },
    { icon: '🌱', label: 'Веган-лінійка' },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '72px', fontWeight: 700 }} className="mb-6 leading-tight">
              Зоомагазин
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block w-10 h-0.5 bg-white flex-shrink-0" />
              <h2 style={{ fontSize: '30px', fontWeight: 700, letterSpacing: '0.5px' }} className="uppercase leading-snug">
                Порадуйте своїх улюбленців
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }} className="mb-8 max-w-xl leading-relaxed">
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
          <div className="hidden md:flex justify-center items-center">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} className="rounded-full p-12">
              <span style={{ fontSize: '220px', lineHeight: 1 }} className="select-none">🐈</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            style={{ backgroundColor: 'rgb(196, 60, 168)' }}
            className="rounded-2xl overflow-hidden grid md:grid-cols-2 gap-8 items-center p-10 md:p-16 text-white"
          >
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '34px', fontWeight: 700 }} className="mb-6 leading-snug">
                Подаруйте своїм улюбленцям любов на яку вони заслуговують!
              </h2>
              <div className="flex gap-3 text-5xl opacity-80">
                <span>🐾</span>
                <span>🐾</span>
              </div>
            </div>
            <div className="flex justify-center">
              <span style={{ fontSize: '140px', lineHeight: 1 }} className="select-none">
                🐕‍🦺💕🐈
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Offer Section */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700 }} className="mb-4">
              Поспішай!
            </h2>
            <h3 style={{ fontSize: '24px', fontWeight: 600 }} className="mb-6">
              Купуй сьогодні та отримай
            </h3>
            <p style={{ fontSize: '20px', fontWeight: 700 }} className="mb-2">
              Безкоштовну доставку
            </p>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }} className="mb-8">
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
          <div className="hidden md:flex justify-center items-center">
            <span style={{ fontSize: '240px', lineHeight: 1 }} className="select-none">
              🐱
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700, color: 'rgb(60, 60, 60)' }}
            className="mb-12"
          >
            Про нас
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div
              style={{ backgroundColor: 'rgb(196, 60, 168)' }}
              className="rounded-2xl h-72 md:h-80 flex items-center justify-center"
            >
              <span style={{ fontSize: '170px' }} className="select-none">
                🐈‍⬛
              </span>
            </div>
            <div>
              <h3
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: 'rgb(60, 60, 60)' }}
                className="mb-4 leading-snug"
              >
                Наше бачення в Зоомагазині — стати зоомагазином #1
              </h3>
              <p style={{ color: 'rgb(119, 119, 119)', fontSize: '18px', lineHeight: '1.8' }}>
                для домашніх тварин, а також простором, де власники можуть отримати будь-які товари,
                що пов&apos;язані з домашніми тваринами, за доступною ціною.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="rounded-xl grid grid-cols-2">
            <div style={{ borderColor: 'rgb(220, 180, 210)' }} className="p-8 text-center border-r">
              <div style={{ color: 'rgb(220, 180, 210)', fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700 }}>
                01
              </div>
              <div style={{ color: 'rgb(175, 62, 143)', fontWeight: 700, letterSpacing: '1px' }} className="uppercase text-sm mt-2">
                Наше бачення
              </div>
            </div>
            <div className="p-8 text-center">
              <div style={{ color: 'rgb(210, 210, 210)', fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700 }}>
                02
              </div>
              <div style={{ color: 'rgb(119, 119, 119)', fontWeight: 700, letterSpacing: '1px' }} className="uppercase text-sm mt-2">
                Наші цінності
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treats Section */}
      <section style={{ backgroundColor: 'rgb(230, 242, 240)' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🦴 🐟 🥕</div>
          <h2
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700, color: 'rgb(60, 60, 60)' }}
            className="mb-4 leading-snug"
          >
            Ласощі для собак, котів, папуг, риб та гризунів
          </h2>
          <p style={{ color: 'rgb(119, 119, 119)', fontSize: '18px' }} className="mb-8">
            Побалуйте своїх домашніх улюбленців нашим асортиментом якісних ласощів для собак і котів
          </p>
          <Link
            href="/products"
            style={{ backgroundColor: 'rgb(175, 62, 143)' }}
            className="inline-block text-white font-bold px-8 py-3 rounded hover:opacity-90 transition text-lg"
          >
            Дізнатися більше
          </Link>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700, color: 'rgb(175, 62, 143)' }}
            className="mb-12"
          >
            Адреси наших магазинів
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stores.map((store, index) => (
              <div key={index} style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="p-6 rounded">
                <h3
                  style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 600 }}
                  className="mb-3"
                >
                  Зоомагазин Віскас
                </h3>
                <p style={{ color: 'rgb(119, 119, 119)', fontSize: '16px', lineHeight: '1.6' }} className="mb-4">
                  м. Тернопіль
                  <br />
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

      {/* Quality Badges Strip */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-12 gap-y-8">
          {badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-white opacity-90">
              <span className="text-4xl mb-2">{badge.icon}</span>
              <span className="text-sm font-semibold text-center max-w-[110px]">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts Section */}
      <section style={{ backgroundColor: 'rgb(245, 245, 245)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '48px', fontWeight: 700, color: 'rgb(175, 62, 143)' }}
            className="mb-12"
          >
            Наші контакти
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3
                style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }}
                className="mb-4"
              >
                Телефон
              </h3>
              <a href="tel:+380679759096" style={{ color: 'rgb(175, 62, 143)' }} className="hover:underline text-lg font-semibold">
                +380 (67) 975 90 96
              </a>
            </div>

            <div>
              <h3
                style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }}
                className="mb-4"
              >
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
              <h3
                style={{ color: 'rgb(175, 62, 143)', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }}
                className="mb-4"
              >
                Графік роботи
              </h3>
              <p style={{ color: 'rgb(119, 119, 119)', fontSize: '16px', lineHeight: '1.8' }}>
                пн-сб: 10:00 - 20:00
                <br />
                нд: 10:00 - 17:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: 'rgb(175, 62, 143)' }}
            className="mb-8"
          >
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
      <footer style={{ backgroundColor: 'rgb(51, 51, 51)', color: 'rgb(200, 200, 200)' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div>
              <h4 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-white font-bold mb-4 uppercase text-sm tracking-wide">
                Адреси наших магазинів
              </h4>
              <ul className="space-y-1 text-sm">
                {stores.map((store, index) => (
                  <li key={index}>Зоомагазин Віскас, {store.address}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-white font-bold mb-4 uppercase text-sm tracking-wide">
                Наші контакти
              </h4>
              <p className="text-sm mb-1">
                <a href="tel:+380679759096" style={{ color: 'rgb(220, 180, 210)' }} className="hover:underline">
                  +380 (67) 975 90 96
                </a>
              </p>
              <p className="text-sm mb-1">
                <a href="mailto:zootovarizlyki@gmail.com" style={{ color: 'rgb(220, 180, 210)' }} className="hover:underline">
                  zootovarizlyki@gmail.com
                </a>
              </p>
              <p className="text-sm">пн-сб з 10:00 по 20:00, нд з 10:00 по 17:00</p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'Poppins, sans-serif' }} className="text-white font-bold mb-4 uppercase text-sm tracking-wide">
                Ми в соц мережах
              </h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/zoomagviskas" style={{ color: 'rgb(220, 180, 210)' }} className="hover:opacity-80">
                  Instagram
                </a>
                <a href="https://www.facebook.com/zoomagviskas" style={{ color: 'rgb(220, 180, 210)' }} className="hover:opacity-80">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div style={{ borderColor: 'rgb(80, 80, 80)' }} className="border-t pt-6 text-center">
            <p className="text-sm">© 2024 Pet Shop. Всі права захищені.</p>
            <p className="text-sm mt-1">Зоотовари • Зоомагазин • Товари для тварин</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
