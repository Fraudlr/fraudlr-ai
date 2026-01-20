/**
 * @fileoverview Contact Section Component
 * 
 * Contact information and a "Get in Touch" form for inquiries.
 * Includes email, WhatsApp, and a contact form.
 */

"use client";

import * as React from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
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
 * Contact Component
 * 
 * Displays contact information and a form for user inquiries.
 */
export function Contact() {
  // Form state management
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Toast for notifications
  const { toast } = useToast();

  /**
   * Handle form submission
   * In production, this would send to an API endpoint
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#141414] to-[#0F0F0F]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Get in <span className="text-[#FD4D53]">Touch</span>
          </h2>
          <p className="text-[#D9D9D9] text-lg">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Column - Contact Information */}
          <div className="space-y-6">
            {/* Email Card */}
            <Card className="bg-[#0F0F0F] border-[#545454]/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FD4D53]/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#FD4D53]" />
                  </div>
                  <div>
                    <CardTitle className="text-[#F3F3F3]">Email</CardTitle>
                    <CardDescription className="text-[#D9D9D9]">
                      Send us an email anytime
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@fraudlr.com"
                  className="text-[#FD4D53] hover:underline font-medium"
                >
                  info@fraudlr.com
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="bg-[#0F0F0F] border-[#545454]/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FD4D53]/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-[#FD4D53]" />
                  </div>
                  <div>
                    <CardTitle className="text-[#F3F3F3]">WhatsApp</CardTitle>
                    <CardDescription className="text-[#D9D9D9]">
                      Chat with us on WhatsApp
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href="https://wa.me/27799445825"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FD4D53] hover:underline font-medium"
                >
                  +27 79 944 5825
                </a>
              </CardContent>
            </Card>

            {/* Response Time Info */}
            <div className="p-6 rounded-lg border border-[#545454]/30 bg-[#1a1a1a]">
              <h3 className="text-[#F3F3F3] font-semibold mb-2">
                Response Times
              </h3>
              <ul className="space-y-2 text-[#D9D9D9] text-sm">
                <li>• Free Tier: Self-service documentation</li>
                <li>• Standard Tier: 48-hour email response</li>
                <li>• Pro Tier: Priority chat or phone support</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <Card className="bg-[#0F0F0F] border-[#545454]/50">
            <CardHeader>
              <CardTitle className="text-[#F3F3F3]">Send a Message</CardTitle>
              <CardDescription className="text-[#D9D9D9]">
                Fill out the form below and we'll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#D9D9D9]">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454]"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#D9D9D9]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454]"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#D9D9D9]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-[#1a1a1a] border-[#545454] text-[#F3F3F3] placeholder:text-[#545454] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
