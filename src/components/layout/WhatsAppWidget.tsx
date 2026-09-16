"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppWidget() {
  const phoneNumber = "917780383825";
  const message = encodeURIComponent("Hello Yasoda Builders and Developers, I would like to know more about your projects and services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 hover:scale-110 transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} fill="currentColor" />
      </Link>
    </motion.div>
  );
}
