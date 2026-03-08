const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://stratumx.onrender.com/api";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

export const fetchOrders = async (businessId = 1, page = 1, limit = 10) => {
  const params = new URLSearchParams({ businessId, page, limit });
  const res = await fetch(`${API_URL}/orders?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return res.json();
};

export const trackOrder = async (orderNumber) => {
  const res = await fetch(`${API_URL}/orders/track/${orderNumber}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Order not found");
  return res.json();
};
