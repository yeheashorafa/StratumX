import prisma from "../../config/db.js";

export const createCategory = async (data) => {
  const { businessId, parentId, translations } = data;

  return prisma.category.create({
    data: {
      businessId,
      parentId,
      translations: {
        create: translations,
      },
    },
    include: {
      translations: true,
    },
  });
};

export const getCategories = async (businessId, lang) => {
  return prisma.category.findMany({
    where: {
      businessId,
      isDeleted: false,
      isActive: true,
    },
    include: {
      translations: {
        where: { lang },
      },
      children: {
        where: { isDeleted: false },
      },
    },
  });
};

export const updateCategory = async (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id) => {
  return prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });
};