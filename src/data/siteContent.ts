import type { LucideIcon } from 'lucide-react';
import { BarChart3, Layers, RefreshCw, Shield, Target, Users } from 'lucide-react';

export interface EngagementFeature {
  text: string;
  included: boolean;
}

export interface EngagementPackage {
  name: string;
  description: string;
  price: number;
  badge: string | null;
  cta: string;
  ctaVariant: 'primary' | 'secondary' | 'dark';
  highlighted?: boolean;
  recommendedTrackIds: string[];
  features: EngagementFeature[];
}

export interface DeliveryPrinciple {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface DeliveryStep {
  id: string;
  title: string;
  description: string;
}

export interface BuildNote {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  href: string;
}

export const engagementPackages: EngagementPackage[] = [
  {
    name: 'Starter Implementation',
    description:
      'A focused implementation that improves one priority area of the business and gets your team moving quickly.',
    price: 300000,
    badge: 'Single business area',
    cta: 'Plan This Start',
    ctaVariant: 'secondary',
    recommendedTrackIds: ['farm-operations', 'document-automation'],
    features: [
      { text: 'Review of the nearest proven BizSuits example', included: true },
      { text: 'One priority business area shaped around your way of working', included: true },
      { text: 'Core setup, branding, and team readiness', included: true },
      { text: 'Launch checklist and team handoff', included: true },
      { text: 'Early reporting adjustments', included: true },
      { text: 'Multi-area coordination', included: false },
      { text: 'Desktop support', included: false },
      { text: 'Dedicated implementation lead', included: false },
    ],
  },
  {
    name: 'Connected Commerce Package',
    description:
      'For businesses that need back office, checkout, and customer ordering to work together with shared visibility.',
    price: 600000,
    badge: 'Sales and operations',
    cta: 'Plan This Package',
    ctaVariant: 'primary',
    highlighted: true,
    recommendedTrackIds: ['retail-commerce', 'farm-operations'],
    features: [
      { text: 'Business review and fit-gap session', included: true },
      { text: 'Connected back office, checkout, and customer experience', included: true },
      { text: 'Stock and order visibility across locations', included: true },
      { text: 'Payments, reporting, and daily management visibility', included: true },
      { text: 'Launch support and team training', included: true },
      { text: 'Tailoring across two or more business areas', included: true },
      { text: 'Desktop document support', included: false },
      { text: 'Enterprise-wide coordination', included: false },
    ],
  },
  {
    name: 'Operations Growth Package',
    description:
      'For businesses coordinating operations, reporting, projects, and leadership visibility across departments.',
    price: 900000,
    badge: 'Cross-business operations',
    cta: 'Plan This Package',
    ctaVariant: 'dark',
    recommendedTrackIds: ['ops-delivery', 'retail-commerce', 'document-automation'],
    features: [
      { text: 'Planning across multiple business areas', included: true },
      { text: 'Dashboards, reporting, and management visibility', included: true },
      { text: 'Roles, approvals, and day-to-day coordination', included: true },
      { text: 'Cross-team training and staged launch support', included: true },
      { text: 'Data migration and operational readiness review', included: true },
      { text: 'Document and desktop task support', included: true },
      { text: 'Dedicated implementation coordination', included: true },
      { text: 'Long-term improvement roadmap', included: true },
    ],
  },
];

export const pricingFaqs = [
  {
    question: 'Are these fixed packages or starting points?',
    answer:
      'They are starting points based on proven BizSuits examples. Final scope depends on your priorities, team size, and how much of the business you want to improve at once.',
  },
  {
    question: 'What if one of the examples already looks close to what we need?',
    answer:
      'That is the ideal case. We review the closest example, confirm what fits your business, and only plan the changes that matter.',
  },
  {
    question: 'Can the work happen in phases?',
    answer:
      'Yes. Many businesses start with one priority area such as stock control, storefront operations, or reporting, then expand once the first release is running well.',
  },
  {
    question: 'Do you support hosting, deployment, and training?',
    answer:
      'Yes. Setup, launch guidance, and team training are included. The exact setup depends on whether the work is browser-based, desktop-based, or both.',
  },
  {
    question: 'Can desktop automation be included?',
    answer:
      'Yes. Document-heavy work can be supported alongside the main business experience where needed. We scope that separately when it adds clear value.',
  },
  {
    question: 'What happens after go-live?',
    answer:
      'After launch, we support stabilization, team follow-up, and the next set of improvements as the business grows.',
  },
];

export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    icon: Target,
    title: 'Start From What Already Works',
    description:
      'We start from proven BizSuits examples rather than abstract requirements, so planning stays practical from the beginning.',
  },
  {
    icon: Layers,
    title: 'Keep Teams Connected',
    description:
      'Sales, operations, reporting, and customer experience are planned to work together, not as isolated tools.',
  },
  {
    icon: RefreshCw,
    title: 'Improve With Real Usage',
    description:
      'Changes are staged and refined from operational feedback so each release stays useful and easier to expand.',
  },
  {
    icon: Shield,
    title: 'Make Ownership Clear',
    description:
      'Hosting, handover, and responsibilities are agreed early so your team can run with confidence.',
  },
  {
    icon: Users,
    title: 'Support The Team',
    description:
      'Launch is only the beginning. Teams need onboarding, role clarity, and operational support for change to stick.',
  },
  {
    icon: BarChart3,
    title: 'Measure Business Performance',
    description:
      'Dashboards and reports are built around the decisions leaders and operators need to make every day.',
  },
];

