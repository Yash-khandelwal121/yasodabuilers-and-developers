"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";

export default function EnquiryCTA() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')" }}
        />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-forest-900/90 z-10" />
      
      <div className="container-custom relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[1px] w-8 bg-sage-500" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-sage-500 uppercase">
              Start Your Journey
            </span>
            <div className="h-[1px] w-8 bg-sage-500" />
          </div>
          
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-serif text-white font-bold mb-8 leading-tight">
            Planning Your Next Property?
          </h2>
          
          <p className="text-[16px] md:text-[18px] text-stone-100/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Talk to Yasoda Builders and Developers about your residential, commercial, renovation or construction requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+917780383825"
              className="group flex items-center justify-center h-[50px] px-8 bg-white text-forest-900 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:bg-stone-100 w-full sm:w-auto rounded-[2px]"
            >
              <PhoneCall size={16} className="mr-3" />
              CALL NOW
            </a>
            
            <Link
              href="/contact"
              className="group flex items-center justify-center h-[50px] px-8 bg-transparent border border-white/30 text-white text-[13px] font-medium tracking-wide transition-all duration-300 hover:bg-white/10 w-full sm:w-auto rounded-[2px]"
            >
              ENQUIRE NOW
              <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
