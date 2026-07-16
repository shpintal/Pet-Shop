'use client';

import { useState } from 'react';

interface PaymentFormProps {
  total: number;
  onSuccess?: () => void;
}

export default function PaymentForm({ total, onSuccess }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'liqpay'>('card');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Симуляція обробки платежу
    setTimeout(() => {
      alert(`✅ Платіж на ${total}₴ успішно обробків!`);
      if (onSuccess) onSuccess();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Оплата</h2>

      {/* Payment Method */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">Метод оплати</label>
        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'liqpay')}
              className="mr-3"
            />
            <span className="flex-1">
              <span className="font-semibold">💳 Карта</span>
              <p className="text-sm text-gray-600">Visa, Mastercard, інші карти</p>
            </span>
          </label>

          <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition">
            <input
              type="radio"
              value="liqpay"
              checked={paymentMethod === 'liqpay'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'liqpay')}
              className="mr-3"
            />
            <span className="flex-1">
              <span className="font-semibold">💰 LiqPay</span>
              <p className="text-sm text-gray-600">Українська система платежів</p>
            </span>
          </label>
        </div>
      </div>

      {/* Card Details (Placeholder) */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Номер карти
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                MM/YY
              </label>
              <input
                type="text"
                placeholder="12/25"
                maxLength={5}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                maxLength={4}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-200">
          <span className="text-gray-700">Сума до оплати:</span>
          <span className="text-3xl font-bold text-purple-600">₴{total}</span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>✅ Безпечний платіж</p>
          <p>✅ Негайна обробка</p>
          <p>✅ Гарантія повернення грошей</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {isProcessing ? '⏳ Обробка платежу...' : `💳 Оплатити ₴${total}`}
      </button>

      <p className="text-center text-sm text-gray-600">
        Вам не буде нараховуватися плата до натискання кнопки
      </p>
    </form>
  );
}
