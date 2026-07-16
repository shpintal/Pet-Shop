import RegisterForm from './register-form';

export const metadata = {
  title: 'Реєстрація | Pet Shop',
  description: 'Створіть новий аккаунт'
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="">Реєстрація</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }} className="mt-2">Створіть новий аккаунт для покупок</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
