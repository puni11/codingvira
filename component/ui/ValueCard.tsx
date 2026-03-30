import React from "react";
import { motion } from "framer-motion";

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => {
     return(
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors"
  >
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
        {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
)
}
export default ValueCard;