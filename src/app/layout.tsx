/**
 * @fileoverview Root Layout Component
 * 
 * This is the root layout for the entire Next.js application.
 * It wraps all pages and provides:
 * - Font loading (Inter font from Google Fonts)
 * - Theme provider for dark/light mode switching
 * - Global metadata for SEO
 * 
 * Layout components in Next.js App Router are shared across
 * all pages in that route segment.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// Configure Inter font with Latin subset
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

/**
 * Metadata Configuration
 * 
 * This metadata is used for SEO and browser display.
 * Next.js automatically adds these tags to the HTML head.
 */
export const metadata: Metadata = {
  title: {
    default: "Fraudlr - AI Powered Fraud Detection",
    template: "%s | Fraudlr",
  },
  description:
    "AI powered fraud and anomaly detection platform. Assume fraud, proactively detect fraud in transactions and statements.",
  keywords: [
    "fraud detection",
    "AI",
    "anomaly detection",
    "financial security",
    "fintech",
    "Benford Law",
    "M-Score",
  ],
  authors: [{ name: "Fraudlr" }],
  creator: "Fraudlr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fraudlr.com",
    title: "Fraudlr - AI Powered Fraud Detection",
    description:
      "AI powered fraud and anomaly detection platform for financial security.",
    siteName: "Fraudlr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fraudlr - AI Powered Fraud Detection",
    description:
      "AI powered fraud and anomaly detection platform for financial security.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root Layout Component
 * 
 * This component wraps the entire application and is rendered on every page.
 * 
 * @param children - The page content to render inside the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Set the language and apply the Inter font CSS variable
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning // Required for next-themes to prevent hydration mismatch
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* ThemeProvider enables dark/light mode switching throughout the app */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to dark theme as per brand guidelines
          enableSystem={false} // Disable system theme detection
          disableTransitionOnChange // Prevent flash on theme change
        >
          {/* Main content area */}
          {children}
          
          {/* Toast notifications container - renders toast messages */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
