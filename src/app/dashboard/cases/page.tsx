/**
 * @fileoverview Case History Page
 * 
 * Displays a list of all fraud detection cases created by the user.
 * Features:
 * - Case list with status indicators
 * - Search and filter functionality
 * - Quick actions for each case
 */

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Mock data for cases (in production, this would come from the API)
 */
const mockCases: Array<{
  id: string;
  name: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: string;
  anomaliesFound: number;
}> = [];

/**
 * Status badge component
 */
function StatusBadge({ status }: { status: string }) {
  const config = {
    PENDING: {
      icon: Clock,
      text: "Pending",
      className: "text-yellow-500 bg-yellow-500/10",
    },
    PROCESSING: {
      icon: Loader2,
      text: "Processing",
      className: "text-blue-500 bg-blue-500/10",
    },
    COMPLETED: {
      icon: CheckCircle2,
      text: "Completed",
      className: "text-green-500 bg-green-500/10",
    },
    FAILED: {
      icon: AlertCircle,
      text: "Failed",
      className: "text-red-500 bg-red-500/10",
    },
  }[status] || {
    icon: Clock,
    text: status,
    className: "text-muted-foreground bg-muted",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <Icon className={`h-3 w-3 ${status === "PROCESSING" && "animate-spin"}`} />
      {config.text}
    </span>
  );
}

/**
 * Case History Page Component
 */
export default function CasesPage() {
  // State for search
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter cases based on search
  const filteredCases = mockCases.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Case History</h1>
          <p className="text-muted-foreground">
            View and manage your fraud detection analyses
          </p>
        </div>
        <Button asChild className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
          <Link href="/dashboard/new-case">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Case
          </Link>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Cases List */}
      {filteredCases.length > 0 ? (
        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              className="hover:border-[#FD4D53]/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <CardTitle className="text-lg">{caseItem.name}</CardTitle>
                      <CardDescription>
                        Created{" "}
                        {new Date(caseItem.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <StatusBadge status={caseItem.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>
                      <strong className="text-foreground">
                        {caseItem.anomaliesFound}
                      </strong>{" "}
                      anomalies detected
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/cases/${caseItem.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No cases found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No cases match your search criteria"
                : "Create your first case to start detecting fraud"}
            </p>
            {!searchQuery && (
              <Button asChild className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
                <Link href="/dashboard/new-case">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Case
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
