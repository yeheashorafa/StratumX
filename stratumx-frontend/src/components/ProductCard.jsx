"use client";
import Link from "next/link";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";

export default function ProductCard({ product, onAddToCart }) {
  const { language } = useUIStore();
  const name = product.translations?.[0]?.name || "Featured Product";
  const price = product.price || 0;
  const image = product.images?.[0]?.url || null;

  return (
    <div className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
      <Link
        href={`/products/${product.id}`}
        className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-900 block"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 ease-out">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-sm">
          ${price.toFixed(2)}
        </div>
      </Link>

      <div className="p-6 flex flex-col grow">
        <Link href={`/products/${product.id}`} className="block mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 grow line-clamp-2">
          {product.translations?.[0]?.description ||
            (language === "en"
              ? "High-quality exclusive item crafted specifically for our store. Grab yours today."
              : "قطعة حصرية عالية الجودة تم تصميمها خصيصاً لمتجرنا. احصل عليها اليوم.")}
        </p>

        <button
          onClick={() => onAddToCart(1)}
          className="w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-900 dark:text-white hover:text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
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
    </div>
  );
}
