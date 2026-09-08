'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, slideInLeft, slideInRight } from '@/components/ui/Motion';

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
    <section className="relative min-h-[100svh] overflow-hidden gradient-bg-light">
      <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-60" />

      <div aria-hidden className="h-16 md:h-20" />

      <div className="container-custom relative z-10 flex box-border min-h-[calc(100svh-4rem)] items-center py-6 md:min-h-[calc(100svh-5rem)] md:py-8 lg:py-10">
        <div className="grid w-full items-center gap-7 md:gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(20rem,0.82fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] xl:gap-12">
          <motion.div className="max-w-[34rem] space-y-6" variants={slideInLeft} initial="hidden" animate="visible">
            <div className="inline-flex items-center gap-2 border border-primary-200 bg-white px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-primary-700 shadow-[2px_2px_0px_0px_rgba(37,99,235,0.15)]">
              <span className="h-2 w-2 bg-primary-600" />
              Custom Systems // Built for Success
            </div>

            <div className="space-y-3">
              <h1 className="max-w-[32rem] text-balance font-display text-3xl font-bold leading-[1.12] tracking-tight text-dark-900 sm:text-4xl lg:text-[2.85rem] xl:text-[3.1rem]">
                Custom Systems.{' '}
                <span className="text-primary-600">Built for Success.</span>
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-dark-500 font-mono">
                Powering Sales, Operations, Agriculture &amp; Business Automation
              </p>
            </div>

            <p className="max-w-[29rem] text-pretty text-base leading-relaxed text-dark-600 md:text-[1.05rem]">
              We build powerful, scalable and secure systems tailored to your business needs — giving your team total clarity, control, and real-time operational visibility.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button variant="primary" href="/contact" icon={<ArrowRight className="h-4 w-4" />}>
                Get Started
              </Button>
              <Button variant="secondary" href="/features">
                Explore Systems
              </Button>
            </div>

            <div className="flex items-center gap-2 border-t border-dark-200 pt-4 text-xs font-medium text-dark-600 md:text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary-600" />
              Tailored software, multi-location integration, and ongoing support.
            </div>
          </motion.div>

          <motion.div
            className="relative w-full lg:max-w-[33rem] lg:justify-self-end xl:max-w-[34rem]"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="relative flex min-h-[22.5rem] max-h-[60svh] flex-col overflow-hidden border-2 border-dark-950 bg-white shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] lg:max-h-[min(58svh,36rem)]">
              <div className="border-b-2 border-dark-950 bg-dark-950 px-4 py-3 text-white md:px-4.5 md:py-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.22em] text-white/60 font-mono">SYSTEM WORKSPACE // 0{activeTab + 1}</p>
                    <h2 className="text-sm font-bold md:text-base tracking-tight">Live Operations Console</h2>
                    <p className="mt-0.5 max-w-md text-[11px] leading-relaxed text-white/70">
                      Real operational workflows running across frontline desks and management.
                    </p>
                  </div>
                  <div className="shrink-0 border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/90">
                    0{activeTab + 1} / 0{systemPreviews.length}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 border-b border-dark-200 bg-dark-50 p-2.5 md:px-3 md:py-3">
                {systemPreviews.map((sys, idx) => (
                  <button
                    key={sys.slug}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all md:text-[11px] ${
                      activeTab === idx
                        ? 'border-dark-950 bg-white text-dark-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] font-bold'
                        : 'border-dark-200 bg-transparent text-dark-500 hover:border-dark-400 hover:bg-white hover:text-dark-900'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 ${sys.accent}`} />
                    {sys.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-1 flex-col p-3.5 md:p-4 bg-white">
                <div className="relative min-h-[15rem] flex-1 overflow-hidden border border-dark-200 bg-dark-50 max-h-[42vh] lg:max-h-none">
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
                <div className="mt-3 flex items-center justify-between gap-4 border-t border-dark-100 pt-2.5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-primary-700">
                      SYS // {active.label}
                    </p>
                    <p className="truncate text-sm font-bold text-dark-900">{active.name}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {systemPreviews.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`h-1.5 transition-all ${
                          activeTab === idx ? 'w-6 bg-dark-950' : 'w-2 bg-dark-200 hover:bg-dark-500'
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
