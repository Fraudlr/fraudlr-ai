/**
 * @fileoverview Dashboard Sidebar Component
 * 
 * A ChatGPT-style sidebar navigation for the dashboard.
 * Contains main navigation items, settings, and profile access.
 * 
 * Structure:
 * - Logo at top
 * - Main navigation: Overview, New Case, Case History, Integration
 * - Bottom section: Settings, Profile
 */

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Plug,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * Navigation items for the main section
 */
const mainNavItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "New Case",
    href: "/dashboard/new-case",
    icon: PlusCircle,
  },
  {
    name: "Case History",
    href: "/dashboard/cases",
    icon: History,
  },
  {
    name: "Integration",
    href: "/dashboard/integration",
    icon: Plug,
  },
];

/**
 * Navigation items for the bottom section
 */
const bottomNavItems = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

/**
 * Sidebar Navigation Link Component
 * Renders a single navigation item with active state
 */
function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: (typeof mainNavItems)[0];
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-[#FD4D53]/10 text-[#FD4D53]"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.name}</span>
    </Link>
  );
}

/**
 * Sidebar Content Component
 * The actual sidebar content, used in both desktop and mobile views
 */
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-4 flex items-center gap-2">
        <Image
          src="/images/Fraudlr Icon logo red.png"
          alt="Fraudlr"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <span className="text-xl font-bold text-foreground">Fraudlr</span>
      </div>

      <Separator className="mx-4 w-auto" />

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              onClick={onClose}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="border-t p-3 space-y-2">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            onClick={onClose}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Sidebar Component
 * 
 * Desktop: Fixed sidebar on the left
 * Mobile: Collapsible sheet accessible via hamburger menu
 */
export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:flex-col border-r bg-card">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Sheet component */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
