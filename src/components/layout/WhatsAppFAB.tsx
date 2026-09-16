"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href="https://wa.me/917780383825?text=Hello%20Work%20Sector%20Builders%20and%20Developers,%20I%20would%20like%20to%20know%20more%20about%20your%20projects%20and%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 lg:bottom-8 right-6 lg:right-8 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
