"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { blogs } from "@/data/placeholder-data";

export default function BlogPreview() {
  return (
    <section className="py-24 lg:py-32 bg-stone-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-sage-500" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-sage-500 uppercase">
                News & Articles
              </span>
            </div>
            <h2 className="text-[32px] md:text-[44px] font-serif text-charcoal-900 font-bold leading-tight">
              Latest Insights
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/blogs"
              className="group inline-flex items-center text-[13px] tracking-wide text-charcoal-900 font-medium hover:text-forest-800 transition-colors duration-300"
            >
              VIEW ALL BLOGS
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 text-forest-800" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <article className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 h-full flex flex-col">
                <Link href={blog.slug} className="block relative h-[240px] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-900">
                    {blog.category}
                  </div>
                </Link>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-[13px] text-gray-500 mb-4">
                    <Calendar size={14} className="mr-2 text-sage-500" />
                    {blog.date}
                  </div>
                  <h3 className="text-[20px] font-serif text-charcoal-900 font-bold mb-6 group-hover:text-forest-800 transition-colors duration-300 line-clamp-2 leading-[1.3]">
                    <Link href={blog.slug}>{blog.title}</Link>
                  </h3>
                  
                  {/* Small excerpt as requested (ensure blog.excerpt is used or a static description fallback) */}
                  <p className="text-[14px] text-gray-600 mb-6 line-clamp-3">
                    {blog.excerpt || "Explore practical insights on construction, property development, renovation, and architectural planning."}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={blog.slug}
                      className="inline-flex items-center text-[13px] font-medium text-charcoal-900 group-hover:text-forest-800 transition-colors duration-300 uppercase tracking-wider"
                    >
                      Read Article
                      <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
