import UserForm from '../user-form';

export const metadata = {
  title: 'Створити користувача | Pet Shop Admin',
  description: 'Створення адміністратора або продавця'
};

export default function AddUserPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">
            ➕ Створити користувача
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
            Створіть аккаунт адміністратора або продавця
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <UserForm />
        </div>
      </section>
    </div>
  );
}