export const deliverySteps: DeliveryStep[] = [
  {
    id: '01',
    title: 'Understand the business priority',
    description:
      'We review how the business works today and where the biggest gains are likely to come first.',
  },
  {
    id: '02',
    title: 'Shape how the team will work',
    description:
      'Roles, responsibilities, data flow, and reporting are aligned with day-to-day operations.',
  },
  {
    id: '03',
    title: 'Connect the important business areas',
    description:
      'Sales, operations, reporting, customer, or document-heavy work are connected so the experience feels joined up.',
  },
  {
    id: '04',
    title: 'Launch, train, and refine',
    description:
      'We support launch readiness, train the working team, and capture the next improvement cycle after real usage begins.',
  },
];

export const buildNoteCategories = [
  'All',
  'Business Strategy',
  'Retail Commerce',
  'Farm Operations',
  'Project Operations',
  'Documents & Reporting',
];

export const featuredBuildNote: BuildNote = {
  title: 'Seven practical BizSuits examples that can improve operations',
  excerpt:
    'Explore the live BizSuits examples already supporting retail, farm, operations, and document-heavy work.',
  category: 'Business Strategy',
  date: 'May 8, 2026',
  readTime: '8 min read',
  author: 'BizSuits Team',
  href: '/solutions',
};

export const buildNotes: BuildNote[] = [
  {
    title: 'Why Inventory Admin is a strong starting point for retail operations',
    excerpt:
      'Sales, stock, accounting, onboarding, and reporting already work together, giving retail teams a clearer place to start.',
    category: 'Retail Commerce',
    date: 'May 8, 2026',
    readTime: '6 min read',
    author: 'BizSuits Team',
    href: '/features#inventory-admin',
  },
  {
    title: 'How faster checkout and staff handoff improve day-to-day selling',
    excerpt:
      'The sales-point example shows how teams can sell faster, hand over shifts more smoothly, and keep checkout dependable.',
    category: 'Retail Commerce',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Team',
    href: '/features#sales-point',
  },
  {
    title: 'A storefront that makes browsing, ordering, and payment easier',
    excerpt:
      'This example brings catalog browsing, customer accounts, cart, checkout, and payment into one clear buying experience.',
    category: 'Retail Commerce',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Team',
    href: '/features#commerce-web',
  },
  {
    title: 'Farm operations with clearer control across animals, feeding, and finance',
    excerpt:
      'The farm-health example helps teams manage agricultural activity with better visibility across daily records and decisions.',
    category: 'Farm Operations',
    date: 'May 8, 2026',
    readTime: '6 min read',
    author: 'BizSuits Team',
    href: '/features#farm-health',
  },
  {
    title: 'Selling livestock, products, and services from one connected farm storefront',
    excerpt:
      'Animals, products, services, and shared stock movement come together in one customer-ready farm sales experience.',
    category: 'Farm Operations',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Team',
    href: '/features#farm-web-place',
  },
  {
    title: 'Operations oversight beyond tasks: facilities, incidents, budgets, and work orders',
    excerpt:
      'The project management suite supports operations-heavy teams that need coordination, visibility, and stronger control across the business.',
    category: 'Project Operations',
    date: 'May 8, 2026',
    readTime: '7 min read',
    author: 'BizSuits Team',
    href: '/features#project-management',
  },
  {
    title: 'When document extraction and desktop support become business priorities',
    excerpt:
      'Batch PDF processing, review-first extraction, and desktop support help teams handle document-heavy work with less manual effort.',
    category: 'Documents & Reporting',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Team',
    href: '/features#pdf-extractor',
  },
];