import Footer from 'components/layout/footer';
import WishlistClient from './wishlist-client';

export const metadata = {
  title: 'Обране',
  description: 'Ваш список бажаних товарів'
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      <WishlistClient />
      <Footer />
    </div>
  );
}
