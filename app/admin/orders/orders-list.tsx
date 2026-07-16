'use client';

import { useState } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items?: OrderItem[];
  total?: number;
  createdAt: string;
}

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg border-2 border-purple-200 hover:shadow-lg transition overflow-hidden"
        >
          {/* Main Order Info */}
          <button
            onClick={() => toggleExpand(order.id)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition text-left"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-bold text-lg text-gray-800">{order.firstName} {order.lastName}</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {order.id}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-semibold">Email:</span> {order.email}
                </div>
                <div>
                  <span className="font-semibold">Телефон:</span> {order.phone}
                </div>
                <div>
                  <span className="font-semibold">Сума:</span> <span className="text-purple-600 font-bold">{order.total} ₴</span>
                </div>
                <div>
                  <span className="font-semibold">Дата:</span> {formatDate(order.createdAt)}
                </div>
              </div>
            </div>
          </button>

          {/* Expanded Details */}
          {expandedOrderId === order.id && (
            <div className="border-t-2 border-purple-200 p-6 bg-gray-50">
              {/* Delivery Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📍 Адреса доставки
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Адреса:</span> {order.address}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Місто:</span> {order.city}
                  </p>
                  {order.postalCode && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Індекс:</span> {order.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              {order.items && order.items.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    🛍️ Товари в замовленні
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{item.emoji}</span>
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.price} ₴ × {item.quantity} = {item.price * item.quantity} ₴
                            </p>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-purple-600">
                          {item.price * item.quantity} ₴
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border-2 border-purple-300">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-800">Разом до сплати:</span>
                  <span className="text-purple-600">{order.total} ₴</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  👤 Контактна інформація
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Ім'я:</span>
                    <p className="text-gray-600">{order.firstName} {order.lastName}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>
                    <p className="text-gray-600">{order.email}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Телефон:</span>
                    <p className="text-gray-600">{order.phone}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Дата замовлення:</span>
                    <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
