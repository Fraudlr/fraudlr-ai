/**
 * @fileoverview New Case Page
 * 
 * Page for creating a new fraud detection case.
 * Features:
 * - CSV file upload
 * - Case naming
 * - AI module selection (Benford Law, M-Score)
 * - Analysis configuration
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

/**
 * Available AI analysis modules
 */
const analysisModules = [
  {
    id: "benford",
    name: "Benford's Law",
    description: "Detect anomalies in digit distribution patterns",
    enabled: true,
  },
  {
    id: "mscore",
    name: "M-Score (Beneish)",
    description: "Assess likelihood of financial manipulation",
    enabled: true,
  },
  {
    id: "zscore",
    name: "Z-Score (Altman)",
    description: "Evaluate financial health and bankruptcy risk",
    enabled: false,
  },
];

/**
 * New Case Page Component
 */
export default function NewCasePage() {
  // Form state
  const [caseName, setCaseName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [selectedModules, setSelectedModules] = React.useState<string[]>(["benford", "mscore"]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  /**
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  /**
   * Handle drag and drop
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== "text/csv" && !droppedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }
      setFile(droppedFile);
    }
  };

  /**
   * Toggle module selection
   */
  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !caseName.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a case name and upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, this would upload to the API
      // For now, simulate the process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Case created!",
        description: "Your file is being analyzed. This may take a few minutes.",
      });

      router.push("/dashboard/cases");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create case. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Create New Case</h1>
        <p className="text-muted-foreground">
          Upload a CSV file to analyze for fraud and anomalies
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-[#FD4D53]" />
              Upload File
            </CardTitle>
            <CardDescription>
              Upload a CSV file containing your transaction or financial data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-[#FD4D53] bg-[#FD4D53]/5"
                  : file
                  ? "border-green-500 bg-green-500/5"
                  : "border-muted"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your CSV file here, or
                  </p>
                  <label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Case Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="caseName">Case Name *</Label>
              <Input
                id="caseName"
                placeholder="e.g., Q4 2025 Transaction Audit"
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add notes about this analysis..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Analysis Modules Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#FD4D53]" />
              AI Analysis Modules
            </CardTitle>
            <CardDescription>
              Select which analysis methods to apply to your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysisModules.map((module) => (
                <label
                  key={module.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedModules.includes(module.id)
                      ? "border-[#FD4D53] bg-[#FD4D53]/5"
                      : "border-muted hover:border-muted-foreground"
                  } ${!module.enabled && "opacity-50 cursor-not-allowed"}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={() => module.enabled && toggleModule(module.id)}
                    disabled={!module.enabled}
                    className="h-4 w-4 accent-[#FD4D53]"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{module.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                  {!module.enabled && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Notice */}
        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
          <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Free Tier Usage</p>
            <p>You have 2 CSV uploads remaining this month.</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !file || !caseName.trim()}
          className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90"
        >
          {isSubmitting ? "Creating Case..." : "Create Case & Analyze"}
        </Button>
      </form>
    </div>
  );
}
