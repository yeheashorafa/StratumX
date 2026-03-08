"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/api/payment";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState(1); // 1: Cart Confirm, 2: Shipping, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    email: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    saveInfo: false,
  });

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Redirect if empty
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      router.push("/cart");
    }
  }, [items, router, step]);

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) submitOrder();
  };

  const submitOrder = async () => {
    setLoading(true);
    setError("");
    try {
      // Map items to { productId, quantity } for backend
      const checkoutItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const { url } = await createCheckoutSession(
        checkoutItems,
        1,
        shippingData.email,
      );

      if (url) {
        window.location.href = url; // Redirect to Stripe
      } else {
        throw new Error("Failed to get checkout URL from server");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Something went wrong initiating payment. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    // Note: Success step is handled by redirect, but keeping this for robustness
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
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Thank you for shopping with StratumX. Your order has been
            successfully placed and will be shipped soon.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full z-0"></div>
            <div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
              style={{ width: step === 1 ? "0%" : "50%" }}
            ></div>

            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              1
            </div>
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-400"}`}
            >
              2
            </div>
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? "bg-blue-600 text-white" : "bg-white border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-400"}`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className={step >= 1 ? "text-blue-600" : ""}>
              Review Cart
            </span>
            <span className={step >= 2 ? "text-blue-600" : ""}>
              Shipping & Payment
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 font-bold text-center animate-shake">
            {error}
          </div>
        )}

        {/* Step 1: Review */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Review Your Order
            </h2>
            <div className="space-y-6 mb-10">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white min-w-0 truncate pr-4">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Total Amount
              </span>
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                href="/cart"
                className="px-8 py-4 text-center font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                Back to Cart
              </Link>
              <button
                onClick={handleNextStep}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Shipping Details
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Please enter your shipping and payment information.
            </p>

            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.fullName}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, city: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
                    placeholder="New York"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingData.email}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.address}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-6 border-t border-gray-100 dark:border-gray-700 mt-8 mb-6">
                Payment Information
              </h3>

              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 p-4 border border-blue-500 rounded-xl bg-blue-50 dark:bg-blue-900/20 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={shippingData.paymentMethod === "credit_card"}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-bold text-blue-900 dark:text-blue-300 flex-1">
                    Secure Stripe Payment
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-white dark:bg-black rounded text-xs font-bold shadow-sm border border-gray-200 dark:border-gray-700">
                      VISA
                    </span>
                    <span className="px-2 py-0.5 bg-white dark:bg-black rounded text-xs font-bold shadow-sm border border-gray-200 dark:border-gray-700">
                      MC
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-4 text-center font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
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
                  ) : (
                    "Complete Order on Stripe"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
