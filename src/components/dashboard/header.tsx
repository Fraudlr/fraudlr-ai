/**
 * @fileoverview Dashboard Header Component
 * 
 * The top header bar for the dashboard.
 * Contains:
 * - Upgrade button (for free users)
 * - Theme toggle (light/dark)
 * - Currency toggle (USD/ZAR)
 * - User profile dropdown
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, DollarSign, User, LogOut, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

/**
 * Dashboard Header Component
 * 
 * Provides quick access to settings and user actions.
 */
export function DashboardHeader() {
  // State for currency preference
  const [currency, setCurrency] = React.useState<"USD" | "ZAR">("USD");
  
  // Theme toggle hook
  const { theme, setTheme } = useTheme();
  
  // Navigation and notifications
  const router = useRouter();
  const { toast } = useToast();

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Page title or breadcrumb could go here */}
        <div className="lg:hidden" /> {/* Spacer for mobile menu button */}

        {/* Right side - Controls */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Upgrade Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-[#FD4D53] text-[#FD4D53] hover:bg-[#FD4D53] hover:text-white"
          >
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Standard
          </Button>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <Label className="text-xs text-muted-foreground">
              {currency === "USD" ? "USD" : "ZAR"}
            </Label>
            <Switch
              checked={currency === "ZAR"}
              onCheckedChange={(checked) => setCurrency(checked ? "ZAR" : "USD")}
              className="scale-75"
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-[#FD4D53]">
                    <User className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
