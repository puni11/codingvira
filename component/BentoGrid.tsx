"use client";

import React from "react";
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Server, 
  CheckCircle2, 
  MoveRight,
  TrendingUp,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const BentoGrid = () => {
  return (
     <motion.div 
               initial={{ opacity: 0, y: -20, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1 }}>

    <section className="w-full bg-[#F3F4F6] py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="max-w-3xl mx-auto text-center mb-12 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs  uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Overview
          </div>
          <h2 className="text-3xl md:text-5xl  text-slate-900 mb-4 md:mb-6 tracking-tight">
            The Command Center for your IT
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed">
            Get a unified view of your infrastructure health, security status, and spending. 
          </p>
        </div>

        {/* --- GRID CONTAINER --- */}
        {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
        {/* auto-rows-[200px] ensures consistent height logic across all devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4 md:gap-6">

          {/* 1. PRICING CARD (Tall) */}
          {/* Mobile: row-span-2 (400px height) to fit content */}
          <div className="row-span-2 bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Managed IT Plans</h3>
              <p className="text-xs text-slate-400 mb-4 md:mb-6">Scalable support for growing teams</p>
              <div className="text-3xl  text-slate-900 mb-1">$2k - $15k<span className="text-sm font-normal text-slate-400">/mo</span></div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 border border-slate-100 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
                 <span className="text-sm font-medium text-slate-700">Infrastructure</span>
                 <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
              <div className="p-3 border border-slate-100 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
                 <span className="text-sm font-medium text-slate-700">Security</span>
                 <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button className="w-full bg-[#1A1A1A] hover:bg-black text-white py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 group transition-all mt-4">
              Get Custom Quote
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 2. GRADIENT CARD (Savings) */}
          <div className="col-span-1 bg-gradient-to-br from-violet-400 to-fuchsia-300 rounded-[2rem] p-6 flex flex-col justify-center text-white shadow-sm relative overflow-hidden min-h-[200px]">
             <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
             <p className="text-white/90 text-sm font-medium mb-1">Avg. Cloud Savings</p>
             <h3 className="text-3xl  tracking-tight">$35.9k</h3>
             <p className="text-xs text-white/70 mt-2">Per year via optimization</p>
          </div>

          {/* 3. CIRCLE CARD (Uptime) */}
          <div className="col-span-1 bg-white rounded-[2rem] p-6 flex items-center justify-center shadow-sm relative min-h-[200px]">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#F1F5F9" strokeWidth="12" fill="none" />
                  <circle 
                    cx="64" cy="64" r="56" 
                    stroke="#8b5cf6" strokeWidth="12" fill="none" 
                    strokeDasharray="351.86" 
                    strokeDashoffset="35" 
                    strokeLinecap="round"
                    className="animate-[spin_2s_ease-out_reverse]" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                   <span className="text-2xl  text-slate-900">99.9%</span>
                   <span className="text-[10px] text-slate-500 uppercase tracking-wide">Uptime</span>
                </div>
             </div>
          </div>

          {/* 4. QUOTE CARD */}
          <div className="col-span-1 bg-white rounded-[2rem] p-6 md:p-8 flex items-center justify-center shadow-sm min-h-[200px]">
            <p className="text-slate-800 font-medium leading-relaxed text-center md:text-left">
              "Monitor infrastructure in <span className="text-violet-600 ">real-time</span> with predictive analytics."
            </p>
          </div>

          {/* 5. HERO CARD (Center Big) */}
          {/* Mobile: col-span-1 (full width of mobile grid). Tablet+: col-span-2. */}
          <div className="col-span-1 md:col-span-2 row-span-2 bg-white rounded-[2rem] p-6 md:p-10 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
             
             <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 text-white" />
             </div>
             
             <div className="flex items-center gap-2 text-slate-500 font-medium mb-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span>NextMSP</span>
             </div>
             
             <h2 className="text-3xl md:text-5xl  text-slate-900 tracking-tight mb-4">
               Intelligent IT,<br />
               Powered by AI
             </h2>
             <p className="text-sm md:text-base text-slate-500 max-w-md">
               Unified management for your network, security, and cloud infrastructure.
             </p>
          </div>

          {/* 6. DARK CARD (SOC) */}
          <div className="col-span-1 bg-[#1A1A1A] rounded-[2rem] p-6 md:p-8 flex flex-col justify-center shadow-sm text-white relative overflow-hidden group min-h-[200px]">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Server className="w-24 h-24" />
             </div>
             <h3 className="text-xl  mb-2 relative z-10">SOC Service</h3>
             <p className="text-white/60 text-sm relative z-10">24/7 Cybersecurity monitoring & detection.</p>
          </div>

          {/* 7. INSIGHTS CARD (Support - Tall) */}
          <div className="row-span-2 bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
             <div className="text-sm font-medium text-slate-500 uppercase tracking-wide text-center md:text-left">Expert Team</div>
             
             <div className="flex items-center justify-center my-6">
                <div className="flex -space-x-4">
                   {[1,2,3].map((i) => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg">
                         <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Expert" className="w-full h-full object-cover" />
                      </div>
                   ))}
                </div>
             </div>

             <div className="text-center">
                <h3 className="text-xl  text-slate-900">Dedicated Support</h3>
                <p className="text-sm text-slate-500 mt-2">Certified engineers assigned to your account, available 24/7.</p>
             </div>
             
             <div className="text-center text-xs text-slate-400 mt-4 font-mono">Response time &lt; 15m</div>
          </div>

          {/* 8. CHART CARD */}
          <div className="col-span-1 bg-white rounded-[2rem] p-6 flex flex-col justify-between shadow-sm min-h-[200px]">
             <div className="flex justify-between items-start mb-4">
                <span className="text-sm  text-slate-700">Threats Blocked</span>
                <span className="text-xs  text-slate-400">92%</span>
             </div>
             
             <div className="flex items-end justify-between h-24 gap-2">
                {[40, 70, 45, 90, 60, 80].map((h, i) => (
                   <div key={i} className="w-full bg-green-100 rounded-t-md relative group">
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-green-400 rounded-t-md transition-all duration-1000 group-hover:bg-green-500"
                        style={{ height: `${h}%` }}
                      ></div>
                   </div>
                ))}
             </div>
          </div>

          {/* 9. METRIC CARD */}
          <div className="col-span-1 bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm min-h-[200px]">
             <div className="w-full bg-[#8b5cf6] text-white py-2 px-4 rounded-full text-xs  flex justify-between items-center mb-4 shadow-md shadow-violet-200">
                <span>Total Resolved</span>
                <CheckCircle2 className="w-3 h-3" />
             </div>
             <div className="text-3xl  text-slate-900">10,333</div>
             <div className="flex items-center gap-1 text-green-600 text-xs  mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5% Efficiency</span>
             </div>
          </div>

          {/* 10. AWARD CARD (Tall) */}
          <div className="col-span-2 bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100">
             <div className="w-12 h-12 py-3 bg-violet-50 rounded-full flex items-center justify-center mb-6 text-violet-500">
                <Users className="w-5 h-5" />
             </div>
             <h3 className="text-lg  text-slate-900 mb-2">Award-winning <br/>MSP Partner</h3>
             <p className="text-xs text-slate-500">
                Recognized for excellence in cloud migration.
             </p>
          </div>

        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default BentoGrid;