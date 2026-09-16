"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ongoingProjects } from "@/data/placeholder-data";

export default function OngoingProjectsList() {
  return (
    <section className="py-24 md:py-32 bg-beige-100">
      <div className="container-custom">
        <div className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Ongoing Developments
            </span>
            <div className="h-[1px] w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal-900 font-bold">
            Creating the Future
          </h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {ongoingProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={project.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-3/5"
                >
                  <Link href={project.slug} className="block relative w-full h-[400px] md:h-[500px] overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full lg:w-2/5 flex flex-col"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white border border-gray-200 text-accent text-xs font-semibold uppercase tracking-wider">
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-serif text-charcoal-900 font-bold mb-3 hover:text-accent transition-colors duration-300">
                    <Link href={project.slug}>{project.name}</Link>
                  </h3>
                  
                  <div className="text-sm text-gray-500 tracking-wide uppercase mb-6 flex flex-col gap-1 font-medium">
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Link
                    href={project.slug}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-charcoal-900 text-white font-medium tracking-wide transition-colors duration-300 hover:bg-accent w-fit"
                  >
                    VIEW DETAILS
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
