'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/components/ui/Motion';
import { deliveryTracks, portfolioApps, portfolioStats } from '@/data/portfolio';

export default function Hero() {
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
              <div className="px-5 py-4 border-b border-dark-100 bg-dark-900 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/50 mb-1">Solution map</p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">What BizSuits Can Launch</h2>
                    <p className="text-sm text-white/60">From POS terminals to admin dashboards and desktop tools, these systems show clients what BizSuits can tailor and deploy.</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    {portfolioApps.length} active systems
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6 space-y-5">
                <motion.div
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {portfolioApps.map((app) => (
                    <motion.div
                      key={app.slug}
                      variants={staggerItem}
                      className="rounded-2xl border border-dark-100 bg-dark-50/70 p-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                          <app.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-dark-900">{app.name}</p>
                          <p className="text-xs text-primary-600 font-semibold uppercase tracking-[0.16em] mt-1">
                            {app.sourceProject}
                          </p>
                          <p className="text-sm text-dark-500 mt-2 leading-relaxed">{app.category}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-dark-500 border border-dark-100 shrink-0">
                        {app.deliveryMode}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  {portfolioStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white border border-dark-100 px-4 py-3">
                      <p className="text-xl md:text-2xl font-bold text-dark-900">{stat.value}</p>
                      <p className="text-xs text-dark-400 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
