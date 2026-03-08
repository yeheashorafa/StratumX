// api/pages.js

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPages = async (
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

  const res = await fetch(`/api/pages?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
};

export const createPage = async (pageData) => {
  const res = await fetch(`/api/pages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(pageData),
  });
  if (!res.ok) throw new Error("Failed to create page");
  return res.json();
};

export const updatePage = async (id, pageData) => {
  const res = await fetch(`/api/pages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(pageData),
  });
  if (!res.ok) throw new Error("Failed to update page");
  return res.json();
};

export const deletePage = async (id) => {
  const res = await fetch(`/api/pages/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Failed to delete page");
  return res.json();
};
