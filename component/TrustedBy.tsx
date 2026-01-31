"use client";

import React from "react";
import { motion } from "framer-motion";

const TrustedBy = () => {
  // Creating generic Logoipsum SVG shapes to match the screenshot
  const logos = [
    {
      id: 1,
      name: "Logoipsum 1",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
          <path d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16L20 0Z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Logoipsum 2",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
          <circle cx="10" cy="10" r="8" />
          <circle cx="30" cy="10" r="8" />
          <circle cx="10" cy="30" r="8" />
          <circle cx="30" cy="30" r="8" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Logoipsum 3",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
          <path d="M0 20C0 20 10 20 20 10C30 20 40 20 40 20C40 20 30 20 20 30C10 20 0 20 0 20Z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Logoipsum 4",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
          <path d="M5 5H35V35H5V5Z" />
          <path d="M20 5V35M5 20H35" stroke="white" strokeWidth="4" />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Logoipsum 5",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
          <circle cx="20" cy="20" r="18" strokeWidth="4" fill="none" stroke="currentColor"/>
          <path d="M20 5L20 35" stroke="currentColor" strokeWidth="4"/>
          <path d="M5 20L35 20" stroke="currentColor" strokeWidth="4"/>
        </svg>
      ),
    },
    {
      id: 6,
      name: "Logoipsum 6",
      icon: (
         <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
            <path d="M0 0V40L20 20L0 0Z" />
            <path d="M20 20L40 40V0L20 20Z" opacity="0.5"/>
         </svg>
      ),
    },
  ];

  // Duplicate logos to create the infinite loop effect
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}>
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <h3 className="text-slate-900 text-xl mb-6 tracking-tight">
          Trusted by Industry leaders
        </h3>

        {/* Marquee Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Gradient Masks for fading edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex overflow-hidden">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 30, // Speed of scroll
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-16 pr-16 whitespace-nowrap"
            >
              {repeatedLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex items-center gap-3 group opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                >
                  {/* Logo Icon */}
                  <div className="text-slate-800">
                    {logo.icon}
                  </div>
                  
                  {/* Logo Text */}
                  <span className="text-2xl font-bold font-sans text-slate-700 tracking-tight">
                    Logoipsum
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default TrustedBy;