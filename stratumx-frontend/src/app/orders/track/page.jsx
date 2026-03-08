"use client";
import { useState } from "react";
import { trackOrder } from "@/api/orders";
import { useUIStore } from "@/store/uiStore";
import Link from "next/link";
import Image from "next/image";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { language } = useUIStore();

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const data = await trackOrder(orderNumber);
      setOrder(data);
    } catch (err) {
      setError(
        language === "en"
          ? "Order not found. Please check the order number."
          : "لم يتم العثور على الطلب. يرجى التأكد من رقم الطلب.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {language === "en" ? "Track Your Order" : "تتبع طلبك"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {language === "en"
              ? "Enter your order number to see the current status."
              : "أدخل رقم الطلب لمعرفة الحالة الحالية."}
          </p>
        </div>

        <form
          onSubmit={handleTrack}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={
                language === "en"
                  ? "e.g. ORD-20240308-ABC123"
                  : "مثال: ORD-20240308-ABC123"
              }
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-lg transition-all"
              dir="ltr"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg disabled:opacity-50"
            >
              {loading
                ? language === "en"
                  ? "Tracking..."
                  : "جاري التتبع..."
                : language === "en"
                  ? "Track Now"
                  : "تتبع الآن"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
          )}
        </form>

        {order && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {language === "en" ? "Order Status" : "حالة الطلب"}
                </p>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                    order.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">
                  {language === "en" ? "Total Amount" : "المبلغ الإجمالي"}
                </p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  ${order.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="p-8">
              <h3 className="font-bold text-lg mb-4">
                {language === "en" ? "Line Items" : "المنتجات"}
              </h3>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700 relative">
                      {item.product?.images?.[0]?.url && (
                        <Image
                          src={item.product.images[0].url}
                          alt="product"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {item.product?.translations?.find(
                          (t) => t.lang === language,
                        )?.name ||
                          item.product?.translations?.[0]?.name ||
                          "Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.priceSnapshot?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
