"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    { title: "Quality Construction", desc: "Uncompromising standards." },
    { title: "Thoughtful Planning", desc: "Meticulous attention to detail." },
    { title: "Transparent Process", desc: "Clear communication always." },
    { title: "Reliable Execution", desc: "Delivering on our promises." }
  ];

  return (
    <section className="py-section bg-white border-t border-b border-gray-100">
      <div className="container-custom max-w-5xl">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif text-charcoal-900 font-bold mb-4"
          >
            Why Yasoda Builders?
          </motion.h2>
          <div className="h-[1px] w-12 bg-accent mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <CheckCircle2 className="text-accent mb-4" size={28} />
              <h3 className="text-lg font-serif text-charcoal-900 font-bold mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-gray-500">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
