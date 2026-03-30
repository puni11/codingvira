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
export const metadata = {
  title: "CodeVira - cloud solutions, DevOps services, and website development",
  description:
    "CodeVira is a leading provider of managed DevOps services, website development, and cloud solutions. We help businesses streamline their operations, enhance their online presence, and leverage the power of the cloud to achieve their goals.",

  keywords: [
    "DevOps services",
    "website development",
    "cloud solutions",
    "managed services",
    "cloud migration",
    "infrastructure as code",
    "CI/CD pipelines",
    "cloud security",
    "cloud consulting",
  ],

  authors: [{ name: "CodeVira" }],
  creator: "CodeVira",
  publisher: "CodeVira",

  metadataBase: new URL("https://codevira.com"),

  alternates: {
    canonical: "https://codevira.com",
  },

  openGraph: {
    title: "CodeVira - Cloud Solutions, DevOps Services, and Website Development",
    description:
      "CodeVira is a leading provider of managed DevOps services, website development, and cloud solutions. We help businesses streamline their operations, enhance their online presence, and leverage the power of the cloud to achieve their goals.",
    url: "https://codevira.com",
    siteName: "CodeVira",
    images: [
      {
        url: "/og-image.jpg", // put inside public folder
        width: 1200,
        height: 630,
        alt: "CodeVira - Cloud Solutions, DevOps Services, and Website Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeVira - Cloud Solutions, DevOps Services, and Website Development",
    description:
      "CodeVira is a leading provider of managed DevOps services, website development, and cloud solutions. We help businesses streamline their operations, enhance their online presence, and leverage the power of the cloud to achieve their goals.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#2563eb",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};
export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-[#f4f5f8] font-sans dark:bg-black">
     <HeroSection />
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
