'use client';

import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (paymentData: PaymentData) => Promise<void>;
  total: number;
}

export interface PaymentData {
  paymentMethod: 'card' | 'cash' | 'transfer';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

export default function PaymentModal({ isOpen, onClose, onSubmit, total }: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePaymentMethodChange = (method: 'card' | 'cash' | 'transfer') => {
    setPaymentData(prev => ({ ...prev, paymentMethod: method }));
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setPaymentData(prev => ({
      ...prev,
      cvv: value
    }));
  };

  const validateCardData = (): boolean => {
    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.cardNumber?.replace(/\s/g, '').match(/^\d{16}$/)) {
        setError('Номер карти має містити 16 цифр');
        return false;
      }
      if (!paymentData.cardHolder?.trim()) {
        setError('Введіть ім\'я власника карти');
        return false;
      }
      if (!paymentData.expiryDate?.match(/^\d{2}\/\d{2}$/)) {
        setError('Дата має бути у форматі MM/YY');
        return false;
      }
      if (!paymentData.cvv?.match(/^\d{3,4}$/)) {
        setError('CVV має містити 3-4 цифри');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCardData()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(paymentData);
      setIsSubmitting(false);
    } catch (err) {
      setError('Помилка при обробці платежу');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Оплата</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Order Total */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border-2 border-purple-300 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Сума до сплати:</span>
              <span className="text-2xl font-bold text-purple-600">{total} ₴</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Способ оплати
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentData.paymentMethod === 'card'}
                  onChange={() => handlePaymentMethodChange('card')}
                  className="mr-3"
                />
                <span className="text-gray-800 font-semibold">💳 Карта</span>
              </label>
              <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentData.paymentMethod === 'cash'}
                  onChange={() => handlePaymentMethodChange('cash')}
                  className="mr-3"
                />
                <span className="text-gray-800 font-semibold">💵 Готівка при отриманні</span>
              </label>
              <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={paymentData.paymentMethod === 'transfer'}
                  onChange={() => handlePaymentMethodChange('transfer')}
                  className="mr-3"
                />
                <span className="text-gray-800 font-semibold">🏦 Банківський переказ</span>
              </label>
            </div>
          </div>

          {/* Card Payment Form */}
          {paymentData.paymentMethod === 'card' && (
            <>
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Номер карти
                </label>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-1">Без пробілів та спеціальних символів</p>
              </div>

              {/* Card Holder */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Власник карти
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={paymentData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="IVAN PETRENKO"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Дата дії
                  </label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={handleCVVChange}
                    placeholder="123"
                    maxLength={4}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
                🔒 Ваші дані карти захищені. Ми не зберігаємо інформацію про карту.
              </div>
            </>
          )}

          {/* Cash Payment Notice */}
          {paymentData.paymentMethod === 'cash' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <p className="font-semibold mb-2">💵 Оплата при отриманні</p>
              <p>Ви сплатите за замовлення при його доставці. Курієр перевірить товар разом з вами.</p>
            </div>
          )}

          {/* Transfer Notice */}
          {paymentData.paymentMethod === 'transfer' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-semibold mb-2">🏦 Банківський переказ</p>
              <p className="mb-3">Ми надішлемо вам реквізити для переказу у листі після розміщення замовлення.</p>
              <div className="text-xs bg-white p-2 rounded border border-blue-200">
                <p><strong>ПУМБ</strong></p>
                <p>Рахунок: 1234567890</p>
                <p>ЄДРПОУ: 12345678</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-purple-500 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Обробка...' : `Сплатити ${total} ₴`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
