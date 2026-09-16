"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { services } from "@/data/placeholder-data";
import EnquiryCTA from "@/components/sections/EnquiryCTA";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    notFound();
  }

  const benefits = [
    "Uncompromising Quality Standards",
    "Transparent Project Management",
    "Expert Engineering & Architecture Team",
    "Adherence to Timelines",
    "Sustainable and Modern Practices",
    "End-to-end Support"
  ];

  return (
    <>
      <div className="pt-32 pb-20 bg-charcoal-900 text-white relative">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-4"
          >
             <Link href="/services" className="text-accent uppercase tracking-widest text-xs hover:text-white transition-colors">
               ← Back to Services
             </Link>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
          >
            {service.title}
          </motion.h1>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-6">Service Overview</h2>
                <div className="w-12 h-1 bg-accent mb-8" />
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {service.description} 
                  {" "}At Yasoda Builders and Developers, we approach every {service.title.toLowerCase()} project with meticulous attention to detail. We ensure that our solutions are not just structurally sound but also aesthetically pleasing and highly functional.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-12">
                  Our team leverages modern techniques, premium materials, and industry best practices to deliver spaces that stand the test of time. We work closely with our clients to transform their vision into reality.
                </p>

                <h3 className="text-2xl font-serif text-charcoal-900 font-bold mb-6">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start bg-beige-100 p-4">
                      <CheckCircle2 className="text-accent shrink-0 mt-0.5 mr-3" size={20} />
                      <span className="text-charcoal-900 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="my-12 relative h-[400px]">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-2xl font-serif text-charcoal-900 font-bold mb-6">Our Process</h3>
                <div className="space-y-6">
                  {["Initial Consultation", "Planning & Design", "Execution", "Handover"].map((step, i) => (
                    <div key={i} className="flex">
                      <div className="w-12 h-12 bg-charcoal-900 text-white font-serif font-bold text-xl flex items-center justify-center shrink-0 mr-6">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-charcoal-900 mb-2">{step}</h4>
                        <p className="text-gray-600">A rigorous approach ensuring that every phase of the project meets our high standards of quality.</p>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-32 bg-beige-100 p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">Other Services</h3>
                <ul className="space-y-4 mb-8">
                  {services.filter(s => s.id !== serviceId).map(s => (
                    <li key={s.id}>
                      <Link href={`/services/${s.id}`} className="block p-4 bg-white border border-gray-100 hover:border-accent transition-colors text-charcoal-900 font-medium">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="bg-charcoal-900 text-white p-6 text-center">
                  <h4 className="font-serif text-xl font-bold mb-4">Need Consultation?</h4>
                  <p className="text-sm text-gray-400 mb-6">Speak with our experts today.</p>
                  <Link href="/contact" className="block w-full bg-accent text-white py-3 font-medium hover:bg-white hover:text-charcoal-900 transition-colors">
                    CONTACT US
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      
      <EnquiryCTA />
    </>
  );
}
