// api/orders.js

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchOrders = async (businessId = 1, page = 1, limit = 10) => {
  const params = new URLSearchParams();
  if (businessId) params.append("businessId", businessId);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const res = await fetch(`/api/orders?${params.toString()}`, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const fetchOrderById = async (id) => {
  const res = await fetch(`/api/orders/${id}`, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Order not found");
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return res.json();
};
