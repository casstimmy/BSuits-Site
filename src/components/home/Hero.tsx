'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, slideInLeft, slideInRight } from '@/components/ui/Motion';
import { deliveryTracks } from '@/data/portfolio';

const systemPreviews = [
  {
    slug: 'inventory-admin',
    label: 'Back Office',
    name: 'Inventory Admin',
    image: '/images/Inventory System preview.png',
    accent: 'bg-cyan-500',
  },
  {
    slug: 'sales-point',
    label: 'POS',
    name: 'Sales Point POS',
    image: '/images/Point of sales preview 1.png',
    accent: 'bg-amber-500',
  },
  {
    slug: 'farm-health',
    label: 'Farm Ops',
    name: 'Farm Health Manager',
    image: '/images/Farm Managment System preview.png',
    accent: 'bg-emerald-500',
  },
  {
    slug: 'farm-web',
    label: 'Agri-Commerce',
    name: 'Farm Web Place',
    image: '/images/Farm ecom System preview.svg',
    accent: 'bg-lime-500',
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const active = systemPreviews[activeTab];

  return (
    <section className="relative overflow-hidden gradient-bg-light min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={slideInLeft} initial="hidden" animate="visible">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-5">
              Client-ready business systems
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-900 leading-[1.1] mb-6">
              BizSuits delivers{' '}
              <span className="gradient-text">proven business systems</span>{' '}
              across commerce, operations, agriculture, and automation.
            </h1>

            <p className="text-lg md:text-xl text-dark-500 leading-relaxed mb-8 max-w-2xl">
              Clients can start from live BizSuits systems, explore interactive demos, and then
              tailor the workflow to their own business without guessing what the final product
              will look like.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {deliveryTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-dark-600 border border-dark-100"
                >
                  <track.icon className="w-4 h-4 text-primary-500" />
                  {track.title}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="primary" size="lg" href="/demo" icon={<ArrowRight className="w-5 h-5" />}>
                See Live Demos
              </Button>
              <Button variant="secondary" size="lg" href="/solutions">
                Explore Solutions
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-dark-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-500" />
                Interactive demos clients can try
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-500" />
                Web and desktop delivery coverage
              </div>
            </div>
          </motion.div>

          <motion.div className="relative" variants={slideInRight} initial="hidden" animate="visible">
            <div className="relative bg-white rounded-3xl shadow-2xl border border-dark-100 overflow-hidden">
              {/* Panel header */}
              <div className="px-5 py-4 border-b border-dark-100 bg-dark-900 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/50 mb-1">System previews</p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">Live System Builds</h2>
                    <p className="text-sm text-white/60">Real screens from running BizSuits applications.</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 shrink-0">
                    {systemPreviews.length} systems
                  </div>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex border-b border-dark-100 bg-dark-50/60 overflow-x-auto">
                {systemPreviews.map((sys, idx) => (
                  <button
                    key={sys.slug}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
                      activeTab === idx
                        ? 'border-primary-500 text-primary-600 bg-white'
                        : 'border-transparent text-dark-400 hover:text-dark-700 hover:bg-dark-100/50'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${sys.accent}`} />
                    {sys.label}
                  </button>
                ))}
              </div>

              {/* Preview image */}
              <div className="p-5 md:p-6">
                <div className="relative w-full rounded-2xl overflow-hidden bg-dark-50 border border-dark-100">
                  <Image
                    key={active.slug}
                    src={active.image}
                    alt={`${active.name} preview`}
                    width={900}
                    height={560}
                    className="w-full h-auto object-contain"
                    priority={activeTab === 0}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-dark-900">{active.name}</p>
                    <p className="text-xs text-dark-400 mt-0.5">{active.label} system</p>
                  </div>
                  <div className="flex gap-1.5">
                    {systemPreviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeTab === idx ? 'bg-primary-500 w-5' : 'bg-dark-200 hover:bg-dark-400 w-2'
                        }`}
                        aria-label={`View ${systemPreviews[idx].name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
