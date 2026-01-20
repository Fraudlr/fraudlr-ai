/**
 * @fileoverview Tailwind CSS Configuration
 * 
 * This file configures Tailwind CSS with the Fraudlr brand colors and design tokens.
 * We use the shadcn/ui design system with custom color overrides to match our brand.
 * 
 * Brand Colors:
 * - #0F0F0F: Primary background (near black)
 * - #FD4D53: Accent color (coral red)
 * - #545454: Muted text (dark gray)
 * - #D9D9D9: Secondary text (light gray)
 * - #F3F3F3: Primary text on dark backgrounds
 */

import type { Config } from "tailwindcss";

const config = {
  // Enable dark mode via class strategy (allows manual toggling)
  darkMode: ["class"],

  // Define which files Tailwind should scan for class names
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  // Prefix for Tailwind classes (empty = no prefix)
  prefix: "",

  theme: {
    // Container configuration for consistent max-widths
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      // Custom color palette using Fraudlr brand colors
      colors: {
        // Core brand colors
        brand: {
          dark: "#0F0F0F",
          accent: "#FD4D53",
          muted: "#545454",
          light: "#D9D9D9",
          white: "#F3F3F3",
        },
        
        // shadcn/ui compatible color tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Border radius using CSS variables for consistency
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Custom font family using Geist (as specified in requirements)
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },

      // Keyframe animations for UI components
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Fade in animation for smooth component mounting
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        // Slide up animation for modal/dialog entrances
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },

      // Animation utility classes
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },

  // Tailwind CSS plugins for additional functionality
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
