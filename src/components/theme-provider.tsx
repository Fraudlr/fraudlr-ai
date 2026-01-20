/**
 * @fileoverview Theme Provider Component
 * 
 * This component provides theme context to the entire application,
 * enabling dark/light mode switching throughout the UI.
 * 
 * We use next-themes library which:
 * - Handles SSR correctly (prevents flash of wrong theme)
 * - Persists theme preference in localStorage
 * - Applies theme class to HTML element
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Theme Provider Wrapper
 * 
 * Wraps the next-themes provider to enable theming throughout the app.
 * Must be used as a Client Component because it uses browser APIs.
 * 
 * @param children - Child components that need theme access
 * @param props - Theme configuration options
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
