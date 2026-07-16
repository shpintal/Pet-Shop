'use client';

import { useState, useEffect } from 'react';

interface WishlistButtonProps {
  productId: number;
  productName: string;
}

export default function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: any) => item.id === productId));
  }, [productId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isInWishlist) {
      const filtered = wishlist.filter((item: any) => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(filtered));
      setIsInWishlist(false);
    } else {
      wishlist.push({ id: productId, name: productName });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleWishlist}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        isInWishlist
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={isInWishlist ? 'Видалити з обраного' : 'Додати в обране'}
    >
      {isInWishlist ? '❤️ Обране' : '🤍 В обране'}
    </button>
  );
}
