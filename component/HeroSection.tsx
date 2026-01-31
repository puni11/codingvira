"use client";

import HeroSide from "./HeroSide";
import Button from "./ui/Button";



const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden pt-20 pb-20 md:pt-40 md:pb-32 px-6">
       
      {/* --- Background Glow --- */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-green-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="flex flex-col items-start space-y-8">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-100 border border-slate-100 text-sm font-medium text-violet-500">
            Keep an eye on your finances
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-5xl lg:text-[3rem] font-medium tracking-tight text-slate-900 leading-[1.1]">
            Managed Services For <br />
            Buiness Success
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
            Empower your business with NextSaaS—your all-in-one cloud-based software designed for performance, automation, and growth.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
             <Button  bgClass="bg-[#8b5cf6]" hoverClass="bg-[#7c3aed]">
                        Get Started
                      </Button>
            <Button  bgClass="bg-white" hoverClass="bg-slate-50" textClass="text-gray-500" shadow={false}>
                        Connet with us
                      </Button>
          </div>

          {/* Social Proof / Avatars */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                   <img 
                     src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                     alt="User" 
                     className="w-full h-full object-cover"
                   />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                99+
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">Trusted by 20k+</span>
              <span className="text-xs text-slate-500">Customers Across the Globe</span>
            </div>
          </div>
        </div>
<HeroSide />
        {/* --- RIGHT COLUMN: VISUALS --- */}
       
      </div>
    </section>
  );
};

export default HeroSection;