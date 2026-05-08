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
          badge="Solution Library"
          title="Seven active systems show what BizSuits can deliver"
          subtitle="Each card below points to a real client-ready system clients can review, demo, and scope with the BizSuits team."
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
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-lg`}>
                    <app.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="rounded-full bg-dark-50 px-3 py-1 text-xs font-semibold text-dark-500 border border-dark-100">
                    {app.deliveryMode}
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 mb-2">
                  {app.sourceProject}
                </p>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{app.name}</h3>
                <p className="text-dark-500 leading-relaxed mb-5">{app.summary}</p>

                <div className="space-y-2 mb-5">
                  {app.modules.slice(0, 3).map((module) => (
                    <p key={module} className="text-sm text-dark-500 leading-relaxed">
                      {module}
                    </p>
                  ))}
                </div>

                <div className="rounded-2xl bg-dark-50 border border-dark-100 p-4 mb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-400 mb-2">Why it matters</p>
                  <p className="text-sm font-medium text-dark-700 mb-2">{app.status}</p>
                  <p className="text-sm text-dark-500">{app.stack}</p>
                </div>

                <Button variant="secondary" href={app.href} className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                  View Solution Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}