"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "@/store/cartStore";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const addItemToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
    const loadProducts = async () => {
      try {
        // Fetch products, limit to 3 for featured
        const response = await fetchProducts(1, "en", 1, undefined, undefined);
        let data = [];
        if (response && Array.isArray(response.data)) {
          data = response.data;
        } else if (Array.isArray(response)) {
          data = response;
        }
        setFeaturedProducts(data.slice(0, 3));
      } catch (err) {
        console.error("Home page products error:", err);
      }
    };
    loadProducts();
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-br from-blue-900 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center animate-fade-in z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">
            Elevate Your Business with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
              StratumX
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-blue-100 mb-10 drop-shadow-md">
            The ultimate fullstack showcase combining a modern portfolio,
            dynamic e-commerce, and a powerful admin dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/store"
              className="bg-white text-blue-700 hover:bg-gray-50 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Store
            </Link>
            <Link
              href="/services"
              className="bg-blue-800/50 backdrop-blur-md border border-blue-400/30 text-white hover:bg-blue-700/50 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            We deliver integrated business solutions combining a comprehensive
            corporate showcase and a seamless digital storefront, equipped with
            an intuitive management dashboard.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Learn More
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Core Services
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Discover what we can do for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Premium Service {item}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                  High-quality, scalable solutions tailored to meet the highest
                  industry standards.
                </p>
                <Link
                  href="/services"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Explore Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Products
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Top picks from our store.
              </p>
            </div>
            <Link
              href="/store"
              className="hidden sm:inline-flex text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
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
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                Loading featured products...
              </div>
            )}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/store"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
