// api/services.js

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchServices = async (
  businessId = 1,
  lang = "en",
  page = 1,
  limit = 10,
) => {
  const params = new URLSearchParams();
  if (businessId) params.append("businessId", businessId);
  if (lang) params.append("lang", lang);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const res = await fetch(`/api/services?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
};

export const createService = async (serviceData) => {
  const res = await fetch(`/api/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return res.json();
};

export const updateService = async (id, serviceData) => {
  const res = await fetch(`/api/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) throw new Error("Failed to update service");
  return res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`/api/services/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Failed to delete service");
  return res.json();
};
