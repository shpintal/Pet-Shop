'use client';

import Link from 'next/link';
import { useState } from 'react';
import CheckoutModal from './checkout-modal';
import PaymentModal, { PaymentData } from './payment-modal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export default function CartClient({ initialCart }: { initialCart: CartItem[] }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    }).catch(() => {});
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    fetch(`/api/cart/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    try {
      console.log('Платіж обробляється:', {
        method: paymentData.paymentMethod,
        amount: subtotal + (subtotal > 500 ? 0 : 100) + Math.round(subtotal * 0.1)
      });

      // Імітація обробки платежу
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsPaymentOpen(false);
      setOrderSuccess(true);
      setCartItems([]);

      setTimeout(() => {
        setOrderSuccess(false);
      }, 7000);
    } catch (error) {
      console.error('Помилка при обробці платежу:', error);
    }
  };

  const handleCheckoutSubmit = async (newOrderId: string) => {
    setOrderId(newOrderId);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(true);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 100;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Success Message */}
      {orderSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-40 animate-pulse">
          <span className="text-2xl">✓</span>
          <div>
            <h3 className="font-bold">Замовлення оформлено!</h3>
            <p className="text-sm opacity-90">Дякуємо за покупку!</p>
            {orderId && <p className="text-xs opacity-80 mt-1">№ {orderId}</p>}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
        total={cartItems.length > 0 ? subtotal + (subtotal > 500 ? 0 : 100) + Math.round(subtotal * 0.1) : 0}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSubmit={handlePaymentSubmit}
        total={total}
      />

      {cartItems.length > 0 ? (
        /* Cart with Items */
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 border-purple-200 rounded-lg p-6 flex gap-6 items-start hover:shadow-lg transition"
                  >
                    {/* Product Image */}
                    <div className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg p-6 flex items-center justify-center min-w-[120px] h-[120px]">
                      <span className="text-4xl">{item.emoji}</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-purple-600 mb-4">
                        {item.price} ₴
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">Кількість:</span>
                        <div className="flex items-center border-2 border-purple-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-purple-100 transition"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-purple-100 transition"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xl font-bold text-gray-800">
                          = {item.price * item.quantity} ₴
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-lg transition"
                      title="Видалити товар"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <div className="mt-8">
                <Link
                  href="/products"
                  className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ← Продовжити покупки
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border-4 border-purple-500 rounded-lg p-8 bg-white sticky top-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Деталі замовлення</h2>

                <div className="space-y-4 mb-6 pb-6 border-b-2 border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Сума товарів:</span>
                    <span className="font-semibold text-gray-800">{subtotal} ₴</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Доставка:</span>
                    <span className="font-semibold text-gray-800">
                      {shipping === 0 ? (
                        <span className="text-green-600">Безкоштовно</span>
                      ) : (
                        `${shipping} ₴`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ПДВ (10%):</span>
                    <span className="font-semibold text-gray-800">{tax} ₴</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 text-xl font-bold">
                  <span className="text-gray-800">Разом:</span>
                  <span className="text-purple-600">{total} ₴</span>
                </div>

                {subtotal <= 500 && (
                  <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg mb-6">
                    Додайте товарів на {500 - subtotal} ₴ для безкоштовної доставки!
                  </p>
                )}

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition mb-3">
                  Оформити замовлення
                </button>

                <button className="w-full border-2 border-purple-500 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                  Продовжити як гість
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Empty Cart */
        <section className="py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ваш кошик порожній</h2>
            <p className="text-xl text-gray-600 mb-8">
              Почніть добавляти товари до кошика з нашого каталогу
            </p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition"
            >
              Перейти до каталогу
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
