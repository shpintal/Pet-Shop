import CartBadge from 'components/cart/cart-badge';
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
                    style={{ color: 'rgb(175, 62, 143)' }}
                    className="font-semibold hover:opacity-80 transition"
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
          <Link
            href="/login"
            style={{ color: 'rgb(175, 62, 143)' }}
            className="font-semibold hover:opacity-80 transition text-xs md:text-sm"
          >
            Вхід
          </Link>
          <Link
            href="/register"
            style={{ color: 'rgb(175, 62, 143)' }}
            className="font-semibold hover:opacity-80 transition text-xs md:text-sm"
          >
            Реєстрація
          </Link>
          <Link
            href="/wishlist"
            style={{ color: 'rgb(175, 62, 143)' }}
            className="font-semibold hover:opacity-80 transition text-xs md:text-sm"
          >
            Обране
          </Link>
          <Suspense fallback={null}>
            <CartBadge />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
