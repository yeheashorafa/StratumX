"use client";
import { useUIStore } from "@/store/uiStore";
import Link from "next/link";

export default function Footer() {
  const { language } = useUIStore();

  return (
    <footer className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-10 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/">
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
              Stratum<span className="text-gray-900 dark:text-white">X</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {language === "en"
              ? "© 2026 StratumX. All rights reserved."
              : "© 2026 ستراتم اكس. جميع الحقوق محفوظة."}
          </p>
        </div>
        <div className="flex gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {language === "en" ? "About" : "عنّا"}
          </Link>
          <Link
            href="/services"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {language === "en" ? "Services" : "الخدمات"}
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {language === "en" ? "Contact" : "تواصل معنا"}
          </Link>
          <Link
            href="/orders/track"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {language === "en" ? "Track Order" : "تتبع الطلب"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
