import prisma from "../../config/db.js";

const getOrCreateCart = async (user) => {
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: user.id,
        businessId: user.businessId,
      },
      include: { items: true },
    });
  }

  return cart;
};


export const getCart = async (user) => {
  const cart = await getOrCreateCart(user);

  return prisma.cart.findUnique({
    where: { id: cart.id },
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

export const addToCart = async (user, productId, quantity) => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
        isActive: true,
      },
    });

    if (!product) throw new Error("Product not found");
    if (product.stock < quantity) throw new Error("Not enough stock");

    const cart = await getOrCreateCart(user);

    const existingItem = await tx.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      return tx.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return tx.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  });
};

export const updateCartItem = async (user, itemId, quantity) => {
  if (quantity <= 0) throw new Error("Invalid quantity");

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
};

export const removeCartItem = async (user, itemId) => {
  return prisma.cartItem.delete({
    where: { id: itemId },
  });
};