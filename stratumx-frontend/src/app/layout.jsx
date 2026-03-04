import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "StratumX | Premium E-Commerce & Corporate Platform",
  description:
    "StratumX is a production-ready Fullstack platform combining a high-performance corporate portal with an elegant e-commerce storefront.",
  keywords: [
    "E-Commerce",
    "Corporate",
    "StratumX",
    "Next.js",
    "Fullstack",
    "Shopping",
  ],
  openGraph: {
    title: "StratumX | Premium E-Commerce & Corporate Platform",
    description:
      "Experience the next level of digital commerce and corporate showcases.",
    url: "https://stratumx.co",
    siteName: "StratumX",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: "StratumX Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StratumX | Premium Platform",
    description: "Experience the next level of digital commerce.",
    images: ["/og-image.jpg"],
  },
};

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
