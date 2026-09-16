"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/placeholder-data";

export default function ServicesOverview() {
  const displayServices = services.slice(0, 4);

  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Our Expertise
            </span>
            <div className="h-[1px] w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal-900 font-bold max-w-2xl mx-auto">
            Comprehensive Construction Solutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link href={`/services/${service.id}`} className="group block h-full border border-gray-100 hover:border-accent transition-colors duration-300 overflow-hidden bg-beige-50">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 bg-charcoal-900 text-white px-3 py-1 font-serif text-sm">
                    0{index + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif text-charcoal-900 font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="flex items-center text-charcoal-900 font-medium text-xs tracking-wider uppercase group-hover:text-accent transition-colors duration-300">
                    Learn More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-charcoal-900 text-charcoal-900 font-medium tracking-wide transition-colors duration-300 hover:bg-charcoal-900 hover:text-white"
          >
            VIEW ALL SERVICES
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
