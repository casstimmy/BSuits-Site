'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { motion, staggerContainer, staggerItem } from '@/components/ui/Motion';
import { deliveryTracks, getAppsForTrack } from '@/data/portfolio';

export default function FeaturesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          badge="Business Areas"
          title="Where BizSuits can improve day-to-day operations"
          subtitle="Explore the main parts of the business BizSuits can help strengthen, from selling and stock control to farm and field operations."
        />

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {deliveryTracks.map((track) => {
            const apps = getAppsForTrack(track.appSlugs);

            return (
              <motion.div key={track.id} variants={staggerItem}>
                <Card elevated className="group h-full">
                  <div className="w-12 h-12 border border-dark-900 bg-dark-950 text-white flex items-center justify-center mb-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.9)] group-hover:bg-primary-600 transition-colors">
                    <track.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{track.title}</h3>
                  <p className="text-dark-600 leading-relaxed mb-5 text-sm">{track.summary}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {apps.map((app) => (
                      <span
                        key={app.slug}
                        className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 px-2.5 py-1 text-dark-700 border border-dark-200"
                      >
                        {app.name}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    {track.capabilities.map((capability) => (
                      <p key={capability} className="text-xs text-dark-500 leading-relaxed flex items-start gap-2">
                        <span className="text-dark-900 font-bold">—</span>
                        <span>{capability}</span>
                      </p>
                    ))}
                  </div>

                  <a
                    href={track.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-dark-950 hover:text-primary-700 group-hover:gap-2.5 transition-all"
                  >
                    Track Specifications <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Button variant="primary" size="lg" href="/features" icon={<ArrowRight className="w-5 h-5" />}>
            See Everything BizSuits Covers
          </Button>
        </div>
      </div>
    </section>
  );
}
