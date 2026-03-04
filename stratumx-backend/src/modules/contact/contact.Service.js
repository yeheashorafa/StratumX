import prisma from "../../config/db.js";

export const createMessage = async (data) => {
  return prisma.contactMessage.create({
    data,
  });
};

export const getMessages = async (businessId) => {
  return prisma.contactMessage.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
  });
};

export const markAsRead = async (id) => {
  return prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
};
