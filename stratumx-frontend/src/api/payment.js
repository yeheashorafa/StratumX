// api/payment.js

export const createCheckoutSession = async (items, businessId = 1) => {
  const res = await fetch("/api/payment/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, businessId }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to initiate payment");
  }

  return res.json(); // returns { sessionId, url }
};
