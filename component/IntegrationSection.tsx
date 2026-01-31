"use client";

import React from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- Logo Data ---
const TECH_STACK = [
  {
    name: "AWS",
    color: "bg-[#1a1a1a]",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M17.2 16.5c-.3 0-.5.2-.5.5s.2.5.5.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5-2.5 1.1-2.5 2.5c0 .3.2.5.5.5s.5-.2.5-.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm-5.8-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm5.6-7c-.3 0-.5.2-.5.5v3.6c-1.6-1.5-3.8-2.4-6.2-2.4-4.8 0-8.7 3.9-8.7 8.7s3.9 8.7 8.7 8.7 8.7-3.9 8.7-8.7c0-.2 0-.3 0-.5 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 4.3-3.5 7.7-7.7 7.7s-7.7-3.5-7.7-7.7 3.5-7.7 7.7-7.7c2.1 0 4.1.8 5.6 2.2l-2.6 2.6c-.2.2-.2.5 0 .7.1.1.2.2.4.2.1 0 .3-.1.4-.2l3.4-3.4c.1-.1.2-.2.2-.4 0-.1-.1-.3-.2-.4l-3.4-3.4c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7l2.6 2.6V11c0 .3.2.5.5.5z"/></svg>
    ),
  },
  {
    name: "Azure",
    color: "bg-[#1a1a1a]",
    icon: (
       <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M5.4 18.5L12 5l2.5 5.5-5.5 8H5.4zm1.5-1.1h4l3.5-6.5L12 6.1 6.9 17.4zM16.5 19l-4-7.5L17.2 5l3.3 14H16.5z"/></svg>
    ),
  },
  {
    name: "Google Cloud",
    color: "bg-[#1a1a1a]",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
    ),
  },
  {
    name: "Kubernetes",
    color: "bg-[#1a1a1a]",
    icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M12 2L3 7v9l9 5 9-5V7l-9-5zm0 2.2L18.4 8 12 11.8 5.6 8 12 4.2zM5 14.9V9.1l6 3.6v5.8L5 14.9zm14 0l-6 3.6v-5.8l6-3.6v5.8z"/></svg>
    ),
  },
  {
    name: "Docker",
    color: "bg-[#1a1a1a]",
    icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M18 10h-2V8h2v2zm-4 0h-2V8h2v2zm4-4h-2V4h2v2zm-4 0h-2V4h2v2zm-4 4H8V8h2v2zm0-4H8V4h2v2zM2 13h2v-2H2v2zm4 0h2v-2H6v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM22 13h-1.5c.2-1.1-.3-2.1-1.3-2.6l-1.2 2.1c.3.2.4.5.3.8H18v-2h-2v2h-2v-2h-2v2h-2v-2H8v2H6v-2H4v2H2.5C1.1 13 0 14.1 0 15.5S1.1 18 2.5 18h19c1.4 0 2.5-1.1 2.5-2.5S22.9 13 21.5 13z"/></svg>
    ),
  },
  {
    name: "Python",
    color: "bg-[#1a1a1a]",
    icon: (
      <span className="text-white font-bold text-xs">Py</span>
    ),
  },
  {
    name: "React",
    color: "bg-[#1a1a1a]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2" className="w-6 h-6">
         <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
         <g className="opacity-80">
           <ellipse rx="10" ry="4" cx="12" cy="12" transform="rotate(0 12 12)"/>
           <ellipse rx="10" ry="4" cx="12" cy="12" transform="rotate(60 12 12)"/>
           <ellipse rx="10" ry="4" cx="12" cy="12" transform="rotate(120 12 12)"/>
         </g>
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "bg-[#1a1a1a]",
    icon: (
        <span className="text-white font-bold text-xs">JS</span>
    ),
  },
  {
    name: "MongoDB",
    color: "bg-[#1a1a1a]",
    icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
    ),
  },
  {
    name: "Jenkins",
    color: "bg-[#1a1a1a]",
    icon: (
       <span className="text-white font-bold text-xs">Jnk</span>
    ),
  },
  {
    name: "SQL",
    color: "bg-[#1a1a1a]",
    icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h8v2H8V9zm0 4h8v2H8v-2z"/></svg>
    ),
  },
  {
    name: "AI / ML",
    color: "bg-[#1a1a1a]", // Purple for AI
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 6v2m0 8v2m-6-6h2m8 0h2" /></svg>
    ),
  },
];

