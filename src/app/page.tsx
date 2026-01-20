/**
 * @fileoverview Landing Page
 * 
 * The main entry point for the Fraudlr website.
 * This is a single-page application with sections for:
 * - Hero (main value proposition)
 * - Features (platform capabilities)
 * - Pricing (subscription tiers)
 * - Docs (API documentation)
 * - Contact (get in touch form)
 * 
 * All sections are accessible via smooth scroll navigation from the header.
 */

import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Docs } from "@/components/landing/docs";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";

/**
 * Home Page Component
 * 
 * Assembles all landing page sections into a cohesive single-page experience.
 * Each section is given an ID for anchor navigation.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      {/* Fixed Navigation Header */}
      <Header />
      
      {/* Hero Section - Main value proposition and CTA */}
      <Hero />
      
      {/* Features Section - Platform capabilities */}
      <Features />
      
      {/* Pricing Section - Subscription tiers */}
      <Pricing />
      
      {/* Documentation Section - API info */}
      <Docs />
      
      {/* Contact Section - Get in touch form */}
      <Contact />
      
      {/* Footer - Links and copyright */}
      <Footer />
    </main>
  );
}
