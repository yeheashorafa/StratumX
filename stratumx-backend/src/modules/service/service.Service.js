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

export const getServices = async (businessId, lang, isAdmin = false) => {
  const where = { businessId };
  if (!isAdmin) {
    where.isDeleted = false;
    where.isActive = true;
  }

  return prisma.service.findMany({
    where,
    include: { translations: { where: { lang } } },
  });
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
