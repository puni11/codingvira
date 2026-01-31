"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// --- Data: Managed Services Context ---
type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  img: string;
};
    const TESTIMONIALS:Testimonial[] = [
    {
        id: 1,
        name: "James Carter",
        role: "CTO, FinTech Global",
        text: "We were struggling with AWS costs and downtime. NextMSP optimized our entire cloud infrastructure, reducing our monthly bill by 40% while hitting 99.99% uptime.",
        img: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Director of Operations",
        text: "The 24/7 SOC team is our safety net. They detected and neutralized a ransomware attempt at 3 AM on a Sunday before it even touched our endpoints.",
        img: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Founder, ScaleUp Inc.",
        text: "Scaling from 20 to 200 employees was seamless. Your team handled all the device procurement, onboarding, and identity management perfectly.",
        img: "https://i.pravatar.cc/150?img=3",
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Compliance Officer",
        text: "Achieving SOC2 compliance seemed impossible until we brought you on. The automated reporting and security controls made the audit a breeze.",
        img: "https://i.pravatar.cc/150?img=9",
    },
    {
        id: 5,
        name: "David Wilson",
        role: "VP of Engineering",
        text: "It feels like having an in-house enterprise IT team for a fraction of the cost. The response time on tickets is consistently under 15 minutes.",
        img: "https://i.pravatar.cc/150?img=13",
    },
    ];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false); // Track hover state

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // --- AUTO-PLAY EFFECT ---
  useEffect(() => {
    if (isPaused) return; // Don't slide if paused

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 5 seconds delay

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isPaused]); // Re-run effect if pause state changes

  // Helper to get the 3 visible items based on active index
  const getVisibleItems = () => {
    const len = TESTIMONIALS.length;
    const prevIndex = (activeIndex - 1 + len) % len;
    const nextIndex = (activeIndex + 1) % len;
    return [TESTIMONIALS[prevIndex], TESTIMONIALS[activeIndex], TESTIMONIALS[nextIndex]];
  };

  const visibleTestimonials = getVisibleItems();

  return (
    <section className="w-full bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* --- HEADER --- */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-sm d text-violet-700 mb-6">
          Client Success Stories
        </div>
        
        <h2 className="text-4xl md:text-5xl text-slate-900 mb-6 tracking-tight">
          Real Infrastructure. Real Results.
        </h2>
        
        <p className="text-lg text-slate-500 mb-16 max-w-2xl leading-relaxed">
          "NextMSP delivered our entire cloud migration ahead of schedule—flawless execution and a partnership that lets us sleep at night."
        </p>

        {/* --- SLIDER AREA --- */}
        {/* We use onMouseEnter/Leave here to pause the auto-play */}
        <div 
          className="relative w-full max-w-6xl mx-auto h-[400px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 lg:left-12 z-20 p-3 rounded-full bg-white border border-slate-100 shadow-lg text-slate-500 hover:text-black hover:scale-110 transition-all hidden md:flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 lg:right-12 z-20 p-3 rounded-full bg-white border border-slate-100 shadow-lg text-slate-500 hover:text-black hover:scale-110 transition-all hidden md:flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center w-full relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleTestimonials.map((item, index) => {
                const isCenter = index === 1;
                const isLeft = index === 0;
                const isRight = index === 2;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isCenter ? 1.05 : 0.9, 
                      opacity: isCenter ? 1 : 0.5,
                      x: isCenter ? 0 : isLeft ? -20 : 20,
                      zIndex: isCenter ? 10 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(1px)"
                    }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ 
                      layout: { duration: 0.5, type: "spring", stiffness: 170, damping: 25 }, 
                      opacity: { duration: 0.3 } 
                    }}
                    onClick={() => {
                        if (isLeft) handlePrev();
                        if (isRight) handleNext();
                    }}
                    className={`
                      relative rounded-[2rem] p-8 flex flex-col justify-between h-[340px] w-full max-w-[380px] md:max-w-[420px] cursor-pointer shadow-xl transition-shadow duration-300 mx-2 md:mx-4
                      ${isCenter 
                        ? "bg-[#1A1A1A] text-white shadow-2xl ring-1 ring-white/10" 
                        : "bg-[#F9FAFB] text-slate-600 hover:bg-white hidden md:flex"
                      }
                      ${!isCenter && "hidden md:flex"} 
                    `}
                  >
                    {/* Center Glow */}
                    {isCenter && (
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2rem] pointer-events-none">
                        <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-gradient-to-br from-violet-400 via-indigo-500 to-purple-600 blur-[80px] opacity-50"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className={`w-14 h-14 rounded-full p-1 ${isCenter ? "bg-white/10 backdrop-blur-md" : "bg-white shadow-sm"}`}>
                        <img src={item.img} alt={item.name} className="w-full h-full rounded-full object-cover" />
                      </div>

                      <p className={`text-base leading-relaxed ${isCenter ? "text-gray-200" : "text-slate-500"}`}>
                        "{item.text}"
                      </p>

                      <div>
                        <h4 className={`font-bold text-lg ${isCenter ? "text-white" : "text-slate-900"}`}>
                          {item.name}
                        </h4>
                        <span className={`text-sm ${isCenter ? "text-gray-400" : "text-slate-400"}`}>
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* --- PROGRESS INDICATOR (Optional visual aid) --- */}
        <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-slate-800" : "w-2 bg-slate-300"}`}
                />
            ))}
        </div>

        <button className="mt-8 bg-[#1A1A1A] hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          Read success stories
        </button>

      </div>
    </section>
  );
};

export default Testimonials;