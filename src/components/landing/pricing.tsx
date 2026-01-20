/**
 * @fileoverview Pricing Section Component
 * 
 * Displays the three pricing tiers for Fraudlr:
 * - Free Tier: For sampling the platform
 * - Standard Tier: For regular users
 * - Pro Tier: For organizations and integrations
 * 
 * Includes currency toggle (USD/ZAR) for international users.
 */

"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";

/**
 * Pricing tier data structure
 * Contains all information for each subscription level
 */
const tiers = [
  {
    name: "Free",
    priceUSD: 0,
    priceZAR: 0,
    description: "Sample Fraudlr core features and understand its value.",
    features: [
      "Upload up to 2 CSV files per month",
      "AI modules (Benford Law, M-Score)",
      "Visuals and explanations",
      "Follow-up prompting for details",
      "Basic dashboard reporting",
      "Self-service support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Standard",
    priceUSD: 10,
    priceZAR: 180,
    description: "For small to medium users needing regular fraud analysis.",
    features: [
      "Up to 10 CSV uploads per month",
      "All Free Tier features",
      "Advanced visuals and analytics",
      "Historical comparison & trend analysis",
      "Export results to PDF or Excel",
      "Email support (48-hour response)",
      "One external data link (API or SQL)",
    ],
    cta: "Get Started",
    highlighted: true, // This tier is visually emphasized
  },
  {
    name: "Pro",
    priceUSD: 25,
    priceZAR: 450,
    description: "For organisations integrating Fraudlr into workflows.",
    features: [
      "Unlimited CSV uploads",
      "All Standard Tier features",
      "Multiple external data links",
      "Real-time or scheduled ingestion",
      "Priority chat or phone support",
      "Custom branding / white-label",
      "Multi-user team access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

/**
 * Pricing Component
 * 
 * Renders the pricing section with tier cards and currency toggle.
 */
export function Pricing() {
  // State for currency selection (USD or ZAR)
  const [currency, setCurrency] = React.useState<"USD" | "ZAR">("USD");
  
  // State for annual billing toggle (10% discount)
  const [annual, setAnnual] = React.useState(false);

  /**
   * Formats the price based on currency and billing period
   */
  const formatPrice = (tier: typeof tiers[0]) => {
    const basePrice = currency === "USD" ? tier.priceUSD : tier.priceZAR;
    
    // Apply 10% discount for annual billing
    const price = annual ? basePrice * 0.9 : basePrice;
    
    // Format based on currency
    if (currency === "ZAR") {
      return `R${price.toFixed(0)}`;
    }
    return `$${price.toFixed(0)}`;
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-[#0F0F0F] to-[#141414]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Simple, Transparent{" "}
            <span className="text-[#FD4D53]">Pricing</span>
          </h2>
          <p className="text-[#D9D9D9] text-lg">
            Choose the plan that fits your needs. All plans include core fraud
            detection features.
          </p>
        </div>

        {/* Currency and Billing Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          {/* Currency Toggle */}
          <div className="flex items-center gap-3">
            <span className={currency === "USD" ? "text-[#F3F3F3]" : "text-[#545454]"}>
              USD ($)
            </span>
            <Switch
              checked={currency === "ZAR"}
              onCheckedChange={(checked) => setCurrency(checked ? "ZAR" : "USD")}
            />
            <span className={currency === "ZAR" ? "text-[#F3F3F3]" : "text-[#545454]"}>
              ZAR (R)
            </span>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex items-center gap-3">
            <Label className={!annual ? "text-[#F3F3F3]" : "text-[#545454]"}>
              Monthly
            </Label>
            <Switch checked={annual} onCheckedChange={setAnnual} />
            <Label className={annual ? "text-[#F3F3F3]" : "text-[#545454]"}>
              Annual
              <span className="ml-1 text-[#FD4D53] text-xs">(Save 10%)</span>
            </Label>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative bg-[#0F0F0F] border transition-all duration-300 ${
                tier.highlighted
                  ? "border-[#FD4D53] scale-105 shadow-lg shadow-[#FD4D53]/20"
                  : "border-[#545454]/50 hover:border-[#545454]"
              }`}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FD4D53] text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-[#F3F3F3]">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-[#D9D9D9]">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-6">
                {/* Price Display */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#F3F3F3]">
                    {formatPrice(tier)}
                  </span>
                  <span className="text-[#545454]">/month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-left">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FD4D53] flex-shrink-0 mt-0.5" />
                      <span className="text-[#D9D9D9] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${
                    tier.highlighted
                      ? "bg-[#FD4D53] hover:bg-[#FD4D53]/90"
                      : "bg-[#545454]/30 hover:bg-[#545454]/50 text-[#F3F3F3]"
                  }`}
                >
                  <Link href="/signup">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
