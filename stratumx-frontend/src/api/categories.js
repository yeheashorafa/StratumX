// api/categories.js
export const fetchCategories = async (businessId = 1, lang = "en") => {
  const params = new URLSearchParams();
  if (businessId) params.append("businessId", businessId);
  if (lang) params.append("lang", lang);

  const res = await fetch(`/api/categories?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
