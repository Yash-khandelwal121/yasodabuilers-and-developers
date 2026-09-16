"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Statistics from "@/components/sections/Statistics";
import EnquiryCTA from "@/components/sections/EnquiryCTA";
import { whyChooseUs } from "@/data/placeholder-data";

export default function AboutPage() {
  return (
    <>
      <div className="pt-28 md:pt-32 pb-16 md:pb-0 bg-stone-50 relative overflow-hidden flex items-center lg:h-[560px] min-h-[480px]">
        <div className="container-custom h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-3 mb-5"
            >
              <div className="h-[2px] w-8 bg-sage-500" />
              <span className="text-xs font-semibold tracking-widest text-sage-500 uppercase">
                About Yasoda Builders
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[38px] md:text-[44px] lg:text-[58px] font-serif font-bold text-charcoal-900 leading-[1.1] mb-6"
            >
              Building Trust.<br />
              Creating Lasting Spaces.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed max-w-[480px] font-sans mb-8"
            >
              Yasoda Builders and Developers is focused on creating thoughtfully planned residential and commercial spaces with quality construction, reliable execution and long-term value.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center px-8 h-[54px] bg-forest-800 text-white font-medium tracking-wide transition-all duration-300 hover:bg-forest-900"
              >
                EXPLORE OUR PROJECTS
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 h-[350px] lg:h-[560px] lg:absolute lg:right-0 lg:top-0"
          >
            <div className="w-full h-full relative">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Residential Apartment"
                className="w-full h-full object-cover rounded-[2px] lg:rounded-none lg:rounded-bl-[4px]"
              />
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-charcoal-900 font-bold mb-6">Our Story</h2>
              <div className="w-12 h-1 bg-accent mb-8" />
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Yasoda Builders and Developers began with a simple yet profound vision: to redefine the landscape of modern living through uncompromising quality and architectural brilliance. Based in the heart of Andhra Pradesh, we have steadily grown into a trusted name in the real estate and construction industry.
                </p>
                <p>
                  Our journey is marked by a relentless pursuit of excellence. We believe that every brick laid is a testament to our commitment to durability and aesthetics. From residential sanctuaries to sprawling commercial hubs, our portfolio reflects our versatility and our deep understanding of space utilization.
                </p>
                <p>
                  We don't just build structures; we craft environments that foster community, prosperity, and peace of mind. Our team of seasoned architects, engineers, and project managers work in unison to ensure that every project exceeds expectations.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Story" 
                className="w-full h-full object-cover rounded-sm shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Statistics />

      {/* Vision & Mission */}
      <section className="py-24 bg-beige-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-12 shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-4">Our Vision</h3>
              <div className="w-8 h-[2px] bg-accent mb-6" />
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and innovative builder and developer in the region, recognized for our commitment to quality, sustainability, and transforming skylines while enhancing the quality of life for communities.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-12 shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-4">Our Mission</h3>
              <div className="w-8 h-[2px] bg-accent mb-6" />
              <p className="text-gray-600 leading-relaxed">
                To consistently deliver exceptional real estate and construction projects through transparent practices, cutting-edge technology, and a customer-centric approach, ensuring value creation for all stakeholders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Yasoda Builders */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal-900 font-bold mb-6">Our Values</h2>
            <div className="w-12 h-1 bg-accent mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-gray-100 hover:border-accent transition-colors duration-300 group"
              >
                <CheckCircle2 size={32} className="text-accent mb-6" />
                <h4 className="text-xl font-serif font-bold text-charcoal-900 mb-3 group-hover:text-accent transition-colors">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
