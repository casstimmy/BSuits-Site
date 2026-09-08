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
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-50" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3 py-1 border border-dark-300 bg-white text-xs font-mono uppercase tracking-[0.18em] text-dark-800 mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.06)]">
            TECHNICAL DISPATCHES
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance tracking-tight">
            Insights from the{' '}
            <span className="gradient-text">BizSuits solution library</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto leading-relaxed">
            Use these notes to understand how BizSuits combines commerce, operations, agriculture,
            and automation patterns into client-ready systems.
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
                className={`px-3 py-1.5 border text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'border-dark-950 bg-dark-950 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] font-bold'
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
            <div className="border-2 border-dark-950 bg-white p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] transition-all">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="border border-dark-950 bg-dark-950 text-white px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-bold">
                    Featured
                  </span>
                  <span className="border border-dark-200 bg-dark-50 text-dark-700 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                    {featuredBuildNote.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors tracking-tight">
                  {featuredBuildNote.title}
                </h2>
                <p className="text-dark-600 text-base md:text-lg leading-relaxed mb-6">
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
          <h3 className="text-xl font-bold text-dark-900 mb-8 tracking-tight">Latest Insights</h3>

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
                  <article className="bg-white border border-dark-200 overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,0.06)] hover:border-dark-900 transition-all duration-150 h-full flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/9] bg-dark-100 border-b border-dark-200 flex items-center justify-center">
                        <Tag className="w-8 h-8 text-dark-400" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 px-2 py-0.5 text-dark-700 border border-dark-200">
                            {post.category}
                          </span>
                          <span className="text-[10px] font-mono text-dark-400">{post.date}</span>
                        </div>
                        <h3 className="text-base font-bold text-dark-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-dark-600 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-dark-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-dark-400">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-dark-950 group-hover:text-primary-700 transition-colors flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
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

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Want a walkthrough instead of a note?
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            We can show you the closest live demo, explain the rollout path, and turn these notes into a concrete delivery conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule Working Session
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/features"
              className="!text-white border-white/20 hover:!bg-white/10"
            >
              Explore Live Demos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
