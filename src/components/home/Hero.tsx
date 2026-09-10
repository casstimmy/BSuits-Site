'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, slideInLeft, slideInRight } from '@/components/ui/Motion';

const systemPreviews = [
  {
    slug: 'inventory-admin',
    label: 'Back Office',
    name: 'Inventory Admin',
    category: 'Retail & Multi-Location',
    image: '/images/Inventory System preview.png',
    metrics: { stat1: '₦14.2M/mo Volume', stat2: 'Real-time Stock Sync', stat3: 'Multi-Store' },
    stack: 'Web + Windows Desktop + Mobile',
  },
  {
    slug: 'sales-point',
    label: 'Frontline POS',
    name: 'Sales Point POS',
    category: 'Till & Service Counter',
    image: '/images/Point of sales preview 1.png',
    metrics: { stat1: '<0.4s Fast Checkout', stat2: 'Offline Resilient', stat3: 'Thermal Receipt' },
    stack: 'Desktop Terminal + Web + Tablet',
  },
  {
    slug: 'farm-health',
    label: 'Agro Operations',
    name: 'Farm Health Manager',
    category: 'Agriculture & Livestock',
    image: '/images/Farm Managment System preview.png',
    metrics: { stat1: '248 Animal Records', stat2: 'Mortality & Feed Logs', stat3: 'Field Mobile' },
    stack: 'Web App + Mobile Field App',
  },
  {
    slug: 'farm-web',
    label: 'Agri-Storefront',
    name: 'Farm Web Place',
    category: 'Direct E-Commerce',
    image: '/images/Farm ecom System preview.png',
    metrics: { stat1: 'Live Livestock Catalog', stat2: 'Direct Customer Cart', stat3: 'Instant Sync' },
    stack: 'Web Storefront + WhatsApp Pay',
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const active = systemPreviews[activeTab];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#f8fafc] border-b border-dark-200">
      <div aria-hidden className="h-16 md:h-20" />

      <div className="container-custom relative z-10 flex box-border min-h-[calc(100svh-4rem)] items-center py-8 md:min-h-[calc(100svh-5rem)] md:py-12 lg:py-14">
        <div className="grid w-full items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:gap-14 xl:gap-16">
          {/* Left Column: Authoritative Editorial Copy */}
          <motion.div className="max-w-[36rem] space-y-6" variants={slideInLeft} initial="hidden" animate="visible">
            <div className="inline-flex items-center gap-2 border border-primary-200 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary-600" />
              Bespoke Software &amp; Systems Architecture
            </div>

            <div className="space-y-4">
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-dark-900 sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]">
                Systems Tailored{' '}
                <span className="text-primary-600">to Your Business.</span>
              </h1>
              <p className="text-sm font-semibold uppercase tracking-widest text-dark-500 font-mono">
                Retail · Farm Management · Facility Operations · Document Automation
              </p>
            </div>

            <p className="text-pretty text-base leading-relaxed text-dark-600 md:text-lg">
              We architect, build, and deploy mission-critical custom systems built precisely around how your business works — unifying frontline sales, warehouse stock, farm operations, and executive intelligence into one resilient environment.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="h-4 w-4" />}>
                Schedule Consultation
              </Button>
              <Button variant="secondary" size="lg" href="/features">
                Explore Live Systems
              </Button>
            </div>

            {/* Value Proof Bar */}
            <div className="pt-6 border-t border-dark-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-base font-bold font-mono text-dark-900">100% Custom</p>
                <p className="text-xs text-dark-500 mt-0.5">Tailored to exact workflows</p>
              </div>
              <div className="border-l border-dark-200 pl-4">
                <p className="text-base font-bold font-mono text-dark-900">Web + Desktop</p>
                <p className="text-xs text-dark-500 mt-0.5">Multi-platform coverage</p>
              </div>
              <div className="border-l border-dark-200 pl-4">
                <p className="text-base font-bold font-mono text-dark-900">Offline-First</p>
                <p className="text-xs text-dark-500 mt-0.5">Zero frontline downtime</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Executive Systems Console */}
          <motion.div
            className="relative w-full lg:justify-self-end"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="border border-dark-300 bg-white shadow-xl">
              {/* Console Header Bar */}
              <div className="border-b border-dark-200 bg-dark-950 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 bg-rose-500" />
                    <span className="h-2.5 w-2.5 bg-amber-500" />
                    <span className="h-2.5 w-2.5 bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono font-semibold tracking-wider text-white/90">
                    BIZSUITS CONSOLE // {active.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-800">
                  <span className="h-1.5 w-1.5 bg-emerald-400" />
                  LIVE OPERATIONAL
                </div>
              </div>

              {/* System Switcher Tabs */}
              <div className="grid grid-cols-4 border-b border-dark-200 bg-dark-50">
                {systemPreviews.map((sys, idx) => (
                  <button
                    key={sys.slug}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`py-2.5 px-2 text-center text-xs font-semibold tracking-tight transition-all border-r border-dark-200 last:border-r-0 ${
                      activeTab === idx
                        ? 'bg-white text-primary-700 font-bold border-b-2 border-b-primary-600 shadow-sm'
                        : 'text-dark-500 hover:text-dark-900 hover:bg-dark-100/60'
                    }`}
                  >
                    <span className="block truncate">{sys.label}</span>
                  </button>
                ))}
              </div>

              {/* Console Preview Display */}
              <div className="p-4 sm:p-5 bg-white">
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-dark-200 bg-[#f1f5f9] flex items-center justify-center">
                  <Image
                    key={active.slug}
                    src={active.image}
                    alt={`${active.name} operational preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-top"
                    priority={activeTab === 0}
                  />
                </div>

                {/* Live System Performance Telemetry */}
                <div className="mt-4 pt-3 border-t border-dark-200 grid grid-cols-3 gap-2">
                  <div className="bg-dark-50 p-2.5 border border-dark-200">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-dark-500">Benchmark</p>
                    <p className="text-xs font-bold text-dark-900 mt-0.5 font-mono truncate">{active.metrics.stat1}</p>
                  </div>
                  <div className="bg-dark-50 p-2.5 border border-dark-200">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-dark-500">Architecture</p>
                    <p className="text-xs font-bold text-dark-900 mt-0.5 font-mono truncate">{active.metrics.stat2}</p>
                  </div>
                  <div className="bg-dark-50 p-2.5 border border-dark-200">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-dark-500">Deployment</p>
                    <p className="text-xs font-bold text-primary-700 mt-0.5 font-mono truncate">{active.metrics.stat3}</p>
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
