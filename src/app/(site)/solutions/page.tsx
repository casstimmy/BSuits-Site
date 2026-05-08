import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack, portfolioApps } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Solutions - BizSuits | Delivery Tracks',
  description:
    'Explore BizSuits delivery tracks across retail commerce, farm operations, project delivery, and document automation based on the current build portfolio.',
};

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Delivery Tracks
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Solutions grouped by{' '}
            <span className="text-primary-600">what has already been built</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto">
            The solution catalogue now follows the current build portfolio: retail commerce,
            farm operations, project delivery, and document automation.
          </p>
        </div>
      </section>

      <section className="-mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {deliveryTracks.map((track) => (
              <Card key={track.id} elevated className="text-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.gradient} text-white flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <track.icon className="w-7 h-7" />
                </div>
                <p className="text-lg font-bold text-dark-900">{track.title}</p>
                <p className="text-sm text-dark-400 mt-2">{getAppsForTrack(track.appSlugs).length} linked build references</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Solution Views"
            title="Each solution track is now tied to concrete apps"
            subtitle="This replaces the old broad industry list with delivery tracks that directly map to the current system portfolio."
          />

          {deliveryTracks.map((solution, index) => {
            const apps = getAppsForTrack(solution.appSlugs);

            return (
              <div
                key={solution.id}
                id={solution.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 lg:gap-16 items-stretch ${index < deliveryTracks.length - 1 ? 'mb-24 md:mb-32' : ''}`}
              >
                <div className="flex-1">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <solution.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-primary-600 mb-2">Built from current reference apps</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                    {solution.title}
                  </h2>
                  <p className="text-lg text-dark-500 leading-relaxed mb-6">
                    {solution.summary}
                  </p>
                  <div className="space-y-3 mb-8">
                    {solution.capabilities.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-dark-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="primary" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
                    Discuss This Track
                  </Button>
                </div>

                <div className="flex-1 w-full">
                  <Card elevated padding="lg" className="bg-gradient-to-br from-dark-50 to-white">
                    <div className="text-center mb-8">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <solution.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-dark-900 mb-1">Apps powering this track</h3>
                      <p className="text-sm text-dark-400">Directly mapped from the current reference builds</p>
                    </div>
                    <div className="space-y-4">
                      {apps.map((app) => (
                        <div key={app.slug} className="p-4 bg-white rounded-xl border border-dark-100">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <p className="text-sm font-semibold text-dark-900">{app.name}</p>
                            <span className="text-xs font-medium text-primary-600">{app.deliveryMode}</span>
                          </div>
                          <p className="text-sm text-dark-500 leading-relaxed mb-3">{app.summary}</p>
                          <div className="flex flex-wrap gap-2">
                            {app.signals.slice(0, 2).map((signal) => (
                              <span
                                key={signal}
                                className="rounded-full bg-dark-50 px-2.5 py-1 text-[11px] font-medium text-dark-500 border border-dark-100"
                              >
                                {signal}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-dark-50/50">
        <div className="container-custom">
          <SectionHeading
            badge="Portfolio Coverage"
            title="The solution map now spans the full current reference set"
            subtitle="Every active project you provided is represented in one of these tracks."
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {portfolioApps.map((app) => (
              <Card key={app.slug} className="h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-4 text-white shadow-lg`}>
                  <app.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-600 mb-2">{app.sourceProject}</p>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{app.name}</h3>
                <p className="text-sm text-dark-500">{app.category}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a blended solution across multiple tracks?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            The portfolio already shows how we combine operations, commerce, and back-office tooling into one delivery plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Talk Through Your Workflow
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/features"
              className="!text-white hover:!bg-white/10"
            >
              Explore Feature Depth
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
