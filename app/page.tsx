import AzureServicesDark from "@/component/AzureSection";
import BentoGrid from "@/component/BentoGrid";
import BlogSection from "@/component/BlogSection";
import CaseStudiesSection from "@/component/CaseStudiesSection";
import Footer from "@/component/Footer";
import HeroSection from "@/component/HeroSection";
import IntegrationSection from "@/component/IntegrationSection";
import ProcessSection from "@/component/ProcessSection";
import StatsSection from "@/component/StatsSection";
import Testimonials from "@/component/Testimonials";
import TrustedBy from "@/component/TrustedBy";
import ContactSection from "@/component/ContactSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-[#f4f5f8] font-sans dark:bg-black">
     <HeroSection />
     <TrustedBy />
     <AzureServicesDark/>
     <BentoGrid />
     <ProcessSection />
     <IntegrationSection />
     <StatsSection/>
     <CaseStudiesSection />
     <BlogSection/>
     <Testimonials />
    </div>
  );
}