const IntegrationSection = () => {
  // --- CONFIGURATION ---
  const radius = 700; // HUGE radius to create a flat, gentle arc
  const startAngleDeg = 180; // Start further down left
  const endAngleDeg = -10;   // End further down right
  
  // Center of the circle logic
  // We place the circle container in the middle, but push the actual math center down
  const centerX = 700; // Half of the 1800px width
  const centerY = 700; // Half of the 1800px height
  
  // Animation settings
  const time = useTime();
  const loopDuration = 50000; // Slow, majestic rotation

  // Duplicating the list to create a seamless infinite loop
  const repeatedTechStack = [...TECH_STACK, ...TECH_STACK];
  const totalItems = repeatedTechStack.length;

  return (
    <section className="relative w-full h-[800px] bg-white overflow-hidden flex flex-col items-center pt-20">
      
      {/* --- THE ANIMATED ARC LAYER --- */}
      {/* 1. Absolute positioning to sit BEHIND or AROUND the text 
          2. top-[200px] pushes the arc down so it covers the text nicely
      */}
      <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] pointer-events-none z-0">
        
        {/* The Dashed Line - Visual Path */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full border border-dashed border-slate-200" />
        
        {/* The Moving Icons */}
        {repeatedTechStack.map((tech, index) => {
          const offset = (index / totalItems) * loopDuration;
          const progress = useTransform(time, (t) => (t + offset) % loopDuration / loopDuration);
          const currentAngleDeg = useTransform(progress, [0, 1], [startAngleDeg, endAngleDeg]);

          // Math for circular motion
          const x = useTransform(currentAngleDeg, (deg) => centerX + radius * Math.cos(deg * (Math.PI / 180)));
          const y = useTransform(currentAngleDeg, (deg) => centerY - radius * Math.sin(deg * (Math.PI / 180)));
          
          // Fade In / Out Logic (Fades at edges of the visible arc)
         const opacity = useTransform(
              progress,
              [0, 0.4, 0.6, 1],
              [0, 1, 1, 0]
          );

          return (
            <motion.div
              key={`${tech.name}-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 "
              style={{ left: x, top: y, opacity }}
              whileHover={{ scale: 1.2, zIndex: 50, opacity: 1 }}
            >
              <div 
                className={`w-16 h-16 rounded-full ${tech.color} flex items-center justify-center shadow-lg border-4 border-gray-100 shadow-lg cursor-pointer relative group transition-transform`}
              >
                <div className="w-8 h-8 flex items-center justify-center text-white">
                    {tech.icon}
                </div>
                <div className="absolute top-full mt-2 px-2 py-1 bg-slate-800 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
                  {tech.name}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- CONTENT CENTER (Text below the arch) --- */}
      {/* z-10 ensures text is clickable and not covered by the invisible circle box */}
      <div className="relative z-10 max-w-2xl px-6 mt-[320px] text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F3F4F6] text-sm font-semibold text-slate-600 mb-6">
           Expertise
        </div>
        
        <h2 className="text-3xl md:text-4xl text-slate-900 mb-6 tracking-tight">
          <span className="text-slate-900">Technologies We Are</span>{" "}
          <span className="text-[#8c34ff]">Working On</span>
        </h2>
        
        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto">
          Easily connect NextSaaS AI to Canva, Notion, Adobe, Google Slides, Webflow, and more.
        </p>
        
        <button className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center gap-2 mx-auto group">
          Explore integration
          <span className="group-hover:translate-x-1 transition-transform">
             <span className="opacity-50 text-xs mr-1">//</span> 
             <ArrowRight className="w-4 h-4 inline-block" />
          </span>
        </button>
      </div>

    </section>
  );
};

export default IntegrationSection;