'use client';

import { useRouter } from 'next/navigation';

export default function SellerLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('currentUser');
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      style={{ backgroundColor: 'white', color: 'rgb(175, 62, 143)' }}
      className="px-4 py-2 rounded-lg font-bold hover:shadow-lg transition text-sm"
    >
      Вийти
    </button>
  );
}
