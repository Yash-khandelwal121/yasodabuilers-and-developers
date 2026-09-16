"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const allGalleryImages = [
  { id: 1, category: "Exterior", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2 md:row-span-2" },
  { id: 2, category: "Interior", src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 3, category: "Exterior", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 4, category: "Construction", src: "https://images.unsplash.com/photo-1541888081622-15cb382740fa?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 5, category: "Interior", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 6, category: "Exterior", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2 md:row-span-1" },
  { id: 7, category: "Construction", src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 8, category: "Interior", src: "https://images.unsplash.com/photo-1556156653-e5a7c69cc263?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
];

const filters = ["All", "Projects", "Construction", "Exterior", "Interior"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = allGalleryImages.filter(img => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Projects") return img.category === "Exterior" || img.category === "Interior";
    return img.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <>
      <div className="pt-32 pb-20 bg-charcoal-900 text-white relative">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-beige-100/80 max-w-2xl mx-auto"
          >
            A visual showcase of our premium developments and construction excellence.
          </motion.p>
        </div>
      </div>

      <section className="py-24 bg-white min-h-screen">
        <div className="container-custom">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 border rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-accent border-accent text-white" 
                    : "bg-transparent border-gray-300 text-charcoal-900 hover:border-accent hover:text-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  key={img.id}
                  className={`relative overflow-hidden group cursor-pointer ${activeFilter === "All" ? img.span : "col-span-1 row-span-1"}`}
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img.src}
                    alt={`${img.category} Gallery Image`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-colors duration-500 flex items-center justify-center">
                    <Maximize2 size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-20 text-gray-500">
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
            className="fixed inset-0 z-[100] bg-charcoal-900/95 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            >
              <X size={32} />
            </button>
            
            <div className="absolute top-6 left-6 text-white/70 font-sans tracking-widest text-sm z-50">
              {currentIndex + 1} / {filteredImages.length}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-12 text-white/70 hover:text-white p-4 z-50"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center p-4"
            >
              <img
                src={filteredImages[currentIndex].src}
                alt="Gallery Preview"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </motion.div>

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-12 text-white/70 hover:text-white p-4 z-50"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
