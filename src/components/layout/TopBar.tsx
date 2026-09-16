import { Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  const tickerItems = [
    "Residential Construction",
    "Commercial Construction",
    "Renovation & Redevelopment",
    "Architecture & Planning",
    "Quality Construction",
    "Reliable Execution"
  ];

  // We duplicate the items to create a seamless infinite loop
  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="w-full h-[30px] md:h-[34px] bg-forest-900 text-stone-100 flex items-center justify-between text-[11px] md:text-[12px] font-sans font-medium tracking-wide overflow-hidden border-b border-white/10 z-50 relative">
      
      {/* Ticker Section - Left Side */}
      <div className="flex-1 flex overflow-hidden whitespace-nowrap mask-edges relative h-full items-center">
        <div className="flex animate-ticker items-center pl-4">
          {displayItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="uppercase text-stone-100/90">{item}</span>
              <span className="mx-4 text-sage-500/70 text-[8px]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Static Contact Section - Right Side */}
      <div className="hidden lg:flex items-center px-6 bg-forest-900 h-full border-l border-white/10 shrink-0 z-10 relative space-x-6">
        <Link href="tel:+917780383825" className="flex items-center hover:text-accent transition-colors duration-300">
          <Phone size={12} className="mr-2 text-sage-500" />
          +91 7780383825
        </Link>
        <Link href="mailto:kkbabuyasoda@gmail.com" className="flex items-center hover:text-accent transition-colors duration-300">
          <Mail size={12} className="mr-2 text-sage-500" />
          kkbabuyasoda@gmail.com
        </Link>
      </div>

    </div>
  );
}
