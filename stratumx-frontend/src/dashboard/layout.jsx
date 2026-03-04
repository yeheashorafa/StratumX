"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // تحقق من توكن الـ JWT + Role
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      router.push("/login"); // Redirect للـ Login إذا لم يكن Admin
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Overview</a>
          <a href="/dashboard/products" className="hover:bg-gray-700 p-2 rounded">Products</a>
          <a href="/dashboard/services" className="hover:bg-gray-700 p-2 rounded">Services</a>
          <a href="/dashboard/pages" className="hover:bg-gray-700 p-2 rounded">Pages</a>
          <a href="/dashboard/orders" className="hover:bg-gray-700 p-2 rounded">Orders</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}