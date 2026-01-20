/**
 * @fileoverview Login Page
 * 
 * The authentication login page following shadcn/ui authentication style.
 * Features:
 * - Email/password login form
 * - Link to signup page
 * - Form validation
 * - Error handling
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
 * Login Page Component
 * 
 * Provides a form for existing users to sign in to their accounts.
 * On successful login, redirects to the dashboard.
 */
export default function LoginPage() {
  // Form state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Hooks for navigation and notifications
  const router = useRouter();
  const { toast } = useToast();

  /**
   * Handle form submission
   * Sends credentials to the login API and redirects on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send login request to API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Show success message
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      // Show error message
      toast({
        title: "Login failed",
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
          
          {/* Tagline */}
          <h1 className="text-3xl font-bold text-[#F3F3F3] mb-4">
            Welcome to Fraudlr
          </h1>
          <p className="text-[#D9D9D9]">
            AI powered fraud and anomaly detection platform. Protect your
            financial ecosystem with cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-[#545454]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#FD4D53] hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#D9D9D9]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#FD4D53] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Terms Notice */}
          <p className="text-center text-xs text-[#545454]">
            By signing in, you agree to our{" "}
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
