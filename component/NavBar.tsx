"use client";

import React, { useState, useEffect } from "react";
import { MouseEvent } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  BarChart, 
  Globe, 
  BookOpen, 
  Menu, // Imported Menu icon
  X,     // Imported Close icon
  Cloud,
  AppWindow,
  Globe2,
  ServerIcon,
  ShieldCheck,
  Layout,
  Terminal,
  ShoppingBag,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import SmallCircleIcon from "./ui/SmallCircleIcon";
import Button from "./ui/Button";

function handleLogin(e: MouseEvent<HTMLButtonElement>) {
  console.log(e);
}

function handleClick(e: string) {
  console.log(e);
}

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
type NavItem = {
  label: string;
  href?:string;
  hasDropdown?: boolean;
  dropdownData?: { title: string; desc: string; icon: React.ReactNode }[];
};

const NAV_LINKS: NavItem[] = [
  {
    label: "Cloud Services",
    hasDropdown: true,
    dropdownData: [
      { 
      title: "Amazon Web Services", 
      desc: "Scalable infrastructure & storage", 
      icon: <Cloud className="w-5 h-5 text-[#141414]" /> // AWS Orange
    },
    { 
      title: "Microsoft Azure", 
      desc: "Enterprise hybrid cloud solutions", 
      icon: <AppWindow className="w-5 h-5 text-[#141414]" /> // Azure Blue
    },
    { 
      title: "Google Cloud Platform", 
      desc: "AI, Data Analytics & Kubernetes", 
      icon: <Globe2 className="w-5 h-5 text-[#141414]" /> // Google Blue
    },
    { 
      title: "Private Cloud", 
      desc: "Dedicated single-tenant environments", 
      icon: <ServerIcon className="w-5 h-5 text-[#141414]" /> 
    },
    { 
      title: "Multi-Cloud Security", 
      desc: "Unified protection across all platforms", 
      icon: <ShieldCheck className="w-5 h-5 text-[#141414]" /> 
    },
    ],
  },
  {
    label: "Product Services",
    hasDropdown: true,
    dropdownData: [
      { title: "Modern Frontend", desc: "React, Next.js, Vue", icon: <Layout className="w-5 h-5 text-[#141414]" /> },
      { title: "Backend Systems", desc: "Node.js, Python, Go", icon: <Terminal className="w-5 h-5 text-[#141414]" /> },
      { title: "E-commerce", desc: "Shopify & Custom Stores", icon: <ShoppingBag className="w-5 h-5 text-[#141414]" /> },
      { title: "Headless CMS", desc: "Sanity, Strapi, Contentful", icon: <FileText className="w-5 h-5 text-[#141414]" /> },
    ],
  },
  {
    label: "Insights",
    hasDropdown: true,
    dropdownData: [
      { title: "Case Studies", desc: "Real world examples", icon: <Zap className="w-5 h-5 text-pink-500" /> },
    ],
  },
  { label: "Blog", hasDropdown: false },
  { label: "Contact us", href:'/contact-us', hasDropdown: false },
];



// --- Component ---
const Navbar = () => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
  // Mobile State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      // --- ON LOAD ANIMATION ---
      initial={{ opacity: 0, y: -20, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.2,
      }}
      className="w-full backdrop-blur-md border-b border-gray-100 py-4 px-6 md:px-12 fixed top-0 z-50 font-sans "
      onMouseLeave={() => setHoveredTab(null)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- LEFT: LOGO --- */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 group transition-all duration-500 z-50 relative", // z-50 to stay above mobile menu
            hoveredTab && "blur-[2px] opacity-60"
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 50L75 0V50L0 50Z" fill="#A78BFA" />
  
  <path d="M0 50L75 100V50L0 50Z" fill="#A78BFA" />
  
  <path d="M75 0V100L25 50L75 0Z" fill="#1e1b4b" opacity="0.4" />
  
  <g>
    <path d="M0 50 L75 0 L50 50 Z" fill="#A78BFA" />
    
    <path d="M0 50 L75 100 L50 50 Z" fill="#A78BFA" />
    
    <path d="M75 0 L75 100 L50 50 Z" fill="#4C1D95" />
  </g>
</svg>
          <div className="text-2xl sm:text-3xl font-sans tracking-tight">
            <span className=" text-slate-900">codevira {" "}</span>
            <span className="font-normal text-slate-500">labs</span>
          </div>
        </Link>

        {/* --- CENTER: DESKTOP LINKS --- */}
        <div className="hidden md:flex items-center space-x-2 relative">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative px-4 py-2"
              onMouseEnter={() => setHoveredTab(link.label)}
            >
              <Link 
              href={`${link.href ? link.href : '#'}`}
                className={cn(
                  "flex items-center gap-1 text-lg text-slate-600 transition-all duration-300 ease-out",
                  hoveredTab && hoveredTab !== link.label
                    ? "blur-[2px] opacity-60 scale-95"
                    : "opacity-100 scale-100",
                  hoveredTab === link.label ? "text-slate-900" : ""
                )}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      hoveredTab === link.label ? "rotate-180 text-slate-900" : "text-slate-400"
                    )}
                  />
                )}
              </Link>

              <AnimatePresence>
                {link.hasDropdown && hoveredTab === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-100/50 p-2 overflow-hidden"
                  >
                    <div className="flex flex-col gap-1">
                      {link.dropdownData?.map((item, idx) => (
                        <Link
                          key={idx}
                          href="#"
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="mt-1 opacity-70 group-hover/item:opacity-100 transition-opacity">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                            <div className="text-xs text-slate-500">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* --- RIGHT: DESKTOP CTA --- */}
        <div
          className={cn(
            "hidden md:flex items-center transition-all duration-500",
            hoveredTab && "blur-[2px] opacity-60"
          )}
        >
          <Button onClick={handleLogin}  bgClass="bg-[#8b5cf6]" hoverClass="bg-[#7c3aed]" border={true}>
            Get Started
          </Button>
        </div>

        {/* --- MOBILE: TOGGLE BUTTON --- */}
        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 pt-24 px-6 md:hidden flex flex-col h-screen overflow-y-auto"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-gray-50 pb-2">
                  <button
                    onClick={() => {
                      if (link.hasDropdown) {
                        setMobileExpandedTab(
                          mobileExpandedTab === link.label ? null : link.label
                        );
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center justify-between w-full py-3 text-md text-slate-800"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-slate-400 transition-transform duration-300",
                          mobileExpandedTab === link.label ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </button>

                  {/* Mobile Accordion Content */}
                  <AnimatePresence>
                    {link.hasDropdown && mobileExpandedTab === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2 pl-4 py-2 bg-slate-50 rounded-lg mb-2">
                          {link.dropdownData?.map((item, idx) => (
                            <Link
                              key={idx}
                              href="#"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors"
                            >
                              <div className="opacity-80 scale-75">{item.icon}</div>
                              <div>
                                <div className="text-sm font-semibold text-slate-900">
                                  {item.title}
                                </div>
                                <div className="text-xs text-slate-500">{item.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 mb-12">
              <Button 
                onClick={(e) => {
                   handleLogin(e);
                   setMobileMenuOpen(false);
                }} 
                icon={<ArrowRight />} 
                className="w-full justify-center text-lg py-4"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;