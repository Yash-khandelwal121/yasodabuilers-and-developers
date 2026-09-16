"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/placeholder-data";

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 md:py-32 bg-white" ref={containerRef}>
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Our Process
            </span>
            <div className="h-[1px] w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal-900 font-bold">
            From Vision to Reality
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Scroll animated line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 w-px bg-accent -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />
          
          {/* Mobile line */}
          <div className="md:hidden absolute left-[27px] top-0 bottom-0 w-px bg-gray-200" />
          <motion.div 
            className="md:hidden absolute left-[27px] top-0 w-px bg-accent origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, index) => {
              const isEven = index % 2 !== 0;
              return (
                <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center w-full">
                  
                  {/* Left content (Desktop) */}
                  <div className={`hidden md:block w-1/2 pr-12 text-right ${isEven ? 'md:order-1' : 'md:order-3 md:pl-12 md:pr-0 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-2xl font-serif text-charcoal-900 font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className="md:order-2 flex-shrink-0 z-10 w-14 h-14 rounded-full bg-white border-2 border-accent flex items-center justify-center relative md:mx-auto shadow-[0_0_0_8px_white]">
                    <span className="text-accent font-serif font-bold text-lg">{step.id}</span>
                  </div>

                  {/* Mobile content */}
                  <div className="md:hidden ml-8 mt-1 w-[calc(100%-4rem)]">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-2xl font-serif text-charcoal-900 font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Empty space for grid balancing on desktop */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-3' : 'md:order-1'}`} />

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
