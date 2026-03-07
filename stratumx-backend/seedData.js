import {
  PrismaClient,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "@prisma/client";
import bcrypt from "bcrypt";

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
  } else {
    console.log(`Admin User ${adminEmail} already exists.`);
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
      enDesc:
        "Experience industry-leading noise cancellation and premium sound quality with these stylish over-ear headphones.",
      arName: "سماعات لاسلكية فاخرة",
      arDesc:
        "استمتع بعزل الضوضاء الرائد في الصناعة وجودة الصوت الممتازة مع هذه السماعات المذهلة.",
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1770&auto=format&fit=crop",
    },
    {
      categoryId: cat1.id,
      price: 1299.0,
      stock: 15,
      sku: "PROD-ELEC-002",
      enName: "Ultra-Slim Creator Laptop",
      enDesc:
        "A powerful machine designed for content creators, featuring a stunning 4K OLED display and fast processing.",
      arName: "حاسوب محمول فائق النحافة",
      arDesc: "جهاز قوي مصمم لصناع المحتوى، يتميز بشاشة مبهرة ومعالجة سريعة.",
      imageUrl:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1771&auto=format&fit=crop",
    },
    {
      categoryId: cat2.id,
      price: 45.0,
      stock: 100,
      sku: "PROD-ACC-001",
      enName: "Leather Smartwatch Band",
      enDesc:
        "Upgrade your look with this premium genuine leather smartwatch band. Comfortable and highly durable.",
      arName: "سوار ساعة ذكية من الجلد",
      arDesc:
        "ارتق بمظهرك مع سوار الساعة الذكية المصنوع من الجلد الأصلي الفاخر.",
      imageUrl:
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1227&auto=format&fit=crop",
    },
    {
      categoryId: cat2.id,
      price: 120.0,
      stock: 200,
      sku: "PROD-ACC-002",
      enName: "Minimalist Desk Organizer",
      enDesc:
        "Keep your workspace tidy and elegant with this bamboo wood minimalist desk organizer.",
      arName: "منسق مكتب مبسط",
      arDesc:
        "حافظ على مساحة عملك مرتبة وأنيقة مع منظم المكتب هذا مبسط وجميل للحفاظ على ترتيب المكاتب.",
      imageUrl:
        "https://images.unsplash.com/photo-1517002011116-f35d79664da9?q=80&w=1770&auto=format&fit=crop",
    },
    {
      categoryId: cat1.id,
      price: 199.5,
      stock: 30,
      sku: "PROD-ELEC-003",
      enName: "Mechanical Keyboard Pro",
      enDesc:
        "Tactile, responsive, and beautifully designed mechanical keyboard with custom RGB lighting options.",
      arName: "لوحة مفاتيح ميكانيكية احترافية",
      arDesc:
        "لوحة مفاتيح ميكانيكية ذات استجابة سريعة وتصميم جميل مع إضاءة قوية.",
      imageUrl:
        "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1771&auto=format&fit=crop",
    },
    {
      categoryId: cat2.id,
      price: 89.0,
      stock: 120,
      sku: "PROD-ACC-003",
      enName: "Ergonomic Laptop Stand",
      enDesc:
        "Improve your posture and cooling with this premium aluminum ergonomic laptop stand. Fits all laptops up to 17 inches.",
      arName: "حامل لابتوب مريح",
      arDesc:
        "قم بتحسين وضع جلوسك وتبريد اللابتوب من خلال هذا الحامل الألمنيوم الفاخر.",
      imageUrl:
        "https://images.unsplash.com/photo-1621538604771-4475cc502ce5?q=80&w=1770&auto=format&fit=crop",
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
  console.log("Created sample coupon: WELCOME10 (10% off)");

  // 7. Ensure Settings exist
  const existingSettings = await prisma.settings.findUnique({
    where: { businessId: 1 },
  });
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        businessId: 1,
        seoTitle: "StratumX - Premium Tech Store",
        seoDescription: "Shop the latest and greatest tech products.",
        currency: "USD",
        theme: "default",
      },
    });
    console.log("Created default Settings.");
  }

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
