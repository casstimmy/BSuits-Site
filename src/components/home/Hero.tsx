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

const heroTrackIds = ['retail-commerce', 'farm-operations', 'ops-delivery'] as const;

const heroTrackLabels: Record<(typeof heroTrackIds)[number], string> = {
  'retail-commerce': 'Retail & warehouse',
  'farm-operations': 'Farm operations',
  'ops-delivery': 'Projects, ops & desktop',
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const active = systemPreviews[activeTab];

  return (
    <section className="relative min-h-screen overflow-hidden gradient-bg-light">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 flex min-h-screen items-center py-10 pt-24 pb-10 md:pt-28 md:pb-12 lg:py-12">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1.03fr)_minmax(20rem,0.82fr)] lg:gap-12 xl:grid-cols-[minmax(0,1.06fr)_minmax(22rem,0.8fr)]">
          <motion.div className="max-w-[36rem] space-y-5 md:space-y-6" variants={slideInLeft} initial="hidden" animate="visible">
            <h1 className="text-3xl font-bold leading-[1.04] tracking-[-0.03em] text-dark-900 sm:text-4xl lg:text-[2.9rem] xl:text-[3.2rem]">
              BizSuits delivers{' '}
              <span className="gradient-text">proven business systems</span>{' '}
              across commerce, operations, agriculture, and automation.
            </h1>

            <p className="max-w-[32rem] text-base leading-[1.65] text-dark-500 md:text-lg">
              Start from live BizSuits systems, then tailor the workflow to the client without
              guessing what the final product should be.
            </p>

            <div className="grid max-w-[31rem] grid-cols-1 gap-2.5 sm:grid-cols-3">
              {heroTrackIds.map((trackId) => {
                const track = deliveryTracks.find((item) => item.id === trackId);

                if (!track) {
                  return null;
                }

                return (
                  <div
                    key={track.id}
                    className="flex items-center gap-2 rounded-2xl border border-dark-100 bg-white/80 px-3 py-2 text-xs font-medium text-dark-600 backdrop-blur-sm md:text-sm"
                  >
                    <track.icon className="h-3.5 w-3.5 text-primary-500 md:h-4 md:w-4" />
                    {heroTrackLabels[trackId]}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button variant="primary" href="/demo" icon={<ArrowRight className="h-4 w-4" />}>
                See Live Demos
              </Button>
              <Button variant="secondary" href="/solutions">
                Explore Solutions
              </Button>
            </div>

            <div className="flex items-center gap-1.5 pt-1 text-xs text-dark-400 md:text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent-500" />
              Interactive demos across web and desktop delivery.
            </div>
          </motion.div>

          <motion.div
            className="relative w-full lg:max-w-[33rem] lg:justify-self-end xl:max-w-[34rem]"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="relative flex min-h-[24rem] max-h-[66vh] flex-col overflow-hidden rounded-3xl border border-dark-100 bg-white shadow-2xl lg:max-h-[min(64vh,38rem)]">
              <div className="border-b border-dark-100 bg-dark-900 px-4 py-3 text-white md:px-4.5 md:py-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.22em] text-white/45">Current build preview</p>
                    <h2 className="text-sm font-semibold md:text-base">Live system reference</h2>
                    <p className="mt-1 max-w-md text-[11px] leading-relaxed text-white/60 md:text-xs">
                      A compact look at the real interfaces behind the BizSuits stack.
                    </p>
                  </div>
                  <div className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80">
                    {activeTab + 1}/{systemPreviews.length}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 border-b border-dark-100 bg-dark-50/60 p-2.5 md:px-3 md:py-3">
                {systemPreviews.map((sys, idx) => (
                  <button
                    key={sys.slug}
                    onClick={() => setActiveTab(idx)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap transition-all md:text-[11px] ${
                      activeTab === idx
                        ? 'border-primary-200 bg-white text-primary-600 shadow-sm'
                        : 'border-transparent bg-transparent text-dark-400 hover:border-dark-200 hover:bg-white hover:text-dark-700'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full shrink-0 ${sys.accent}`} />
                    {sys.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-1 flex-col p-3.5 md:p-4">
                <div className="relative min-h-[15rem] flex-1 overflow-hidden rounded-2xl border border-dark-100 bg-dark-50 max-h-[42vh] lg:max-h-none">
                  <Image
                    key={active.slug}
                    src={active.image}
                    alt={`${active.name} preview`}
                    width={900}
                    height={560}
                    className="h-full w-full object-contain object-top"
                    priority={activeTab === 0}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-600">
                      {active.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-dark-900">{active.name}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {systemPreviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeTab === idx ? 'w-5 bg-primary-500' : 'w-2 bg-dark-200 hover:bg-dark-400'
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
