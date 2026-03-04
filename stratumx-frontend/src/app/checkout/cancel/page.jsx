"use client";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-20 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 max-w-lg w-full text-center shadow-xl border border-gray-100 dark:border-gray-700 animate-scale-in">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Your payment was not completed. If this was a mistake, you can try
          again from your cart.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cart"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Review Cart
          </Link>
          <Link
            href="/store"
            className="inline-block bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 font-bold py-4 px-10 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
