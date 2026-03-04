export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            Stratum<span className="text-gray-900 dark:text-white">X</span>
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            © 2026 StratumX. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
          <a
            href="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About
          </a>
          <a
            href="/services"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Services
          </a>
          <a
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
