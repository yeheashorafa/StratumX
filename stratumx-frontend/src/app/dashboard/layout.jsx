"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token");
      const userStr = localStorage.getItem("admin_user");

      if (!token || !userStr) {
        if (pathname !== "/login") {
          router.replace("/login");
        }
      } else {
        try {
          setAdminUser(JSON.parse(userStr));
          setIsAuthenticated(true);
          if (pathname === "/login") {
            router.replace("/dashboard");
          }
        } catch (e) {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
          if (pathname !== "/login") {
            router.replace("/login");
          }
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsAuthenticated(false);
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Prevent sidebar rendering / content hiding during login
  const isLoginPage = pathname === "/login";
  if (!isAuthenticated && !isLoginPage) return null;

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    );
  }

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      name: "CMS Pages",
      href: "/dashboard/pages",
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15",
    },
    { name: "Return to Site", href: "/", icon: "M10 19l-7-7m0 0l7-7m-7 7h18" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-800">
          <Link
            href="/dashboard"
            className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight"
          >
            Stratum<span className="text-gray-900 dark:text-white">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {links.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {adminUser?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {adminUser?.email || "admin@stratumx.local"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 dark:bg-red-900/20 dark:hover:bg-red-600 rounded-xl transition-colors"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 py-4 px-4 flex justify-between items-center sticky top-0 z-20">
          <Link
            href="/dashboard"
            className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight"
          >
            Stratum<span className="text-gray-900 dark:text-white">Admin</span>
          </Link>
          <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-4 sm:p-8 xl:p-12 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
