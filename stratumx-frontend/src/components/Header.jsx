"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useTheme } from "next-themes";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const { language, toggleLanguage } = useUIStore();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = mounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const cartTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const links = [
    { label: language === "en" ? "Home" : "الرئيسية", href: "/" },
    { label: language === "en" ? "About" : "من نحن", href: "/about" },
    { label: language === "en" ? "Services" : "خدماتنا", href: "/services" },
    { label: language === "en" ? "Products" : "منتجاتنا", href: "/products" },
    { label: language === "en" ? "Store" : "المتجر", href: "/store" },
    { label: language === "en" ? "Contact" : "تواصل معنا", href: "/contact" },
    { label: language === "en" ? "Admin" : "لوحة التحكم", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tighter"
            >
              Stratum<span className="text-gray-900 dark:text-white">X</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6 space-x-reverse">
            <ul className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className={`ml-4 hidden md:flex items-center gap-4 ${language === "ar" ? "mr-4 ml-0" : ""}`}
            >
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
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
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
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
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
              )}

              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-semibold transition-all duration-200"
              >
                {language === "en" ? "عربي" : "EN"}
              </button>
            </div>
          </div>

          {/* Cart & Mobile Menu Controls */}
          <div className="flex items-center gap-4">
            {/* Mobile Theme Toggle */}
            <div className="md:hidden">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                >
                  {theme === "dark" ? (
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
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
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
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Cart with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                {cartItemCount > 0 && (
                  <span className="absolute top-6 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mini Cart Dropdown */}
              {isCartOpen && (
                <div
                  className={`absolute top-full ${language === "ar" ? "left-0" : "right-0"} mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200`}
                >
                  <div className="p-4 overflow-y-auto max-h-[400px]">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        {language === "en" ? "Shopping Cart" : "سلة التسوق"}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {cartItemCount} {language === "en" ? "items" : "منتجات"}
                      </span>
                    </div>

                    {items.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500 text-sm">
                          {language === "en"
                            ? "Your cart is empty"
                            : "سلة التسوق فارغة"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 animate-in fade-in slide-in-from-right-1"
                          >
                            <div className="w-16 h-16 rounded-lg bg-gray-50 dark:bg-gray-800 shrink-0 overflow-hidden">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {item.quantity} x ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors self-start"
                            >
                              <svg
                                className="w-4 h-4"
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
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {items.length > 0 && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {language === "en" ? "Total:" : "المجموع:"}
                        </span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/cart"
                          className="px-4 py-2 text-center text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {language === "en" ? "View Cart" : "عرض السلة"}
                        </Link>
                        <Link
                          href="/checkout"
                          className="px-4 py-2 text-center text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          {language === "en" ? "Checkout" : "الدفع"}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 animate-fade-in shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 mt-4"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {language === "en" ? "التبديل للعربية" : "Switch to English"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
