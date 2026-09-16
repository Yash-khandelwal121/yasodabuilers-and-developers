"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/placeholder-data";

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-charcoal-900 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-20 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Client Feedback
            </span>
            <div className="h-[1px] w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            What Our Clients Say
          </h2>
        </div>

        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-0 left-0 text-accent/20">
            <Quote size={80} className="rotate-180" />
          </div>
          
          <div className="overflow-hidden px-4 md:px-16 pt-12 pb-8">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-beige-100 leading-relaxed mb-10 italic">
                "{testimonials[currentIndex].review}"
              </p>
              <div>
                <h4 className="text-lg font-serif font-bold text-accent mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-6">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white hover:text-charcoal-900 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-accent' : 'bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white hover:text-charcoal-900 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
