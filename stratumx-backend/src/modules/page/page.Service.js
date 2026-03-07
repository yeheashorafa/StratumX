import prisma from "../../config/db.js";

export const createPage = async (data) => {
  const { translations, ...pageData } = data;
  return prisma.page.create({
    data: {
      ...pageData,
      translations: { create: translations },
    },
    include: { translations: true },
  });
};

export const getPages = async (
  businessId,
  lang,
  isAdmin = false,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;
  const where = { businessId };
  if (!isAdmin) {
    where.isDeleted = false;
    where.isPublished = true;
  }

  const [pages, total] = await Promise.all([
    prisma.page.findMany({
      where,
      skip,
      take: limit,
      include: { translations: { where: { lang } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.page.count({ where }),
  ]);

  return {
    data: pages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updatePage = async (id, data) => {
  const { translations, ...pageData } = data;

  return prisma.page.update({
    where: { id },
    data: {
      ...pageData,
      translations: translations
        ? {
            upsert: translations.map((t) => ({
              where: { pageId_lang: { pageId: id, lang: t.lang } },
              update: {
                title: t.title,
                body: t.body,
                metaTitle: t.metaTitle,
                metaDescription: t.metaDescription,
              },
              create: {
                lang: t.lang,
                title: t.title,
                body: t.body,
                metaTitle: t.metaTitle,
                metaDescription: t.metaDescription,
              },
            })),
          }
        : undefined,
    },
    include: { translations: true },
  });
};

export const deletePage = async (id) => {
  return prisma.page.update({
    where: { id },
    data: { isDeleted: true },
  });
};
