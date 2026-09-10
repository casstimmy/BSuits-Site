'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, staggerContainer, staggerItem } from '@/components/ui/Motion';
import { buildNoteCategories, buildNotes, featuredBuildNote } from '@/data/siteContent';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? buildNotes
    : buildNotes.filter((post) => post.category === activeCategory);

  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            Technical Architecture Notes
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-dark-900 mb-6 text-balance tracking-tight">
            Engineering Insights &amp;{' '}
            <span className="text-primary-600">System Patterns</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto leading-relaxed font-sans">
            Deep dives into how we solve multi-till POS synchronization, offline data replication, livestock tracking, and automated document extraction in high-throughput environments.
          </p>
        </div>
      </section>

      <section className="border-b border-dark-200 bg-white sticky top-16 md:top-20 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            {buildNoteCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 border text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'border-primary-600 bg-primary-600 text-white font-bold'
                    : 'border-dark-200 bg-white text-dark-600 hover:border-dark-400 hover:text-dark-950'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <Link
            href={featuredBuildNote.href}
            className="block group"
          >
            <div className="border border-dark-200 bg-white p-8 md:p-12 hover:border-dark-400 shadow-sm hover:shadow transition-all">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary-600 text-white px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-bold">
                    Featured Architectural Dispatch
                  </span>
                  <span className="border border-dark-200 bg-dark-50 text-dark-700 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                    {featuredBuildNote.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-dark-900 mb-4 group-hover:text-primary-700 transition-colors tracking-tight">
                  {featuredBuildNote.title}
                </h2>
                <p className="text-dark-600 text-base md:text-lg leading-relaxed mb-6 font-sans">
                  {featuredBuildNote.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-dark-500 border-t border-dark-100 pt-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {featuredBuildNote.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredBuildNote.readTime}
                  </div>
                  <span>{featuredBuildNote.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-white border-t border-dark-100">
        <div className="container-custom pt-12">
          <h3 className="text-xl font-bold font-display text-dark-900 mb-8 tracking-tight">Recent Technical Dispatches</h3>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.title} variants={staggerItem}>
                <Link href={post.href} className="group block h-full">
                  <article className="bg-white border border-dark-200 overflow-hidden shadow-sm hover:shadow hover:border-dark-400 transition-all duration-150 h-full flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/9] bg-dark-50 border-b border-dark-200 flex items-center justify-center">
                        <Tag className="w-8 h-8 text-dark-400" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 px-2 py-0.5 text-dark-700 border border-dark-200">
                            {post.category}
                          </span>
                          <span className="text-[10px] font-mono text-dark-400">{post.date}</span>
                        </div>
                        <h3 className="text-base font-bold font-display text-dark-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-dark-600 leading-relaxed mb-4 line-clamp-3 font-sans">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-dark-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-dark-400">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 group-hover:text-dark-950 transition-colors flex items-center gap-1">
                        Read Dispatch <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button variant="secondary" size="lg" href="/features" icon={<ArrowRight className="w-5 h-5" />}>
              Explore The Full Solution Library
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white border-y border-dark-800">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 tracking-tight">
            Want a walkthrough of our codebases?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            We can walk you through the live systems, review your operational integration points, and show you exactly how our code is structured.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule Technical Session
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/features"
              className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white"
            >
              Explore Live Demos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
