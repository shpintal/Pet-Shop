import LoginForm from './login-form';

export const metadata = {
  title: 'Вхід | Pet Shop',
  description: 'Увійти в ваш аккаунт Pet Shop'
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4" style={{ fontFamily: 'Lato, sans-serif' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700, color: 'rgb(175, 62, 143)' }} className="mb-2">🔐 Вхід</h1>
          <p style={{ color: 'rgb(119, 119, 119)' }}>Увійдіть у ваш аккаунт Pet Shop</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
