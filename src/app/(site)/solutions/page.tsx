import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
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
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-50" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3 py-1 border border-dark-300 bg-white text-xs font-mono uppercase tracking-[0.18em] text-dark-800 mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.06)]">
            SOLUTION DOMAINS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance tracking-tight">
            Explore where BizSuits can strengthen{' '}
            <span className="gradient-text">day-to-day operations</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto leading-relaxed">
            Each area brings together the visibility, coordination, and support teams need to work better every day.
          </p>
        </div>
      </section>

      <section className="-mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {deliveryTracks.map((track) => (
              <Card key={track.id} elevated className="text-center">
                <div className="w-12 h-12 border border-dark-900 bg-dark-950 text-white flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.9)]">
                  <track.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-base font-bold text-dark-900">{getSolutionTitle(track.id, track.title)}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-dark-500 mt-2">{getAppsForTrack(track.appSlugs).length} verified modules</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Business Reference"
            title="One practical retail view can anchor the conversation"
            subtitle="Use one familiar business example to understand how BizSuits supports daily work across sales, operations, and reporting."
          />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-stretch mb-20 md:mb-24">
            <Card elevated padding="lg" className="overflow-hidden bg-dark-50/50">
              <div className="relative overflow-hidden border border-dark-300 bg-white">
                <Image
                  src="/images/Inventory System preview.png"
                  alt="Retail and warehouse commerce reference view"
                  width={1400}
                  height={900}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </Card>

            <Card elevated padding="lg" className="bg-dark-50/70 border border-dark-200 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-primary-700 font-semibold mb-2">REFERENCE BENCHMARK</p>
                <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-4 tracking-tight">
                  Retail and warehouse activity offers a clear starting point
                </h2>
                <p className="text-sm text-dark-600 leading-relaxed mb-6">
                  This view shows how teams can manage stock, oversight, and day-to-day work without losing operational visibility.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-dark-900 font-bold text-xs">—</span>
                    <span className="text-xs text-dark-700">Compare roles, responsibilities, and handoff points across desks.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-dark-900 font-bold text-xs">—</span>
                    <span className="text-xs text-dark-700">Focus on business fit instead of disconnected screen-by-screen detail.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-dark-900 font-bold text-xs">—</span>
                    <span className="text-xs text-dark-700">Apply the same structural clarity across farm, operations, and document-heavy work.</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {deliveryTracks.map((solution, index) => {
            const apps = getAppsForTrack(solution.appSlugs);
            const solutionTitle = getSolutionTitle(solution.id, solution.title);

            return (
              <div
                key={solution.id}
                id={solution.id}
                className={`${index < deliveryTracks.length - 1 ? 'mb-10 md:mb-12' : ''}`}
              >
                <Card elevated padding="lg" className="bg-white">
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start">
                    <div>
                      <div className="w-12 h-12 border border-dark-900 bg-dark-950 text-white flex items-center justify-center mb-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.9)]">
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary-700 mb-2">DOMAIN // {solution.id}</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-3 tracking-tight">
                        {solutionTitle}
                      </h2>
                      <p className="text-sm text-dark-600 leading-relaxed mb-6">
                        {solution.summary}
                      </p>
                      <div className="space-y-2 mb-8">
                        {solution.capabilities.map((benefit) => (
                          <div key={benefit} className="flex items-start gap-2.5">
                            <span className="text-dark-900 font-bold text-xs">—</span>
                            <span className="text-xs text-dark-700 leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="primary" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
                        Talk About This Area
                      </Button>
                    </div>

                    <div className="border border-dark-200 bg-dark-50/70 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-dark-200">
                        <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-dark-600">
                          Active Component Systems
                        </p>
                        <span className="text-[10px] font-mono font-semibold uppercase bg-white border border-dark-200 px-2 py-0.5 text-dark-800">{apps.length} modules</span>
                      </div>
                      <div className="space-y-3">
                        {apps.map((app) => (
                          <div key={app.slug} className="border border-dark-200 bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.04)]">
                            <div className="flex items-center justify-between gap-3 mb-1.5">
                              <p className="text-sm font-bold text-dark-900">{app.name}</p>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-dark-500 border border-dark-100 px-2 py-0.5 bg-dark-50">{app.deliveryMode}</span>
                            </div>
                            <p className="text-xs text-dark-600 leading-relaxed">{app.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Need support across multiple business areas?
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto mb-8">
            BizSuits can bring sales, operations, reporting, and oversight into one clearer way of working.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Talk About Your Priorities
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/features"
              className="!text-white border-white/20 hover:!bg-white/10"
            >
              Explore Business Areas
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
