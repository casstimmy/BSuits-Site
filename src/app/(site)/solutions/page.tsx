import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Solutions - BizSuits | Business Solutions',
  description:
    'Explore the business areas BizSuits supports across retail, agriculture, operations, and document-heavy work.',
};

function getSolutionTitle(trackId: string, title: string) {
  return trackId === 'document-automation' ? 'System App & Desktop' : title;
}

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            Commercial Solution Domains
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-dark-900 mb-6 text-balance tracking-tight">
            Integrated Tracks for{' '}
            <span className="text-primary-600">Complex Operations.</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto leading-relaxed font-sans">
            Every business domain brings together the exact frontline interfaces, back-office controls, and automation pipelines your team needs to run daily work with total clarity.
          </p>
        </div>
      </section>

      <section className="-mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {deliveryTracks.map((track) => (
              <div key={track.id} className="border border-dark-200 bg-white p-6 text-center shadow-sm">
                <div className="w-11 h-11 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center mx-auto mb-4">
                  <track.icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-base font-bold font-display text-dark-900">{getSolutionTitle(track.id, track.title)}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-dark-500 mt-2">{getAppsForTrack(track.appSlugs).length} verified modules</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Solutions Architecture"
            title="Systems engineered to work as connected tracks"
            subtitle="Explore our core business domains and the verified applications delivering end-to-end operational visibility."
          />

          {deliveryTracks.map((solution, index) => {
            const apps = getAppsForTrack(solution.appSlugs);
            const solutionTitle = getSolutionTitle(solution.id, solution.title);

            return (
              <div
                key={solution.id}
                id={solution.id}
                className={`${index < deliveryTracks.length - 1 ? 'mb-10 md:mb-12' : ''}`}
              >
                <div className="border border-dark-200 bg-white p-7 sm:p-9 shadow-sm hover:border-dark-400 transition-all">
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start">
                    <div>
                      <div className="w-11 h-11 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center mb-5">
                        <solution.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary-700 mb-2">DOMAIN // {solution.id}</p>
                      <h2 className="text-2xl md:text-3xl font-bold font-display text-dark-900 mb-3 tracking-tight">
                        {solutionTitle}
                      </h2>
                      <p className="text-sm text-dark-600 leading-relaxed mb-6 font-sans">
                        {solution.summary}
                      </p>
                      <div className="space-y-2 mb-8">
                        {solution.capabilities.map((benefit) => (
                          <div key={benefit} className="flex items-start gap-2.5">
                            <span className="text-primary-600 font-bold text-xs">—</span>
                            <span className="text-xs text-dark-700 leading-relaxed font-sans">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="primary" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
                        Talk About This Area
                      </Button>
                    </div>

                    <div className="border border-dark-200 bg-dark-50/70 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-dark-200">
                        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-dark-700">
                          Active Component Systems
                        </p>
                        <span className="text-[10px] font-mono font-semibold uppercase bg-white border border-dark-200 px-2 py-0.5 text-dark-800">{apps.length} modules</span>
                      </div>
                      <div className="space-y-3">
                        {apps.map((app) => (
                          <div key={app.slug} className="border border-dark-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3 mb-1.5">
                              <p className="text-sm font-bold font-display text-dark-900">{app.name}</p>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-dark-500 border border-dark-100 px-2 py-0.5 bg-dark-50">{app.deliveryMode}</span>
                            </div>
                            <p className="text-xs text-dark-600 leading-relaxed font-sans">{app.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white border-y border-dark-800">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 tracking-tight">
            Need support across multiple business areas?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-8 font-sans">
            BizSuits can bring sales, operations, reporting, and oversight into one clearer way of working.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Talk About Your Priorities
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/features"
              className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white"
            >
              Explore Business Areas
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
