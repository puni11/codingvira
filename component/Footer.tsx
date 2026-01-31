"use client";

import React from "react";
import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Globe, 
  Palette,
  ArrowRight 
} from "lucide-react";
import SmallCircleIcon from "./ui/SmallCircleIcon"; // Assuming you have this from previous steps
// Or I will simulate the logo inline if you don't have the component ready.

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0F0F0F] pt-20 pb-8 text-white overflow-hidden font-sans">
      
      {/* --- BACKGROUND GLOW EFFECT --- */}
      {/* This creates the subtle blue light at the top center like the image */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-900/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* --- LEFT COLUMN: BRANDING --- */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
                  <ArrowRight className="w-5 h-5" />
               </div>
               {/* Optional Brand Name next to logo if needed, otherwise just logo as per image */}
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              Build a resilient infrastructure with flexible managed services, 
              24/7 expert support, and a security team that champions your growth.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <SocialLink icon={<Facebook className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Instagram className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Youtube className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Linkedin className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Globe className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Palette className="w-4 h-4" />} href="#" />
            </div>
          </div>

          {/* --- RIGHT COLUMNS: LINKS --- */}
          {/* We use col-span-8 to take up the rest of the space, then a nested grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-medium text-lg mb-2">Company</h4>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Case Studies</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-medium text-lg mb-2">Support</h4>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Tutorials</FooterLink>
              <FooterLink href="#">Support Portal</FooterLink>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-medium text-lg mb-2">Legal Policies</h4>
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Refund Policy</FooterLink>
              <FooterLink href="#">GDPR Compliance</FooterLink>
              <FooterLink href="#">Affiliate Policy</FooterLink>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            Copyright © {new Date().getFullYear()} codingvira labs. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs hidden md:block">
            Managed Services for Smart Buinesses
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components for clean code ---

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-slate-400 hover:text-white transition-colors text-sm font-normal"
  >
    {children}
  </Link>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-slate-400 hover:text-white transition-colors"
  >
    {icon}
  </Link>
);

export default Footer;