"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { featuredProjects, ongoingProjects } from "@/data/placeholder-data";
import { MapPin, Building, CalendarCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = `/projects/${params.slug}`;
  
  const allProjects = [...featuredProjects, ...ongoingProjects];
  const project = allProjects.find(p => p.slug === projectSlug);

  if (!project) {
    notFound();
  }

  const amenities = [
    "Clubhouse",
    "Gymnasium",
    "Swimming Pool",
    "Children's Play Area",
    "Landscaped Gardens",
    "24/7 Security",
    "Power Backup",
    "Ample Parking"
  ];

  const specifications = [
    { title: "Structure", desc: "RCC framed structure designed for seismic zone." },
    { title: "Flooring", desc: "Vitrified tiles in living, dining, and bedrooms. Anti-skid ceramic tiles in bathrooms." },
    { title: "Doors", desc: "Main door with teak wood frame. Internal doors with flush shutters." },
    { title: "Windows", desc: "UPVC sliding windows with mosquito mesh." },
    { title: "Plumbing", desc: "CPVC/UPVC pipes for water supply line. Premium quality sanitary fittings." },
    { title: "Electrical", desc: "Concealed copper wiring with modular switches. AC points in all bedrooms." },
  ];

  return (
    <>
      {/* Full-screen project hero */}
      <div className="h-screen min-h-[600px] w-full relative pt-20">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-charcoal-900/30" />
        </div>
        
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-2 bg-accent text-white text-sm font-semibold uppercase tracking-wider mb-6">
              {project.status}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 leading-tight">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center text-beige-100 gap-6 text-lg">
              <div className="flex items-center">
                <Building className="mr-2 text-accent" size={20} />
                {project.category}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-accent" size={20} />
                {project.location}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-24">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-24">
              
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-6">Project Overview</h2>
                <div className="w-12 h-1 bg-accent mb-8" />
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {project.description || `${project.name} is a meticulously planned development that redefines modern living. Situated in ${project.location}, it offers unparalleled convenience and lifestyle upgrades.`}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Every aspect of this project has been designed keeping the resident's comfort and luxury in mind. From expansive floor plans to premium finishes, it stands as a hallmark of Yasoda Builders's commitment to quality.
                </p>
              </section>

              {/* Gallery (Simplified) */}
              <section>
                <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-6">Gallery</h2>
                <div className="w-12 h-1 bg-accent mb-8" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 h-[400px]">
                    <img src={project.image} alt="Gallery 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[250px]">
                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" alt="Gallery 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[250px]">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" alt="Gallery 3" className="w-full h-full object-cover" />
                  </div>
                </div>
              </section>

              {/* Amenities */}
              <section>
                <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-6">Amenities</h2>
                <div className="w-12 h-1 bg-accent mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-beige-100 p-4">
                      <CheckCircle2 className="text-accent" size={20} />
                      <span className="text-charcoal-900 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specifications */}
              <section>
                <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-6">Specifications</h2>
                <div className="w-12 h-1 bg-accent mb-8" />
                <div className="space-y-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <h3 className="text-xl font-bold text-charcoal-900 mb-2">{spec.title}</h3>
                      <p className="text-gray-600">{spec.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar Sticky */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 space-y-8">
                
                {/* Project Info Card */}
                <div className="bg-charcoal-900 text-white p-8">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-accent">Project Details</h3>
                  <ul className="space-y-6">
                    <li className="flex flex-col">
                      <span className="text-sm text-gray-400 uppercase tracking-widest mb-1">Status</span>
                      <span className="font-medium text-lg">{project.status}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-sm text-gray-400 uppercase tracking-widest mb-1">Category</span>
                      <span className="font-medium text-lg">{project.category}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-sm text-gray-400 uppercase tracking-widest mb-1">Location</span>
                      <span className="font-medium text-lg">{project.location}</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <h4 className="font-serif text-xl font-bold mb-4">Interested in {project.name}?</h4>
                    <Link href="/contact" className="block w-full bg-accent text-white text-center py-4 font-medium hover:bg-white hover:text-charcoal-900 transition-colors">
                      ENQUIRE NOW
                    </Link>
                  </div>
                </div>

                {/* Related Projects Link */}
                <div className="bg-beige-100 p-8">
                  <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-4">Explore More</h3>
                  <Link href="/projects" className="group flex items-center text-accent font-medium hover:text-charcoal-900 transition-colors">
                    View all projects
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
