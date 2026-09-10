'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { motion, staggerContainer, staggerItem } from '@/components/ui/Motion';
import { portfolioApps } from '@/data/portfolio';

export default function BuildPortfolio() {
  return (
    <section className="section-padding bg-white border-b border-dark-200">
      <div className="container-custom">
        <SectionHeading
          badge="Live System Architectures"
          title="Seven production systems ready for client deployment"
          subtitle="Every BizSuits solution starts from proven operational codebases. Review the active interfaces, operational roles, and multi-platform coverage below."
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {portfolioApps.map((app) => (
            <motion.div key={app.slug} variants={staggerItem}>
              <div className="border border-dark-200 bg-white hover:border-dark-400 transition-all duration-200 h-full flex flex-col justify-between shadow-sm hover:shadow group">
                <div>
                  {/* Visual Preview Slot */}
                  {app.previewImage && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-dark-200 bg-[#f8fafc] p-3 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={app.previewImage}
                          alt={`${app.name} preview`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain object-center"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-colors">
                          <app.icon className="w-5 h-5 transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-display text-dark-900 tracking-tight group-hover:text-primary-700 transition-colors">
                            {app.name}
                          </h3>
                          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-700 font-semibold">
                            {app.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Target Badge */}
                    <div className="mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 text-dark-700 border border-dark-200 px-2.5 py-1 block w-fit">
                        {app.deliveryMode}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-dark-600 leading-relaxed mb-6 font-sans">
                      {app.summary}
                    </p>

                    {/* Core Modules List */}
                    <div className="space-y-2 mb-6">
                      {app.modules.slice(0, 3).map((module) => (
                        <div key={module} className="flex items-start gap-2 text-xs text-dark-600 font-sans">
                          <span className="text-primary-600 font-bold">—</span>
                          <span className="leading-relaxed">{module}</span>
                        </div>
                      ))}
                    </div>

                    {/* Operational Note */}
                    <div className="border border-dark-100 bg-dark-50/70 p-3.5 mb-6">
                      <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-dark-500 mb-1">
                        Operational Status
                      </p>
                      <p className="text-xs font-medium text-dark-800 leading-relaxed">
                        {app.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-7 pt-0">
                  <Button variant="secondary" href={app.href} className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                    View System Specs
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}