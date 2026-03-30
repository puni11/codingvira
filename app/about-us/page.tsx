"use client";

import React from "react";
import { motion } from "framer-motion";
import TeamMember from "@/component/ui/TeamMemeber";
import ValueCard from "@/component/ui/ValueCard";
import StatItem from "@/component/ui/StateItem";
import { 
  Target, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight, 
  Heart,
} from "lucide-react";
import StatsSection from "@/component/StatsSection";

const AboutPage = () => {
  return (
    <div className="w-full bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-sm   text-blue-600 mb-6 border border-blue-100">
              About NextSaaS
            </div>
            <h1 className="text-5xl md:text-7xl   text-slate-900 tracking-tight leading-[1.1] mb-8">
              We build the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                digital backbone
              </span> <br/>
              of modern business.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              We are a team of developers, cloud architects, and problem solvers dedicated to removing the complexity of technology so you can focus on growth.
            </p>
          </div>
          <div className="md:w-1/2 relative">
             {/* Abstract Image Composition */}
             <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-auto object-cover"
                />
             </div>
             {/* Decorative Elements */}
             <div className="absolute top-10 right-10 w-full h-full border-2 border-slate-100 rounded-[2.5rem] -z-10 translate-x-4 -translate-y-4" />
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
          </div>
        </div>
      </section>


      {/* --- STATS STRIP --- */}
<StatsSection/>


      {/* --- OUR MISSION (Dark Section) --- */}
      <section className="w-full bg-[#111] py-24 px-6 relative overflow-hidden text-white">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl   mb-6">
              Not just a vendor. <br/> A strategic partner.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              The gap between having code and having a business is infrastructure. We bridge that gap. 
              We started in 2015 with a simple belief: that complex cloud technology should be accessible, secure, and scalable for everyone.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Today, we manage the digital estates of Fortune 500s and startups alike, ensuring their apps stay up, their data stays safe, and their users stay happy.
            </p>
            
            <div className="flex gap-4">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#111] overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Team" />
                    </div>
                  ))}
               </div>
               <div className="flex flex-col justify-center">
                  <span className="  text-white">Join our team</span>
                  <span className="text-xs text-slate-500">We are hiring designers & devs</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <ValueCard icon={<Target className="text-red-500" />} title="Mission" desc="To make enterprise-grade cloud infrastructure accessible to every ambitious company." />
             <ValueCard icon={<Lightbulb className="text-yellow-500" />} title="Vision" desc="A web where speed, security, and scalability are the default, not the exception." />
             <ValueCard icon={<ShieldCheck className="text-green-500" />} title="Integrity" desc="We don't sell you what you don't need. Honest consulting, always." />
             <ValueCard icon={<Heart className="text-pink-500" />} title="People First" desc="Technology is our tool, but people are our purpose. We invest in relationships." />
          </div>
        </div>
      </section>


      {/* --- LEADERSHIP TEAM --- */}
      <section className="w-full py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl   text-slate-900 mb-6">Meet the builders.</h2>
            <p className="text-slate-500 text-lg">
              We are a diverse group of engineers, designers, and strategists spread across 4 continents, united by a passion for shipping great software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Alex Morgan" 
              role="CEO & Founder" 
              img="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" 
            />
            <TeamMember 
              name="Sarah Jenkins" 
              role="CTO" 
              img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
            />
            <TeamMember 
              name="David Chen" 
              role="Head of Cloud" 
              img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" 
            />
            <TeamMember 
              name="Emily Ross" 
              role="VP of Design" 
              img="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" 
            />
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full px-6 pb-24">
         <div className="max-w-7xl mx-auto bg-violet-600 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
               <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
            </div>

            <div className="relative z-10">
               <h2 className="text-4xl md:text-5xl   text-white mb-6">
                 Ready to scale your vision?
               </h2>
               <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                 Join 500+ companies who trust NextSaaS with their digital future. Lets build something extraordinary together.
               </p>
               <button className="bg-white text-blue-600   py-4 px-10 rounded-full hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                 Start a conversation <ArrowRight className="w-5 h-5" />
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};




export default AboutPage;