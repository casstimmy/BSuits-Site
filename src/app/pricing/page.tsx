import React from 'react';
import { CheckCircle2, X, ArrowRight, Zap, Star, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Pricing - BizSuits | Plans for Every Business',
  description:
    'Simple, transparent pricing. Choose the BizSuits plan that fits your business — from solo entrepreneurs to enterprise organizations.',
};

const plans = [
  {
    name: 'POS & Inventory',
    description: 'Complete point of sale with inventory tracking for retail and restaurants.',
    price: 600000,
    period: '',
    badge: null,
    cta: 'Request Demo',
    ctaVariant: 'secondary' as const,
    features: [
      { text: 'Point of Sale System', included: true },
      { text: 'Inventory Management', included: true },
      { text: 'Multi-Location Support', included: true },
      { text: 'Sales Reports & Analytics', included: true },
      { text: 'Mobile App Access', included: true },
      { text: 'Email Support', included: true },
      { text: 'Custom Setup & Training', included: true },
      { text: 'E-Commerce Integration', included: false },
      { text: 'Accounting Module', included: false },
      { text: 'HR & Payroll', included: false },
      { text: 'Custom Integrations', included: false },
      { text: 'Dedicated Account Manager', included: false },
    ],
  },
  {
    name: 'E-Commerce Complete',
    description: 'Inventory system with 1-year e-commerce platform hosting included.',
    price: 300000,
    period: '',
    badge: 'Includes 1yr Hosting',
    cta: 'Request Demo',
    ctaVariant: 'primary' as const,
    features: [
      { text: 'Inventory Management System', included: true },
      { text: 'E-Commerce Platform (1 year)', included: true },
      { text: 'Web Hosting (1 year)', included: true },
      { text: 'Product Catalog Management', included: true },
      { text: 'Order Tracking', included: true },
      { text: 'Payment Gateway Integration', included: true },
      { text: 'Mobile App Access', included: true },
      { text: 'Setup & Configuration', included: true },
      { text: 'Priority Email Support', included: true },
      { text: 'Point of Sale System', included: false },
      { text: 'Accounting Module', included: false },
      { text: 'Dedicated Account Manager', included: false },
    ],
  },
  {
    name: 'Full Business Suite',
    description: 'Complete solution with POS, inventory, e-commerce, and 1-year hosting.',
    price: 900000,
    period: '',
    badge: 'Complete Setup',
    cta: 'Request Demo',
    ctaVariant: 'dark' as const,
    features: [
      { text: 'Point of Sale System', included: true },
      { text: 'Inventory Management', included: true },
      { text: 'E-Commerce Platform (1 year)', included: true },
      { text: 'Web Hosting (1 year)', included: true },
      { text: 'Multi-Location Support', included: true },
      { text: 'Sales & Analytics Reports', included: true },
      { text: 'Order & Inventory Sync', included: true },
      { text: 'Mobile App Access', included: true },
      { text: 'Payment Gateway Integration', included: true },
      { text: 'Custom Setup & Training', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Dedicated Account Manager', included: true },
    ],
  },
];

const faqs = [
  {
    question: 'Is custom development included?',
    answer:
      'Yes! Our business solutions are fully customized to your specific needs. We work with you to understand your operations and build the system that fits perfectly. Custom setup and training are included.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Implementation typically takes 2-4 weeks depending on complexity. We handle all setup, data migration, staff training, and go-live support.',
  },
  {
    question: 'What about ongoing support?',
    answer:
      'We provide comprehensive support during and after implementation. All plans include dedicated support channels, regular updates, and system maintenance.',
  },
  {
    question: 'Can the system grow with my business?',
    answer:
      'Absolutely. Our systems are scalable and can expand as your business grows. You can add new locations, branches, or additional modules as needed.',
  },
  {
    question: 'What about data security and compliance?',
    answer:
      'Data security is our top priority. We use enterprise-grade encryption, regular backups, and comply with Nigerian data protection requirements.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes. We can work out flexible payment arrangements based on your needs. Contact our sales team to discuss options.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Simple Pricing
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6">
            Custom pricing for{' '}
            <span className="gradient-text">your business</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-2xl mx-auto">
            Each system is fully customized and includes complete setup, training, and support.
            No hidden fees — just transparent pricing for tailored solutions.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-28 -mt-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.name === 'Professional'
                    ? 'bg-dark-900 text-white shadow-2xl shadow-dark-900/20 ring-2 ring-primary-500 scale-[1.02]'
                    : 'bg-white border border-dark-100 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      plan.name === 'Professional'
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-100 text-dark-600'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan Info */}
                <div className="mb-6">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      plan.name === 'Professional' ? 'text-white' : 'text-dark-900'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      plan.name === 'Professional' ? 'text-white/60' : 'text-dark-400'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  {plan.price !== null ? (
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-5xl font-bold ${
                          plan.name === 'Professional' ? 'text-white' : 'text-dark-900'
                        }`}
                      >
                        ₦{plan.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-lg mb-1 ${
                          plan.name === 'Professional' ? 'text-white/60' : 'text-dark-400'
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                  ) : (
                    <p
                      className={`text-3xl font-bold ${
                        plan.name === 'Professional' ? 'text-white' : 'text-dark-900'
                      }`}
                    >
                      Custom
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Button
                  variant={plan.name === 'Professional' ? 'accent' : plan.ctaVariant}
                  className="w-full mb-8"
                  href="/contact"
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 ${
                            plan.name === 'Professional' ? 'text-accent-400' : 'text-accent-500'
                          }`}
                        />
                      ) : (
                        <X
                          className={`w-5 h-5 shrink-0 ${
                            plan.name === 'Professional' ? 'text-white/20' : 'text-dark-200'
                          }`}
                        />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? plan.name === 'Professional'
                              ? 'text-white/80'
                              : 'text-dark-600'
                            : plan.name === 'Professional'
                            ? 'text-white/30'
                            : 'text-dark-300'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-dark-50/50">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            badge="FAQ"
            title="Frequently asked questions"
            subtitle="Everything you need to know about BizSuits pricing and plans."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-dark-100 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-dark-900 mb-2">{faq.question}</h3>
                <p className="text-dark-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            Our team is happy to help you find the right plan for your business.
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
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
