"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    num: "01",
    title: "Residential\nConstruction",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    href: "/services/residential-construction"
  },
  {
    num: "02",
    title: "Commercial\nConstruction",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    href: "/services/commercial-construction"
  },
  {
    num: "03",
    title: "Renovation &\nRedevelopment",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
    href: "/services/renovation"
  },
  {
    num: "04",
    title: "Architecture &\nPlanning",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
    href: "/services/architecture"
  }
];

export default function OurExpertise() {
  return (
    <section className="py-24 lg:py-32 bg-stone-50 overflow-hidden border-b border-gray-200">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
          
          {/* Left Content (Text) */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-[1px] w-8 bg-sage-500" />
              <span className="text-[10px] md:text-xs tracking-[0.2em] text-sage-500 uppercase font-semibold">
                Our Expertise
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[36px] md:text-[44px] lg:text-[48px] font-serif text-charcoal-900 font-bold leading-[1.1] mb-6"
            >
              Creating Spaces<br />
              Across Every Sector
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[15px] text-gray-600 leading-[1.6] max-w-[380px] mb-10"
            >
              From homes and commercial spaces to renovation and architectural planning, we create environments designed for long-term value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Link
                href="/services"
                className="group inline-flex items-center justify-center px-8 h-[50px] bg-forest-800 text-white text-[13px] font-medium tracking-wide transition-all duration-300 hover:bg-forest-900"
              >
                EXPLORE OUR SERVICES
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right Content (4 Cards Grid) */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                >
                  <Link href={card.href} className="group block bg-white h-full border border-gray-100 hover:border-gray-200 transition-colors">
                    {/* Image Box */}
                    <div className="w-full h-[220px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img 
                        src={card.img} 
                        alt={card.title.replace('\n', ' ')}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Text Box */}
                    <div className="p-6 md:p-8 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] text-sage-500 font-medium tracking-widest mb-2 block">
                          {card.num}
                        </span>
                        <h3 className="text-[18px] md:text-[20px] font-serif text-charcoal-900 font-bold leading-[1.2] whitespace-pre-line">
                          {card.title}
                        </h3>
                      </div>
                      <div className="text-accent group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
