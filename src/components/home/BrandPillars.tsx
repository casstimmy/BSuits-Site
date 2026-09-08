import React from 'react';
import {
  Code2,
  Smartphone,
  Puzzle,
  Cloud,
  TrendingUp,
  Headphones,
} from 'lucide-react';

const pillars = [
  {
    title: 'Custom System Development',
    description: 'Tailored software built around your business.',
    icon: Code2,
  },
  {
    title: 'Web & Mobile Applications',
    description: 'Modern, responsive and user-focused applications.',
    icon: Smartphone,
  },
  {
    title: 'System Integration',
    description: 'Seamlessly connect your tools and processes.',
    icon: Puzzle,
  },
  {
    title: 'Cloud Solutions',
    description: 'Secure, scalable and reliable cloud infrastructure.',
    icon: Cloud,
  },
  {
    title: 'Business Automation',
    description: 'Automate workflows and increase productivity.',
    icon: TrendingUp,
  },
  {
    title: 'Support & Maintenance',
    description: 'Ongoing support to keep your systems running smoothly.',
    icon: Headphones,
  },
];

export default function BrandPillars() {
  return (
    <section className="bg-dark-950 text-white border-y border-dark-800">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-dark-800 border border-dark-800 bg-dark-900/60">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 flex flex-col items-start hover:bg-dark-800/40 transition-colors"
            >
              <div className="w-10 h-10 border border-primary-500/30 bg-primary-950/60 text-accent-400 flex items-center justify-center mb-4">
                <pillar.icon className="w-5 h-5 text-accent-400" />
              </div>
              <h3 className="text-sm font-bold font-display text-white mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs text-dark-300 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
