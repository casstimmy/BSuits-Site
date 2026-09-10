import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { portfolioStats } from '@/data/portfolio';
import { deliveryPrinciples, deliverySteps } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'About - BizSuits | Business Approach',
  description:
    'Learn how BizSuits helps businesses improve sales, operations, agriculture, and reporting through practical working examples.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
              Our Engineering Philosophy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-dark-900 mb-6 text-balance tracking-tight">
              Systems Engineered Around{' '}
              <span className="text-primary-600">How You Operate.</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-600 leading-relaxed max-w-2xl mx-auto font-sans">
              BizSuits was founded on a simple conviction: business software shouldn&apos;t force your team into rigid templates. We build high-performance systems that conform to your exact operating rhythm.
            </p>
          </div>
        </div>
      </section>

      <section className="-mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {portfolioStats.map((stat) => (
              <div key={stat.label} className="border border-dark-200 bg-white p-6 text-center shadow-sm">
                <p className="text-2xl md:text-3xl font-bold font-display text-dark-900">{stat.value}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-dark-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Operating Principles"
            title="How delivery decisions are made"
            subtitle="These principles guide how BizSuits approaches system architecture, client collaboration, and long-term stability."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {deliveryPrinciples.map((value) => (
              <div key={value.title} className="border border-dark-200 bg-white p-7 sm:p-8 hover:border-dark-400 transition-all shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center mb-5">
                    <value.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-dark-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-dark-600 leading-relaxed font-sans">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f8fafc] border-t border-dark-200">
        <div className="container-custom">
          <SectionHeading
            badge="Delivery Rhythm"
            title="How an engagement unfolds"
            subtitle="Every project progresses with total transparency, clear deliverables, and hands-on staff training."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {deliverySteps.map((step) => (
              <div key={step.id} className="border border-dark-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 border border-primary-200 px-2.5 py-1 mb-4 inline-block">
                    PHASE {step.id}
                  </span>
                  <h3 className="text-lg font-bold font-display text-dark-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-dark-600 leading-relaxed font-sans">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white border-y border-dark-800">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 tracking-tight">
            Want to map BizSuits to the way your business runs?
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-sans">
            We can review your priorities and recommend the most practical place to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule A Consultation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/pricing"
              className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white"
            >
              Review Engagement Tiers
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
