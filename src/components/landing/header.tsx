/**
 * @fileoverview Header/Navigation Component
 * 
 * The main navigation header for the Fraudlr landing page.
 * Contains the logo, navigation menu items, and auth buttons.
 * 
 * Features:
 * - Responsive design (mobile hamburger menu)
 * - Smooth scroll navigation to page sections
 * - Sticky header on scroll
 */

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * Navigation items for the landing page
 * Each item links to a section on the page using smooth scroll
 */
const navItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "#docs" },
  { name: "Contact", href: "#contact" },
];

/**
 * Header Component
 * 
 * The main navigation component that sticks to the top of the page.
 * Includes logo, navigation links, and authentication buttons.
 */
export function Header() {
  // State for mobile menu open/close
  const [isOpen, setIsOpen] = React.useState(false);
  
  // State for header background on scroll
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Add scroll listener to change header style on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        // Base styles - fixed position at top
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Add background and blur when scrolled
        isScrolled
          ? "bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Links to home/top of page */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/Fraudlr Icon logo red.png"
              alt="Fraudlr Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-[#F3F3F3]">Fraudlr</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#D9D9D9] hover:text-[#FD4D53] transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login" className="text-[#D9D9D9] hover:text-[#F3F3F3]">
                Login
              </Link>
            </Button>
            <Button asChild className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu - Sheet component for slide-out menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-[#F3F3F3]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0F0F0F] border-[#545454]">
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-[#D9D9D9] hover:text-[#FD4D53] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-6 border-t border-[#545454] space-y-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
