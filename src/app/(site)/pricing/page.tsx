import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
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
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-50" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3 py-1 border border-dark-300 bg-white text-xs font-mono uppercase tracking-[0.18em] text-dark-800 mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.06)]">
            ENGAGEMENT TIERS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance tracking-tight">
            Engagements shaped around{' '}
            <span className="gradient-text">proven BizSuits systems</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            These pricing tiers are tied to real solution tracks and demo-ready systems, so
            scope discussions can start from what clients can already see and evaluate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {deliveryTracks.map((track) => (
              <span
                key={track.id}
                className="border border-dark-300 bg-white px-3 py-1 text-xs font-mono uppercase text-dark-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.04)]"
              >
                {track.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 -mt-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {engagementPackages.map((plan) => {
              const recommendedTracks = deliveryTracks.filter((track) => plan.recommendedTrackIds.includes(track.id));

              return (
                <div
                  key={plan.name}
                  className={`relative p-8 transition-all duration-200 border-2 ${
                    plan.highlighted
                      ? 'border-dark-950 bg-dark-950 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)]'
                      : 'border-dark-200 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,0.06)] hover:border-dark-900'
                  }`}
                >
                  {plan.badge && (
                    <div
                      className={`absolute -top-3.5 left-6 px-3 py-0.5 border text-[10px] font-mono uppercase tracking-widest font-bold ${
                        plan.highlighted ? 'border-primary-400 bg-primary-600 text-white' : 'border-dark-900 bg-dark-900 text-white'
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-2 tracking-tight ${plan.highlighted ? 'text-white' : 'text-dark-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${plan.highlighted ? 'text-white/70' : 'text-dark-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 border-y border-dark-200/40 py-4">
                    <p className={`text-[10px] font-mono font-semibold uppercase tracking-[0.18em] ${plan.highlighted ? 'text-white/50' : 'text-dark-400'}`}>
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
                            ? 'bg-white/10 text-white/90 border-white/20'
                            : 'bg-dark-50 text-dark-600 border-dark-200'
                        }`}
                      >
                        {track.title}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant={plan.highlighted ? 'accent' : plan.ctaVariant}
                    className="w-full mb-8 justify-center"
                    href="/contact"
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3 border-t border-dark-200/30 pt-6">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-start gap-2.5">
                        {feature.included ? (
                          <span className={`text-xs font-bold ${plan.highlighted ? 'text-primary-300' : 'text-dark-950'}`}>✓</span>
                        ) : (
                          <span className={`text-xs ${plan.highlighted ? 'text-white/20' : 'text-dark-300'}`}>✕</span>
                        )}
                        <span
                          className={`text-xs leading-relaxed ${
                            feature.included
                              ? plan.highlighted
                                ? 'text-white/90'
                                : 'text-dark-700'
                              : plan.highlighted
                              ? 'text-white/30'
                              : 'text-dark-400'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
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
              <Card key={step.id} elevated className="h-full">
                <div className="w-11 h-11 border border-dark-900 bg-dark-950 text-white flex items-center justify-center font-mono font-bold text-xs mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)]">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{step.title}</h3>
                <p className="text-xs text-dark-600 leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-50/50 border-t border-dark-200">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            badge="FAQ"
            title="Common pricing questions"
            subtitle="These answers are based on how the current BizSuits solution set is positioned and delivered."
          />

          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-dark-200 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.04)]">
                <h3 className="text-base font-bold text-dark-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-dark-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Need help choosing the right delivery path?
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-8">
            We can match your workflow to the nearest existing system and tell you where adaptation ends and new scope begins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule Working Session
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/features"
              className="!text-white border-white/20 hover:!bg-white/10"
            >
              Explore Live Demos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
