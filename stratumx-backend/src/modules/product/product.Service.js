import prisma from "../../config/db.js";

export const createProduct = async (data) => {
  const { translations, images, ...productData } = data;

  return prisma.product.create({
    data: {
      ...productData,
      translations: {
        create: translations,
      },
      images: images
        ? {
            create: images,
          }
        : undefined,
    },
    include: {
      translations: true,
      images: true,
    },
  });
};

export const getProducts = async ({
  businessId,
  lang = "en",
  categoryId,
  search,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;

  const whereClause = {
    businessId,
    isDeleted: false,
    isActive: true,
    ...(categoryId && { categoryId }),
    ...(search && {
      translations: {
        some: {
          lang,
          name: { contains: search },
        },
      },
    }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: {
        translations: true, // return all languages so frontend can pick
        images: true,
        category: { include: { translations: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: whereClause }),
  ]);

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id, lang = "en") => {
  return prisma.product.findFirst({
    where: {
      id,
      isDeleted: false,
      isActive: true,
    },
    include: {
      translations: true,
      images: true,
      category: { include: { translations: true } },
    },
  });
};

export const updateProduct = async (id, data) => {
  const { translations, images, ...productData } = data;

  // Update flat fields and replace images if provided
  const updated = await prisma.product.update({
    where: { id },
    data: {
      ...productData,
      images: images
        ? {
            deleteMany: {},
            create: images,
          }
        : undefined,
    },
    include: { translations: true, images: true },
  });

  // Upsert each translation
  if (translations && Array.isArray(translations)) {
    for (const t of translations) {
      await prisma.productTranslation.upsert({
        where: { productId_lang: { productId: id, lang: t.lang } },
        update: { name: t.name, description: t.description },
        create: {
          productId: id,
          lang: t.lang,
          name: t.name,
          description: t.description,
        },
      });
    }
  }

  // Return fresh data
  return prisma.product.findUnique({
    where: { id },
    include: { translations: true, images: true },
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
};
