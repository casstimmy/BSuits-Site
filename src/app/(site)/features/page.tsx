import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deliveryTracks, getAppsForTrack, portfolioStats } from '@/data/portfolio';

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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Solution Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Features organized by{' '}
            <span className="gradient-text">what each solution includes</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto mb-8">
            Each BizSuits solution is made up of connected systems. Explore what every system brings
            to the table — the modules, workflows, and surfaces it delivers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/features#retail-commerce" icon={<ArrowRight className="w-5 h-5" />}>
              Jump to Demo Tracks
            </Button>
            <Button variant="secondary" size="lg" href="/solutions">
              Explore Solutions
            </Button>
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
            badge="Solution Features"
            title="Each solution is built from proven, connected systems"
            subtitle="Browse by solution to see exactly which systems it includes and what each one covers."
          />

          {deliveryTracks.map((track, trackIndex) => {
            const apps = getAppsForTrack(track.appSlugs);
            const demoHref = trackDemoLinks[track.id] ?? `/features#${track.id}`;

            return (
              <div
                key={track.id}
                id={track.id}
                className={trackIndex < deliveryTracks.length - 1 ? 'mb-24 md:mb-32' : ''}
              >
                {/* Track header */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${track.gradient} flex items-center justify-center shadow-lg shrink-0`}
                  >
                    <track.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary-600 mb-1 uppercase tracking-wider">
                      Solution Track
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-3">
                      {track.title}
                    </h2>
                    <p className="text-lg text-dark-500 leading-relaxed mb-5">{track.summary}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="primary"
                        href={demoHref}
                        icon={<ExternalLink className="w-4 h-4" />}
                      >
                        Try Demo
                      </Button>
                      <Button variant="secondary" href="/contact">
                        Discuss This Solution
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Component systems (the "features" of this solution) */}
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
                      {/* Preview image (POS screenshot) */}
                      {app.previewImage && (
                        <div className="relative -mt-8 md:-mt-10 -mx-8 md:-mx-10 mb-6 h-44 overflow-hidden rounded-t-2xl">
                          <Image
                            src={app.previewImage}
                            alt={`${app.name} preview`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      )}
                      {/* App header */}
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-md shrink-0`}
                        >
                          <app.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-dark-900">{app.name}</h3>
                          <p className="text-xs text-dark-400 mt-0.5">
                            {app.category} &middot; {app.deliveryMode}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-dark-500 leading-relaxed mb-5">{app.summary}</p>

                      {/* Module list */}
                      <div className="space-y-2.5 flex-1">
                        {app.modules.map((mod) => (
                          <div key={mod} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-dark-600">{mod}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="mt-5 pt-5 border-t border-dark-100 flex flex-wrap gap-2">
                        {app.signals.map((signal) => (
                          <span
                            key={signal}
                            className="rounded-full bg-dark-50 px-3 py-1 text-xs font-medium text-dark-500 border border-dark-100"
                          >
                            {signal}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                          variant="primary"
                          size="sm"
                          href={app.demoHref ?? demoHref}
                          icon={<ExternalLink className="w-4 h-4" />}
                        >
                          Try Demo
                        </Button>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to see these systems in action?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            Each BizSuits system has an interactive demo you can try right now. No setup needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/features#retail-commerce" icon={<ArrowRight className="w-5 h-5" />}>
              Jump to Demo Tracks
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/solutions"
              className="!text-white hover:!bg-white/10"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
