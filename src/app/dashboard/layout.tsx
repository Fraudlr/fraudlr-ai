/**
 * @fileoverview Dashboard Layout
 * 
 * The layout wrapper for all dashboard pages.
 * Provides the sidebar navigation and main content area.
 * 
 * Features:
 * - Collapsible sidebar with navigation
 * - Theme toggle (light/dark)
 * - Currency toggle (USD/ZAR)
 * - User profile menu
 */

import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

/**
 * Dashboard Layout Metadata
 */
export const metadata = {
  title: "Dashboard",
  description: "Fraudlr AI Dashboard - Manage your fraud detection cases",
};

/**
 * Dashboard Layout Component
 * 
 * Wraps all dashboard pages with the sidebar and header.
 * The sidebar is fixed on desktop and collapsible on mobile.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Header Bar */}
        <DashboardHeader />
        
        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
