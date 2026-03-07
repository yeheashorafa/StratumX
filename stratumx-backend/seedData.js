import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import pkg from "@prisma/client";
const { OrderStatus, PaymentStatus, PaymentMethod } = pkg;

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // 1. Ensure Business 1 exists
  let business = await prisma.business.findUnique({ where: { id: 1 } });
  if (!business) {
    business = await prisma.business.create({
      data: {
        id: 1,
        name: "StratumX Demo Business",
        slug: "stratumx-demo",
        defaultLang: "en",
      },
    });
    console.log("Created default Business.");
  }

  // Clear existing items for clean seeding (order matters for FK constraints)
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productTranslation.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.categoryTranslation.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});

  // 2. Create Roles
  const adminRole = await prisma.role.create({
    data: {
      businessId: 1,
      name: "ADMIN",
      description: "Administrator Role",
    },
  });

  const customerRole = await prisma.role.create({
    data: {
      businessId: 1,
      name: "CUSTOMER",
      description: "Customer Role",
    },
  });

  // 3. Create Default Admin User
  const adminEmail = "admin@stratumx.local";
  const existingAdmin = await prisma.user.findFirst({
    where: { email: adminEmail, businessId: 1 },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.create({
      data: {
        businessId: 1,
        roleId: adminRole.id,
        name: "System Admin",
        email: adminEmail,
        password: hashedPassword,
      },
    });
    console.log(`Created Admin User: ${adminEmail} / password123`);
  }

  // 4. Create Categories
  const cat1 = await prisma.category.create({
    data: {
      businessId: 1,
      translations: {
        create: [
          { lang: "en", name: "Electronics", slug: "electronics" },
          { lang: "ar", name: "إلكترونيات", slug: "electronics-ar" },
        ],
      },
    },
  });

  const cat2 = await prisma.category.create({
    data: {
      businessId: 1,
      translations: {
        create: [
          { lang: "en", name: "Accessories", slug: "accessories" },
          { lang: "ar", name: "إكسسوارات", slug: "accessories-ar" },
        ],
      },
    },
  });

  // 5. Create Products
  const productsToAdd = [
    {
      categoryId: cat1.id,
      price: 299.99,
      stock: 50,
      sku: "PROD-ELEC-001",
      enName: "Premium Wireless Headphones",
      enDesc: "High quality wireless headphones.",
      arName: "سماعات لاسلكية فاخرة",
      arDesc: "سماعات لاسلكية بجودة عالية.",
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1770&auto=format&fit=crop",
    },
    {
      categoryId: cat1.id,
      price: 1299.0,
      stock: 15,
      sku: "PROD-ELEC-002",
      enName: "Ultra-Slim Laptop",
      enDesc: "Powerful slim laptop.",
      arName: "حاسوب محمول فائق النحافة",
      arDesc: "حاسوب محمول قوي ونحيف.",
      imageUrl:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1771&auto=format&fit=crop",
    },
  ];

  for (const p of productsToAdd) {
    await prisma.product.create({
      data: {
        businessId: 1,
        categoryId: p.categoryId,
        price: p.price,
        stock: p.stock,
        sku: p.sku,
        translations: {
          create: [
            { lang: "en", name: p.enName, description: p.enDesc },
            { lang: "ar", name: p.arName, description: p.arDesc },
          ],
        },
        images: {
          create: [{ url: p.imageUrl, altText: p.enName, isPrimary: true }],
        },
      },
    });
  }

  // 6. Create a sample Coupon
  await prisma.coupon.create({
    data: {
      businessId: 1,
      code: "WELCOME10",
      discountPercent: 10,
      isActive: true,
    },
  });

  // 7. Ensure Settings exist
  await prisma.settings.upsert({
    where: { businessId: 1 },
    update: {},
    create: {
      businessId: 1,
      seoTitle: "StratumX Store",
      seoDescription: "Multi-business e-commerce platform.",
      currency: "USD",
      theme: "default",
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
