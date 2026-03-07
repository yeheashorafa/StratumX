// seedData.js
import { PrismaClient } from "@prisma/client";
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

  // Clear existing data
  const tablesToClear = [
    "cartItem", "cart", "orderItem", "order", "productImage", "productTranslation",
    "productVariant", "product", "categoryTranslation", "category",
    "serviceTranslation", "service", "pageTranslation", "page",
    "coupon", "user", "role", "settings"
  ];

  for (const table of tablesToClear) {
    await prisma[table].deleteMany({});
  }

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
  const categoriesData = [
    { en: "Electronics", ar: "إلكترونيات", slug: "electronics" },
    { en: "Home Appliances", ar: "أجهزة منزلية", slug: "home-appliances" },
    { en: "Kitchen", ar: "مطبخ", slug: "kitchen" },
    { en: "Fashion", ar: "موضة", slug: "fashion" },
    { en: "Gadgets", ar: "أدوات ذكية", slug: "gadgets" },
    { en: "Sports", ar: "رياضة", slug: "sports" },
  ];

  const categories = [];
  for (const c of categoriesData) {
    const cat = await prisma.category.create({
      data: {
        businessId: 1,
        translations: {
          create: [
            { lang: "en", name: c.en, slug: c.slug },
            { lang: "ar", name: c.ar, slug: c.slug + "-ar" },
          ],
        },
      },
    });
    categories.push(cat);
  }

  // 5. Create Products
  const productsData = [
    {
      categoryIndex: 0, price: 299.99, stock: 50, sku: "PROD-ELEC-001",
      enName: "Premium Wireless Headphones", arName: "سماعات لاسلكية فاخرة",
      enDesc: "High quality wireless headphones.", arDesc: "سماعات لاسلكية بجودة عالية.",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      categoryIndex: 0, price: 499.99, stock: 30, sku: "PROD-ELEC-002",
      enName: 'Smart LED TV 55"', arName: 'تلفاز ذكي LED 55"',
      enDesc: "4K UHD Smart TV with HDR support.", arDesc: "تلفاز 4K UHD ذكي مع دعم HDR.",
      imageUrl: "https://images.unsplash.com/photo-1582719478179-9f0b44bb7e1e",
    },
    {
      categoryIndex: 1, price: 129.99, stock: 100, sku: "PROD-HA-001",
      enName: "Coffee Maker Deluxe", arName: "ماكينة قهوة ديلوكس",
      enDesc: "Brew the perfect cup every time.", arDesc: "اصنع فنجان القهوة المثالي كل مرة.",
      imageUrl: "https://images.unsplash.com/photo-1515442261605-659877a4f7d3",
    },
    {
      categoryIndex: 2, price: 59.99, stock: 150, sku: "PROD-KIT-001",
      enName: "Blender Pro", arName: "خلاط برو",
      enDesc: "High-speed blender for smoothies and sauces.", arDesc: "خلاط عالي السرعة للعصائر والصلصات.",
      imageUrl: "https://images.unsplash.com/photo-1603791452906-3d5f9295ef7e",
    },
    {
      categoryIndex: 3, price: 89.99, stock: 200, sku: "PROD-FASH-001",
      enName: "Men's Leather Jacket", arName: "جاكيت جلد رجالي",
      enDesc: "Stylish and durable leather jacket.", arDesc: "جاكيت جلد أنيق ومتين.",
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
    {
      categoryIndex: 4, price: 199.99, stock: 75, sku: "PROD-GAD-001",
      enName: "Smartwatch Series 5", arName: "ساعة ذكية سيريز 5",
      enDesc: "Track your fitness and notifications.", arDesc: "تتبع لياقتك وإشعاراتك.",
      imageUrl: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
    },
    {
      categoryIndex: 5, price: 49.99, stock: 120, sku: "PROD-SP-001",
      enName: "Yoga Mat Eco", arName: "حصيرة يوغا صديقة للبيئة",
      enDesc: "Comfortable and eco-friendly yoga mat.", arDesc: "حصيرة يوغا مريحة وصديقة للبيئة.",
      imageUrl: "https://images.unsplash.com/photo-1599058917218-7b17e0d4a78c",
    },
  ];

  const products = [];
  for (const p of productsData) {
    const prod = await prisma.product.create({
      data: {
        businessId: 1,
        categoryId: categories[p.categoryIndex].id,
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
    products.push(prod);
  }

  // 6. Create Services
  const servicesData = [
    { icon: "cog", enTitle: "Technical Support", enDesc: "24/7 technical assistance for your devices.", arTitle: "الدعم الفني", arDesc: "مساعدة فنية على مدار الساعة لأجهزتك." },
    { icon: "truck", enTitle: "Express Delivery", enDesc: "Get your products delivered within 24 hours.", arTitle: "توصيل سريع", arDesc: "احصل على منتجاتك في غضون 24 ساعة." },
    { icon: "shield-check", enTitle: "Extended Warranty", enDesc: "Protect your purchases with an extra 2-year warranty.", arTitle: "ضمان ممتد", arDesc: "احمِ مشترياتك مع ضمان إضافي لمدة سنتين." },
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

  // 7. Create CMS Pages
  const pagesData = [
    { slug: "about-us", enTitle: "About StratumX", enBody: "We are a leading multi-tenant e-commerce platform.", arTitle: "عن ستراتوم إكس", arBody: "نحن منصة رائدة في التجارة الإلكترونية متعددة المتاجر." },
    { slug: "terms", enTitle: "Terms and Conditions", enBody: "Please read our terms carefully before using the service.", arTitle: "الشروط والأحكام", arBody: "يرجى قراءة شروطنا بعناية قبل استخدام الخدمة." },
    { slug: "privacy", enTitle: "Privacy Policy", enBody: "Your data privacy is our top priority.", arTitle: "سياسة الخصوصية", arBody: "خصوصية بياناتك هي أولويتنا القصوى." },
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

  // 8. Create Fake Orders
  for (let i = 1; i <= 5; i++) {
    await prisma.order.create({
      data: {
        businessId: 1,
        userId: sysAdmin.id,
        orderNumber: `ORD-20260307-FAKE0${i}`,
        totalAmount: products[0].price * i,
        status: "PENDING",
        customerEmail: `customer${i}@example.com`,
        customerName: `Customer ${i}`,
        items: {
          create: [{ productId: products[0].id, quantity: i, priceSnapshot: products[0].price }],
        },
      },
    });
  }

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
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });