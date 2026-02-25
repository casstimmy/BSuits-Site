import React from 'react';
import {
  Target,
  Lightbulb,
  Heart,
  Users,
  Globe,
  Award,
  ArrowRight,
  Linkedin,
  Twitter,
} from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About - BizSuits | Our Story & Mission',
  description:
    'Learn about BizSuits — our mission to empower businesses with an all-in-one management platform, our team, and our values.',
};

const values = [
  {
    icon: Target,
    title: 'Customer Obsession',
    description: 'Every decision starts with "How does this help our customers succeed?" We build what businesses actually need.',
  },
  {
    icon: Lightbulb,
    title: 'Relentless Innovation',
    description: 'We never stop improving. Our team ships new features weekly, driven by customer feedback and market research.',
  },
  {
    icon: Heart,
    title: 'Simplicity First',
    description: 'Powerful doesn\'t have to mean complicated. We design tools that anyone can use from day one, without training.',
  },
  {
    icon: Users,
    title: 'Team Empowerment',
    description: 'We believe in hiring the best and giving them freedom to do their best work. Autonomy, ownership, and trust.',
  },
  {
    icon: Globe,
    title: 'Global Mindset',
    description: 'Built for businesses everywhere — multi-currency, multi-language, and compliant with regulations worldwide.',
  },
  {
    icon: Award,
    title: 'Quality Obsession',
    description: 'We don\'t cut corners. 99.9% uptime, enterprise security, and pixel-perfect design in everything we ship.',
  },
];

const leadership = [
  {
    name: 'St Mick',
    role: 'CEO & Co-Founder',
    bio: 'Passionate about hospitality and retail. Built 3 successful restaurant chains across Nigeria before founding BizSuits. Brings 15+ years of hands-on experience in store operations, kitchen management, and customer service excellence.',
    avatar: 'SM',
  },
  {
    name: 'Cass Timmy',
    role: 'CEO & Co-Founder',
    bio: 'IT expert with 12 years in technology and 6 years managing supermarket operations. Combines deep technical expertise with real-world retail experience to build systems that actually work for ground-level challenges.',
    avatar: 'CT',
  },
  {
    name: 'Tobi Ayoola',
    role: 'Chief Product Officer',
    bio: 'Driven by customer feedback and market insights. Leads product innovation to ensure every feature solves real problems. Committed to building intuitive interfaces that don\'t require training to use.',
    avatar: 'TA',
  },
];



export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
              Custom business solutions{' '}
              <span className="gradient-text">built for your needs</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-500 leading-relaxed">
              Every business is unique. That\'s why we build tailored systems that fit your specific operations,
              from retail stores to restaurants to supermarkets. No off-the-shelf compromises — just software
              designed precisely for how your business works.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
            <Card elevated padding="lg">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Our Mission</h2>
              <p className="text-dark-500 leading-relaxed">
                To deliver custom-built business management systems that fit like a glove —
                POS, inventory, e-commerce, and operations tools designed specifically for
                each client\'s unique workflow and challenges.
              </p>
            </Card>
            <Card elevated padding="lg">
              <div className="w-14 h-14 rounded-2xl bg-accent-100 flex items-center justify-center mb-5">
                <Lightbulb className="w-7 h-7 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Our Vision</h2>
              <p className="text-dark-500 leading-relaxed">
                A world where every business owner — whether running a restaurant, supermarket,
                or retail chain — has access to technology that\'s built for them, fully owned by
                them, and grows with them.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Our Values"
            title="What drives us every day"
            subtitle="These values shape every product decision, every hire, and every customer interaction."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value) => (
              <Card key={value.title} elevated>
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{value.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-dark-50/50" id="team">
        <div className="container-custom">
          <SectionHeading
            badge="Leadership"
            title="Meet the team behind BizSuits"
            subtitle="Industry veterans who understand business operations from the ground up."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {leadership.map((person) => (
              <Card key={person.name} elevated className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{person.avatar}</span>
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-1">{person.name}</h3>
                <p className="text-sm font-medium text-primary-600 mb-3">{person.role}</p>
                <p className="text-sm text-dark-500 leading-relaxed mb-4">{person.bio}</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="#" className="w-8 h-8 rounded-lg bg-dark-100 flex items-center justify-center hover:bg-primary-100 transition-colors">
                    <Linkedin className="w-4 h-4 text-dark-500" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-dark-100 flex items-center justify-center hover:bg-primary-100 transition-colors">
                    <Twitter className="w-4 h-4 text-dark-500" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-20 gradient-bg" id="careers">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to work with us?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            Let&apos;s build the perfect system for your business. Schedule a free
            consultation with our team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Schedule a Consultation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/pricing"
              className="!text-white hover:!bg-white/10"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
