import prisma from "../../config/db.js";

export const createService = async (data) => {
  const { translations, ...serviceData } = data;
  return prisma.service.create({
    data: {
      ...serviceData,
      translations: { create: translations },
    },
    include: { translations: true },
  });
};

export const getServices = async (
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
    where.isActive = true;
  }

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      skip,
      take: limit,
      include: { translations: { where: { lang } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.count({ where }),
  ]);

  return {
    data: services,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateService = async (id, data) => {
  const { translations, ...serviceData } = data;

  return prisma.service.update({
    where: { id },
    data: {
      ...serviceData,
      translations: translations
        ? {
            upsert: translations.map((t) => ({
              where: { serviceId_lang: { serviceId: id, lang: t.lang } },
              update: { title: t.title, description: t.description },
              create: {
                lang: t.lang,
                title: t.title,
                description: t.description,
              },
            })),
          }
        : undefined,
    },
    include: { translations: true },
  });
};

export const deleteService = async (id) => {
  return prisma.service.update({
    where: { id },
    data: { isDeleted: true },
  });
};
