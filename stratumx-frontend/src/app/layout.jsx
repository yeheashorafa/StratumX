import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

import { generatePageMetadata } from "./utils/metadata";

export const metadata = generatePageMetadata({
  title: "Premium E-Commerce & Corporate Platform",
  path: "/",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
