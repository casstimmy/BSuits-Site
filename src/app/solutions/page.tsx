import React from 'react';
import {
  Store,
  UtensilsCrossed,
  Heart,
  Briefcase,
  ShoppingBag,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Solutions - BizSuits | Industry-Specific Business Solutions',
  description:
    'BizSuits is tailored for retail, restaurants, healthcare, professional services, e-commerce, and more. Find the right solution for your industry.',
};

const solutions = [
  {
    id: 'retail',
    icon: Store,
    title: 'Retail',
    tagline: 'Sell smarter across every channel',
    description:
      'From boutique shops to multi-store chains, BizSuits gives retailers a unified platform for POS, inventory, customer management, and analytics.',
    color: 'from-blue-500 to-blue-600',
    benefits: [
      'Multi-store inventory sync in real-time',
      'Customer loyalty programs & rewards',
      'Barcode scanning & product catalogs',
      'Omnichannel selling (in-store + online)',
      'Staff management & commissions',
      'Detailed sales & product analytics',
    ],
    stats: { metric: 'streamlined operations', value: 'Tailored' },
  },
  {
    id: 'restaurants',
    icon: UtensilsCrossed,
    title: 'Restaurants & Hospitality',
    tagline: 'Serve faster, manage better',
    description:
      'Whether you run a single café or a restaurant chain, BizSuits streamlines ordering, table management, kitchen workflows, and financial tracking.',
    color: 'from-orange-500 to-orange-600',
    benefits: [
      'Table management & floor plans',
      'Kitchen display system (KDS)',
      'Menu management with modifiers',
      'Split checks & tip management',
      'Reservation & waitlist integration',
      'Food cost & waste tracking',
    ],
    stats: { metric: 'faster service delivery', value: 'Optimized' },
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Clinics',
    tagline: 'Better patient experience, smoother operations',
    description:
      'BizSuits helps clinics and healthcare practices manage appointments, billing, patient records, and compliance — all while maintaining standards.',
    color: 'from-rose-500 to-rose-600',
    benefits: [
      'Appointment scheduling & reminders',
      'Patient billing & insurance claims',
      'Inventory for medical supplies',
      'Staff scheduling & time tracking',
      'Compliant data handling',
      'Revenue cycle management',
    ],
    stats: { metric: 'admin time saved', value: 'Significant' },
  },
  {
    id: 'services',
    icon: Briefcase,
    title: 'Professional Services',
    tagline: 'Focus on clients, not paperwork',
    description:
      'For consultants, agencies, law firms, and service providers — manage clients, projects, billing, and team operations from one platform.',
    color: 'from-purple-500 to-purple-600',
    benefits: [
      'Client management & CRM',
      'Project tracking & timesheets',
      'Automated invoicing & payments',
      'Expense tracking & reimbursements',
      'Team scheduling & workload management',
      'Profitability reports by project',
    ],
    stats: { metric: 'billing accuracy', value: 'Improved' },
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-Commerce',
    tagline: 'Sell online with confidence',
    description:
      'Sync your online store with BizSuits for unified inventory, orders, customers, and financials across every sales channel.',
    color: 'from-emerald-500 to-emerald-600',
    benefits: [
      'Custom e-commerce platform',
      'Unified inventory across channels',
      'Order management & fulfillment',
      'Customer segmentation & marketing',
      'Shipping & returns management',
      'Multi-channel sales analytics',
    ],
    stats: { metric: 'operational efficiency', value: 'Enhanced' },
  },
  {
    id: 'enterprise',
    icon: Building2,
    title: 'Enterprise',
    tagline: 'Scale without limits',
    description:
      'For large organizations with complex needs — unlimited locations, custom workflows, dedicated support, and enterprise-grade security.',
    color: 'from-dark-600 to-dark-800',
    benefits: [
      'Unlimited locations & terminals',
      'Custom workflow automation',
      'Advanced role-based permissions',
      'White-label & custom branding',
      'Dedicated account manager',
      'SLA-backed priority support',
    ],
    stats: { metric: 'complete customization', value: 'Full' },
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Industry Solutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Built for <span className="gradient-text">your industry</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto">
            BizSuits isn&apos;t one-size-fits-all. We&apos;ve tailored our platform for the unique
            needs of every industry, so you get exactly what you need from day one.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              id={solution.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 lg:gap-16 items-center ${index < solutions.length - 1 ? 'mb-24 md:mb-32' : ''}`}
            >
              {/* Content */}
              <div className="flex-1">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-semibold text-primary-600 mb-2">{solution.tagline}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                  {solution.title}
                </h2>
                <p className="text-lg text-dark-500 leading-relaxed mb-6">
                  {solution.description}
                </p>
                <div className="space-y-3 mb-8">
                  {solution.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-dark-600">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button variant="primary" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
                  Request a Demo
                </Button>
              </div>

              {/* Stats Card */}
              <div className="flex-1 w-full">
                <Card elevated padding="lg" className="bg-gradient-to-br from-dark-50 to-white">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <solution.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900 mb-1">BizSuits for {solution.title}</h3>
                    <p className="text-sm text-dark-400">Built for your needs</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-dark-100">
                      <p className="text-2xl font-bold text-accent-600">{solution.stats.value}</p>
                      <p className="text-xs text-dark-400 mt-1">{solution.stats.metric}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-dark-100">
                      <p className="text-2xl font-bold text-primary-600">Custom</p>
                      <p className="text-xs text-dark-400 mt-1">Built for you</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t see your industry?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            BizSuits is highly customizable. Talk to our team to see how we can
            build the perfect system for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Talk to Sales
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/features"
              className="!text-white hover:!bg-white/10"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
