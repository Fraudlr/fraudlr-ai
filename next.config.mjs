/**
 * @fileoverview Next.js Configuration
 * 
 * This configuration file controls how Next.js builds and serves your application.
 * It's essential for production deployments and optimizing performance.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for highlighting potential problems in development
  // This helps catch common bugs and deprecated patterns early
  reactStrictMode: true,

  // Configure allowed image domains for Next.js Image component optimization
  // Add any external domains you're loading images from here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fraudlr.com',
      },
    ],
    // Allow unoptimized images for local development and static assets
    unoptimized: false,
  },

  // Environment variables that will be available on the client-side
  // Note: Only add PUBLIC variables here, never secrets
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default nextConfig;
