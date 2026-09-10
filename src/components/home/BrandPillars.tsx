import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Smartphone,
  Puzzle,
  Cloud,
  TrendingUp,
  Headphones,
  ArrowRight,
} from 'lucide-react';

const pillars = [
  {
    num: '01',
    title: 'Custom System Development',
    description: 'Bespoke software engineered specifically around your organizational workflows, daily handoffs, and commercial model.',
    icon: Code2,
    deliverables: ['Workflow Architecture', 'Bespoke Database Schema', 'Proprietary Business Logic'],
    href: '/features#custom-dev',
  },
  {
    num: '02',
    title: 'Web & Mobile Applications',
    description: 'Modern, responsive and user-focused applications designed for desk operators, floor personnel, and executive oversight.',
    icon: Smartphone,
    deliverables: ['Cross-Device Dashboards', 'Floor & Field Tablets', 'Customer Order Portals'],
    href: '/features#web-mobile',
  },
  {
    num: '03',
    title: 'System Integration',
    description: 'Seamlessly interconnect your accounting, payment gateways, barcode peripherals, and multi-location database clusters.',
    icon: Puzzle,
    deliverables: ['Payment & Paystack API', 'Hardware & Barcode Scanners', 'Multi-Store Synchronization'],
    href: '/features#integrations',
  },
  {
    num: '04',
    title: 'Cloud Solutions',
    description: 'Secure, scalable, and reliable cloud infrastructure built for high availability, zero latency spikes, and automated failover.',
    icon: Cloud,
    deliverables: ['Isolated Cloud Environments', 'Automated Daily Backups', 'Zero-Downtime Releases'],
    href: '/features#cloud',
  },
  {
    num: '05',
    title: 'Business Automation',
    description: 'Eliminate repetitive spreadsheet manipulation and manual tallying with automated end-of-day reconciliation and triggers.',
    icon: TrendingUp,
    deliverables: ['Automated End-of-Day Till', 'PDF & Excel Parsers', 'Scheduled Operational Audits'],
    href: '/features#automation',
  },
  {
    num: '06',
    title: 'Support & Maintenance',
    description: 'Ongoing technical stewardship, proactive performance audits, and rapid incident response to keep operations run without halt.',
    icon: Headphones,
    deliverables: ['Dedicated Engineering SLA', 'Staff Onboarding & Training', 'Continuous Feature Upgrades'],
    href: '/contact',
  },
];

export default function BrandPillars() {
  return (
    <section className="section-padding bg-white border-b border-dark-200">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 border border-primary-200 bg-primary-50/60 text-xs font-mono uppercase tracking-wider text-primary-700 font-semibold mb-4">
              Core Engineering Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-dark-900 tracking-tight">
              Comprehensive Systems Engineering.
            </h2>
            <p className="mt-4 text-base md:text-lg text-dark-600 leading-relaxed">
              We cover the entire lifecycle — from raw workflow discovery to custom software development, peripheral hardware integration, and ongoing operational maintenance.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-700 hover:text-dark-950 transition-colors shrink-0"
          >
            Discuss a Custom Deployment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-dark-200 bg-white p-7 sm:p-8 hover:border-dark-400 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-colors">
                    <pillar.icon className="w-5 h-5 transition-colors" />
                  </div>
                  <span className="font-mono text-xs font-bold text-dark-400">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-dark-900 mb-3 tracking-tight group-hover:text-primary-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-dark-600 leading-relaxed mb-6 font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 border-t border-dark-100 space-y-2">
                {pillar.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-dark-600 font-mono">
                    <span className="h-1 w-1 bg-primary-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
