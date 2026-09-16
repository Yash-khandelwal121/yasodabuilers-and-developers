"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Link from "next/link";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", span: "col-span-1 row-span-1" },
];

export default function GalleryPreview() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-sm font-medium tracking-widest text-accent uppercase">
                Visual Journey
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal-900 font-bold">
              Project Gallery
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/gallery"
              className="text-accent font-medium hover:text-charcoal-900 transition-colors duration-300 uppercase tracking-widest text-sm"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${img.span}`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.src}
                alt="Project Gallery Image"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-colors duration-500 flex items-center justify-center">
                <Maximize2 size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
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
              {currentIndex + 1} / {galleryImages.length}
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
              className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center p-4"
            >
              <img
                src={galleryImages[currentIndex].src}
                alt="Gallery Preview"
                className="max-w-full max-h-[80vh] object-contain shadow-2xl"
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
    </section>
  );
}
