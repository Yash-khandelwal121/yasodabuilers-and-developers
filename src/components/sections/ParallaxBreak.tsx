"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ParallaxBreak() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 scale-[1.2]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000')" }}
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-charcoal-900/60 z-10" />
      
      <div className="container-custom relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Building More Than Structures
          </h2>
          <p className="text-lg md:text-xl text-beige-100/90 mb-10 max-w-2xl mx-auto font-light">
            Creating spaces designed to support better living, stronger communities and long-term value.
          </p>
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium tracking-wide transition-colors duration-300 hover:bg-white hover:text-charcoal-900"
          >
            DISCOVER OUR PROJECTS
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
