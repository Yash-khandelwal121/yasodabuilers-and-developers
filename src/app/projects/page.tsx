"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, ongoingProjects } from "@/data/placeholder-data";
import EnquiryCTA from "@/components/sections/EnquiryCTA";

const allProjects = [...featuredProjects, ...ongoingProjects];

const filters = ["All", "Ongoing", "Completed", "Upcoming", "Residential", "Commercial"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = allProjects.filter(project => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Ongoing") return project.status.toLowerCase() === "ongoing" || project.status.toLowerCase() === "under construction";
    if (activeFilter === "Completed") return project.status.toLowerCase() === "completed";
    if (activeFilter === "Upcoming") return project.status.toLowerCase() === "upcoming" || project.status.toLowerCase() === "foundation level";
    if (activeFilter === "Residential") return project.category.toLowerCase().includes("residential") || project.category.toLowerCase().includes("apartment") || project.category.toLowerCase().includes("home");
    if (activeFilter === "Commercial") return project.category.toLowerCase().includes("commercial");
    return true;
  });

  return (
    <>
      <div className="pt-20 md:pt-24 pb-16 px-4 md:px-8 w-full bg-stone-50">
        <div className="relative overflow-hidden rounded-md border border-gray-200 shadow-xl max-w-[1400px] mx-auto flex">
          <img 
            src="/images/yasoda-projects-hero.jpg" 
            alt="Our Projects" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <section className="py-20 bg-beige-100">
        <div className="container-custom">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 border rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-accent border-accent text-white" 
                    : "bg-transparent border-gray-300 text-charcoal-900 hover:border-accent hover:text-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                >
                  <Link href={project.slug} className="group block relative h-[500px] w-full overflow-hidden border border-gray-200 bg-white">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-[320px] transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-beige-200 text-charcoal-900 text-xs font-semibold uppercase tracking-wider mb-3">
                            {project.status}
                          </span>
                          <h3 className="text-2xl font-serif text-charcoal-900 font-bold group-hover:text-accent transition-colors">
                            {project.name}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-beige-100 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm flex flex-col gap-1 font-medium">
                        <span>{project.category}</span>
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No projects found for the selected category.
            </div>
          )}

        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
