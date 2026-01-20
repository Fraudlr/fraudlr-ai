/**
 * @fileoverview Footer Component
 * 
 * The website footer with logo, navigation links, and copyright.
 */

import Link from "next/link";
import Image from "next/image";

/**
 * Footer Component
 * 
 * Displays company info, navigation, and legal links at the bottom of the page.
 */
export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-[#545454]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/Fraudlr Icon logo red.png"
                alt="Fraudlr Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-[#F3F3F3]">Fraudlr</span>
            </Link>
            <p className="text-[#545454] max-w-md">
              AI powered fraud and anomaly detection platform. Revolutionizing
              financial security with cutting-edge AI capabilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F3F3F3] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-[#545454] hover:text-[#FD4D53] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-[#545454] hover:text-[#FD4D53] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-[#545454] hover:text-[#FD4D53] transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#545454] hover:text-[#FD4D53] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-[#F3F3F3] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#545454] hover:text-[#FD4D53] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#545454] hover:text-[#FD4D53] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#545454]/30 mt-8 pt-8 text-center">
          <p className="text-[#545454] text-sm">
            © {new Date().getFullYear()} Fraudlr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
