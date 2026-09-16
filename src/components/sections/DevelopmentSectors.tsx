"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const sectors = [
  {
    id: "01",
    title: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
    video: "/videos/animation.mp4",
    poster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    overlayLabel: "RESIDENTIAL",
    overlayHeading: "Building Homes for Better Living.",
    overlayDesc: "Thoughtfully planned residential spaces focused on comfort, quality, functionality and long-term value.",
  },
  {
    id: "02",
    title: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    video: "/videos/animation.mp4",
    poster: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    overlayLabel: "COMMERCIAL",
    overlayHeading: "Spaces Designed for Business Growth.",
    overlayDesc: "Functional and professionally planned commercial environments built for performance, efficiency and long-term business value.",
  },
  {
    id: "03",
    title: "Renovation & Redevelopment",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
    video: "/videos/animation.mp4",
    poster: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    overlayLabel: "RENOVATION & REDEVELOPMENT",
    overlayHeading: "Transforming Existing Spaces.",
    overlayDesc: "Giving existing structures a new life through thoughtful renovation, redevelopment and modern upgrades.",
  },
  {
    id: "04",
    title: "Architecture & Planning",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600",
    video: "/videos/animation.mp4",

    poster: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    overlayLabel: "ARCHITECTURE & PLANNING",
    overlayHeading: "Planning Every Detail with Purpose.",
    overlayDesc: "Thoughtful architectural planning that balances space, functionality, aesthetics and practical project requirements.",
  },
];

export default function DevelopmentSectors() {
  const [activeSectorId, setActiveSectorId] = useState<string>("01");
  const activeSector = sectors.find(s => s.id === activeSectorId) || sectors[0];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-custom max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-sage-500" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-sage-500 uppercase">
                Our Work In Motion
              </span>
              <div className="h-[1px] w-8 bg-sage-500" />
            </div>
            
            <h2 className="text-[32px] md:text-[44px] font-serif text-charcoal-900 font-bold mb-6 leading-tight">
              See How We Bring Spaces to Life
            </h2>
            
            <p className="text-[15px] text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Explore our approach across residential, commercial, renovation and architectural planning.
            </p>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row justify-between items-center w-full gap-8 xl:gap-10">
          
          {/* Left Column */}
          <div className="w-[20%] xl:w-[22%] flex flex-col gap-10">
            {[sectors[0], sectors[1]].map((sector) => (
              <SectorCard 
                key={sector.id} 
                sector={sector} 
                isActive={activeSectorId === sector.id}
                onClick={() => setActiveSectorId(sector.id)}
              />
            ))}
          </div>

          {/* Center Column (Video) */}
          <div className="w-[60%] xl:w-[56%] flex justify-center">
            <VideoPlayer activeSector={activeSector} />
          </div>

          {/* Right Column */}
          <div className="w-[20%] xl:w-[22%] flex flex-col gap-10">
            {[sectors[2], sectors[3]].map((sector) => (
              <SectorCard 
                key={sector.id} 
                sector={sector} 
                isActive={activeSectorId === sector.id}
                onClick={() => setActiveSectorId(sector.id)}
              />
            ))}
          </div>
          
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-10">
          {/* Center Video */}
          <div className="w-full">
            <VideoPlayer activeSector={activeSector} />
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <SectorCard 
                key={sector.id} 
                sector={sector} 
                isActive={activeSectorId === sector.id}
                onClick={() => setActiveSectorId(sector.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function VideoPlayer({ activeSector }: { activeSector: typeof sectors[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsTransitioning(true);

    const loadAndPlay = async () => {
      if (videoRef.current) {
        setVideoError(false);
        setVideoLoaded(false);
        
        setTimeout(() => {
          if (!isMounted) return;
          if (videoRef.current) {
            videoRef.current.src = activeSector.video;
            videoRef.current.load();
            
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  if (isMounted) setIsTransitioning(false);
                })
                .catch(e => {
                  // Suppress console errors for unsupported local videos
                  // The UI will gracefully fall back to the poster image
                  if (isMounted) setIsTransitioning(false);
                });
            } else {
              if (isMounted) setIsTransitioning(false);
            }
          }
        }, 300);
      }
    };

    loadAndPlay();

    return () => {
      isMounted = false;
    };
  }, [activeSector.video]);

  return (
    <div className="relative w-full aspect-[16/10] max-w-[820px] bg-stone-100 overflow-hidden border border-gray-100">
      
      <img 
        src={activeSector.poster} 
        alt={activeSector.title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
        style={{ opacity: videoError || (!videoLoaded && !isTransitioning) ? 1 : 0 }}
      />

      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300"
        style={{ opacity: videoLoaded && !isTransitioning && !videoError ? 1 : 0 }}
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        onError={(e) => {
          setVideoError(true);
        }}
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent sm:bg-gradient-to-r sm:from-charcoal-900/90 sm:via-charcoal-900/30 sm:to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-20 p-6 sm:p-10 flex flex-col justify-end sm:justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-md"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-sage-500 mb-3">
              {activeSector.overlayLabel}
            </span>
            <h3 className="text-[24px] sm:text-[32px] lg:text-[36px] font-serif text-white font-bold mb-4 leading-[1.15]">
              {activeSector.overlayHeading}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-stone-100/90 font-light leading-relaxed">
              {activeSector.overlayDesc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectorCard({ 
  sector, 
  isActive, 
  onClick
}: { 
  sector: typeof sectors[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col w-full text-left bg-transparent transition-all duration-300 border p-3
        ${isActive ? 'border-forest-800 bg-stone-50' : 'border-transparent hover:border-gray-200'}
      `}
    >
      <div className="relative overflow-hidden w-full aspect-[4/3] mb-4 bg-gray-100">
        <img 
          src={sector.image} 
          alt={sector.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      
      <div className="flex items-start justify-between w-full">
        <div>
          <span className={`text-[11px] font-medium tracking-widest mb-1 block transition-colors duration-300
            ${isActive ? 'text-sage-500' : 'text-gray-400'}
          `}>
            {sector.id}
          </span>
          <h3 className={`text-[15px] sm:text-[16px] font-serif font-bold transition-colors duration-300
            ${isActive ? 'text-forest-800' : 'text-charcoal-900 group-hover:text-forest-800'}
          `}>
            {sector.title}
          </h3>
        </div>
        <ArrowUpRight 
          size={16} 
          className={`transition-all duration-300 mt-1
            ${isActive ? 'text-forest-800 translate-x-0.5 -translate-y-0.5' : 'text-gray-300 group-hover:text-forest-800'}
          `} 
        />
      </div>
    </button>
  );
}
