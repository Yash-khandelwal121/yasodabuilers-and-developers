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
      <div className="pt-20 md:pt-24 w-full bg-stone-50">
        <Link href="/projects" className="block w-full cursor-pointer transition-opacity hover:opacity-95">
          <img 
            src="/images/about%20us.png" 
            alt="About Yasoda Builders" 
            className="w-full h-auto object-cover"
          />
        </Link>
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
