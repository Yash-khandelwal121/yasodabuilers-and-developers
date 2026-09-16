"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MobileBottomActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom actions only on mobile and when scrolled a bit
      if (window.innerWidth < 1024) {
        setIsVisible(window.scrollY > 300);
      } else {
        setIsVisible(false);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex">
        <a 
          href="tel:+917780383825" 
          className="flex-1 flex flex-col items-center justify-center py-3 text-charcoal-900 border-r border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <Phone size={20} className="mb-1 text-charcoal-900" />
          <span className="text-[10px] font-medium tracking-wide uppercase">Call Now</span>
        </a>
        
        <a 
          href="https://wa.me/917780383825?text=Hello%20Work%20Sector%20Builders%20and%20Developers,%20I%20would%20like%20to%20know%20more%20about%20your%20projects%20and%20services." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 text-green-600 border-r border-gray-100 hover:bg-green-50 transition-colors"
        >
          <MessageCircle size={20} className="mb-1" />
          <span className="text-[10px] font-medium tracking-wide uppercase">WhatsApp</span>
        </a>
        
        <Link 
          href="/contact" 
          className="flex-1 flex flex-col items-center justify-center py-3 text-accent hover:bg-accent/10 transition-colors"
        >
          <Mail size={20} className="mb-1" />
          <span className="text-[10px] font-medium tracking-wide uppercase">Enquire</span>
        </Link>
      </div>
    </div>
  );
}
