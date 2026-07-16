require("dotenv").config();
const { PrismaClient } = require("../.prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Очистити стару дані
  await prisma.product.deleteMany();

  // Додати 9 товарів
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Сухий корм для котів",
        price: 350,
        category: "Корми",
        stock: 45,
        emoji: "🐱",
        description: "Збалансований сухий корм преміум якості",
      },
      {
        name: "Іграшки для котів",
        price: 120,
        category: "Іграшки",
        stock: 78,
        emoji: "🎾",
        description: "Набір різноманітних іграшок для активного дозвілля",
      },
      {
        name: "Лоток для котів",
        price: 450,
        category: "Аксесуари",
        stock: 34,
        emoji: "🚽",
        description: "Закритий туалет для котів з фільтром запахів",
      },
      {
        name: "Лежанка для собак",
        price: 650,
        category: "Меблі",
        stock: 12,
        emoji: "🛏️",
        description: "Комфортна ліжко для малих та середніх собак",
      },
      {
        name: "Ошийник та повідець",
        price: 280,
        category: "Екіпіровка",
        stock: 92,
        emoji: "⛓️",
        description: "Міцний та стильний набір екіпіровки",
      },
      {
        name: "Вітаміни та добавки",
        price: 320,
        category: "Здоров'я",
        stock: 56,
        emoji: "💊",
        description: "Комплекс вітамінів для здоров'я шерсті",
      },
      {
        name: "Когтеточка",
        price: 580,
        category: "Меблі",
        stock: 8,
        emoji: "🌳",
        description: "Висока когтеточка з полками для лазіння",
      },
      {
        name: "Переноска для тварин",
        price: 890,
        category: "Аксесуари",
        stock: 5,
        emoji: "🎒",
        description: "Легка та зручна переноска для подорожей",
      },
      {
        name: "Миски для їжі та води",
        price: 180,
        category: "Аксесуари",
        stock: 67,
        emoji: "🍽️",
        description: "Набір керамічних мисок різних розмірів",
      },
    ],
  });

  console.log(`Успішно додано ${products.count} товарів до БД`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
