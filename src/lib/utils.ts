/**
 * @fileoverview Utility Functions
 * 
 * This file contains shared utility functions used throughout the application.
 * The main utility here is `cn()` which combines Tailwind CSS classes intelligently.
 * 
 * Why use cn()?
 * - Merges class names without duplicates
 * - Handles conditional classes elegantly
 * - Resolves Tailwind class conflicts (e.g., "p-2 p-4" becomes "p-4")
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, intelligently merging
 * Tailwind CSS classes to avoid conflicts.
 * 
 * @param inputs - Class names, conditional expressions, or arrays of classes
 * @returns A single merged class string
 * 
 * @example
 * cn("p-4", "p-2") // Returns "p-2" (last value wins for conflicts)
 * cn("text-red-500", condition && "bg-blue-500") // Conditional classes
 * cn(["class1", "class2"], "class3") // Arrays and strings mixed
 */
export function cn(...inputs: ClassValue[]) {
  // clsx handles conditional classes and arrays
  // twMerge resolves Tailwind-specific conflicts
  return twMerge(clsx(inputs));
}

/**
 * Formats a price number to a currency string
 * 
 * @param amount - The price amount as a number
 * @param currency - The currency code (USD or ZAR)
 * @returns Formatted price string
 * 
 * @example
 * formatPrice(10, "USD") // Returns "$10.00"
 * formatPrice(180, "ZAR") // Returns "R180.00"
 */
export function formatPrice(amount: number, currency: "USD" | "ZAR" = "USD"): string {
  // Exchange rate: 1 USD ≈ 18 ZAR (approximate, would be fetched from API in production)
  const exchangeRate = 18;
  
  if (currency === "ZAR") {
    const zarAmount = amount * exchangeRate;
    return `R${zarAmount.toFixed(2)}`;
  }
  
  return `$${amount.toFixed(2)}`;
}

/**
 * Delays execution for a specified number of milliseconds
 * Useful for debouncing or simulating async operations
 * 
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validates an email address format
 * 
 * @param email - The email string to validate
 * @returns True if the email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
