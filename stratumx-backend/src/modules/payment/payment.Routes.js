import express from "express";
import * as paymentController from "./payment.Controller.js";

const router = express.Router();

// Create Stripe Checkout Session (public - no auth required)
router.post("/create-session", paymentController.createSession);

// Stripe Webhook - must use raw body (not JSON parsed)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhook,
);

export default router;
