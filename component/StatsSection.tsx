"use client";

import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  // Data tailored for Managed Services / Web Dev
  const metrics = [
    {
      value: "99.99%",
      label: "Uptime guaranteed SLA."
    },
    {
      value: "10k+",
      label: "Cyber threats blocked daily."
    },
    {
      value: "< 15m",
      label: "Average support response time."
    },
    {
      value: "50+",
      label: "Certified cloud engineers."
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="">
        
        {/* Dark Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A1A1A]  py-16 px-8 md:px-16 text-center relative"
        >
           <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-gradient-to-br from-violet-400 via-indigo-500 to-purple-600 blur-[80px] opacity-50"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center justify-center pt-8 md:pt-0 px-4">
                <h3 className="text-5xl md:text-6xl  text-white mb-4 tracking-tight">
                  {metric.value}
                </h3>
                <p className="text-slate-400 text-sm md:text-base font-medium">
                  {metric.label}
                </p>
              </div>
            ))}

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default StatsSection;