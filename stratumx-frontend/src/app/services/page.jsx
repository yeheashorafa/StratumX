"use client";
import React, { useEffect, useState } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback dummy data if API fails or is empty while showcasing
  const dummyServices = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Custom scalable web applications built with modern frameworks.",
    },
    {
      id: 2,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that enhance user experience.",
    },
    {
      id: 3,
      title: "Backend Architecture",
      description:
        "Robust Node.js REST APIs and microservices tailored to your needs.",
    },
    {
      id: 4,
      title: "E-Commerce Solutions",
      description:
        "High-performance storefronts integrated with secure payment gateways.",
    },
    {
      id: 5,
      title: "SEO Optimization",
      description:
        "Drive traffic with technical SEO and optimized content delivery.",
    },
    {
      id: 6,
      title: "Database Architecture",
      description:
        "Scalable relatiional and NoSQL database modeling using Prisma.",
    },
  ];

  useEffect(() => {
    // In a real scenario, fetch from /api/services
    // For now, we simulate a loading state and use dummy data
    const timer = setTimeout(() => {
      setServices(dummyServices);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-black py-16 border-b border-gray-200 dark:border-gray-800 text-center">
        <div className="max-w-3xl mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover a comprehensive suite of digital solutions aimed at
            transforming your business presence online.
          </p>
        </div>
      </div>

      {/* Services Grid */}
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
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
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
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
