"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Introduction() {
  return (
    <section className="py-section bg-background overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] md:h-[650px] w-full"
          >
            <div className="absolute inset-0 bg-accent/20 translate-x-4 translate-y-4 -z-10" />
            <div className="relative h-full w-full overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full"
              >
                {/* Fallback img tag for simplicity without configuring next/image domains just yet */}
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern architectural building by Yasoda Builders"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-sm font-medium tracking-widest text-accent uppercase">
                About Yasoda Builders
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-charcoal-900 font-bold leading-tight mb-8">
              Building With Purpose.<br />
              <span className="text-charcoal-700">Developing With Trust.</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Yasoda Builders and Developers is committed to creating quality residential and commercial developments through thoughtful planning, dependable construction and modern design.
            </p>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Our focus is to build spaces that provide long-term value while maintaining strong standards of quality, transparency and customer satisfaction.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10 border-t border-gray-200 pt-8">
              <div>
                <div className="text-3xl font-serif font-bold text-charcoal-900 mb-1">5+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-charcoal-900 mb-1">600+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Happy Families</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-charcoal-900 mb-1">75%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Referral Clients</div>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center text-charcoal-900 font-medium hover:text-accent transition-colors duration-300 w-fit"
            >
              <span className="border-b-2 border-accent pb-1 mr-3">DISCOVER MORE</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 text-accent" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
