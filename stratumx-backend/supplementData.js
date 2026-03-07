import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding supplemental products...");

  const businessId = 1;

  // Fetch categories to map them
  const categories = await prisma.category.findMany({
    where: { businessId },
    include: { translations: { where: { lang: "en" } } },
  });

  const catMap = {};
  categories.forEach((c) => {
    catMap[c.translations[0].name] = c.id;
  });

  console.log("Categories found:", Object.keys(catMap));

  const additionalProducts = [
    // Electronics
    {
      name: "Smartphone X10",
      price: 899.99,
      cat: "Electronics",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      name: "Bluetooth Speaker",
      price: 45.0,
      cat: "Electronics",
      img: "https://images.unsplash.com/photo-1608156639585-b3a034ef915a",
    },
    {
      name: "Gaming Mouse",
      price: 65.5,
      cat: "Electronics",
      img: "https://images.unsplash.com/photo-1527814050087-37a3c71cce4c",
    },
    {
      name: "Mechanical Keyboard",
      price: 120.0,
      cat: "Electronics",
      img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    },

    // Kitchen
    {
      name: "Air Fryer Pro",
      price: 159.99,
      cat: "Kitchen",
      img: "https://images.unsplash.com/photo-1585515320310-259814833e62",
    },
    {
      name: "Electric Kettle",
      price: 35.0,
      cat: "Kitchen",
      img: "https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1",
    },
    {
      name: "Toaster 4-Slice",
      price: 49.99,
      cat: "Kitchen",
      img: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1",
    },

    // Fashion
    {
      name: "Cotton T-Shirt Blue",
      price: 19.99,
      cat: "Fashion",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    },
    {
      name: "Denim Jeans",
      price: 55.0,
      cat: "Fashion",
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    },
    {
      name: "Winter Scarf",
      price: 15.0,
      cat: "Fashion",
      img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
    },
    {
      name: "Running Shoes",
      price: 85.0,
      cat: "Fashion",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },

    // Home Appliances
    {
      name: "Vacuum Cleaner",
      price: 210.0,
      cat: "Home Appliances",
      img: "https://images.unsplash.com/photo-1558317374-067fb5f30001",
    },
    {
      name: "Humidifier Ultra",
      price: 59.0,
      cat: "Home Appliances",
      img: "https://images.unsplash.com/photo-1519558260268-cde7e0341152",
    },

    // Sports
    {
      name: "Dumbbell Set 10kg",
      price: 45.0,
      cat: "Sports",
      img: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a",
    },
    {
      name: "Basketball Official",
      price: 29.99,
      cat: "Sports",
      img: "https://images.unsplash.com/photo-1519861531473-9200362f46b3",
    },
    {
      name: "Tennis Racket",
      price: 110.0,
      cat: "Sports",
      img: "https://images.unsplash.com/photo-1617083277662-84949539304a",
    },
  ];

  for (const p of additionalProducts) {
    const catId = catMap[p.cat];
    if (!catId) {
      console.log(`Skipping ${p.name}, category ${p.cat} not found.`);
      continue;
    }

    const sku = `SUPP-${p.cat.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000)}`;

    await prisma.product.create({
      data: {
        businessId,
        categoryId: catId,
        price: p.price,
        stock: 50,
        sku,
        translations: {
          create: [
            {
              lang: "en",
              name: p.name,
              description: `High quality ${p.name} for your home.`,
            },
            {
              lang: "ar",
              name: `${p.name} - عربي`,
              description: `عالي الجودة منتج ${p.name}.`,
            },
          ],
        },
        images: {
          create: [{ url: p.img, altText: p.name, isPrimary: true }],
        },
      },
    });
    console.log(`Added product: ${p.name}`);
  }

  console.log("✅ Supplemental seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
