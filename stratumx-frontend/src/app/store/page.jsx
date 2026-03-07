"use client";
import { useEffect, useState, Suspense } from "react";
import { useCartStore } from "@/store/cartStore";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { fetchProducts } from "@/api/products";
import { fetchCategories } from "@/api/categories";
import { useUIStore } from "@/store/uiStore";

function StoreContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { language } = useUIStore();

  const lang = searchParams?.get("lang") || "en";
  const businessId = searchParams?.get("businessId") || 1;

  const addItemToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(businessId, language);
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    loadCategories();
  }, [businessId, language]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // We use the real categoryId if filter is not "all"
        const categoryId = filter === "all" ? undefined : parseInt(filter);
        const response = await fetchProducts(
          businessId,
          language,
          currentPage,
          categoryId,
          searchQuery,
        );

        if (response && response.data) {
          setProducts(response.data);
          setTotalPages(response.pagination?.totalPages || 1);
        } else if (Array.isArray(response)) {
          setProducts(response);
          setTotalPages(1);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [businessId, language, currentPage, filter, searchQuery]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  return (
    <>
      <div className="bg-white dark:bg-black py-16 border-b border-gray-200 dark:border-gray-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-in">
            {language === "en" ? "StratumX Store" : "متجر ستراتم اكس"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto animate-fade-in animation-delay-300">
            {language === "en"
              ? "Find exactly what you need with our advanced filters and search functionality."
              : "اكتشف متطلباتك بدقة من خلال تقنيات البحث والفلاتر المتقدمة."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-8 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === "en" ? "Search" : "البحث"}
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search products..."
                    : "ابحث عن المنتجات..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white transition-colors"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
              <svg
                className={`w-5 h-5 text-gray-400 absolute top-3.5 ${language === "ar" ? "right-3.5" : "left-3.5"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === "en" ? "Categories" : "الفئات"}
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filter === "all" ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600 group-hover:border-blue-400"}`}
                >
                  {filter === "all" && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="radio"
                  className="hidden"
                  name="category"
                  value="all"
                  onChange={(e) => setFilter(e.target.value)}
                  checked={filter === "all"}
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                  {language === "en" ? "All Categories" : "كل الفئات"}
                </span>
              </label>

              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filter === cat.id.toString() ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600 group-hover:border-blue-400"}`}
                  >
                    {filter === cat.id.toString() && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="radio"
                    className="hidden"
                    name="category"
                    value={cat.id.toString()}
                    onChange={(e) => setFilter(e.target.value)}
                    checked={filter === cat.id.toString()}
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {cat.translations?.[0]?.name || "Category"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {language === "en" ? "No products found" : "لا يوجد منتجات"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {language === "en"
                  ? "Try adjusting your filters or check back later."
                  : "حاول تعديل خيارات البحث أو عد لاحقاً."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(index % 6) * 100}ms` }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={(quantity = 1) =>
                        addItemToCart({
                          id: product.id,
                          name: product.translations?.[0]?.name || "Product",
                          price: product.price,
                          quantity,
                          image: product.images?.[0]?.url,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <StoreContent />
      </Suspense>
    </div>
  );
}
