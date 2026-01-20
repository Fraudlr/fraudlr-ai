/**
 * @fileoverview Dashboard Overview Page
 * 
 * The main dashboard page showing an overview of the user's fraud detection activity.
 * Features a ChatGPT-style interface with:
 * - Welcome message and quick actions
 * - Recent cases summary
 * - Usage statistics
 * - Quick start prompts
 */

"use client";

import * as React from "react";
import Link from "next/link";
import {
  PlusCircle,
  FileText,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Upload,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Quick action cards for the dashboard
 */
const quickActions = [
  {
    title: "Upload CSV",
    description: "Analyze a new file for fraud patterns",
    icon: Upload,
    href: "/dashboard/new-case",
    color: "text-[#FD4D53]",
  },
  {
    title: "View Cases",
    description: "Review your analysis history",
    icon: FileText,
    href: "/dashboard/cases",
    color: "text-blue-500",
  },
  {
    title: "Set Up Integration",
    description: "Connect your data sources",
    icon: TrendingUp,
    href: "/dashboard/integration",
    color: "text-green-500",
  },
];

/**
 * Suggested prompts for the AI chat interface
 */
const suggestedPrompts = [
  "Analyze my transaction data for Benford's Law violations",
  "Calculate M-Score for my financial statements",
  "Find unusual patterns in my expense reports",
  "Compare this quarter's data to last quarter",
];

/**
 * Dashboard Overview Page Component
 * 
 * Displays the main dashboard with overview statistics and quick actions.
 */
export default function DashboardPage() {
  // State for the chat input
  const [prompt, setPrompt] = React.useState("");

  /**
   * Handle prompt submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Navigate to new case with prompt
      window.location.href = `/dashboard/new-case?prompt=${encodeURIComponent(prompt)}`;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Fraudlr
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered fraud detection assistant
        </p>
      </div>

      {/* Chat-style Input Area */}
      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FD4D53]" />
              <Input
                placeholder="Ask Fraudlr to analyze your data..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="pl-12 h-14 text-lg bg-background"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FD4D53] hover:bg-[#FD4D53]/90"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1.5 text-sm rounded-full border bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:border-[#FD4D53]/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <action.icon className={`h-8 w-8 ${action.color} mb-2`} />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4">This Month</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Cases Analyzed</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                2 remaining on Free tier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Anomalies Detected</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Start analyzing to detect
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>High Risk Items</CardDescription>
              <CardTitle className="text-3xl text-[#FD4D53]">0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Integrations</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Connect data sources
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity / Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cases</CardTitle>
          <CardDescription>
            Your latest fraud detection analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No cases yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your first CSV file to start detecting fraud patterns
            </p>
            <Button asChild className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
              <Link href="/dashboard/new-case">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Case
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
