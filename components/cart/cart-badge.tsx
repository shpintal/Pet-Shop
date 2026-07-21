import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { prisma } from 'lib/prisma';
import { getCurrentUser } from 'lib/user-auth';

export default async function CartBadge() {
  const user = await getCurrentUser();

  let quantity = 0;
  if (user) {
    const result = await prisma.cartItem.aggregate({
      where: { userId: user.userId },
      _sum: { quantity: true }
    });
    quantity = result._sum.quantity ?? 0;
  }

  return (
    <Link aria-label="Кошик" href="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      {quantity > 0 ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </Link>
  );
}
