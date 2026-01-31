"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InputGroup from "./ui/InputGroup";
import ContactCard from "./ui/ContactCard";

const ContactSection = () => {
  // --- STATE FOR BUTTON ANIMATION ---
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double clicks
    if (formStatus !== "idle") return;

    // 1. Start Loading
    setFormStatus("loading");

    // 2. Simulate API Request (2 seconds)
    setTimeout(() => {
      setFormStatus("success");

      // 3. Reset to Idle after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <section className="w-full bg-[#F9FAFB] py-36 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl  text-slate-900 mb-6 tracking-tight">
            Reach out to our support <br /> team for help.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Whether you have a question, need technical assistance, or just want some guidance, 
            our support team is here to help. We're available around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT COLUMN: INFO CARDS --- */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ContactCard 
              icon={<MapPin className="w-6 h-6" />}
              title="Our Address"
              detail="2464 Royal Ln. Mesa, New Jersey 45463"
              gradientColor="from-violet-500 to-purple-500"
              gradientPosition="top-[-50%] right-[-50%]"
            />
            <ContactCard 
              icon={<Mail className="w-6 h-6" />}
              title="Email Us"
              detail="hello@nextsaas.com"
              gradientColor="from-violet-400 to-purple-500"
              gradientPosition="top-[-20%] right-[20%]"
            />
            <ContactCard 
              icon={<Phone className="w-6 h-6" />}
              title="Call Us"
              detail="+391 (0)35 2568 4593"
              gradientColor="from-violet-500 to-purple-500"
              gradientPosition="top-[10%] left-[-20%]"
            />
          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <form className="space-y-8" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Your name" placeholder="Enter your name" type="text" />
                <InputGroup label="Your number" placeholder="Enter your number" type="tel" />
              </div>

              <InputGroup label="Email address" placeholder="Enter your email" type="email" />
              <InputGroup label="Subject" placeholder="Enter your subject" type="text" />

              <div className="flex flex-col gap-2">
                <label className="text-sm  text-slate-900">Write message</label>
                <textarea 
                  rows={6}
                  placeholder="Enter your messages"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-600 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all resize-none bg-white"
                />
              </div>

              <div className="flex items-center gap-3">
                 <input type="checkbox" id="terms" className="w-5 h-5 rounded border-gray-300 text-slate-900 focus:ring-slate-900" />
                 <label htmlFor="terms" className="text-sm text-slate-500">
                    I agree with the <a href="#" className="text-blue-600 underline">terms and conditions</a>
                 </label>
              </div>

              {/* --- ANIMATED BUTTON --- */}
              <button 
                type="button" 
                onClick={handleSubmit} // Using onClick as requested
                disabled={formStatus !== "idle"}
                className={`w-full py-4 rounded-full  transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95
                  ${formStatus === "success" 
                    ? "bg-violet-600 hover:bg-violet-700 text-white" 
                    : "bg-[#1A1A1A] hover:bg-black text-white"
                  }
                  ${formStatus === "loading" ? "cursor-wait opacity-90" : ""}
                `}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  
                  {/* IDLE STATE */}
                  {formStatus === "idle" && (
                    <motion.span 
                      key="idle"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      Submit
                    </motion.span>
                  )}

                  {/* LOADING STATE */}
                  {formStatus === "loading" && (
                    <motion.span 
                      key="loading"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.span>
                  )}

                  {/* SUCCESS STATE */}
                  {formStatus === "success" && (
                    <motion.span 
                      key="success"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Message Sent
                    </motion.span>
                  )}

                </AnimatePresence>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- REUSABLE COMPONENTS ---



export default ContactSection;