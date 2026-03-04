"use client";
import { useEffect, useState, Suspense } from "react";
import { useCartStore } from "@/store/cartStore";
import { fetchProductById } from "../../../api/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { useUIStore } from "@/store/uiStore";

function ProductDetailsContent({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { language } = useUIStore();

  const searchParams = useSearchParams();
  // We can still optionally consume lang params for backend calls, or use store language.
  // Using store language ensures the UI is entirely synced.
  const lang = language || searchParams?.get("lang") || "en";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [extendedWarranty, setExtendedWarranty] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id, lang);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
        // Fallback or missing product logic here
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id, lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
        <svg
          className="w-24 h-24 text-gray-400 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {language === "en" ? "Product Not Found" : "المنتج غير موجود"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          {language === "en"
            ? "We couldn't find the product you're looking for. It may have been removed or is currently unavailable."
            : "لم نتمكن من العثور على المنتج الذي تبحث عنه. إما أنه قد تم حذفه أو غير متوفر حالياً."}
        </p>
        <Link
          href="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
        >
          {language === "en" ? "Back to Products" : "العودة إلى المنتجات"}
        </Link>
      </div>
    );
  }

  const name =
    product.translations?.[0]?.name ||
    (language === "en" ? "Premium Item" : "عنصر متميز");
  const desc =
    product.translations?.[0]?.description ||
    (language === "en"
      ? "Experience the pinnacle of quality and craftsmanship with this exclusive item."
      : "اختبر قمة الجودة والاحترافية مع هذا المنتج الحصري.");
  const price = product.price || 0;
  const image = product.images?.[0]?.url || null;

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name,
      price,
      quantity,
      image,
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-12 text-sm text-gray-500 dark:text-gray-400 font-medium animate-fade-in">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {language === "en" ? "Home" : "الرئيسية"}
          </Link>
          <span className="mx-3">/</span>
          <Link
            href="/products"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {language === "en" ? "Products" : "المنتجات"}
          </Link>
          <span className="mx-3">/</span>
          <span className="text-gray-900 dark:text-white truncate">{name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 animate-fade-in animation-delay-150">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl overflow-hidden aspect-square border border-gray-100 dark:border-gray-800 shadow-sm relative group">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <svg
                    className="w-24 h-24 text-gray-300 dark:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            {/* Thumbnails placeholder */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
              {[1, 2, 3].map((thumb) => (
                <div
                  key={thumb}
                  className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-blue-500 cursor-pointer overflow-hidden transition-all shrink-0"
                >
                  {image ? (
                    <img
                      src={image}
                      className="w-full h-full object-cover opacity-70 hover:opacity-100"
                      alt="thumb"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4 animate-fade-in animation-delay-300">
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full w-max mb-6 tracking-wide uppercase">
              {product.Category?.translations?.[0]?.name ||
                (language === "en" ? "New Arrival" : "وصل حديثاً")}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {name}
            </h1>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                ${price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through pb-1">
                ${(price * 1.2).toFixed(2)}
              </span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10 border-b border-gray-200 dark:border-gray-800 pb-10">
              {desc}
            </p>

            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {language === "en"
                    ? "Add Premium Gift Wrapping (+$5.00)"
                    : "إضافة تغليف هدايا ممتاز (+$5.00)"}
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extendedWarranty}
                  onChange={(e) => setExtendedWarranty(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {language === "en"
                    ? "1-Year Extended Warranty (+$15.00)"
                    : "ضمان ممدد لمدة عام (+$15.00)"}
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-bold text-xl"
                >
                  -
                </button>
                <div className="px-6 py-4 text-center font-bold text-lg text-gray-900 dark:text-white min-w-12">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-3 text-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {language === "en" ? "Add to Cart" : "أضف إلى السلة"}
              </button>
            </div>

            <div className="mb-10 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {language === "en"
                  ? "Guaranteed Safe Checkout"
                  : "دفع آمن ومضمون"}
              </span>
              <div className="flex gap-4 opacity-70">
                {/* Simulating Payment Badges */}
                <div className="px-3 py-1 bg-white dark:bg-gray-700 rounded shadow-sm text-xs font-bold text-blue-900 dark:text-white border border-gray-200 dark:border-gray-600">
                  VISA
                </div>
                <div className="px-3 py-1 bg-white dark:bg-gray-700 rounded shadow-sm text-xs font-bold text-red-600 dark:text-whtie border border-gray-200 dark:border-gray-600">
                  MasterCard
                </div>
                <div className="px-3 py-1 bg-white dark:bg-gray-700 rounded shadow-sm text-xs font-bold text-blue-500 dark:text-white border border-gray-200 dark:border-gray-600">
                  PayPal
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5 mx-4 text-green-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  {language === "en"
                    ? "Free Next-Day Delivery across major cities"
                    : "توصيل مجاني في اليوم التالي عبر المدن الرئيسية"}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5 mx-4 text-green-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  {language === "en"
                    ? "30-Day Money-Back Guarantee"
                    : "ضمان استرداد الأموال لمدة 30 يوماً"}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5 mx-4 text-green-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  {language === "en"
                    ? "Secure SSL encrypted checkout"
                    : "عملية دفع آمنة ومشفرة بتقنية SSL"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductDetailsPage({ params }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        }
      >
        <ProductDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
