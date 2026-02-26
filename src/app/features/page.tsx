import React from 'react';
import {
  ShoppingCart,
  Package,
  Calculator,
  Users,
  BarChart3,
  Headphones,
  CheckCircle2,
  Zap,
  Globe,
  Smartphone,
  Cloud,
  Lock,
  RefreshCw,
  Bell,
  FileText,
  CreditCard,
  Clock,
  TrendingUp,
  ArrowRight,
  Play,
  Monitor,
} from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Features - BizSuits | All-in-One Business Management',
  description:
    'Explore BizSuits features: POS, inventory management, accounting, HR & payroll, analytics, and more — all in one platform.',
};

const mainFeatures = [
  {
    id: 'pos',
    icon: ShoppingCart,
    title: 'Point of Sale',
    description:
      'A modern, intuitive POS system designed for speed and reliability. Process transactions in seconds, accept every payment method, and keep your lines moving.',
    color: 'from-blue-500 to-blue-600',
    highlights: [
      'Accept cards, cash, mobile wallets & contactless',
      'Split bills and partial payments',
      'Custom receipts with your branding',
      'Works offline — sync when reconnected',
      'Multi-terminal support for busy locations',
      'Quick-add items with barcode scanning',
    ],
    hasDemo: true,
  },
  {
    id: 'inventory',
    icon: Package,
    title: 'Inventory Management',
    description:
      'Never run out of stock again. Track every product across every location in real-time with intelligent alerts and automated reordering.',
    color: 'from-purple-500 to-purple-600',
    highlights: [
      'Real-time stock tracking across all locations',
      'Automated low-stock alerts & reorder points',
      'Barcode & QR code scanning',
      'Supplier management & purchase orders',
      'Batch & serial number tracking',
      'Stock transfer between locations',
    ],
    hasDemo: true,
  },
  {
    id: 'accounting',
    icon: Calculator,
    title: 'Accounting & Finance',
    description:
      'Automate your bookkeeping and financial management. From invoicing to tax reports, BizSuits handles the numbers so you can focus on your business.',
    color: 'from-emerald-500 to-emerald-600',
    highlights: [
      'Automated bookkeeping & reconciliation',
      'Professional invoice generation',
      'Expense tracking & categorization',
      'Tax calculation & compliance reports',
      'Cash flow forecasting',
      'Multi-currency support',
    ],
    hasDemo: true,
  },
  {
    id: 'hr',
    icon: Users,
    title: 'HR & Payroll',
    description:
      'Simplify your people management. From hiring to payroll, manage your entire workforce with tools designed for growing teams.',
    color: 'from-orange-500 to-orange-600',
    highlights: [
      'Employee profiles & document storage',
      'Shift scheduling & time tracking',
      'Automated payroll processing',
      'Leave management & approvals',
      'Performance reviews & goals',
      'Onboarding checklists',
    ],
    hasDemo: true,
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Turn data into decisions. Get real-time insights into every aspect of your business with powerful dashboards and customizable reports.',
    color: 'from-rose-500 to-rose-600',
    highlights: [
      'Real-time sales & revenue dashboards',
      'Customer behavior analytics',
      'Product performance tracking',
      'Employee productivity metrics',
      'Custom report builder',
      'Scheduled report delivery via email',
    ],
    hasDemo: true,
  },
];

const platformFeatures = [
  { icon: Cloud, title: 'Cloud-Based', description: 'Access anywhere, anytime from any device' },
  { icon: Lock, title: 'Enterprise Security', description: 'Bank-level encryption & SOC 2 compliance' },
  { icon: Smartphone, title: 'Mobile App', description: 'Full-featured iOS & Android apps' },
  { icon: Globe, title: 'Multi-Location', description: 'Manage unlimited stores from one account' },
  { icon: RefreshCw, title: 'Real-Time Sync', description: 'Data syncs instantly across all devices' },
  { icon: Zap, title: 'API Access', description: 'RESTful API for custom integrations' },
  { icon: Bell, title: 'Smart Alerts', description: 'Customizable notifications & alerts' },
  { icon: FileText, title: 'Custom Reports', description: 'Build reports tailored to your needs' },
  { icon: CreditCard, title: 'Payment Processing', description: 'Built-in payment gateway support' },
  { icon: Clock, title: 'Scheduling', description: 'Staff & appointment scheduling' },
  { icon: TrendingUp, title: 'Growth Tools', description: 'Loyalty programs & promotions' },
  { icon: Headphones, title: '24/7 Support', description: 'Expert help whenever you need it' },
];

export default function FeaturesPage() {
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
            Powerful Features
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Custom-built features for{' '}
            <span className="gradient-text">your business</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto mb-8">
            Every system we build is tailored to your operations. Here&apos;s what we
            can include in your custom BizSuits solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule a Demo
            </Button>
            <Button variant="secondary" size="lg" href="/pricing">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 lg:gap-16 items-center ${index < mainFeatures.length - 1 ? 'mb-24 md:mb-32' : ''}`}
            >
              {/* Content */}
              <div className="flex-1">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-dark-500 leading-relaxed mb-8">
                  {feature.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {feature.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-dark-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="bg-gradient-to-br from-dark-50 to-dark-100 rounded-2xl p-8 md:p-12 aspect-[4/3] flex flex-col items-center justify-center">
                    {/* Show POS preview image for POS feature */}
                    {feature.id === 'pos' ? (
                      <img
                        src="/images/Point%20of%20sales%20preview.png"
                        alt="Point of Sales Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-dark-900">{feature.title}</p>
                            <p className="text-xs text-dark-400">BizSuits Module</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-dark-50 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-accent-500" />
                              </div>
                              <div className="flex-1">
                                <div className="h-2.5 bg-dark-100 rounded-full" style={{ width: `${70 + i * 10}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {'hasDemo' in feature && feature.hasDemo && (
                      <div className="flex gap-3">
                        <a
                          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-dark-50 text-dark-700 font-semibold rounded-xl border border-dark-200 transition-all text-sm hover:-translate-y-0.5"
                        >
                          <Play className="w-4 h-4" />
                          Watch Demo
                        </a>
                        <a
                          href="/demo"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/25 transition-all text-sm hover:-translate-y-0.5"
                        >
                          <Monitor className="w-4 h-4" />
                          Try Demo
                        </a>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="section-padding bg-dark-50/50">
        <div className="container-custom">
          <SectionHeading
            badge="Platform"
            title="Built for modern business"
            subtitle="Beyond core modules, BizSuits comes with everything you need for a complete, future-proof business platform."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {platformFeatures.map((feature) => (
              <Card key={feature.title} padding="md" className="group">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-base font-bold text-dark-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-dark-500">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See these features in action
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            Explore all features and get a personalized demo from our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule a Demo
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/contact"
              className="!text-white hover:!bg-white/10"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
