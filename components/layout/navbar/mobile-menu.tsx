'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-gradient-to-b from-white to-gray-50 pb-6 dark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-red-100 text-red-600 transition-colors hover:bg-red-200"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-6 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>

                {/* Main Menu */}
                <ul className="flex w-full flex-col space-y-2 mb-6 border-b pb-6">
                  <li>
                    <Link
                      href="/products"
                      prefetch={true}
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-800 hover:bg-purple-100 transition"
                    >
                      🛍️ Продукція
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      prefetch={true}
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-800 hover:bg-red-100 transition"
                    >
                      ❤️ Обране
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      prefetch={true}
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-800 hover:bg-blue-100 transition"
                    >
                      🛒 Кошик
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      prefetch={true}
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-800 hover:bg-green-100 transition"
                    >
                      👤 Реєстрація
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      prefetch={true}
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-800 hover:bg-orange-100 transition"
                    >
                      🔐 Вхід
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      prefetch={true}
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-800 hover:bg-pink-100 transition"
                    >
                      ℹ️ Про нас
                    </Link>
                  </li>
                </ul>

                {/* Additional Links */}
                <div className="space-y-2">
                  <Link
                    href="/admin"
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    🔧 Адміністрація
                  </Link>
                  <Link
                    href="/admin/orders"
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    📋 Замовлення
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
