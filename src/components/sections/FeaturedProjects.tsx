"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/placeholder-data";

export default function FeaturedProjects() {
  const displayProjects = featuredProjects.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-sage-500" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-sage-500 uppercase">
                Featured Projects
              </span>
              <div className="h-[1px] w-8 bg-sage-500" />
            </div>
            <h2 className="text-[32px] md:text-[44px] font-serif text-charcoal-900 font-bold leading-tight">
              Spaces Designed for Modern Living
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={project.slug} className="group block bg-stone-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="relative h-[250px] w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-900 text-[10px] font-semibold uppercase tracking-wider">
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <h3 className="text-[20px] font-serif text-charcoal-900 font-bold mb-2 group-hover:text-forest-800 transition-colors">
                    {project.name}
                  </h3>
                  <div className="text-gray-500 text-[13px] mb-6 flex flex-col gap-1">
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center text-[13px] tracking-wide text-charcoal-900 font-medium group-hover:text-forest-800 transition-colors duration-300">
                    VIEW PROJECT 
                    <ArrowUpRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center h-[50px] px-8 bg-forest-800 text-white text-[13px] font-medium tracking-wide transition-colors duration-300 hover:bg-forest-900 rounded-[2px]"
          >
            VIEW ALL PROJECTS
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}
