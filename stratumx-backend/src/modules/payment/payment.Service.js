import Stripe from "stripe";
import prisma from "../../config/db.js";
import pkg from "@prisma/client";
const { OrderStatus, PaymentStatus, PaymentMethod } = pkg;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/**
 * Creates a Stripe Checkout Session.
 */
export const createCheckoutSession = async (
  items,
  businessId = 1,
  { customerEmail = null, lang = "en" } = {},
) => {
  if (!items || items.length === 0) throw new Error("Cart is empty");

  const lineItems = [];
  const validatedItems = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { translations: { where: { lang } } },
    });

    if (!product || !product.isActive || product.isDeleted)
      throw new Error(`Product ${item.productId} not found`);
    if (product.stock < item.quantity)
      throw new Error(
        `Not enough stock for: ${product.translations[0]?.name || "Product"}`,
      );

    const name = product.translations[0]?.name || `Product #${product.id}`;

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    });

    validatedItems.push({
      productId: product.id,
      quantity: item.quantity,
      priceSnapshot: product.price,
    });
  }

  const sessionData = {
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/checkout/cancel`,
    metadata: {
      businessId: String(businessId),
      items: JSON.stringify(validatedItems),
    },
  };

  if (customerEmail && customerEmail.trim() !== "") {
    sessionData.customer_email = customerEmail;
  }

  const session = await stripe.checkout.sessions.create(sessionData);

  return { sessionId: session.id, url: session.url };
};

/**
 * Handles Stripe webhook events.
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
      const orderNumber = `ORD-${session.id.slice(-8).toUpperCase()}`;
      const totalAmount = session.amount_total / 100;

      // New Redesign: Store guest info directly in Order, userId is null
      const order = await tx.order.create({
        data: {
          userId: null, // Guest checkout via Stripe
          businessId: bId,
          orderNumber,
          totalAmount,
          status: OrderStatus.PAID,
          paymentStatus: PaymentStatus.COMPLETED,
          paymentMethod: PaymentMethod.STRIPE,
          transactionId: session.id,
          customerEmail: session.customer_details?.email,
          customerName: session.customer_details?.name,
          items: { create: items },
        },
      });

      // Deduct stock
      for (const item of items) {
        // We use atomic decrement
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
