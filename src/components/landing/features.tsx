/**
 * @fileoverview Features Section Component
 * 
 * Displays the key features of the Fraudlr platform.
 * Uses a card-based layout to highlight each feature area.
 * 
 * Features covered:
 * - Anomaly Detection
 * - Financial Monitoring
 * - Customizable Alerts
 * - Tailored SaaS
 */

import {
  Shield,
  Activity,
  Bell,
  Layers,
  BarChart3,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Feature data structure
 * Each feature has an icon, title, description, and optional highlight
 */
const features = [
  {
    icon: Shield,
    title: "Anomaly Detection",
    description:
      "Our advanced algorithms identify unusual patterns in transactions, instantly flagging potential fraud for further investigation.",
    highlight: "Revolutionized Detection",
  },
  {
    icon: Activity,
    title: "Financial Monitoring",
    description:
      "Continuous surveillance of financial activities ensures real-time protection, keeping your transactions secure around the clock.",
    highlight: "Streamlined Reporting",
  },
  {
    icon: Bell,
    title: "Customizable Alerts",
    description:
      "Tailored notifications allow you to set specific triggers, ensuring you're instantly informed of suspicious activities that matter most to your business.",
    highlight: "Real-time Insights",
  },
  {
    icon: Layers,
    title: "Tailored SaaS",
    description:
      "Our flexible Software-as-a-Service model allows you to customize and scale our fraud detection solutions to meet your specific business needs.",
    highlight: "Maximum Efficiency",
  },
  {
    icon: BarChart3,
    title: "AI Modules",
    description:
      "Leverage powerful AI modules including Benford Law analysis and M-Score calculations with visual explanations and follow-up prompting.",
    highlight: "Advanced Analytics",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description:
      "Connect via API or SQL for real-time or scheduled data ingestion, ensuring Fraudlr fits perfectly into your existing workflows.",
    highlight: "Easy Setup",
  },
];

/**
 * Features Component
 * 
 * Renders a grid of feature cards with icons, titles, and descriptions.
 * Responsive layout: 1 column on mobile, 2 on tablet, 3 on desktop.
 */
export function Features() {
  return (
    <section id="features" className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Powerful Features for{" "}
            <span className="text-[#FD4D53]">Complete Protection</span>
          </h2>
          <p className="text-[#D9D9D9] text-lg">
            Everything you need to detect, prevent, and respond to financial
            fraud with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-[#0F0F0F] border-[#545454]/50 hover:border-[#FD4D53]/50 transition-all duration-300 group"
            >
              <CardHeader>
                {/* Feature highlight badge */}
                <span className="text-[#FD4D53] text-sm font-medium mb-2">
                  {feature.highlight}
                </span>
                
                {/* Icon with hover effect */}
                <div className="w-12 h-12 rounded-lg bg-[#FD4D53]/10 flex items-center justify-center mb-4 group-hover:bg-[#FD4D53]/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-[#FD4D53]" />
                </div>
                
                {/* Feature title */}
                <CardTitle className="text-[#F3F3F3] text-xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* Feature description */}
                <CardDescription className="text-[#D9D9D9]">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
