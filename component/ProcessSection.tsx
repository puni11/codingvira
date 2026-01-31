"use client";

import React from "react";
import { MoveRight, Code2, Server, ShieldCheck, Cpu, Globe, Layout, Database, Terminal, FileJson, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ProcessSection = () => {
  return (
    <section className="relative w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* --- LEFT COLUMN (Sticky Text) --- */}
        <div className="lg:w-3/5">
          <div className="sticky top-32">
            <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-sm  text-violet-700 mb-6">
              Our Process
            </div>
            
            <h2 className="text-4xl md:text-5xl  text-slate-900 mb-6 tracking-tight leading-[1.1]">
              From code to <br/> cloud, we handle it all.
            </h2>
            
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              We don't just build high-performance web applications; we manage the entire infrastructure that powers them. One partner for your entire digital lifecycle.
            </p>
            
            <button className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center gap-2 group shadow-lg">
              Start your project
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN (Stacking Cards) --- */}
        <div className="lg:w-2/5 flex flex-col gap-8 relative pb-24">
          
          {/* CARD 1: Web Development (The Build) */}
          {/* FIX: Moved shadow and border-radius to the sticky wrapper to prevent sharp corner bleeding */}
          <div className="sticky top-24 z-10 shadow-2xl rounded-[2.5rem]">
            <div className="relative bg-white rounded-[2.5rem] p-10 border border-slate-100 min-h-[500px] overflow-hidden group">
              {/* Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent opacity-80" />
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent opacity-80" />
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-3xl  text-slate-900 mb-3">Scalable Web Development.</h3>
                <p className="text-slate-500 text-lg mb-10 max-w-md">
                   Full-cycle development using modern runtimes and robust databases. Built for speed, security, and scale.
                </p>

                {/* Visual: Tech Grid */}
                <div className="flex-1 flex items-center justify-center relative">
                   <div className="w-80 h-80 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-[80px] opacity-60 absolute" />
                   
                   <motion.div 
                     className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md"
                     initial={{ y: 20, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.6 }}
                   >
                      {/* Frontend */}
                      <div className="bg-[#1A1A1A] text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                           <Code2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider ">Frontend</div>
                          <div className="">Next.js 16</div>
                        </div>
                      </div>
                      {/* Backend */}
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-lg flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                           <Server className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider ">Runtime</div>
                          <div className=" text-slate-900">Node & Bun</div>
                        </div>
                      </div>
                      {/* Database */}
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-lg flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                           <Database className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider ">Database</div>
                          <div className=" text-slate-900">PostgreSQL</div>
                        </div>
                      </div>
                      {/* Logic */}
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-lg flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                           <Terminal className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider ">Logic</div>
                          <div className=" text-slate-900">Python</div>
                        </div>
                      </div>
                   </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Managed Infrastructure (The Host) */}
          {/* FIX: Moved shadow and border-radius to the sticky wrapper */}
          <div className="sticky top-32 z-20 shadow-2xl rounded-[2.5rem]">
            <div className="relative bg-white rounded-[2.5rem] p-10 border border-slate-100 min-h-[500px] overflow-hidden">
               {/* Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent opacity-80" />
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-transparent opacity-80" />

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-3xl  text-slate-900 mb-3">Managed Cloud Infrastructure.</h3>
                <p className="text-slate-500 text-lg mb-10 max-w-md">
                   Forget server maintenance. We handle hosting, backups, and scaling so your site never goes down.
                </p>

                {/* Visual: Server Stats */}
                <div className="flex-1 flex items-center justify-center">
                   <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Globe className="w-4 h-4" /> Uptime</div>
                         <div className="text-2xl  text-slate-900">99.99%</div>
                         <div className="text-xs text-green-600 font-medium">Guaranteed</div>
                      </div>
                      <div className="bg-[#1A1A1A] p-4 rounded-2xl flex flex-col gap-2 text-white shadow-xl transform translate-y-4">
                         <div className="flex items-center gap-2 text-slate-400 text-sm font-medium"><Server className="w-4 h-4" /> Servers</div>
                         <div className="text-2xl ">Auto-Scale</div>
                         <div className="text-xs text-slate-400 font-medium">Load Balanced</div>
                      </div>
                       <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Database className="w-4 h-4" /> Backups</div>
                         <div className="text-2xl  text-slate-900">Daily</div>
                         <div className="text-xs text-blue-500 font-medium">Encrypted</div>
                      </div>
                       <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Cpu className="w-4 h-4" /> Speed</div>
                         <div className="text-2xl  text-slate-900">0.2s</div>
                         <div className="text-xs text-orange-600 font-medium">Latency</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Security & Support (The Protect) */}
          {/* FIX: Moved shadow and border-radius to the sticky wrapper */}
          <div className="sticky top-40 z-30 shadow-2xl rounded-[2.5rem]">
            <div className="relative bg-white rounded-[2.5rem] p-10 border border-slate-100 min-h-[500px] overflow-hidden">
               {/* Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-transparent opacity-80" />
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-400 via-yellow-400 to-transparent opacity-80" />

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-3xl  text-slate-900 mb-3">24/7 Security & Support.</h3>
                <p className="text-slate-500 text-lg mb-10 max-w-md">
                   Continuous threat monitoring and dedicated developer support to fix issues before they impact users.
                </p>

                {/* Visual: Security Checklist */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                   {[
                     { text: "SSL Certificate Renewal", color: "text-green-400" },
                     { text: "DDoS Protection Active", color: "text-blue-400" },
                     { text: "Patch Management", color: "text-purple-400" },
                   ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-[#1A1A1A] text-white px-6 py-4 rounded-xl flex items-center gap-4 shadow-lg w-full max-w-sm hover:scale-[1.02] transition-transform cursor-default"
                      >
                         <ShieldCheck className={`w-6 h-6 ${item.color}`} />
                         <span className=" text-md">{item.text}</span>
                         <CheckCircle2 className="w-5 h-5 text-slate-500 ml-auto" />
                      </motion.div>
                   ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;