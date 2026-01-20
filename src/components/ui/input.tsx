/**
 * @fileoverview Input Component
 * 
 * A styled input component following shadcn/ui patterns.
 * Provides consistent styling for form inputs across the application.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input Props Interface
 * Extends all standard HTML input attributes
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input Component
 * 
 * A styled form input with consistent theming and focus states.
 * 
 * @example
 * <Input type="email" placeholder="Enter your email" />
 * <Input type="password" placeholder="Password" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base input styles
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          // Ring offset for focus state
          "ring-offset-background",
          // Placeholder styling
          "placeholder:text-muted-foreground",
          // Focus state with visible ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input specific styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
