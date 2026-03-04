// api/cart.js
export const addToCartAPI = async (productId, quantity) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
};