"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Residential Construction", href: "/services/residential-construction" },
      { name: "Commercial Construction", href: "/services/commercial-construction" },
      { name: "Building Construction", href: "/services/building-construction" },
      { name: "Renovation & Redevelopment", href: "/services/renovation" },
      { name: "Architecture & Planning", href: "/services/architecture" },
    ],
  },
  {
    name: "Projects",
    href: "/projects",
    dropdown: [
      { name: "Ongoing Projects", href: "/projects?filter=ongoing" },
      { name: "Completed Projects", href: "/projects?filter=completed" },
      { name: "Upcoming Projects", href: "/projects?filter=upcoming" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-[33px] lg:top-[33px] w-full z-50 transition-all duration-300 ease-in-out border-b",
          "bg-stone-50 text-charcoal-900 shadow-sm border-gray-100 py-3 lg:top-0"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex flex-col z-50">
            <span className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wider leading-none">
              Yasoda Builders
            </span>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] opacity-80 mt-1 uppercase">
              And Developers
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? isHome : pathname.startsWith(link.href);
              return (
                <div
                  key={link.name}
                  className="relative group h-full flex items-center py-2"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium tracking-wide flex items-center transition-colors duration-300",
                      isActive ? "text-forest-800" : "text-charcoal-900 hover:text-forest-800"
                    )}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className="ml-1" />}
                  </Link>
                  
                  {/* Subtle sage underline for active state */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-sage-500 rounded-t-sm" />
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-4 min-w-[260px]"
                        >
                          <div className="bg-white text-charcoal-900 shadow-xl border border-gray-100 p-4 rounded-sm flex flex-col space-y-2">
                            {link.dropdown.map((sublink) => (
                              <Link
                                key={sublink.name}
                                href={sublink.href}
                                className="text-sm py-2 px-3 hover:bg-stone-50 hover:text-forest-800 transition-colors duration-300 rounded-sm"
                              >
                                {sublink.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="group flex items-center bg-forest-800 text-white px-6 py-2.5 text-[13px] font-medium tracking-wide hover:bg-forest-900 transition-colors duration-300 rounded-[2px]"
            >
              ENQUIRE NOW
              <motion.span 
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={28} className="text-charcoal-900" />
            ) : (
              <Menu size={28} className="text-charcoal-900" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-24 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-center">
                    <Link
                      href={link.href}
                      className="text-2xl font-serif text-charcoal-900 font-medium"
                    >
                      {link.name}
                    </Link>
                  </div>
                  {link.dropdown && (
                    <div className="mt-4 flex flex-col space-y-3 pl-4 border-l-2 border-accent/20">
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          className="text-base text-gray-600"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-12">
              <Link
                href="/contact"
                className="w-full block text-center bg-forest-800 hover:bg-forest-900 transition-colors duration-300 text-white py-4 text-sm font-medium tracking-wide rounded-[2px]"
              >
                ENQUIRE NOW
              </Link>
            </div>
            <div className="mt-12 flex flex-col space-y-4">
              <a href="tel:+917780383825" className="text-charcoal-900 font-medium flex items-center hover:text-forest-800 transition-colors">
                <Phone size={18} className="mr-3 text-sage-500" />
                +91 7780383825
              </a>
              <a href="mailto:kkbabuyasoda@gmail.com" className="text-charcoal-900 font-medium flex items-center hover:text-forest-800 transition-colors">
                <Mail size={18} className="mr-3 text-sage-500" />
                kkbabuyasoda@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
