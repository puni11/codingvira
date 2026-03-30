'use client';
import { Globe2 } from "lucide-react";

export default function TeamMember({ name, role, img }: { name: string, role: string, img: string }){
  return (  
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-[2rem] mb-4 h-[350px] bg-slate-100">
       <img 
         src={img} 
         alt={name} 
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
       />
       {/* Social Overlay */}
       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Globe2 className="w-5 h-5"/></div>
       </div>
    </div>
    <h3 className="text-xl font-bold text-slate-900">{name}</h3>
    <p className="text-slate-500">{role}</p>
  </div>
    );
}