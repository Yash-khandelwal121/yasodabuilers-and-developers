"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Hero() {
  return (
    <section 
      className="relative w-full h-[540px] md:h-[590px] bg-stone-100 overflow-hidden mt-[80px] lg:mt-[70px]"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/home-hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for Text Readability */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(16,32,26,0.94) 0%, rgba(16,32,26,0.82) 32%, rgba(16,32,26,0.45) 55%, rgba(16,32,26,0.05) 78%, rgba(16,32,26,0) 100%)" }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-custom h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[600px] w-full pr-4 sm:pr-6 md:pr-0"
        >
          <div className="flex items-center space-x-3 mb-5">
            <div className="h-[2px] w-8 bg-[#C39A63]" />
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#E8E5DA]">
              BUILDING A BETTER TOMORROW
            </span>
          </div>

          <h1 
            className="text-[38px] sm:text-[44px] md:text-[58px] lg:text-[62px] font-serif font-bold leading-[1.02] mb-6 text-[#FFFFFF]"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.28)" }}
          >
            Spaces That<br />
            <span className="text-[#D2A060]">Inspire Living</span>
          </h1>

          <p className="text-[16px] md:text-[17px] leading-[1.7] max-w-[500px] mb-8 md:mb-10 font-light text-[#E3E7E4]">
            Thoughtfully planned residential spaces designed around quality, comfort and long-term value.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pr-4 sm:pr-0">
            <Link
              href="/projects"
              className="group flex items-center justify-center h-[50px] px-8 bg-forest-800 text-white text-[13px] font-medium tracking-wide hover:bg-forest-900 transition-colors duration-300 rounded-[2px] w-full sm:w-auto"
            >
              EXPLORE PROJECTS
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center justify-center h-[50px] px-8 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-[2px] border border-white/50 bg-black/20 hover:bg-black/40 text-white w-full sm:w-auto"
            >
              GET FREE CONSULTATION
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Editorial Side Message */}
      <div className="hidden lg:flex absolute right-24 xl:right-32 top-1/2 -translate-y-1/2 z-20 items-center h-[200px]">
        <div className="flex flex-col justify-between h-full text-right text-[10px] font-medium tracking-[0.2em] uppercase text-white/70 mr-4">
          <span className="transform -rotate-90 origin-right translate-x-full mt-auto mb-16 whitespace-nowrap">A Brighter Future</span>
          <span className="transform -rotate-90 origin-right translate-x-full mb-16 whitespace-nowrap">Stronger Communities</span>
          <span className="transform -rotate-90 origin-right translate-x-full mb-auto whitespace-nowrap">Modern Spaces</span>
        </div>
        <div className="w-[1px] h-full bg-white/20" />
      </div>
    </section>
  );
}
