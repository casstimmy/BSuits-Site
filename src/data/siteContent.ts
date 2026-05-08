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
    name: 'Track Adaptation',
    description:
      'A focused rollout that adapts one proven build family to your workflow and gets your first surface live quickly.',
    price: 300000,
    badge: 'Single-track rollout',
    cta: 'Scope this engagement',
    ctaVariant: 'secondary',
    recommendedTrackIds: ['farm-operations', 'document-automation'],
    features: [
      { text: 'Discovery review against a current reference build', included: true },
      { text: 'One primary delivery track adapted to your workflow', included: true },
      { text: 'Core setup, branding, and user readiness', included: true },
      { text: 'Launch checklist and team handoff', included: true },
      { text: 'Reporting refinement for the first release', included: true },
      { text: 'Cross-track integrations', included: false },
      { text: 'Desktop packaging or installer delivery', included: false },
      { text: 'Dedicated rollout manager', included: false },
    ],
  },
  {
    name: 'Connected Commerce Rollout',
    description:
      'For teams launching linked selling surfaces such as admin, POS, and storefront flows with shared reporting and rollout support.',
    price: 600000,
    badge: 'Retail and farm commerce',
    cta: 'Plan this rollout',
    ctaVariant: 'primary',
    highlighted: true,
    recommendedTrackIds: ['retail-commerce', 'farm-operations'],
    features: [
      { text: 'Reference-led discovery and fit-gap review', included: true },
      { text: 'Connected back office, selling, and customer surfaces', included: true },
      { text: 'Location-aware stock and order flows', included: true },
      { text: 'Payment, reporting, and operational dashboards', included: true },
      { text: 'Go-live support and operator training', included: true },
      { text: 'Custom workflow tailoring across two or more surfaces', included: true },
      { text: 'Desktop automation module', included: false },
      { text: 'Enterprise multi-track orchestration', included: false },
    ],
  },
  {
    name: 'Operations Platform Delivery',
    description:
      'A multi-surface delivery for teams combining operations, reporting, project workflows, and deeper customization across departments.',
    price: 900000,
    badge: 'Multi-surface platform',
    cta: 'Design the platform',
    ctaVariant: 'dark',
    recommendedTrackIds: ['ops-delivery', 'retail-commerce', 'document-automation'],
    features: [
      { text: 'Multi-track planning from current build references', included: true },
      { text: 'Custom dashboards, workflows, and reporting surfaces', included: true },
      { text: 'Role-based rollout and process alignment', included: true },
      { text: 'Cross-team training and staged launch support', included: true },
      { text: 'Data migration and operational readiness review', included: true },
      { text: 'Automation or desktop utility scoping', included: true },
      { text: 'Dedicated rollout coordination', included: true },
      { text: 'Long-term enhancement roadmap', included: true },
    ],
  },
];

export const pricingFaqs = [
  {
    question: 'Are these fixed packages or starting points?',
    answer:
      'They are starting points anchored to the current build portfolio. Final scope depends on how closely your workflow matches an existing reference build and how many surfaces need to launch together.',
  },
  {
    question: 'What if I already want one of the current app patterns?',
    answer:
      'That is the ideal case. We review the closest existing build, identify what can be reused, and only scope the deltas required for your business.',
  },
  {
    question: 'Can rollout happen in phases?',
    answer:
      'Yes. Many teams start with one track such as back office, farm operations, or storefront delivery, then add adjacent surfaces after the first release is stable.',
  },
  {
    question: 'Do you support hosting, deployment, and training?',
    answer:
      'Yes. Setup, deployment guidance, and operator training are part of delivery. The exact hosting or device setup path depends on whether the solution is web-based, desktop-based, or both.',
  },
  {
    question: 'Can desktop automation be included?',
    answer:
      'Yes. The PDF extraction utility shows that desktop packaging can sit alongside the web platform when the workflow calls for it. We scope that separately where needed.',
  },
  {
    question: 'What happens after go-live?',
    answer:
      'Post-launch support covers stabilization, training follow-up, and the next set of improvements. We also help define the enhancement roadmap from the first live release.',
  },
];

