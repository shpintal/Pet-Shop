import ProductForm from '../product-form';

export const metadata = {
  title: 'Додати товар | Pet Shop Admin',
  description: 'Додавання нового товару в каталог'
};

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'rgb(175, 62, 143)' }} className="text-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '40px', fontWeight: 700 }} className="mb-2">➕ Додати новий товар</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Заповніть форму щоб додати товар до каталогу</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <ProductForm mode="create" />
        </div>
      </section>
    </div>
  );
}
