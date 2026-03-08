import * as paymentService from "./payment.Service.js";

export const createSession = async (req, res, next) => {
  try {
    const { items, businessId, customerEmail, lang } = req.body;
    const result = await paymentService.createCheckoutSession(
      items,
      businessId,
      { customerEmail, lang },
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const webhook = async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    // req.body is raw Buffer here (express.raw middleware)
    const result = await paymentService.handleWebhook(req.body, signature);
    res.status(200).json(result);
  } catch (err) {
    // For Stripe webhook errors, always return 400
    res.status(400).json({ error: err.message });
  }
};
