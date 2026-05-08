import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import { deliveryTracks, getAppsForTrack, portfolioApps, portfolioStats } from '@/data/portfolio';

const reviewFindings = [
  'The public system was still anchored to generic SaaS copy instead of the seven current build references.',
  'Navigation and landing sections are now driven by shared portfolio data, which removes copy drift between pages.',
  'The old invoice-generator admin route has been repurposed into a build review surface that matches this site refresh.',
];

const updatedSurfaces = [
  'Header navigation and build library dropdown',
  'Homepage hero, build-family overview, and portfolio proof section',
  'Features and solutions pages rebuilt around current delivery tracks',
  'Admin route converted into a review-oriented build control center',
  'Primary placeholder demo links replaced on refreshed public pages',
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <section className="pt-10 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-white/90 mb-5">
                Internal review surface
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
                BizSuits Build Control Center
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl">
                This page now acts as the system review console for the seven current applications
                you shared, replacing the unrelated invoice workflow that previously lived here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
                Schedule Working Session
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/features"
                className="!text-white hover:!bg-white/10"
              >
                Open Public Feature Map
              </Button>
            </div>
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
            badge="Review Notes"
            title="What changed in this refresh"
            subtitle="The admin surface now summarizes the review outcome and the portfolio model driving the rest of the site."
          />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <Card elevated className="h-full">
              <h2 className="text-2xl font-bold text-dark-900 mb-5">Core findings</h2>
              <div className="space-y-4">
                {reviewFindings.map((finding) => (
                  <div key={finding} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-dark-600 leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card elevated className="h-full">
              <h2 className="text-2xl font-bold text-dark-900 mb-5">Updated surfaces</h2>
              <div className="flex flex-wrap gap-3">
                {updatedSurfaces.map((surface) => (
                  <span
                    key={surface}
                    className="rounded-full bg-dark-50 px-4 py-2 text-sm font-medium text-dark-500 border border-dark-100"
                  >
                    {surface}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-50/50">
        <div className="container-custom">
          <SectionHeading
            badge="Delivery Tracks"
            title="How the current apps cluster into solution families"
            subtitle="These are the same groupings now used across the refreshed home, features, and solutions pages."
          />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {deliveryTracks.map((track) => {
              const apps = getAppsForTrack(track.appSlugs);

              return (
                <Card key={track.id} elevated className="h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.gradient} flex items-center justify-center text-white shadow-lg`}>
                      <track.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 mb-1">{track.title}</h3>
                      <p className="text-dark-500 leading-relaxed">{track.summary}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    {track.capabilities.map((capability) => (
                      <div key={capability} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-dark-600 leading-relaxed">{capability}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {apps.map((app) => (
                      <span
                        key={app.slug}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-dark-500 border border-dark-100"
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
            badge="Referenced Apps"
            title="The current build inputs behind the refresh"
            subtitle="Every app below is now represented in the shared portfolio model that drives the public site."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {portfolioApps.map((app) => (
              <Card key={app.slug} elevated className="h-full">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-lg`}>
                    <app.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="rounded-full bg-dark-50 px-3 py-1 text-xs font-semibold text-dark-500 border border-dark-100">
                    {app.deliveryMode}
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 mb-2">
                  {app.sourceProject}
                </p>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{app.name}</h3>
                <p className="text-dark-500 leading-relaxed mb-5">{app.summary}</p>

                <div className="space-y-2 mb-5">
                  {app.modules.slice(0, 2).map((module) => (
                    <p key={module} className="text-sm text-dark-500 leading-relaxed">
                      {module}
                    </p>
                  ))}
                </div>

                <div className="rounded-2xl bg-dark-50 border border-dark-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-400 mb-2">Build signal</p>
                  <p className="text-sm font-medium text-dark-700 mb-2">{app.status}</p>
                  <p className="text-sm text-dark-500">{app.stack}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
