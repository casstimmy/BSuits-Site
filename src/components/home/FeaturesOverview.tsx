import React from 'react';
import {
  ShoppingCart,
  Package,
  Calculator,
  Users,
  BarChart3,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const features = [
  {
    icon: ShoppingCart,
    title: 'Point of Sale',
    description:
      'Lightning-fast checkout with support for multiple payment methods, split bills, and custom receipts. Works online and offline.',
    color: 'bg-blue-100 text-blue-600',
    href: '/features#pos',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description:
      'Real-time stock tracking across locations, automated reorder alerts, barcode scanning, and supplier management.',
    color: 'bg-purple-100 text-purple-600',
    href: '/features#inventory',
  },
  {
    icon: Calculator,
    title: 'Accounting & Finance',
    description:
      'Automated bookkeeping, invoicing, expense tracking, tax calculations, and financial reports — all in one place.',
    color: 'bg-emerald-100 text-emerald-600',
    href: '/features#accounting',
  },
  {
    icon: Users,
    title: 'HR & Payroll',
    description:
      'Employee scheduling, time tracking, payroll processing, leave management, and performance reviews simplified.',
    color: 'bg-orange-100 text-orange-600',
    href: '/features#hr',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Actionable insights with real-time dashboards, sales analytics, customer behavior tracking, and custom reports.',
    color: 'bg-rose-100 text-rose-600',
    href: '/features#analytics',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Expert help whenever you need it. Live chat, phone support, onboarding assistance, and a comprehensive knowledge base.',
    color: 'bg-cyan-100 text-cyan-600',
    href: '/contact',
  },
];

export default function FeaturesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          badge="What We Build"
          title="Custom systems for every need"
          subtitle="We don\'t sell off-the-shelf software. Every BizSuits system is tailored to your operations and fully owned by you."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={feature.title} elevated className="group">
              <div
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">{feature.title}</h3>
              <p className="text-dark-500 leading-relaxed mb-4">{feature.description}</p>
              <a
                href={feature.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 group-hover:gap-2.5 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" size="lg" href="/features" icon={<ArrowRight className="w-5 h-5" />}>
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}
