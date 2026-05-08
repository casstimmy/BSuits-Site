import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deliveryTracks, portfolioApps, portfolioStats } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Features - BizSuits | Current Build Breakdown',
  description:
    'Review the seven current build references behind BizSuits across retail commerce, agriculture, operations, and document automation.',
};

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Current Build Breakdown
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Feature depth sourced from{' '}
            <span className="gradient-text">the apps already built</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto mb-8">
            This page now reflects the real modules, workflows, and delivery patterns present
            in the seven current applications you asked me to review.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule discovery call
            </Button>
            <Button variant="secondary" size="lg" href="/admin">
              Open Build Control Center
            </Button>
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
            badge="Application Level"
            title="Each referenced build now has a place in the feature story"
            subtitle="Every section below is mapped to one of the current projects rather than a generic module placeholder."
          />

          {portfolioApps.map((app, index) => (
            <div
              key={app.slug}
              id={app.slug}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 lg:gap-16 items-stretch ${index < portfolioApps.length - 1 ? 'mb-24 md:mb-32' : ''}`}
            >
              <div className="flex-1">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <app.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 mb-2">
                  {app.sourceProject}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                  {app.name}
                </h2>
                <p className="text-lg text-dark-500 leading-relaxed mb-8">
                  {app.summary}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {app.modules.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-dark-600">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button variant="primary" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
                    Discuss This Build
                  </Button>
                  <Button variant="secondary" href="/admin">
                    View Control Center
                  </Button>
                </div>
              </div>

              <div className="flex-1 w-full">
                <Card elevated padding="lg" className="bg-gradient-to-br from-dark-50 to-white h-full">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <app.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900 mb-1">{app.category}</h3>
                    <p className="text-sm text-dark-400">{app.deliveryMode}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-xl border border-dark-100">
                      <p className="text-sm font-semibold text-dark-400 uppercase tracking-[0.16em]">Status</p>
                      <p className="text-base font-bold text-accent-600 mt-2">Active</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-dark-100">
                      <p className="text-sm font-semibold text-dark-400 uppercase tracking-[0.16em]">Delivery</p>
                      <p className="text-base font-bold text-primary-600 mt-2">{app.deliveryMode}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-dark-100 p-5 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-400 mb-3">Build signal</p>
                    <p className="text-sm font-medium text-dark-700 leading-relaxed mb-3">{app.status}</p>
                    <p className="text-sm text-dark-500 leading-relaxed">{app.stack}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {app.signals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full bg-dark-50 px-3 py-1 text-xs font-medium text-dark-500 border border-dark-100"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-dark-50/50">
        <div className="container-custom">
          <SectionHeading
            badge="Delivery Tracks"
            title="Cross-cutting patterns already proven across the portfolio"
            subtitle="These tracks summarize how the current builds cluster into product-ready solution families."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {deliveryTracks.map((track) => (
              <Card key={track.id} padding="md" className="group h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.gradient} flex items-center justify-center mb-4 text-white shadow-lg`}>
                  <track.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-dark-900 mb-2">{track.title}</h3>
                <p className="text-sm text-dark-500 mb-4">{track.summary}</p>
                <div className="space-y-2">
                  {track.capabilities.map((capability) => (
                    <p key={capability} className="text-sm text-dark-500 leading-relaxed">
                      {capability}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need one of these patterns tailored to your operation?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            We can now talk through concrete build references instead of vague modules.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Book A Working Session
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/solutions"
              className="!text-white hover:!bg-white/10"
            >
              Explore Solution Tracks
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
