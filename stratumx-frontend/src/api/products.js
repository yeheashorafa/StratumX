// api/product.js
export const fetchproduct = async (
  businessId = 1,
  lang = "en",
  page = 1,
  categoryId,
  search,
) => {
  const params = new URLSearchParams();
  if (businessId) params.append("businessId", businessId);
  if (lang) params.append("lang", lang);
  if (page) params.append("page", page);
  if (categoryId) params.append("categoryId", categoryId);
  if (search) params.append("search", search);

  const res = await fetch(`/api/product?${params.toString()}`);
  return res.json();
};

export const fetchProductBySlug = async (businessId = 1, slug, lang = "en") => {
  const params = new URLSearchParams();
  if (businessId) params.append("businessId", businessId);
  if (slug) params.append("slug", slug);
  if (lang) params.append("lang", lang);

  const res = await fetch(`/api/product/${slug}?${params.toString()}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

export const fetchProductById = async (id, lang = "en") => {
  const params = new URLSearchParams();
  if (lang) params.append("lang", lang);

  const res = await fetch(`/api/product/${id}?${params.toString()}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createProduct = async (productData) => {
  const res = await fetch(`/api/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`/api/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`/api/product/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};
