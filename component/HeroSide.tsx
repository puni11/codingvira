import React from "react";
import { 
  MoreHorizontal, 
  Activity,       // For System Health
  ShieldCheck,    // For Security
  Server,         // For Infrastructure
  Database,       // For Backups
  BarChart3,      // For Analytics
  CheckCircle2    // For Status indicators
} from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSide(){
    return(
         <div className="relative h-[500px] w-full hidden lg:block select-none">
          
          {/* 1. System Monitoring Box (Top Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute top-0 left-0 w-[320px] h-[220px] bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 shadow-sm z-10"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-slate-600 text-sm font-medium">
              System Health: Optimal <br /> 
              <span className="text-slate-400 text-xs font-normal">No outages detected</span>
            </p>
            
            {/* Floating Server Badge */}
            <motion.div 
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 bg-[#FCD34D] text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1"
            >
              Server_01
              <CheckCircle2 className="w-3 h-3 text-green-700" />
            </motion.div>
          </motion.div>

          {/* 2. Security/Cybersecurity Card (Bottom Left) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="absolute bottom-18 left-0 w-[300px] h-[160px] bg-[#1A1A1A] rounded-2xl p-6 flex flex-col justify-between shadow-2xl z-20 overflow-hidden"
          >
            {/* Abstract Shield Glow */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-80">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 blur-xl rounded-full opacity-60"></div>
                {/* SVG representation of a Shield/Node */}
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="relative z-10 -mt-16 ml-4">
                    <path d="M50 0L90 40L50 90L10 40L50 0Z" fill="url(#gradSec)" stroke="white" strokeWidth="0.5"/>
                    <defs>
                        <linearGradient id="gradSec" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                 <ShieldCheck className="w-4 h-4 text-blue-400" />
                 <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Secure</span>
              </div>
              <h3 className="text-white font-medium text-lg">Endpoint Protection</h3>
            </div>
            <button className="w-fit bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-full backdrop-blur-md transition-colors border border-white/10">
              View Logs
            </button>
          </motion.div>

          {/* 3. Right Stack (Analytics & Backup) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-12 right-0 w-[280px] z-30 flex flex-col items-center"
          >
            {/* Back Card (Database Backup) */}
            <div className="w-full bg-[#1e1b2e] rounded-2xl p-4 mb-[-140px] scale-90 opacity-90 shadow-xl border border-white/5 relative z-0 h-[200px] flex items-start justify-between">
                <div className="flex items-center gap-2 text-white/50">
                    <Database className="w-4 h-4" />
                    <span className="text-xs">Cloud Backup</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center text-black">
                    <CheckCircle2 className="w-4 h-4" />
                </div>
            </div>

            {/* Main White Card (Performance Report) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Performance</h4>
                    <p className="text-xs text-slate-500">Monthly Report</p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400">
                   <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Inner floating pill */}
              <div className="bg-green-50 rounded-xl p-3 flex items-center justify-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs text-slate-600 font-medium">Uptime: 99.99%</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
    )
}