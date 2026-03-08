"use client";
import React, { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";

export default function ServicesClient() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useUIStore();

  const dummyServices = [
    {
      id: 1,
      enTitle: "Web Development",
      arTitle: "تطوير الويب",
      enDescription:
        "Custom scalable web applications built with modern frameworks.",
      arDescription:
        "تطبيقات الويب المخصصة القابلة للتطوير باستخدام أحدث إطارات العمل.",
    },
    {
      id: 2,
      enTitle: "UI/UX Design",
      arTitle: "تصميم واجهة وتجربة المستخدم",
      enDescription:
        "Beautiful, intuitive interfaces that enhance user experience.",
      arDescription: "واجهات جذابة وبديهية تعزز تجربة المستخدم بشكل كبير.",
    },
    {
      id: 3,
      enTitle: "Backend Architecture",
      arTitle: "هيكلة وتطوير الأنظمة الخلفية",
      enDescription:
        "Robust Node.js REST APIs and microservices tailored to your needs.",
      arDescription:
        "واجهات برمجة تطبيقات (APIs) قوية وخدمات مصغرة مصممة لتلبية احتياجاتك.",
    },
    {
      id: 4,
      enTitle: "E-Commerce Solutions",
      arTitle: "حلول التجارة الإلكترونية",
      enDescription:
        "High-performance storefronts integrated with secure payment gateways.",
      arDescription:
        "واجهات متاجر عالية الأداء مدمجة مع بوابات دفع آمنة موثوقة.",
    },
    {
      id: 5,
      enTitle: "SEO Optimization",
      arTitle: "تحسين محركات البحث",
      enDescription:
        "Drive traffic with technical SEO and optimized content delivery.",
      arDescription:
        "زيادة الزيارات باستخدام التكتيكات التقنية والمحتوى المحسن.",
    },
    {
      id: 6,
      enTitle: "Database Architecture",
      arTitle: "هندسة قواعد البيانات",
      enDescription:
        "Scalable relational and NoSQL database modeling using Prisma.",
      arDescription:
        "نمذجة قواعد البيانات العلاقية وغير العلاقية باستخدام Prisma.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(dummyServices);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-black py-16 border-b border-gray-200 dark:border-gray-800 text-center">
        <div className="max-w-3xl mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {language === "en" ? "Our Services" : "خدماتنا"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {language === "en"
              ? "Discover a comprehensive suite of digital solutions aimed at transforming your business presence online."
              : "اكتشف مجموعة شاملة من الحلول الرقمية التي تهدف إلى تحويل وتطوير حضور أعمالك على الإنترنت."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {loading ? (
          <div className="flex justify-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === "en" ? service.enTitle : service.arTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {language === "en"
                    ? service.enDescription
                    : service.arDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
