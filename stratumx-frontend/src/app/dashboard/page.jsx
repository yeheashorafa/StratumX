export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm">
          Download Report
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
            Total Sales
          </p>
          <div className="flex items-end gap-2 text-gray-900 dark:text-white">
            <h3 className="text-3xl font-extrabold">$24,560</h3>
            <span className="text-green-500 font-bold text-sm mb-1 bg-green-50 dark:bg-green-900/40 px-2 py-0.5 rounded flex items-center gap-1">
              &uarr; 12%
            </span>
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
            Active Users
          </p>
          <div className="flex items-end gap-2 text-gray-900 dark:text-white">
            <h3 className="text-3xl font-extrabold">1,204</h3>
            <span className="text-red-500 font-bold text-sm mb-1 bg-red-50 dark:bg-red-900/40 px-2 py-0.5 rounded flex items-center gap-1">
              &darr; 2%
            </span>
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
            Total Orders
          </p>
          <div className="flex items-end gap-2 text-gray-900 dark:text-white">
            <h3 className="text-3xl font-extrabold">380</h3>
            <span className="text-green-500 font-bold text-sm mb-1 bg-green-50 dark:bg-green-900/40 px-2 py-0.5 rounded flex items-center gap-1">
              &uarr; 8%
            </span>
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
            Bounce Rate
          </p>
          <div className="flex items-end gap-2 text-gray-900 dark:text-white">
            <h3 className="text-3xl font-extrabold">42%</h3>
            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm mb-1 px-2 py-0.5 border border-gray-200 dark:border-gray-700 rounded flex items-center gap-1">
              - 0%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-gray-750">
            Recent Activity
          </h3>
          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white font-bold truncate">
                    New order #100{idx} received
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    3 minutes ago &middot; Paid via Sandbox
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
