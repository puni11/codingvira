"use client";
import React from "react";
import { motion } from "framer-motion";

const CloudInfrastructureHero = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-hidden font-sans text-slate-200">
      
      {/* 1. Animated Cloud/Infra Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* 2. Text Content (Left Side) */}
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030712] bg-slate-800" />
                ))}
            </div>
            <p className="text-sm text-slate-400">120+ Trusted Global Clients [cite: 195]</p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-8"
          >
            Your Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Infra-Cloud 
            </span> <br />
            in Control
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-md"
          >
            Manage 400+ servers with 75% faster deployments[cite: 72, 366]. 
            Automated, secure, and future-ready infrastructure for modern enterprises[cite: 73, 76].
          </motion.p>
        </div>

        {/* 3. Floating Infrastructure Mockup (Center) */}
        <div className="lg:col-span-4 flex justify-center">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[320px] aspect-[9/18] bg-slate-900 border-[6px] border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            {/* Mock App UI */}
            <div className="p-6">
              <div className="h-1 w-12 bg-slate-700 rounded-full mx-auto mb-8" />
              <p className="text-xl font-bold mb-4">Cloud Portal</p>
              
              <div className="space-y-4">
                {[
                  { label: "Active Nodes", val: "400+", color: "text-blue-400" }, // [cite: 72]
                  { label: "Deployment Consistency", val: "100%", color: "text-green-400" }, // [cite: 340]
                  { label: "Manual Effort Reduc.", val: "70%", color: "text-indigo-400" } // [cite: 341]
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold">{item.label}</p>
                    <p className={`text-2xl font-mono ${item.color}`}>{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4. Scanning/Integration Card (Right Side) */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center"
          >
            <h3 className="text-xl font-bold mb-2 text-white">Infrastructure Link</h3>
            <p className="text-sm text-slate-500 mb-6 text-balance">Scan to synchronize your data center nodes [cite: 416]</p>
            
            <div className="aspect-square w-full max-w-[180px] mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center p-4">
               {/* QR Placeholder */}
               <div className="grid grid-cols-4 gap-1 w-full h-full opacity-50">
                  {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="bg-white rounded-[2px]" />
                  ))}
               </div>
            </div>

            <div className="mt-8 flex justify-center gap-4 grayscale opacity-50">
                <div className="w-8 h-8 bg-slate-700 rounded-lg" />
                <div className="w-8 h-8 bg-slate-700 rounded-lg" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default CloudInfrastructureHero;