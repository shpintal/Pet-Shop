import CartModal from 'components/cart/modal';
import DarkModeToggle from 'components/dark-mode-toggle';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  let menu: Menu[] = [];
  try {
    menu = await getMenu('next-js-frontend-header-menu');
  } catch {
    // Menu failed to load
  }

  return (
    <nav style={{ fontFamily: 'Lato, sans-serif' }} className="relative flex items-center justify-between p-4 lg:px-6 border-b border-gray-300 bg-white">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            <li>
              <Link
                href="/products"
                prefetch={true}
                style={{ color: 'rgb(175, 62, 143)' }}
                className="font-semibold underline-offset-4 hover:opacity-80 transition"
              >
                Продукція
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                prefetch={true}
                style={{ color: 'rgb(175, 62, 143)' }}
                className="font-semibold underline-offset-4 hover:opacity-80 transition"
              >
                Про нас
              </Link>
            </li>
            {menu.length ? (
              menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            ) : null}
          </ul>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3 gap-2 md:gap-4 items-center">
          <DarkModeToggle />
          <Link
            href="/register"
            className="px-3 py-2 rounded-lg text-purple-600 hover:bg-purple-50 font-medium text-xs md:text-sm transition"
          >
            👤 Реєстрація
          </Link>
          <Link
            href="/admin/orders"
            className="px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 font-medium text-xs md:text-sm transition"
          >
            📋 Замовлення
          </Link>
          <Link
            href="/wishlist"
            className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium text-xs md:text-sm transition flex items-center gap-1"
          >
            ❤️
            <span className="hidden md:inline">Обране</span>
          </Link>
          <Link
            href="/cart"
            className="px-3 py-2 rounded-lg text-orange-600 hover:bg-orange-50 font-medium text-xs md:text-sm transition flex items-center gap-1"
          >
            🛒
            <span className="hidden md:inline">Кошик</span>
          </Link>
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
