/**
 * @fileoverview Hero Section Component
 * 
 * The main hero section of the landing page - the first thing visitors see.
 * Contains the main value proposition, call-to-action, and feature image.
 * 
 * Design follows the Fraudlr brand guidelines:
 * - Dark background (#0F0F0F)
 * - Coral red accent (#FD4D53)
 * - Light text for readability
 */

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Hero Component
 * 
 * Displays the main headline, description, CTA button, and hero image.
 * Uses a two-column layout on desktop, stacks on mobile.
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background gradient overlay for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#0F0F0F] to-[#1a0a0b] pointer-events-none" />
      
      {/* Decorative gradient orb - adds depth to the design */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FD4D53]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Small badge/tag above the heading */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FD4D53]/30 bg-[#FD4D53]/10">
              <span className="text-[#FD4D53] text-sm font-medium">
                AI-Powered Security
              </span>
            </div>

            {/* Main Heading - The primary value proposition */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3F3F3] leading-tight">
              AI powered fraud and{" "}
              <span className="text-[#FD4D53]">anomaly detection</span>{" "}
              platform.
            </h1>

            {/* Subheading - Additional context */}
            <p className="text-lg md:text-xl text-[#D9D9D9] max-w-xl">
              Assume fraud, proactively detect fraud in transactions and statements.
            </p>

            {/* Mission statement - Builds trust and explains the why */}
            <p className="text-[#545454] max-w-xl">
              Fraudlr aims to revolutionize financial security awareness by developing 
              cutting-edge AI capabilities that swiftly identifies and detects financial 
              fraud and discrepancies, ensuring a safe and trustworthy financial ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA - Get Started */}
              <Button
                asChild
                size="lg"
                className="bg-[#FD4D53] hover:bg-[#FD4D53]/90 text-white font-semibold px-8"
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {/* Secondary CTA - Learn More (scrolls to features) */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#545454] text-[#D9D9D9] hover:bg-[#545454]/20"
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow effect behind the image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-[#FD4D53]/20 rounded-full blur-3xl" />
            </div>
            
            {/* Main hero image - the neon hex logo */}
            <div className="relative">
              <Image
                src="/images/Fraudlr Icon logo red.png"
                alt="Fraudlr AI Platform"
                width={400}
                height={400}
                className="relative z-10 animate-fade-in"
                priority // Load this image first as it's above the fold
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
