import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ContactCard ({ 
  icon, 
  title, 
  detail, 
  gradientColor, 
  gradientPosition 
}: { 
  icon: ReactNode, 
  title: string, 
  detail: string, 
  gradientColor: string, 
  gradientPosition: string 
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-[#111] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center gap-4 group h-[220px]"
    >
      {/* Dynamic Gradient Blur */}
      <div className={`absolute ${gradientPosition} w-[150px] h-[150px] bg-gradient-to-br ${gradientColor} blur-[60px] opacity-60 group-hover:opacity-80 transition-opacity`} />
      
      {/* Icon Container */}
      <div className="relative z-10 w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-white mb-2">
        {icon}
      </div>
      
      {/* Text */}
      <div className="relative z-10">
        <h3 className="text-white  text-lg mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{detail}</p>
      </div>
    </motion.div>
  );
};