import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack, portfolioStats } from '@/data/portfolio';
import { deliveryPrinciples, deliverySteps } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'About - BizSuits | Business Approach',
  description:
    'Learn how BizSuits helps businesses improve sales, operations, agriculture, and reporting through practical working examples.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
              How We Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
              How BizSuits supports{' '}
              <span className="gradient-text">day-to-day business operations</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-500 leading-relaxed">
              BizSuits helps businesses improve sales, operations, agriculture, and document-heavy work with practical tools, clearer visibility, and stronger day-to-day coordination.
            </p>
          </div>
        </div>
      </section>

      <section className="-mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {portfolioStats.map((stat) => (
              <Card key={stat.label} elevated className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-dark-900">{stat.value}</p>
                <p className="text-sm text-dark-400 mt-2">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Operating Principles"
            title="How delivery decisions are made"
            subtitle="These principles show how BizSuits approaches planning, implementation, and ongoing improvement."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {deliveryPrinciples.map((value) => (
              <Card key={value.title} elevated className="h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{value.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-50/50">
        <div className="container-custom">
          <SectionHeading
            badge="Delivery Rhythm"
            title="How working with BizSuits typically unfolds"
            subtitle="Each engagement moves from understanding the business to launch and improvement."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {deliverySteps.map((step) => (
              <Card key={step.id} elevated className="h-full">
                <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center font-bold mb-4">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{step.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to map BizSuits to the way your business runs?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            We can review your priorities and recommend the most practical place to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule A Consultation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/pricing"
              className="!text-white hover:!bg-white/10"
            >
              Review Engagement Tiers
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
