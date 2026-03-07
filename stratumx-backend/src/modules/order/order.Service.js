import prisma from "../../config/db.js";
import { OrderStatus, PaymentStatus, PaymentMethod } from "@prisma/client";

export const checkoutGuest = async (
  items,
  businessId = 1,
  {
    shippingAddress = null,
    billingAddress = null,
    paymentMethod = PaymentMethod.CASH_ON_DELIVERY,
  } = {},
) => {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  return prisma.$transaction(async (tx) => {
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { translations: true, images: true },
      });

      if (!product) throw new Error(`Product ID ${item.productId} not found`);

      if (item.quantity > product.stock) {
        throw new Error(
          `Not enough stock for product ${product.translations[0]?.name}`,
        );
      }

      total += product.price * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        priceSnapshot: product.price,
      });

      // Deduct Stock
      await tx.product.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity },
      });
    }

    // Find or create guest user for this business
    let guestUser = await tx.user.findFirst({
      where: { email: "guest@stratumx.local", businessId },
    });

    if (!guestUser) {
      const customerRole = await tx.role.findFirst({
        where: { name: "CUSTOMER", businessId },
      });

      guestUser = await tx.user.create({
        data: {
          businessId,
          roleId: customerRole.id,
          name: "Guest Checkout",
          email: "guest@stratumx.local",
          password: "guest_checkout_no_login",
        },
      });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await tx.order.create({
      data: {
        userId: guestUser.id,
        businessId,
        totalAmount: total,
        orderNumber,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod,
        shippingAddress: shippingAddress
          ? JSON.stringify(shippingAddress)
          : null,
        billingAddress: billingAddress ? JSON.stringify(billingAddress) : null,
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    return order;
  });
};

export const getUserOrders = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllOrders = async ({ businessId, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const whereClause = { businessId };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where: whereClause }),
  ]);

  return {
    data: orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true, user: true },
  });
};

export const updateOrderStatus = async (id, status) => {
  // Accept both string and enum values for backwards compat
  const validStatuses = Object.values(OrderStatus);
  const normalizedStatus = status?.toUpperCase();

  if (!validStatuses.includes(normalizedStatus)) {
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    );
  }

  return prisma.order.update({
    where: { id },
    data: { status: normalizedStatus },
  });
};

export const updatePaymentStatus = async (id, paymentStatus, transactionId) => {
  const validStatuses = Object.values(PaymentStatus);
  const normalizedStatus = paymentStatus?.toUpperCase();

  if (!validStatuses.includes(normalizedStatus)) {
    throw new Error(
      `Invalid payment status. Must be one of: ${validStatuses.join(", ")}`,
    );
  }

  return prisma.order.update({
    where: { id },
    data: {
      paymentStatus: normalizedStatus,
      ...(transactionId && { transactionId }),
    },
  });
};

export const deleteOrder = async (id) => {
  return prisma.order.delete({
    where: { id },
  });
};
