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

export const getServices = async (businessId, lang) => {
  return prisma.service.findMany({
    where: { businessId, isDeleted: false, isActive: true },
    include: { translations: { where: { lang } } },
  });
};

export const updateService = async (id, data) => {
  const { translations, ...serviceData } = data;
  return prisma.service.update({
    where: { id },
    data: {
      ...serviceData,
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
