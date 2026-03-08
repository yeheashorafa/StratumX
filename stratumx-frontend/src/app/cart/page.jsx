"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const { language } = useUIStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 animate-fade-in">
          {language === "en" ? "Shopping Cart" : "سلة التسوق"}
        </h1>

        {!items.length ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in animation-delay-300">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "en" ? "Your cart is empty" : "سلتك فارغة"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {language === "en"
                ? "Looks like you haven't added anything to your cart yet. Let's get you started."
                : "يبدو أنك لم تضف أي شيء إلى سلتك بعد. لنبدأ من هنا."}
            </p>
            <Link
              href="/store"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            >
              {language === "en" ? "Continue Shopping" : "تابع التسوق"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shrink-0 relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
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
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {language === "en" ? "Quantity" : "الكمية"}:{" "}
                      {item.quantity}
                    </p>
                    <div className="flex items-center justify-center sm:justify-between">
                      <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm ml-4 sm:ml-0 transition-colors"
                      >
                        {language === "en" ? "Remove" : "حذف"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24 animate-fade-in animation-delay-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === "en" ? "Order Summary" : "ملخص الطلب"}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>
                    {language === "en" ? "Subtotal" : "المجموع الفرعي"}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{language === "en" ? "Tax" : "الضريبة"}</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    $0.00
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {language === "en" ? "Total" : "المجموع الكلي"}
                  </span>
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-md flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : language === "en" ? (
                  "Proceed to Checkout"
                ) : (
                  "المتابعة للدفع"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
