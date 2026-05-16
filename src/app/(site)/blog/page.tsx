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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Solution Notes
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Insights from the{' '}
            <span className="gradient-text">BizSuits solution library</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto">
            Use these notes to understand how BizSuits combines commerce, operations, agriculture,
            and automation patterns into client-ready systems.
          </p>
        </div>
      </section>

      <section className="border-b border-dark-100 bg-white sticky top-16 md:top-20 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {buildNoteCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-500 hover:bg-dark-50 hover:text-dark-800'
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
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 border border-primary-100 hover:border-primary-200 transition-all">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-dark-600 text-xs font-medium">
                    {featuredBuildNote.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {featuredBuildNote.title}
                </h2>
                <p className="text-dark-500 text-lg leading-relaxed mb-6">
                  {featuredBuildNote.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-dark-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {featuredBuildNote.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredBuildNote.readTime}
                  </div>
                  <span>{featuredBuildNote.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-white">
        <div className="container-custom">
          <h3 className="text-xl font-bold text-dark-900 mb-8">Latest Insights</h3>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.title} variants={staggerItem}>
                <Link href={post.href} className="group block">
                  <article className="bg-white rounded-2xl border border-dark-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-[16/9] bg-gradient-to-br from-dark-50 to-dark-100 flex items-center justify-center">
                      <Tag className="w-8 h-8 text-dark-300" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-dark-400">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-dark-500 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-dark-400">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-dark-400">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want a walkthrough instead of a note?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            We can show you the closest live demo, explain the rollout path, and turn these notes into a concrete delivery conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule Working Session
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/features#retail-commerce"
              className="!text-white hover:!bg-white/10"
            >
              Explore Live Demos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
