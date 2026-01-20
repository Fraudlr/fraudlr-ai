/**
 * @fileoverview Prisma Database Client
 * 
 * This file initializes and exports the Prisma Client for database operations.
 * 
 * IMPORTANT: In development, Next.js hot-reloads the server which would create
 * multiple Prisma Client instances. We prevent this by storing the client
 * on the global object.
 * 
 * In production, this is not an issue as the server only starts once.
 */

import { PrismaClient } from "@prisma/client";

/**
 * Extend the global namespace to include our Prisma Client
 * This is a TypeScript requirement for adding custom properties to global
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create or reuse the Prisma Client instance
 * 
 * In development:
 * - Reuses existing client from global object
 * - Prevents connection pool exhaustion from hot reloads
 * 
 * In production:
 * - Creates a single client instance
 * - Logs queries to help with debugging
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"] // Log queries in development for debugging
        : ["error"], // Only log errors in production
  });

// Store the client on global in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
