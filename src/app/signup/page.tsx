/**
 * @fileoverview Signup Page
 * 
 * The user registration page following shadcn/ui authentication style.
 * Creates a new user account in the database and redirects to dashboard.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

/**
 * Signup Page Component
 * 
 * Provides a form for new users to create an account.
 * Includes name, email, and password fields with validation.
 */
export default function SignupPage() {
  // Form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Hooks for navigation and notifications
  const router = useRouter();
  const { toast } = useToast();

  /**
   * Handle form submission
   * Validates input, sends to API, and redirects on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send registration request to API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Show success message
      toast({
        title: "Account created!",
        description: "Welcome to Fraudlr. Redirecting to dashboard...",
      });

      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      // Show error message
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F0F0F] to-[#1a0a0b] items-center justify-center p-12">
        <div className="max-w-md text-center">
          {/* Logo */}
          <Image
            src="/images/Fraudlr Icon logo red.png"
            alt="Fraudlr"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          
          {/* Value Proposition */}
          <h1 className="text-3xl font-bold text-[#F3F3F3] mb-4">
            Start Detecting Fraud Today
          </h1>
          <p className="text-[#D9D9D9] mb-8">
            Join thousands of businesses using Fraudlr to protect their
            financial ecosystem from fraud and anomalies.
          </p>
          
          {/* Feature List */}
          <ul className="text-left space-y-3 text-[#D9D9D9]">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FD4D53] rounded-full" />
              AI-powered anomaly detection
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FD4D53] rounded-full" />
              Real-time financial monitoring
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FD4D53] rounded-full" />
              Customizable alerts and reports
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <Image
              src="/images/Fraudlr Icon logo red.png"
              alt="Fraudlr"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
          </div>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#F3F3F3]">
              Create your account
            </h2>
            <p className="mt-2 text-[#545454]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#FD4D53] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#D9D9D9]">
                Full name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454] h-12"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#D9D9D9]">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454] h-12"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#D9D9D9]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454] h-12"
              />
              <p className="text-xs text-[#545454]">
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#D9D9D9]">
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454] h-12"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#FD4D53] hover:bg-[#FD4D53]/90 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* Terms Notice */}
          <p className="text-center text-xs text-[#545454]">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-[#D9D9D9]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-[#D9D9D9]">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
