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

export const getPages = async (businessId, lang) => {
  return prisma.page.findMany({
    where: { businessId, isDeleted: false, isPublished: true },
    include: { translations: { where: { lang } } },
  });
};

export const updatePage = async (id, data) => {
  const { translations, ...pageData } = data;
  return prisma.page.update({
    where: { id },
    data: {
      ...pageData,
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
