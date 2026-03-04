// src/modules/business/businessService.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBusiness = async (data) => {
  const { name, slug, logo, defaultLang } = data;

  // Validate slug uniqueness
  const exists = await prisma.business.findUnique({ where: { slug } });
  if (exists) throw new Error("Slug already exists");

  return prisma.business.create({
    data: { name, slug, logo, defaultLang },
  });
};

export const getBusinesses = async () => {
  return prisma.business.findMany({
    include: { users: true, roles: true, settings: true },
  });
};

export const getBusinessById = async (id) => {
  const business = await prisma.business.findUnique({
    where: { id: Number(id) },
    include: { users: true, roles: true, settings: true },
  });
  if (!business) throw new Error("Business not found");
  return business;
};

export const updateBusiness = async (id, data) => {
  return prisma.business.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteBusiness = async (id) => {
  // Soft delete: هنا نقدر نضيف حقل isDeleted لو حابين مستقبلاً
  await prisma.business.delete({
    where: { id: Number(id) },
  });
};