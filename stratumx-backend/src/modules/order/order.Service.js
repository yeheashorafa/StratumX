import prisma from "../../config/db.js";
import pkg from "@prisma/client";
import crypto from "crypto";

const { OrderStatus, PaymentStatus, PaymentMethod } = pkg;

/**
 * Creates an order for a Guest or Logged-in user.
 *
 * @param {Array} items - [{ productId, quantity }]
 * @param {Number} businessId
 * @param {Object} customerInfo - { email, name, phone, userId, shippingAddress, billingAddress, paymentMethod, lang }
 */
export const checkout = async (
  items,
  businessId = 1,
  {
    userId = null,
    customerEmail = null,
    customerName = null,
    customerPhone = null,
    shippingAddress = null,
    billingAddress = null,
    paymentMethod = PaymentMethod.CASH_ON_DELIVERY,
    lang = "en",
  } = {},
) => {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  return prisma.$transaction(async (tx) => {
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      // 1. Fetch product with required language translation
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: {
          translations: {
            where: { lang },
          },
        },
      });

      if (!product || product.isDeleted || !product.isActive) {
        throw new Error(`Product ID ${item.productId} is not available`);
      }

      // 2. ATOMIC INVENTORY UPDATE (Prevention of Race Conditions)
      // We use updateMany with a condition on the stock to ensure it's a "Compare-and-Swap" style atomic operation.
      const updateResult = await tx.product.updateMany({
        where: {
          id: product.id,
          stock: { gte: item.quantity }, // Critical: Ensure stock hasn't changed since we read it
        },
        data: {
          stock: { decrement: item.quantity },
        },
      });

      if (updateResult.count === 0) {
        const productName = product.translations[0]?.name || "Product";
        throw new Error(
          `Insufficient stock for: ${productName}. It might have been sold out just now.`,
        );
      }

      total += product.price * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        priceSnapshot: product.price,
      });
    }

    // 3. Generate Robust Order Number
    // Format: ORD-YEARMMDD-RANDOMSTRING (Shorter and professional)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomStr}`;

    // 4. Create Order
    const order = await tx.order.create({
      data: {
        userId, // Null if guest
        businessId,
        orderNumber,
        totalAmount: total,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod,
        shippingAddress: shippingAddress
          ? JSON.stringify(shippingAddress)
          : null,
        billingAddress: billingAddress ? JSON.stringify(billingAddress) : null,
        customerEmail,
        customerName,
        customerPhone,
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    return order;
  });
};

// Backwards compatibility for the controller if it calls checkoutGuest
export const checkoutGuest = (items, businessId, options) => {
  return checkout(items, businessId, { ...options, userId: null });
};

export const getUserOrders = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              translations: true,
              images: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllOrders = async ({ businessId, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { businessId },
      skip,
      take: limit,
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where: { businessId } }),
  ]);

  return {
    data: orders,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

export const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            include: {
              translations: true,
              images: true,
            },
          },
        },
      },
      user: true,
    },
  });
};

export const updateOrderStatus = async (id, status) => {
  const normalizedStatus = status?.toUpperCase();
  if (!Object.values(OrderStatus).includes(normalizedStatus)) {
    throw new Error(`Invalid status: ${status}`);
  }
  return prisma.order.update({
    where: { id },
    data: { status: normalizedStatus },
  });
};

export const updatePaymentStatus = async (id, paymentStatus, transactionId) => {
  const normalizedStatus = paymentStatus?.toUpperCase();
  if (!Object.values(PaymentStatus).includes(normalizedStatus)) {
    throw new Error(`Invalid payment status: ${paymentStatus}`);
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

export const getOrderByNumber = async (orderNumber) => {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: {
            include: {
              translations: true,
              images: true,
            },
          },
        },
      },
    },
  });
};
