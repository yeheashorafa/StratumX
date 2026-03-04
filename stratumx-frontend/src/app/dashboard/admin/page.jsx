"use client";
import React from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      isPositive: true,
    },
    {
      name: "Active Users",
      value: "2,314",
      change: "+15.3%",
      isPositive: true,
    },
    { name: "New Orders", value: "324", change: "-4.2%", isPositive: false },
    { name: "Page Views", value: "84,392", change: "+32.1%", isPositive: true },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "Today, 10:24 AM",
      amount: "$124.00",
      status: "Completed",
    },
    {
      id: "ORD-002",
      customer: "Sarah Smith",
      date: "Today, 09:12 AM",
      amount: "$349.50",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      date: "Yesterday",
      amount: "$89.99",
      status: "Completed",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "Yesterday",
      amount: "$1,200.00",
      status: "Pending",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400";
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="hidden sm:flex gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            Export Data
          </button>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm text-center flex items-center gap-2">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-4">
              {stat.name}
            </h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <span
                className={`text-sm font-bold flex items-center gap-1 ${stat.isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {stat.isPositive ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View All Categories
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                  <th className="p-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {order.customer}
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white font-bold text-right">
                      {order.amount}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="flex flex-col gap-8">
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <h2 className="text-2xl font-bold mb-2 relative z-10">
              Fast Operations
            </h2>
            <p className="text-blue-100 mb-6 text-sm relative z-10">
              Easily manage your store's inventory and content.
            </p>

            <div className="space-y-3 relative z-10">
              <Link
                href="/admin/products/new"
                className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium"
              >
                <span>Add New Product</span>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Link>
              <Link
                href="/admin/pages/new"
                className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium"
              >
                <span>Create CMS Page</span>
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium"
              >
                <span>Store Settings</span>
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
