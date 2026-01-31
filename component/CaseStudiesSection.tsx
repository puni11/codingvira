
import React from "react";
import { ArrowUpRight, BarChart3, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const CaseStudiesSection = () => {
  return (
    <section className="w-full bg-[#F9FAFB] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-sm font-semibold text-violet-700 mb-6">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl  text-slate-900 tracking-tight leading-[1.1]">
              See how we help companies <br/>
              <span className="text-violet-400">scale without limits.</span>
            </h2>
          </div>
          
          <button className="hidden md:flex items-center gap-2 text-slate-900  hover:gap-4 transition-all">
            View all case studies <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* --- FEATURED CASE STUDY (Large Card) --- */}
        <div className="relative w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-8 overflow-hidden group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="relative z-10 order-2 lg:order-1">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-8 text-white  text-xl">
                 F
              </div>
              <h3 className="text-3xl md:text-4xl  text-slate-900 mb-4">
                FinTech Global: Zero-downtime migration for 5M+ users.
              </h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                We helped FinTech Global migrate their legacy on-premise infrastructure to a hybrid Azure environment, reducing operational costs by 40% while ensuring 100% data integrity during the transition.
              </p>
              
              {/* Metrics Grid */}
              <div className="flex gap-8 mb-8 border-t border-slate-100 pt-8">
                <div>
                   <div className="text-3xl  text-slate-900">40%</div>
                   <div className="text-sm text-slate-400">Cost Reduction</div>
                </div>
                <div>
                   <div className="text-3xl  text-slate-900">99.99%</div>
                   <div className="text-sm text-slate-400">Uptime Achieved</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full border border-slate-200 text-xs  text-slate-600">Azure</span>
                <span className="px-4 py-1.5 rounded-full border border-slate-200 text-xs  text-slate-600">DevOps</span>
                <span className="px-4 py-1.5 rounded-full border border-slate-200 text-xs  text-slate-600">Security</span>
              </div>
            </div>

            {/* Visual / Image */}
            <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] rounded-[2rem] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-violet-100 to-indigo-50" />
               
               {/* Abstract Dashboard Visual */}
               <div 
                 className="absolute inset-4 bg-white rounded-2xl shadow-xl p-6 border border-slate-100 flex flex-col gap-4"
               
               >
                  <div className="w-full h-8 bg-slate-50 rounded-lg flex items-center px-4 gap-2">
                     <div className="w-2 h-2 rounded-full bg-red-400" />
                     <div className="w-2 h-2 rounded-full bg-yellow-400" />
                     <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                     <div className="col-span-2 bg-violet-50/50 rounded-xl p-4 flex items-end">
                        <div className="w-full h-24 bg-violet-500/20 rounded-lg relative overflow-hidden">
                           <div className="absolute bottom-0 left-0 w-full h-full bg-violet-500/30 transform translate-y-1/2 rotate-3 scale-110" />
                        </div>
                     </div>
                     <div className="col-span-1 bg-slate-50/50 rounded-xl"></div>
                     <div className="col-span-3 h-24 bg-slate-50 rounded-xl"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Hover Arrow Effect */}
          <div className="absolute top-8 right-8 w-12 h-12 bg-white border border-slate-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
             <ArrowUpRight className="w-5 h-5 text-slate-900" />
          </div>
        </div>

        {/* --- SECONDARY GRID (3 Columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: E-commerce */}
          <CaseStudyCard 
            category="E-commerce"
            title="Scaling ShopMax for Black Friday traffic spikes."
            metric="10x Traffic Load"
            icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
            color="bg-purple-50"
          />

          {/* Card 2: Healthcare */}
          <CaseStudyCard 
            category="Healthcare"
            title="HIPAA compliant infrastructure for MedCare."
            metric="100% Compliance"
            icon={<ShieldCheck className="w-6 h-6 text-green-600" />}
            color="bg-green-50"
          />

          {/* Card 3: SaaS */}
          <CaseStudyCard 
            category="SaaS Platform"
            title="Automating deployments for WorkFlow Inc."
            metric="15m Deploy Time"
            icon={<Zap className="w-6 h-6 text-orange-600" />}
            color="bg-orange-50"
          />

        </div>
        
        <button className="md:hidden mt-8 w-full bg-white border border-slate-200 py-4 rounded-full  flex items-center justify-center gap-2">
           View all case studies <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </section>
  );
};

// --- Helper Component ---
const CaseStudyCard = ({ category, title, metric, icon, color }: { category: string, title: string, metric: string, icon: React.ReactNode, color: string }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between min-h-[320px]">
      
      <div>
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-6`}>
           {icon}
        </div>
        
        <div className="text-xs  text-slate-400 uppercase tracking-wider mb-3">
          {category}
        </div>
        
        <h3 className="text-xl  text-slate-900 mb-6 leading-tight group-hover:text-violet-600 transition-colors">
          {title}
        </h3>
      </div>

      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
        <span className=" text-slate-900">{metric}</span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
           <ArrowRight className="w-4 h-4" />
        </div>
      </div>

    </div>
  );
};

export default CaseStudiesSection;