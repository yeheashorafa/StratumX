"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-b from-blue-900 to-indigo-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            About StratumX
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            A comprehensive Technical Showcase combining a powerful corporate
            portal with a dynamic e-commerce storefront, designed for peak
            performance and elegant user experiences.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-lg border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To provide a seamless digital experience that proves the
                capability of modern web technologies. We focus on clean
                architecture, lightning-fast rendering, and intuitive user
                interfaces that scale gracefully across all devices.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-lg border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the ultimate benchmark for full-stack developers crafting
                production-ready React applications. We demonstrate how to
                flawlessly integrate complex backend services with beautiful
                frontend designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Preview */}
      <section className="py-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Powered By Modern Tech
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Next.js",
              "Express",
              "Prisma",
              "TailwindCSS",
              "Zustand",
              "Redis",
            ].map((tech) => (
              <span
                key={tech}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 font-semibold shadow-sm border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to work with us?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Get in touch to learn how we can bring your next big idea to life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
