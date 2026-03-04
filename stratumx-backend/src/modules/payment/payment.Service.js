import Stripe from "stripe";
import prisma from "../../config/db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/**
 * Creates a Stripe Checkout Session.
 * Items come from the frontend cart (array of { productId, quantity }).
 * We validate each product against the DB and build line items for Stripe.
 */
export const createCheckoutSession = async (items, businessId = 1) => {
  if (!items || items.length === 0) throw new Error("Cart is empty");

  const lineItems = [];
  const validatedItems = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { translations: true },
    });

    if (!product) throw new Error(`Product ${item.productId} not found`);
    if (product.stock < item.quantity)
      throw new Error(`Not enough stock for: ${product.translations[0]?.name}`);

    const name = product.translations[0]?.name || `Product #${product.id}`;

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name },
        unit_amount: Math.round(product.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    });

    validatedItems.push({
      productId: product.id,
      quantity: item.quantity,
      priceSnapshot: product.price,
    });
  }

  // Store cart data as metadata for the webhook to use
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/checkout/cancel`,
    metadata: {
      businessId: String(businessId),
      items: JSON.stringify(validatedItems),
    },
  });

  return { sessionId: session.id, url: session.url };
};

/**
 * Handles Stripe webhook events.
 * On checkout.session.completed: creates the Order in the DB.
 */
export const handleWebhook = async (rawBody, signature) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { businessId, items: itemsJson } = session.metadata;
    const items = JSON.parse(itemsJson);
    const bId = parseInt(businessId, 10);

    await prisma.$transaction(async (tx) => {
      // Find or create guest user
      let guestUser = await tx.user.findFirst({
        where: { email: "guest@stratumx.local", businessId: bId },
      });

      if (!guestUser) {
        const customerRole = await tx.role.findFirst({
          where: { name: "CUSTOMER", businessId: bId },
        });
        guestUser = await tx.user.create({
          data: {
            businessId: bId,
            roleId: customerRole.id,
            name: "Guest Checkout",
            email: "guest@stratumx.local",
            password: "guest_no_login",
          },
        });
      }

      const orderNumber = `ORD-${session.id.slice(-8).toUpperCase()}`;
      const totalAmount = session.amount_total / 100;

      const order = await tx.order.create({
        data: {
          userId: guestUser.id,
          businessId: bId,
          orderNumber,
          totalAmount,
          status: "paid",
          items: { create: items },
        },
        include: { items: true },
      });

      // Deduct stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  return { received: true };
};