export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    icon: Target,
    title: 'Start From Live References',
    description:
      'We begin with the closest working build instead of abstract requirements only. That shortens discovery and keeps solution discussions concrete.',
  },
  {
    icon: Layers,
    title: 'Connect Surfaces Deliberately',
    description:
      'Selling, operations, reporting, and customer flows are designed as connected layers so the platform does not split into isolated tools.',
  },
  {
    icon: RefreshCw,
    title: 'Iterate From Real Usage',
    description:
      'Rollouts are staged and refined from operational feedback. That is how the current portfolio grew into multiple delivery tracks.',
  },
  {
    icon: Shield,
    title: 'Keep Ownership Explicit',
    description:
      'Deployment, hosting assumptions, and handoff expectations are discussed upfront so the final system stays usable and maintainable for the client team.',
  },
  {
    icon: Users,
    title: 'Train The Operators',
    description:
      'Go-live is not finished at deployment. Teams need handover, role alignment, and operational guidance for the system to stick.',
  },
  {
    icon: BarChart3,
    title: 'Measure What Matters',
    description:
      'Dashboards and reports are treated as part of the product, not a late add-on, because they shape daily operational decisions.',
  },
];

export const deliverySteps: DeliveryStep[] = [
  {
    id: '01',
    title: 'Review the closest build reference',
    description:
      'We map your workflow against the nearest active application and identify what should be reused, removed, or extended.',
  },
  {
    id: '02',
    title: 'Shape the operating flow',
    description:
      'Modules, users, data movement, and reporting needs are defined around the actual day-to-day process rather than a generic template.',
  },
  {
    id: '03',
    title: 'Connect the surfaces',
    description:
      'Admin, selling, operational, customer, or automation surfaces are wired together so the rollout behaves like one system.',
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
  'Portfolio Refresh',
  'Retail Commerce',
  'Farm Operations',
  'Project Delivery',
  'Automation',
];

export const featuredBuildNote: BuildNote = {
  title: 'How BizSuits was reframed around seven active builds',
  excerpt:
    'The public site now reflects the real application portfolio instead of a generic all-in-one SaaS story. This note walks through the shift from placeholder positioning to concrete delivery tracks.',
  category: 'Portfolio Refresh',
  date: 'May 8, 2026',
  readTime: '8 min read',
  author: 'BizSuits Product Review',
  href: '/admin',
};

export const buildNotes: BuildNote[] = [
  {
    title: 'Inventory Admin as the anchor for retail back office delivery',
    excerpt:
      'Sales, stock, accounting, onboarding, and reporting already exist as one reference build. That makes retail admin delivery a matter of adaptation, not invention.',
    category: 'Retail Commerce',
    date: 'May 8, 2026',
    readTime: '6 min read',
    author: 'BizSuits Product Review',
    href: '/features#inventory-admin',
  },
  {
    title: 'Why the POS reference matters: staff login, till flow, menu, customers, orders',
    excerpt:
      'The sales-point app gives BizSuits a concrete frontline pattern for fast selling, staff handoff, and receipt-ready checkout instead of a conceptual POS module.',
    category: 'Retail Commerce',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Product Review',
    href: '/features#sales-point',
  },
  {
    title: 'Storefront delivery now has a real commerce reference, not a brochure promise',
    excerpt:
      'The commerce web build contributes catalog, account, cart, checkout, and payment flows that the public site can now point to honestly.',
    category: 'Retail Commerce',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Product Review',
    href: '/features#commerce-web',
  },
  {
    title: 'Farm operations are already covered across animals, breeding, feeding, and finance',
    excerpt:
      'The farm-health app gives BizSuits working references for agricultural operations, role-aware dashboards, and record-heavy workflows.',
    category: 'Farm Operations',
    date: 'May 8, 2026',
    readTime: '6 min read',
    author: 'BizSuits Product Review',
    href: '/features#farm-health',
  },
  {
    title: 'Farm Web Place proves the linked agri-commerce model',
    excerpt:
      'Animals, products, services, and synchronized stock movement are already represented in a customer-facing sales surface connected to farm operations.',
    category: 'Farm Operations',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Product Review',
    href: '/features#farm-web-place',
  },
  {
    title: 'Project delivery is broader than tasks: facilities, incidents, budgets, and work orders',
    excerpt:
      'The project management suite shows BizSuits can support operations-heavy teams that need more than a lightweight task board.',
    category: 'Project Delivery',
    date: 'May 8, 2026',
    readTime: '7 min read',
    author: 'BizSuits Product Review',
    href: '/features#project-management',
  },
  {
    title: 'The PDF extractor expands the delivery footprint beyond the browser',
    excerpt:
      'Batch PDF processing, review-first extraction, and installer packaging prove BizSuits can include desktop utilities when the workflow requires it.',
    category: 'Automation',
    date: 'May 8, 2026',
    readTime: '5 min read',
    author: 'BizSuits Product Review',
    href: '/features#pdf-extractor',
  },
];