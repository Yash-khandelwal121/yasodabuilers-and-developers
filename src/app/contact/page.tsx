"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import EnquiryCTA from "@/components/sections/EnquiryCTA";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  projectType: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <>
      <div className="pt-32 pb-20 bg-charcoal-900 text-white relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-beige-100/80 max-w-2xl mx-auto"
          >
            Get in touch with our team to discuss your next construction or real estate project.
          </motion.p>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-12"
            >
              <div>
                <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-beige-200 flex items-center justify-center shrink-0 mr-6 group-hover:bg-accent transition-colors duration-300">
                      <MapPin className="text-charcoal-900 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-2 font-serif">Our Head Office</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Door No. 23/517-26, <br />
                        Manjunath Nagar, Guntakal, <br />
                        PIN 515801, Anantapur District, <br />
                        Andhra Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-beige-200 flex items-center justify-center shrink-0 mr-6 group-hover:bg-accent transition-colors duration-300">
                      <Phone className="text-charcoal-900 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-2 font-serif">Phone Number</h3>
                      <a href="tel:+917780383825" className="text-gray-600 hover:text-accent transition-colors">
                        +91 7780383825
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-beige-200 flex items-center justify-center shrink-0 mr-6 group-hover:bg-accent transition-colors duration-300">
                      <Mail className="text-charcoal-900 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-2 font-serif">Email Address</h3>
                      <a href="mailto:kkbabuyasoda@gmail.com" className="text-gray-600 hover:text-accent transition-colors">
                        kkbabuyasoda@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-beige-200 flex items-center justify-center shrink-0 mr-6 group-hover:bg-accent transition-colors duration-300">
                      <Clock className="text-charcoal-900 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-2 font-serif">Business Hours</h3>
                      <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <h2 className="text-3xl font-serif text-charcoal-900 font-bold mb-8">Send an Enquiry</h2>
              
              {isSuccess && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700">
                  Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      className={`w-full p-4 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-accent transition-colors`}
                      placeholder="John Doe"
                      {...register("fullName", { required: "Full name is required" })}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      className={`w-full p-4 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-accent transition-colors`}
                      placeholder="+91 98765 43210"
                      {...register("phone", { required: "Phone number is required" })}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      className={`w-full p-4 border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-accent transition-colors`}
                      placeholder="john@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                      })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Required</label>
                    <select 
                      className="w-full p-4 border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-accent transition-colors"
                      {...register("serviceRequired")}
                    >
                      <option value="">Select a Service</option>
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Building Construction">Building Construction</option>
                      <option value="Renovation">Renovation & Redevelopment</option>
                      <option value="Architecture">Architecture & Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea 
                    rows={5}
                    className={`w-full p-4 border ${errors.message ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:bg-white focus:outline-none focus:border-accent transition-colors resize-none`}
                    placeholder="Tell us about your project requirements..."
                    {...register("message", { required: "Message is required" })}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white py-4 font-medium tracking-wide hover:bg-charcoal-900 transition-colors duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT ENQUIRY"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.646549298516!2d77.3752174!3d15.1633393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb71337b58849b7%3A0xe213baf6975dcaf5!2sGuntakal%2C%20Andhra%20Pradesh%20515801!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin" 
          className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 mix-blend-multiply" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Yasoda Builders Office Location"
        ></iframe>
      </section>

      <EnquiryCTA />
    </>
  );
}
