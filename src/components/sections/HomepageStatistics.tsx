"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building2, Users, ShieldCheck } from "lucide-react";

const statsData = [
  {
    id: "01",
    target: 5,
    suffix: "+",
    title: "Projects",
    desc: "Successfully Completed",
    icon: Building2,
  },
  {
    id: "02",
    target: 600,
    suffix: "+",
    title: "Happy Families",
    desc: "Proud Owners of Properties",
    icon: Users,
  },
  {
    id: "03",
    target: 75,
    suffix: "%",
    title: "Referral Clients",
    desc: "Through Trust & Satisfaction",
    icon: ShieldCheck,
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

export default function HomepageStatistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="w-full bg-forest-800 text-white py-16 lg:py-0 lg:h-[220px] flex items-center border-b border-forest-900">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          
          <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-4 lg:pr-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  className="flex items-start space-x-6 group"
                >
                  <div className="text-accent mt-1">
                    <Icon size={38} strokeWidth={1} />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[36px] md:text-[42px] font-sans font-bold text-white leading-none mb-1 tracking-tight">
                      <AnimatedCounter to={stat.target} suffix={stat.suffix} inView={isInView} />
                    </div>
                    <h3 className="text-[15px] font-bold text-white tracking-wide">
                      {stat.title}
                    </h3>
                    <p className="text-[13px] text-white/60 font-light mt-1">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full lg:w-[30%] lg:pl-12 pt-8 lg:pt-0 text-center lg:text-left flex flex-col justify-center"
          >
            <h2 className="text-[26px] md:text-[28px] lg:text-[30px] font-serif italic text-white/90 leading-tight">
              &ldquo;More than buildings,<br />
              <span className="text-white">we build relationships.</span>&rdquo;
            </h2>
            <div className="h-[1px] w-12 bg-accent mt-4 mx-auto lg:mx-0" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
