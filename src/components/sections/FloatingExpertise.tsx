"use client";

import { motion } from "framer-motion";
import { Home, Building2, Hammer, Ruler } from "lucide-react";

const expertise = [
  { name: "Residential", icon: Home },
  { name: "Commercial", icon: Building2 },
  { name: "Renovation", icon: Hammer },
  { name: "Architecture & Planning", icon: Ruler },
];

export default function FloatingExpertise() {
  return (
    <div className="relative z-30 -mt-16 md:-mt-20 px-4 md:px-6 lg:px-8 max-w-[1280px] mx-auto pointer-events-none">
      <div className="bg-stone-50 border border-gray-100 shadow-xl shadow-black/5 pointer-events-auto">
        <div className="flex flex-col lg:flex-row items-stretch">
          
          <div className="bg-forest-900 text-white flex items-center justify-center py-6 px-8 lg:w-48 shrink-0">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-center">
              Our<br />Expertise
            </span>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center p-6 md:p-8 hover:bg-white transition-colors cursor-pointer group"
                >
                  <Icon 
                    strokeWidth={1} 
                    size={32} 
                    className="text-sage-500 mb-4 group-hover:text-forest-800 group-hover:scale-110 transition-all duration-300" 
                  />
                  <span className="text-[13px] font-medium text-charcoal-900 text-center tracking-wide group-hover:text-forest-800 transition-colors">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
