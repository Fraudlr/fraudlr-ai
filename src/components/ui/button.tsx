/**
 * @fileoverview Button Component
 * 
 * A versatile button component built with shadcn/ui patterns.
 * Uses Class Variance Authority (CVA) to manage multiple variants
 * and sizes while keeping the code clean and maintainable.
 * 
 * Variants:
 * - default: Primary brand color (coral red)
 * - destructive: For dangerous actions (red)
 * - outline: Bordered, transparent background
 * - secondary: Less prominent actions
 * - ghost: Minimal styling, used in toolbars
 * - link: Styled as a text link
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button style variants using CVA
 * 
 * CVA allows us to define a base set of classes and then
 * create variants that can be combined. This makes component
 * APIs clean and type-safe.
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Visual style variants
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Size variants
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Default values when no variant is specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Button Props Interface
 * 
 * Extends standard HTML button attributes with our custom variants.
 * The `asChild` prop allows rendering the button as a different element
 * (useful for links styled as buttons).
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button Component
 * 
 * A flexible button component that supports multiple variants and sizes.
 * 
 * @example
 * // Primary button
 * <Button>Click me</Button>
 * 
 * // Outline button, small size
 * <Button variant="outline" size="sm">Settings</Button>
 * 
 * // Button as a link
 * <Button asChild>
 *   <Link href="/dashboard">Go to Dashboard</Link>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot when asChild is true to render children as the button
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
