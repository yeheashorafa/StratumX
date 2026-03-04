"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { useUIStore } from "../store/uiStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const { language } = useUIStore();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  if (!mounted) {
    // Prevent hydration mismatch by returning a clean shell on initial SSR
    return <div className="min-h-screen opacity-0" />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${language === "ar" ? "font-arabic" : "font-sans"}`}
      >
        {!isDashboard && <Header />}
        <main className="flex-1">{children}</main>
        {!isDashboard && <Footer />}
      </div>
    </ThemeProvider>
  );
}
