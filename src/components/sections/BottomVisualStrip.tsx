"use client";

import { motion } from "framer-motion";

export default function BottomVisualStrip() {
  return (
    <section className="relative w-full h-[180px] md:h-[220px] lg:h-[260px] overflow-hidden flex items-center justify-center border-b border-gray-200">
      
      {/* Background Image/Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale mix-blend-multiply"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518342469493-9c8d374cecc8?auto=format&fit=crop&q=80&w=2000')" }}
      />
      
      <div className="absolute inset-0 bg-stone-100/90 z-10" />

      {/* Content */}
      <div className="relative z-20 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12 text-[12px] md:text-[14px] lg:text-[16px] font-medium tracking-[0.3em] text-charcoal-900 uppercase"
        >
          <span>Trust</span>
          <span className="text-sage-500">|</span>
          <span>Quality</span>
          <span className="text-sage-500">|</span>
          <span>People</span>
          <span className="text-sage-500">|</span>
          <span>Progress</span>
        </motion.div>
      </div>
      
    </section>
  );
}
