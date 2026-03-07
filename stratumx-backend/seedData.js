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

  // Clear existing items for clean seeding
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
  await prisma.serviceTranslation.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.pageTranslation.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});

  // 2. Create Roles
  const adminRole = await prisma.role.create({
    data: { businessId: 1, name: "ADMIN", description: "Administrator Role" },
  });

  const customerRole = await prisma.role.create({
    data: { businessId: 1, name: "CUSTOMER", description: "Customer Role" },
  });

  // 3. Create Default Admin User
  const adminEmail = "admin@stratumx.local";
  const hashedPassword = await bcrypt.hash("password123", 10);
  const sysAdmin = await prisma.user.create({
    data: {
      businessId: 1,
      roleId: adminRole.id,
      name: "System Admin",
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log(`Created Admin User: ${adminEmail}`);

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

  // 5. Create Products
  const prod1 = await prisma.product.create({
    data: {
      businessId: 1,
      categoryId: cat1.id,
      price: 299.99,
      stock: 50,
      sku: "PROD-ELEC-001",
      translations: {
        create: [
          {
            lang: "en",
            name: "Premium Wireless Headphones",
            description: "High quality wireless headphones.",
          },
          {
            lang: "ar",
            name: "سماعات لاسلكية فاخرة",
            description: "سماعات لاسلكية بجودة عالية.",
          },
        ],
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            altText: "Headphones",
            isPrimary: true,
          },
        ],
      },
    },
  });

  // 6. Create Fake Services
  const servicesData = [
    {
      icon: "cog",
      enTitle: "Technical Support",
      enDesc: "24/7 technical assistance for your devices.",
      arTitle: "الدعم الفني",
      arDesc: "مساعدة فنية على مدار الساعة لأجهزتك.",
    },
    {
      icon: "truck",
      enTitle: "Express Delivery",
      enDesc: "Get your products delivered within 24 hours.",
      arTitle: "توصيل سريع",
      arDesc: "احصل على منتجاتك في غضون 24 ساعة.",
    },
    {
      icon: "shield-check",
      enTitle: "Extended Warranty",
      enDesc: "Protect your purchases with an extra 2-year warranty.",
      arTitle: "ضمان ممتد",
      arDesc: "احمِ مشترياتك مع ضمان إضافي لمدة سنتين.",
    },
  ];

  for (const s of servicesData) {
    await prisma.service.create({
      data: {
        businessId: 1,
        icon: s.icon,
        translations: {
          create: [
            { lang: "en", title: s.enTitle, description: s.enDesc },
            { lang: "ar", title: s.arTitle, description: s.arDesc },
          ],
        },
      },
    });
  }
  console.log("Created 3 Services.");

  // 7. Create Fake CMS Pages
  const pagesData = [
    {
      slug: "about-us",
      enTitle: "About StratumX",
      enBody: "We are a leading multi-tenant e-commerce platform.",
      arTitle: "عن ستراتوم إكس",
      arBody: "نحن منصة رائدة في التجارة الإلكترونية متعددة المتاجر.",
    },
    {
      slug: "terms",
      enTitle: "Terms and Conditions",
      enBody: "Please read our terms carefully before using the service.",
      arTitle: "الشروط والأحكام",
      arBody: "يرجى قراءة شروطنا بعناية قبل استخدام الخدمة.",
    },
    {
      slug: "privacy",
      enTitle: "Privacy Policy",
      enBody: "Your data privacy is our top priority.",
      arTitle: "سياسة الخصوصية",
      arBody: "خصوصية بياناتك هي أولويتنا القصوى.",
    },
  ];

  for (const p of pagesData) {
    await prisma.page.create({
      data: {
        businessId: 1,
        slug: p.slug,
        translations: {
          create: [
            { lang: "en", title: p.enTitle, body: p.enBody },
            { lang: "ar", title: p.arTitle, body: p.arBody },
          ],
        },
      },
    });
  }
  console.log("Created 3 CMS Pages.");

  // 8. Create Fake Orders
  for (let i = 1; i <= 5; i++) {
    await prisma.order.create({
      data: {
        businessId: 1,
        userId: sysAdmin.id,
        orderNumber: `ORD-20260307-FAKE0${i}`,
        totalAmount: 299.99 * i,
        status: OrderStatus.PENDING,
        customerEmail: `customer${i}@example.com`,
        customerName: `Customer ${i}`,
        items: {
          create: [{ productId: prod1.id, quantity: i, priceSnapshot: 299.99 }],
        },
      },
    });
  }
  console.log("Created 5 Fake Orders.");

  // 9. Ensure Settings exist
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
