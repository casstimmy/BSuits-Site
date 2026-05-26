import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Solutions - BizSuits | Business Solutions',
  description:
    'Explore BizSuits business solutions across retail, agriculture, operations, and automation, each built from working systems and adaptable delivery tracks.',
};

function getSolutionTitle(trackId: string, title: string) {
  return trackId === 'document-automation' ? 'System App & Desktop' : title;
}

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
            Business Solutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            See how BizSuits solutions are structured for{' '}
            <span className="text-primary-600">real business operations</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto">
            Each track combines proven systems, working modules, and delivery logic that can be adapted to the way your business operates.
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
                <p className="text-lg font-bold text-dark-900">{getSolutionTitle(track.id, track.title)}</p>
                <p className="text-sm text-dark-400 mt-2">{getAppsForTrack(track.appSlugs).length} linked systems</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Solution Reference"
            title="One working retail reference is enough to anchor the conversation"
            subtitle="The live layouts already exist inside the system library, so this page now focuses on how each solution bundle maps to real operations."
          />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-stretch mb-20 md:mb-24">
            <Card elevated padding="lg" className="overflow-hidden bg-gradient-to-br from-dark-50 to-white">
              <div className="relative overflow-hidden rounded-2xl border border-dark-100 bg-white">
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

            <Card elevated padding="lg" className="bg-dark-50/60 border border-dark-100">
              <p className="text-sm font-semibold text-primary-600 mb-2">Reference image</p>
              <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-4">
                Retail &amp; warehouse commerce offers a practical starting point
              </h2>
              <p className="text-dark-500 leading-relaxed mb-6">
                This view shows the layout, navigation, and operator flow businesses can expect from a BizSuits rollout, without repeating every screen again on the solutions page.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-dark-600">Use it to compare roles, modules, and handoff points.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-dark-600">Focus on deployment fit instead of repeated interface previews.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-dark-600">Apply the same product quality across farm, operations, and desktop workflows.</span>
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
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-5 shadow-lg`}
                      >
                        <solution.icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-primary-600 mb-2">Proven system bundle</p>
                      <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        {solutionTitle}
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
                        Discuss This Solution
                      </Button>
                    </div>

                    <div className="rounded-2xl border border-dark-100 bg-dark-50/70 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-400">
                          Systems included in this solution
                        </p>
                        <span className="text-xs font-medium text-primary-600">{apps.length} linked systems</span>
                      </div>
                      <div className="space-y-4">
                        {apps.map((app) => (
                          <div key={app.slug} className="rounded-xl border border-dark-100 bg-white p-4">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <p className="text-sm font-semibold text-dark-900">{app.name}</p>
                              <span className="text-xs font-medium text-primary-600">{app.deliveryMode}</span>
                            </div>
                            <p className="text-sm text-dark-500 leading-relaxed">{app.summary}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a solution that combines multiple tracks?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            BizSuits can combine operations, commerce, and back-office tooling into one connected delivery plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Discuss Your Workflow
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
