import React from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { deliveryTracks } from '@/data/portfolio';
import { deliverySteps, engagementPackages, pricingFaqs } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'Pricing - BizSuits | Business Plans',
  description:
    'Explore BizSuits business plans designed around your priorities, implementation support, and growth goals.',
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Plans shaped around{' '}
            <span className="gradient-text">how your business operates</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto mb-8">
            Choose the level of support that fits your priorities, team size, and pace of change.
          </p>
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
                  className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlighted
                      ? 'bg-dark-900 text-white shadow-2xl shadow-dark-900/20 ring-2 ring-primary-500 scale-[1.02]'
                      : 'bg-white border border-dark-100 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {plan.badge && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                        plan.highlighted ? 'bg-primary-500 text-white' : 'bg-dark-100 text-dark-600'
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-dark-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-dark-400'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${plan.highlighted ? 'text-white/40' : 'text-dark-400'}`}>
                      Starting at
                    </p>
                    <div className="flex items-end gap-2 mt-2">
                      <span className={`text-4xl md:text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-dark-900'}`}>
                        NGN {plan.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {recommendedTracks.map((track) => (
                      <span
                        key={track.id}
                        className={`rounded-full px-3 py-1 text-xs font-medium border ${
                          plan.highlighted
                            ? 'bg-white/5 text-white/80 border-white/10'
                            : 'bg-dark-50 text-dark-500 border-dark-100'
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

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-center gap-3">
                        {feature.included ? (
                          <CheckCircle2
                            className={`w-5 h-5 shrink-0 ${plan.highlighted ? 'text-accent-400' : 'text-accent-500'}`}
                          />
                        ) : (
                          <X className={`w-5 h-5 shrink-0 ${plan.highlighted ? 'text-white/20' : 'text-dark-200'}`} />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? plan.highlighted
                                ? 'text-white/80'
                                : 'text-dark-600'
                              : plan.highlighted
                              ? 'text-white/30'
                              : 'text-dark-300'
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

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Implementation Journey"
            title="Every plan follows a clear path to launch"
            subtitle="The level of support changes, but the process stays practical, structured, and focused on business priorities."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {deliverySteps.map((step) => (
              <Card key={step.id} elevated className="h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold mb-4">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{step.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-50/50">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            badge="FAQ"
            title="Common pricing questions"
            subtitle="Answers to common questions about pricing, timelines, and implementation."
          />

          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl border border-dark-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-dark-900 mb-2">{faq.question}</h3>
                <p className="text-dark-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need help choosing the right plan?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            We can help you choose the starting point that best fits your goals, team, and pace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Book A Consultation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/demo"
              className="!text-white hover:!bg-white/10"
            >
              See Live Examples
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
