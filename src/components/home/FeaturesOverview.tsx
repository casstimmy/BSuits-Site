'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { motion, staggerContainer, staggerItem } from '@/components/ui/Motion';
import { deliveryTracks, getAppsForTrack } from '@/data/portfolio';

export default function FeaturesOverview() {
  return (
    <section className="section-padding bg-[#f8fafc] border-b border-dark-200">
      <div className="container-custom">
        <SectionHeading
          badge="Production Delivery Tracks"
          title="Integrated solutions engineered for operational scale"
          subtitle="BizSuits designs interconnected systems where frontline sales, central inventory, agricultural fields, and back-office accounting operate off one coordinated data structure."
        />

        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {deliveryTracks.map((track) => {
            const apps = getAppsForTrack(track.appSlugs);

            return (
              <motion.div key={track.id} variants={staggerItem}>
                <div className="border border-dark-200 bg-white p-8 hover:border-dark-400 transition-all duration-200 h-full flex flex-col justify-between shadow-sm hover:shadow group">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-12 h-12 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-colors">
                        <track.icon className="w-6 h-6 transition-colors" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 text-dark-600 border border-dark-200 px-2.5 py-1">
                        {apps.length} Integrated Systems
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-dark-900 mb-3 tracking-tight group-hover:text-primary-700 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-sm text-dark-600 leading-relaxed mb-6 font-sans">
                      {track.summary}
                    </p>

                    {/* Integrated Apps List */}
                    <div className="mb-6 pb-6 border-b border-dark-100">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-dark-400 font-semibold mb-3">
                        Included Production Apps
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {apps.map((app) => (
                          <Link
                            key={app.slug}
                            href={app.href}
                            className="font-mono text-xs text-dark-800 bg-dark-50 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors px-3 py-1.5 border border-dark-200"
                          >
                            {app.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Key Workflow Capabilities */}
                    <div className="space-y-2.5 mb-8">
                      {track.capabilities.map((capability) => (
                        <div key={capability} className="flex items-start gap-2.5 text-xs text-dark-600 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="pt-4 border-t border-dark-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-dark-500">
                      Architecture &amp; Demo
                    </span>
                    <Link
                      href={track.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 hover:text-dark-950 transition-colors group-hover:gap-2.5"
                    >
                      Inspect Solution Track <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12 md:mt-16">
          <Button variant="primary" size="lg" href="/features" icon={<ArrowRight className="w-4 h-4" />}>
            Explore All 7 Production Systems
          </Button>
        </div>
      </div>
    </section>
  );
}
