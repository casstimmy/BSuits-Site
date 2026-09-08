import React from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
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
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-50" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-3 py-1 border border-dark-300 bg-white text-xs font-mono uppercase tracking-[0.18em] text-dark-800 mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.06)]">
            SYSTEM SPECIFICATION
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance tracking-tight">
            Features organized by{' '}
            <span className="gradient-text">what each solution includes</span>
          </h1>
          <p className="text-base md:text-lg text-dark-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Each BizSuits solution is made up of connected systems. Explore what every system brings
            to the table — the modules, workflows, and surfaces it delivers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/features" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Systems
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
            badge="Solution Features"
            title="Each solution is built from proven, connected systems"
            subtitle="Browse by solution to see exactly which systems it includes and what each one covers."
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
                  <div className="w-14 h-14 border border-dark-900 bg-dark-950 text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] shrink-0">
                    <track.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono font-semibold text-primary-700 mb-1 uppercase tracking-wider">
                      TRACK // {track.id}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-3 tracking-tight">
                      {track.title}
                    </h2>
                    <p className="text-sm md:text-base text-dark-600 leading-relaxed mb-5">{track.summary}</p>
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
                      <Card elevated padding="lg" className={`h-full flex flex-col ${app.previewImage ? 'overflow-hidden' : ''}`}>
                      {app.previewImage && (
                        <div className="relative -mt-8 md:-mt-10 -mx-8 md:-mx-10 mb-6 h-48 md:h-52 overflow-hidden border-b border-dark-200 bg-[#f8fafc] flex items-center justify-center p-3">
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
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-10 h-10 border border-dark-900 bg-dark-950 text-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] shrink-0 mt-0.5">
                          <app.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold font-display text-dark-900 tracking-tight">{app.name}</h3>
                          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-700 font-semibold mt-0.5">
                            {app.category}
                          </p>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-dark-500 mt-1 inline-block bg-dark-50 border border-dark-200 px-2 py-0.5">
                            {app.deliveryMode}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-dark-600 leading-relaxed mb-5">{app.summary}</p>

                      {/* Module list */}
                      <div className="space-y-2 flex-1">
                        {app.modules.map((mod) => (
                          <div key={mod} className="flex items-start gap-2">
                            <span className="text-dark-900 font-bold text-xs">—</span>
                            <span className="text-xs text-dark-700 leading-relaxed">{mod}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                        <div className="mt-5 pt-5 border-t border-dark-100 flex flex-wrap gap-2">
                          {app.signals.map((signal) => (
                            <span
                              key={signal}
                              className="font-mono text-[10px] uppercase tracking-wider bg-dark-50 px-2.5 py-1 text-dark-700 border border-dark-200"
                            >
                              {signal}
                            </span>
                          ))}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Want to see these systems in action?
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto mb-8">
            Review detailed live examples and architectural specifications for each system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/features" icon={<ArrowRight className="w-5 h-5" />}>
              Browse All Systems
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/solutions"
              className="!text-white border-white/20 hover:!bg-white/10"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
