"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientLayout({ children }) {
  const [lang, setLang] = useState("en");

  // Update HTML lang attribute when lang state changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
