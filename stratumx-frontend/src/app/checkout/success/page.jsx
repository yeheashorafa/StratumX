"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-20 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 max-w-lg w-full text-center shadow-xl border border-gray-100 dark:border-gray-700 animate-scale-in">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-green-600 dark:text-green-400"
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
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and is
          being processed.
        </p>
        <Link
          href="/store"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
}
