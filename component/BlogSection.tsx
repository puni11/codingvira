"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Tag, ArrowRight } from "lucide-react";

// --- Mock Data ---
const BLOG_POSTS = [
  {
    id: 1,
    category: "Cloud Strategy",
    date: "Oct 24, 2023",
    title: "The Future of Multi-Cloud: Strategies for 2025 and Beyond",
    description: "Explore how enterprises are shifting from hybrid to true multi-cloud architectures to maximize resilience, avoid vendor lock-in, and optimize costs across global infrastructure.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    category: "DevSecOps",
    date: "Oct 20, 2023",
    title: "Shifting Left: Integrating Security into Your CI/CD Pipeline",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "AI & Automation",
    date: "Oct 15, 2023",
    title: "Leveraging Generative AI for IT Service Management (ITSM)",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Cybersecurity",
    date: "Oct 10, 2023",
    title: "Zero Trust Architecture: A Practical Implementation Guide",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Edge Computing",
    date: "Oct 5, 2023",
    title: "Processing at the Edge: Reducing Latency for IoT",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=400&auto=format&fit=crop",
  },
];

const BlogSection = () => {
  const featuredPost = BLOG_POSTS.find((post) => post.featured);
  const sliderPosts = BLOG_POSTS.filter((post) => !post.featured);

  // Duplicated list for seamless looping
  // We triple it here to ensure there is always content filling the view during the transit
  const duplicatedSliderPosts = [...sliderPosts, ...sliderPosts, ...sliderPosts];

  return (
    <section className="w-full bg-white py-24 px-6 font-sans" id="blog">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-sm font-semibold text-violet-700 mb-6">
              Our Insights
            </div>
            <h2 className="text-4xl md:text-5xl  text-slate-900 tracking-tight leading-[1.1]">
              Latest trends, <br />
              tech, and strategies.
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-900  hover:gap-4 transition-all group">
            View all articles <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* === LEFT SIDE: FEATURED BLOG POST (Span 2 columns) === */}
          <div className="lg:col-span-2 flex flex-col group cursor-pointer">
            {/* Image Container */}
            <div className="relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden mb-8 shadow-lg">
              <img 
                src={featuredPost?.image} 
                alt={featuredPost?.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm  text-violet-700 flex items-center gap-2 shadow-sm">
                <Tag className="w-4 h-4" /> Featured
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
               <span className="flex items-center gap-2 text-violet-600 font-semibold">
                  <Tag className="w-4 h-4" /> {featuredPost?.category}
               </span>
               <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> {featuredPost?.date}
               </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl  text-slate-900 mb-4 leading-tight group-hover:text-violet-700 transition-colors">
              {featuredPost?.title}
            </h3>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-2xl">
              {featuredPost?.description}
            </p>
            
            {/* Read More Icon/Button */}
            <div className="mt-auto flex items-center gap-3 text-slate-900  text-lg group/btn">
              Read Article
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-violet-600 group-hover/btn:text-white transition-all duration-300 group-hover/btn:rotate-45">
                 <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>


          {/* === RIGHT SIDE: VERTICAL SLIDER (Span 1 column) === */}
          {/* Fixed height to balance with the left side image + content area */}
          <div className="lg:col-span-1 h-[700px] flex flex-col pt-4">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl  text-slate-900">Recent Updates</h4>
            </div>
            
            {/* The Scrolling Container Track */}
            {/* Added CSS mask-image for smooth fade in/out at edges */}
            <div className="flex-1 relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                  // Move upwards from 0% to -33.33% (one-third of the tripled list)
                  animate={{ y: ["0%", "-33.33%"] }}
                  transition={{
                    ease: "linear",
                    duration: 40, // Slower duration for smoother readability
                    repeat: Infinity,
                  }}
                  className="flex flex-col gap-5 pb-5" // Reduced gap slightly
                >
                  {duplicatedSliderPosts.map((post, index) => (
                    // Individual Slider Card
                    <div 
                      key={`${post.id}-${index}`} 
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-violet-100 transition-all cursor-pointer group/mini"
                    >
                       <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover/mini:scale-110 transition-transform duration-500" />
                       </div>
                       <div>
                          <div className="text-[11px]  text-violet-600 mb-1 uppercase tracking-wider">{post.category}</div>
                          <h5 className="text-[15px]  text-slate-900 leading-snug line-clamp-2 group-hover/mini:text-violet-700 transition-colors">
                            {post.title}
                          </h5>
                          <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" /> {post.date}
                          </div>
                       </div>
                    </div>
                  ))}
                </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;