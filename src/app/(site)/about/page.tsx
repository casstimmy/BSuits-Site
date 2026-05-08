import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack, portfolioStats } from '@/data/portfolio';
import { deliveryPrinciples, deliverySteps } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'About - BizSuits | Delivery Model',
  description:
    'Learn how BizSuits delivers software from active client systems across commerce, operations, agriculture, and automation.',
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
              Delivery Model
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
              BizSuits now explains itself through{' '}
              <span className="gradient-text">real client systems</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-500 leading-relaxed">
              The current system story is no longer about selling a vague all-in-one promise.
              It is about adapting proven BizSuits systems across retail commerce, farm operations,
              project delivery, and document automation.
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
            subtitle="These principles describe the real pattern behind the BizSuits solution model and future client work."
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
            badge="Solution Families"
            title="The current solution set already clusters into four tracks"
            subtitle="Each track below groups the active BizSuits systems now used across the public site."
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {deliveryTracks.map((track) => {
              const apps = getAppsForTrack(track.appSlugs);

              return (
                <Card key={track.id} elevated className="h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.gradient} flex items-center justify-center text-white shadow-lg`}>
                      <track.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 mb-2">{track.title}</h3>
                      <p className="text-dark-500 leading-relaxed">{track.summary}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    {track.capabilities.map((capability) => (
                      <p key={capability} className="text-sm text-dark-500 leading-relaxed">
                        {capability}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {apps.map((app) => (
                      <span
                        key={app.slug}
                        className="rounded-full bg-dark-50 px-3 py-1 text-xs font-medium text-dark-500 border border-dark-100"
                      >
                        {app.name}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Delivery Rhythm"
            title="What a BizSuits engagement now looks like"
            subtitle="The public site and the solution model both follow the same system-led sequence."
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
            Want to map your workflow to the current solution set?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            We can review your process against the closest active system and plan the smallest practical rollout path.
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
