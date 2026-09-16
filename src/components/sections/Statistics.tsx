"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const statsData = [
  {
    id: "01",
    target: 5,
    suffix: "+",
    title: "Projects",
    desc: "Successfully Completed",
  },
  {
    id: "02",
    target: 600,
    suffix: "+",
    title: "Happy Families",
    desc: "Proud Owners of Properties",
  },
  {
    id: "03",
    target: 75,
    suffix: "%",
    title: "Referral Clients",
    desc: "Trusted by our community",
  }
];

function AnimatedCounter({ from = 0, to, suffix, inView }: { from?: number, to: number, suffix: string, inView: boolean }) {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return <span>{count}{suffix}</span>;
}

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-[60px] bg-white">
      <div className="max-w-[1150px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="flex-1 w-full md:w-auto py-8 md:py-0 px-4 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="text-[44px] md:text-[56px] font-serif font-bold text-charcoal-900 leading-none mb-3">
                <AnimatedCounter to={stat.target} suffix={stat.suffix} inView={isInView} />
              </div>
              
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-[1px] w-6 bg-sage-500 hidden md:block" />
                <h3 className="text-lg md:text-xl font-bold text-charcoal-900 uppercase tracking-wide">
                  {stat.title}
                </h3>
              </div>
              
              {stat.desc && (
                <p className="text-sm md:text-[15px] text-gray-500 font-light md:pl-9">
                  {stat.desc}
                </p>
              )}
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
