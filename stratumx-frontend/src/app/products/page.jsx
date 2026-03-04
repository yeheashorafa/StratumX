"use client";
import { useEffect, useState, Suspense } from "react";
import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = searchParams?.get("lang") || "en";
  const businessId = searchParams?.get("businessId") || 1;

  const addItemToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(businessId, lang);
        if (response && Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response)) {
          setProducts(response);
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
  }, [businessId, lang]);

  return (
    <>
      <div className="bg-white dark:bg-black py-12 border-b border-gray-200 dark:border-gray-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 animate-fade-in">
            Explore Our Collection
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl animate-fade-in animation-delay-300">
            Hand-picked, premium items crafted for perfection. Discover the best
            choices for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
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
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Suspense
        fallback={
          <div className="flex justify-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
    </div>
  );
}
