

import React, { ReactNode } from "react";
import { 
  Cloud, 
  ShieldCheck, 
  Database, 
  GitBranch, 
  Server, 
  Cpu, 
  ArrowRight,
  Network
} from "lucide-react";

const AzureServicesDark = () => {
  return (
    <section className="w-full bg-[#0a0a0a] py-24 px-6 relative overflow-hidden font-sans text-white">
      
      {/* --- BACKGROUND GLOW (Top Right) --- */}
      {/* Matches the golden/orange light leak from the reference */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-violet-500/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl md:text-5xl  tracking-tight mb-6">
            Our Azure Services
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            We are fully qualified Azure consultants providing the expertise to migrate, manage, and modernize your infrastructure on the Microsoft Cloud.
          </p>
          <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-8 py-3 rounded-full text-sm font-medium transition-all border border-white/10 flex items-center gap-2 group">
            Explore all services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- 3-COLUMN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* LEFT COLUMN: 3 Services */}
          <div className="flex flex-col gap-16">
            <ServiceItem 
              icon={<Cloud />} 
              title="Cloud Migration"
              desc="Seamlessly move your on-premise servers to Azure. We handle the strategy, replatforming, and data transfer with zero downtime."
            />
            <ServiceItem 
              icon={<GitBranch />} 
              title="DevOps & CI/CD"
              desc="Automate your release pipelines with Azure DevOps. We implement GitHub Actions, Docker, and Kubernetes (AKS) for faster deployment."
            />
            <ServiceItem 
              icon={<Server />} 
              title="App Modernization"
              desc="Refactor legacy applications into scalable, cloud-native microservices using Azure Functions and App Service."
            />
          </div>

         <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center py-8 lg:py-0">
             <div className="relative w-full h-full bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group flex items-center justify-center">
                
                {/* Background Gradient inside card */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-950 z-0" />
                
                {/* Central Hub Visual */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                   {/* Glowing Core */}
                   <div className="w-32 h-32 bg-gradient-to-tr from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(99,102,241,0.4)] animate-pulse relative">
                      <Network className="w-14 h-14 text-white" />
                      {/* Orbiting Dots representing different clouds connecting */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-4 h-4 bg-blue-400 rounded-full blur-[2px]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-4 h-4 bg-orange-400 rounded-full blur-[2px]" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-4 h-4 bg-green-400 rounded-full blur-[2px]" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-4 h-4 bg-red-400 rounded-full blur-[2px]" />
                   </div>
                   
                   <h3 className="mt-8 text-2xl  text-white">Unified Cloud Control</h3>
                   <p className="text-slate-500 text-sm mt-2">Single pane of glass for all environments.</p>
                </div>

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
             </div>
          </div>

          {/* RIGHT COLUMN: 3 Services */}
          <div className="flex flex-col gap-16 lg:pl-8">
            <ServiceItem 
              icon={<ShieldCheck />} 
              title="Security & Governance"
              desc="Secure your cloud with Azure Sentinel and Defender. We enforce policies, identity management (Entra ID), and compliance."
            />
            <ServiceItem 
              icon={<Database />} 
              title="Data & Analytics"
              desc="Unlock insights with Azure Synapse and SQL. We build data warehouses and ETL pipelines to power your business intelligence."
            />
            <ServiceItem 
              icon={<Cpu />} 
              title="AI Integration"
              desc="Infuse your apps with intelligence using Azure Cognitive Services and OpenAI. Chatbots, vision, and predictive models."
            />
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Helper Component ---
const ServiceItem = ({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-start gap-4 group cursor-default">
    {/* Icon Container */}
    <div className="text-white/70 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    
    {/* Text Content */}
    <div>
      <h3 className="text-xl  text-white mb-3 group-hover:text-violet-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed max-w-sm group-hover:text-slate-400 transition-colors">
        {desc}
      </p>
    </div>
  </div>
);

export default AzureServicesDark;