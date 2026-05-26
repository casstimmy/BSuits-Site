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
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.gradient} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <track.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{track.title}</h3>
                  <p className="text-dark-500 leading-relaxed mb-5">{track.summary}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {apps.map((app) => (
                      <span
                        key={app.slug}
                        className="rounded-full bg-dark-50 px-3 py-1 text-xs font-medium text-dark-500 border border-dark-100"
                      >
                        {app.name}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2.5 mb-5">
                    {track.capabilities.map((capability) => (
                      <p key={capability} className="text-sm text-dark-500 leading-relaxed">
                        {capability}
                      </p>
                    ))}
                  </div>

                  <a
                    href={track.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 group-hover:gap-2.5 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
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
