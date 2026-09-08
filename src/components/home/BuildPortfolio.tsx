'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, staggerContainer, staggerItem } from '@/components/ui/Motion';
import { portfolioApps } from '@/data/portfolio';

export default function BuildPortfolio() {
  return (
    <section className="section-padding bg-dark-50/50">
      <div className="container-custom">
        <SectionHeading
          badge="Business Examples"
          title="Seven live examples show how BizSuits supports daily work"
          subtitle="Each card highlights a practical example you can review and adapt to the way your business operates."
        />

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {portfolioApps.map((app) => (
            <motion.div key={app.slug} variants={staggerItem}>
              <Card elevated className="h-full group">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 border border-dark-900 bg-dark-950 text-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(15,23,42,0.9)] group-hover:bg-primary-600 transition-colors">
                    <app.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 px-2.5 py-1 text-dark-700 border border-dark-200">
                    {app.deliveryMode}
                  </span>
                </div>

                <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-primary-700 mb-2">
                  {app.category}
                </p>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{app.name}</h3>
                <p className="text-dark-600 leading-relaxed mb-5 text-sm">{app.summary}</p>

                <div className="space-y-2 mb-5">
                  {app.modules.slice(0, 3).map((module) => (
                    <p key={module} className="text-xs text-dark-500 leading-relaxed flex items-start gap-2">
                      <span className="text-dark-900 font-bold">—</span>
                      <span>{module}</span>
                    </p>
                  ))}
                </div>

                <div className="border border-dark-200 bg-dark-50/70 p-4 mb-5">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-dark-500 mb-1.5">Operational Role</p>
                  <p className="text-xs font-medium text-dark-800 leading-relaxed">{app.status}</p>
                </div>

                <Button variant="secondary" href={app.href} className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore This Example
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}