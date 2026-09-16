"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

const allGalleryImages = [
  { id: 1, title: "Modern Residential Architecture", category: "Exterior", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Luxury Living Room", category: "Interior", src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 3, title: "Minimalist Kitchen", category: "Interior", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", span: "col-span-1 md:row-span-2" },
  { id: 4, title: "Structural Engineering", category: "Construction", src: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 5, title: "Corporate Office Space", category: "Projects", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2 row-span-1" },
  { id: 6, title: "Commercial Complex", category: "Projects", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 7, title: "Steel Framework Phase", category: "Construction", src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 8, title: "Open Workspace Layout", category: "Interior", src: "https://images.unsplash.com/photo-1556156653-e5a7c69cc263?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 9, title: "Luxury Facade", category: "Exterior", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
];

const filters = ["All", "Projects", "Construction", "Exterior", "Interior"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = allGalleryImages.filter(img => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Projects") return img.category === "Exterior" || img.category === "Interior" || img.category === "Projects";
    return img.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  return (
    <>
      <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-forest-900 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Architecture Background" 
            className="w-full h-full object-cover"
          />
          {/* Softer overlay to make the photo pop while keeping text readable */}
          <div className="absolute inset-0 bg-charcoal-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-charcoal-900/40" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-accent text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
              Gallery
            </h1>
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              A visual showcase of our premium developments, construction excellence, and architectural mastery.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 md:py-32 bg-beige-100 min-h-screen">
        <div className="container-custom">
          
          {/* Clean Editorial Filters */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 md:mb-20">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`pb-2 text-xs md:text-sm tracking-[0.15em] uppercase transition-colors duration-300 border-b-2 ${
                  activeFilter === filter 
                    ? "text-accent border-accent font-semibold" 
                    : "text-gray-500 border-transparent hover:text-charcoal-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* True CSS Columns Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  key={img.id}
                  className="relative overflow-hidden group cursor-pointer rounded-[2px] bg-gray-200 break-inside-avoid inline-block w-full"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  />
                  
                  {/* Soft dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-7 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col pointer-events-none">
                    <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 shadow-sm">
                      {img.category}
                    </span>
                    <h3 className="text-white font-serif text-lg md:text-xl font-bold mb-3 leading-tight">
                      {img.title}
                    </h3>
                    <span className="text-white text-xs font-semibold tracking-wider flex items-center">
                      VIEW IMAGE <ArrowRight size={14} className="ml-2" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-24 text-gray-500 text-lg font-light">
              No images found for this category.
            </div>
          )}

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-charcoal-900/95 backdrop-blur-sm flex items-center justify-center"
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-charcoal-900/80 to-transparent">
              <div className="text-white/80 font-sans tracking-[0.2em] text-xs font-semibold uppercase">
                {currentIndex + 1} <span className="mx-2 opacity-50">/</span> {filteredImages.length}
              </div>
              <button
                onClick={closeLightbox}
                className="text-white/70 hover:text-white transition-colors p-2"
                aria-label="Close lightbox"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Areas */}
            <div 
              className="absolute left-0 top-0 w-1/4 h-full z-40 cursor-pointer flex items-center justify-start pl-4 md:pl-12 group"
              onClick={prevImage}
            >
              <div className="bg-charcoal-900/50 p-3 rounded-full text-white/50 group-hover:text-white group-hover:bg-accent transition-all duration-300">
                <ChevronLeft size={32} strokeWidth={1.5} />
              </div>
            </div>
            
            <div 
              className="absolute right-0 top-0 w-1/4 h-full z-40 cursor-pointer flex items-center justify-end pr-4 md:pr-12 group"
              onClick={nextImage}
            >
              <div className="bg-charcoal-900/50 p-3 rounded-full text-white/50 group-hover:text-white group-hover:bg-accent transition-all duration-300">
                <ChevronRight size={32} strokeWidth={1.5} />
              </div>
            </div>

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center p-4 md:p-12 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[currentIndex].src}
                alt={filteredImages[currentIndex].title}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-[2px]"
              />
              <div className="mt-6 text-center">
                <h4 className="text-white font-serif text-2xl font-bold">{filteredImages[currentIndex].title}</h4>
                <span className="text-accent text-xs tracking-[0.2em] uppercase font-semibold mt-2 block">{filteredImages[currentIndex].category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
