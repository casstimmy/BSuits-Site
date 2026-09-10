import React from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Features - BizSuits | Solution Capabilities',
  description:
    'Explore the modules and workflows BizSuits can deliver across retail commerce, agriculture, operations, and document automation.',
};

const trackDemoLinks: Record<string, string> = {
  'retail-commerce': '/demo/pos',
  'farm-operations': '/demo/farm',
  'ops-delivery': '/demo/ops',
  'document-automation': '/demo/document',
};

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            System Specifications
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-dark-900 mb-6 text-balance tracking-tight">
            Features Organized by{' '}
            <span className="text-primary-600">Solution Track</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto mb-8 leading-relaxed font-sans">
            Each BizSuits solution is composed of connected, battle-tested systems. Review every capability, module, and multi-platform surface delivered out of the box.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Request Architecture Deck
            </Button>
            <Button variant="secondary" size="lg" href="/solutions">
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Solution Tracks"
            title="Engineered from proven, production systems"
            subtitle="Browse by track to examine which applications are combined and how data moves between them."
          />

          {deliveryTracks.map((track, trackIndex) => {
            const apps = getAppsForTrack(track.appSlugs);
            const demoHref = trackDemoLinks[track.id] ?? '/features';

            return (
              <div
                key={track.id}
                id={track.id}
                className={trackIndex < deliveryTracks.length - 1 ? 'mb-20 md:mb-28' : ''}
              >
                {/* Track header */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-10 pb-8 border-b border-dark-200">
                  <div className="w-12 h-12 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center shrink-0">
                    <track.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono font-semibold text-primary-700 mb-1 uppercase tracking-wider">
                      DELIVERY TRACK
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-dark-900 mb-3 tracking-tight">
                      {track.title}
                    </h2>
                    <p className="text-sm md:text-base text-dark-600 leading-relaxed mb-5 font-sans">{track.summary}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="primary"
                        href={demoHref}
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        Inspect Track
                      </Button>
                      <Button variant="secondary" href="/contact">
                        Discuss This Solution
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Component systems */}
                <div
                  className={`grid gap-6 ${
                    apps.length === 1
                      ? 'max-w-2xl'
                      : apps.length === 2
                      ? 'md:grid-cols-2'
                      : 'md:grid-cols-2 xl:grid-cols-3'
                  }`}
                >
                  {apps.map((app) => (
                    <div key={app.slug} id={app.slug} className="scroll-mt-32">
                      <div className="border border-dark-200 bg-white hover:border-dark-400 transition-all duration-200 h-full flex flex-col justify-between shadow-sm hover:shadow group p-6 sm:p-7">
                        <div>
                          {app.previewImage && (
                            <div className="relative -mt-6 sm:-mt-7 -mx-6 sm:-mx-7 mb-6 h-48 md:h-52 overflow-hidden border-b border-dark-200 bg-[#f8fafc] flex items-center justify-center p-3">
                              <div className="relative w-full h-full">
                                <Image
                                  src={app.previewImage}
                                  alt={`${app.name} preview`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-contain object-center"
                                />
                              </div>
                            </div>
                          )}

                          {/* App header */}
                          <div className="flex items-start gap-3.5 mb-5">
                            <div className="w-10 h-10 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-colors">
                              <app.icon className="w-5 h-5 transition-colors" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-bold font-display text-dark-900 tracking-tight group-hover:text-primary-700 transition-colors">{app.name}</h3>
                              <p className="text-[11px] font-mono uppercase tracking-wider text-primary-700 font-semibold mt-0.5">
                                {app.category}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 text-dark-700 border border-dark-200 px-2.5 py-1 block w-fit">
                              {app.deliveryMode}
                            </span>
                          </div>

                          <p className="text-xs md:text-sm text-dark-600 leading-relaxed mb-5 font-sans">{app.summary}</p>

                          {/* Module list */}
                          <div className="space-y-2 mb-6">
                            {app.modules.map((mod) => (
                              <div key={mod} className="flex items-start gap-2">
                                <span className="text-primary-600 font-bold text-xs">—</span>
                                <span className="text-xs text-dark-700 leading-relaxed font-sans">{mod}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="pt-4 border-t border-dark-100 flex flex-wrap gap-1.5">
                          {app.signals.map((signal) => (
                            <span
                              key={signal}
                              className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 px-2 py-0.5 text-dark-600 border border-dark-200"
                            >
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white border-y border-dark-800">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 tracking-tight">
            Want to test these production environments?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-8 font-sans">
            Review detailed live examples and architectural specifications for each system with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Technical Walkthrough
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/solutions"
              className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
