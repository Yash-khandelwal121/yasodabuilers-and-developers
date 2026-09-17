"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Home, Building2, Wrench, PencilRuler } from "lucide-react";
import { services } from "@/data/placeholder-data";
import EnquiryCTA from "@/components/sections/EnquiryCTA";

export default function ServicesDirectoryPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-16 px-4 md:px-8 w-full bg-stone-50">
        <div className="relative overflow-hidden rounded-md border border-gray-200 shadow-xl max-w-[1400px] mx-auto flex">
          <img 
            src="/images/service.png" 
            alt="Our Services" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <section className="py-24 bg-beige-100">
        <div className="container-custom">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 h-[400px] relative group overflow-hidden"
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-charcoal-900 text-white w-12 h-12 flex items-center justify-center font-serif font-bold text-xl">
                      0{index + 1}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 flex flex-col"
                  >
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal-900 font-bold mb-6">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-10 text-charcoal-900 font-medium">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-accent mr-3" />
                        Comprehensive Planning
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-accent mr-3" />
                        Quality Execution
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-accent mr-3" />
                        Timely Delivery
                      </li>
                    </ul>
                    <Link
                      href={`/services/${service.id}`}
                      className="group inline-flex items-center text-accent font-medium hover:text-charcoal-900 transition-colors duration-300 w-fit"
                    >
                      <span className="border-b-2 border-accent pb-1 mr-3">LEARN MORE</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
