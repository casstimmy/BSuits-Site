import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { deliveryTracks } from '@/data/portfolio';
import { deliverySteps, engagementPackages, pricingFaqs } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'Pricing - BizSuits | Client Engagements',
  description:
    'Explore BizSuits engagement tiers built around proven systems, live demos, and delivery tracks that can be tailored to each client.',
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            Commercial Engagement Tiers
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-dark-900 mb-6 text-balance tracking-tight">
            Transparent Pricing.{' '}
            <span className="text-primary-600">Built for Scale.</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto mb-8 leading-relaxed font-sans">
            Our engagement packages are anchored to production-tested systems, giving you predictable project timelines, full code ownership, and transparent implementation scope.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {deliveryTracks.map((track) => (
              <span
                key={track.id}
                className="border border-dark-200 bg-white px-3 py-1 text-xs font-mono uppercase text-dark-600 shadow-sm"
              >
                {track.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 -mt-6">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {engagementPackages.map((plan) => {
              const recommendedTracks = deliveryTracks.filter((track) => plan.recommendedTrackIds.includes(track.id));

              return (
                <div
                  key={plan.name}
                  className={`relative p-8 transition-all duration-200 border flex flex-col justify-between ${
                    plan.highlighted
                      ? 'border-primary-600 bg-[#0F172A] text-white shadow-xl'
                      : 'border-dark-200 bg-white text-dark-900 shadow-sm hover:border-dark-400'
                  }`}
                >
                  <div>
                    {plan.badge && (
                      <div
                        className={`inline-block px-3 py-0.5 border text-[10px] font-mono uppercase tracking-widest font-bold mb-4 ${
                          plan.highlighted ? 'border-primary-400 bg-primary-600 text-white' : 'border-dark-200 bg-dark-50 text-dark-700'
                        }`}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className={`text-xl font-bold font-display mb-2 tracking-tight ${plan.highlighted ? 'text-white' : 'text-dark-900'}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-xs leading-relaxed font-sans ${plan.highlighted ? 'text-slate-300' : 'text-dark-600'}`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6 border-y border-dark-200/30 py-4">
                      <p className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${plan.highlighted ? 'text-slate-400' : 'text-dark-400'}`}>
                        STARTING INVESTMENT
                      </p>
                      <div className="flex items-end gap-2 mt-2">
                        <span className={`text-3xl md:text-4xl font-mono font-bold ${plan.highlighted ? 'text-white' : 'text-dark-900'}`}>
                          NGN {plan.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {recommendedTracks.map((track) => (
                        <span
                          key={track.id}
                          className={`px-2 py-0.5 text-[10px] font-mono uppercase border ${
                            plan.highlighted
                              ? 'bg-white/10 text-slate-200 border-white/20'
                              : 'bg-dark-50 text-dark-600 border-dark-200'
                          }`}
                        >
                          {track.title}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant={plan.highlighted ? 'primary' : plan.ctaVariant}
                      className="w-full mb-8 justify-center"
                      href="/contact"
                    >
                      {plan.cta}
                    </Button>

                    <div className="space-y-3 border-t border-dark-200/20 pt-6">
                      {plan.features.map((feature) => (
                        <div key={feature.text} className="flex items-start gap-2.5">
                          {feature.included ? (
                            <span className={`text-xs font-bold ${plan.highlighted ? 'text-accent-400' : 'text-primary-600'}`}>✓</span>
                          ) : (
                            <span className={`text-xs ${plan.highlighted ? 'text-white/20' : 'text-dark-300'}`}>✕</span>
                          )}
                          <span
                            className={`text-xs leading-relaxed font-sans ${
                              feature.included
                                ? plan.highlighted
                                ? 'text-slate-200'
                                : 'text-dark-700'
                              : plan.highlighted
                              ? 'text-slate-500'
                              : 'text-dark-400'
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-t border-dark-200">
        <div className="container-custom">
          <SectionHeading
            badge="Delivery Sequence"
            title="Every engagement follows the same operating rhythm"
            subtitle="The price tier changes the breadth of delivery, but the rollout logic stays grounded in the same system-led process."
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

      <section className="section-padding bg-[#f8fafc] border-t border-dark-200">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            badge="FAQ"
            title="Common pricing questions"
            subtitle="These answers are based on how the current BizSuits solution set is positioned and delivered."
          />

          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-dark-200 p-6 sm:p-7 shadow-sm">
                <h3 className="text-base font-bold font-display text-dark-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-dark-600 leading-relaxed font-sans">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white border-y border-dark-800">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 tracking-tight">
            Need help scoping your system requirements?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8 font-sans">
            We will review your workflows, assess your hardware and offline requirements, and provide a comprehensive architecture scope.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Scoping Session
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/features"
              className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white"
            >
              Explore Live Demos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
