import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  FileText,
  FolderKanban,
  Leaf,
  Package,
  ShoppingCart,
  Sprout,
  Store,
} from 'lucide-react';

export interface PortfolioApp {
  slug: string;
  name: string;
  sourceProject: string;
  category: string;
  deliveryMode: string;
  previewImage?: string;
  icon: LucideIcon;
  gradient: string;
  summary: string;
  stack: string;
  status: string;
  modules: string[];
  signals: string[];
  href: string;
}

export interface DeliveryTrack {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  gradient: string;
  capabilities: string[];
  appSlugs: string[];
  href: string;
}

export const portfolioStats = [
  { value: '7', label: 'live examples' },
  { value: '4', label: 'business areas' },
  { value: '5', label: 'live walkthroughs' },
  { value: 'Web + Desktop', label: 'access options' },
];

export const portfolioApps: PortfolioApp[] = [
  {
    slug: 'inventory-admin',
    name: 'Inventory Admin',
    sourceProject: 'inventory-admin-app',
    category: 'Retail back office',
    deliveryMode: 'Browser workspace',
    icon: Package,
    gradient: 'from-cyan-500 to-blue-600',
    summary:
      'Keep stock, spending, accounting, and reporting aligned across locations.',
    stack: 'Next.js, MongoDB, Chart.js, barcode tooling, PDF generation',
    status: 'Gives managers one place to oversee day-to-day retail operations.',
    modules: [
      'Sales and expense visibility for faster business decisions',
      'Stock control, pricing, and category management',
      'Accounting, reporting, and performance review',
      'Onboarding, support, and multi-location oversight',
    ],
    signals: ['Sales visibility', 'Stock control', 'Financial oversight'],
    href: '/features#inventory-admin',
  },
  {
    slug: 'sales-point',
    name: 'Sales Point POS',
    sourceProject: 'sales-point-app',
    category: 'Frontline checkout',
    deliveryMode: 'In-store + browser',
    previewImage: '/images/Point of sales preview 1.png',
    icon: ShoppingCart,
    gradient: 'from-amber-500 to-orange-600',
    summary:
      'Support faster checkout, smoother staff handover, and clearer order handling at the counter.',
    stack: 'Next.js, React, local session flows, offline-aware UX',
    status: 'Keeps in-store selling fast and reliable during busy hours.',
    modules: [
      'Staff sign-in with location-aware access',
      'Fast basket building and checkout',
      'Customer and order handling at the counter',
      'Receipt-ready payments for daily selling',
    ],
    signals: ['Fast checkout', 'Order handling', 'Payment flow'],
    href: '/features#sales-point',
  },
  {
    slug: 'commerce-web',
    name: 'Commerce Web Front',
    sourceProject: 'webpage-app',
    category: 'Customer storefront',
    deliveryMode: 'Online storefront',
    icon: Store,
    gradient: 'from-sky-500 to-indigo-600',
    summary:
      'Help customers browse, order, and pay online with less friction.',
    stack: 'Next.js, MongoDB, Paystack, OTP account flows',
    status: 'Supports online sales and customer access in one storefront.',
    modules: [
      'Product browsing, categories, and account journeys',
      'Cart, checkout, and payment confirmation',
      'Customer access and order history',
      'Reliable browsing experience during busy periods',
    ],
    signals: ['Online ordering', 'Customer accounts', 'Storefront experience'],
    href: '/features#commerce-web',
  },
  {
    slug: 'farm-health',
    name: 'Farm Health Manager',
    sourceProject: 'farm-health-app',
    category: 'Farm operations',
    deliveryMode: 'Operations workspace',
    icon: Sprout,
    gradient: 'from-emerald-500 to-green-600',
    summary:
      'Track livestock, feed, finance, health, and daily farm activity in one place.',
    stack: 'Next.js, MongoDB, charting, cached operational dashboards',
    status: 'Gives farm operators clearer visibility across daily decisions.',
    modules: [
      'Animal records, lifecycle, and health history',
      'Breeding, feeding, and mortality oversight',
      'Finance, stock, and performance tracking',
      'Role-based access for different farm teams',
    ],
    signals: ['Animal records', 'Farm finances', 'Operational oversight'],
    href: '/features#farm-health',
  },
  {
    slug: 'farm-web-place',
    name: 'Farm Web Place',
    sourceProject: 'Web_Place',
    category: 'Agri-commerce storefront',
    deliveryMode: 'Online storefront',
    icon: Leaf,
    gradient: 'from-lime-500 to-green-700',
    summary:
      'Sell animals, farm products, and services from one connected storefront.',
    stack: 'Next.js, shared API integration, synchronized stock and services',
    status: 'Keeps farm sales and stock movement aligned.',
    modules: [
      'Animals, products, and service listings',
      'Shared stock updates and sales coordination',
      'Search, browsing, and service discovery',
      'Cart and checkout for customer orders',
    ],
    signals: ['Farm sales', 'Shared stock', 'Service bookings'],
    href: '/features#farm-web-place',
  },
  {
    slug: 'pdf-extractor',
    name: 'PDF Statement Extractor',
    sourceProject: 'Pdf extracter',
    category: 'Document automation',
    deliveryMode: 'Desktop tool',
    icon: FileText,
    gradient: 'from-slate-700 to-slate-900',
    summary:
      'Turn statement PDFs into usable spreadsheets faster with less manual review.',
    stack: 'Python, PyQt6, Camelot, Excel export, PyInstaller',
    status: 'Reduces manual effort in document-heavy finance work.',
    modules: [
      'Bring in single or batch PDF statements',
      'Apply bank-specific rules with less manual cleanup',
      'Review and confirm extracted records before export',
      'Export clean files for finance and reporting teams',
    ],
    signals: ['Faster extraction', 'Export-ready files', 'Review process'],
    href: '/features#pdf-extractor',
  },
  {
    slug: 'project-management',
    name: 'Project Management Suite',
    sourceProject: 'project_management',
    category: 'Operations and facility management',
    deliveryMode: 'Operations workspace',
    icon: FolderKanban,
    gradient: 'from-violet-600 to-fuchsia-600',
    summary:
      'Coordinate projects, maintenance, incidents, budgets, and field work from one operational view.',
    stack: 'Next.js, MongoDB, gantt planning, reporting, role-based auth',
    status: 'Helps teams stay organized across complex day-to-day operations.',
    modules: [
      'Project timelines, tasks, and progress tracking',
      'Budget visibility and leadership reporting',
      'Maintenance, work orders, and incident handling',
      'Locations, HSSE, and access oversight',
    ],
    signals: ['Project oversight', 'Budget visibility', 'Field coordination'],
    href: '/features#project-management',
  },
];

export const deliveryTracks: DeliveryTrack[] = [
  {
    id: 'retail-commerce',
    title: 'Retail and warehouse commerce',
    summary:
      'Keep stock, selling, and customer ordering connected across back office, checkout, and online channels.',
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-600',
    capabilities: [
      'Control stock, pricing, reporting, and expenses across locations',
      'Support faster selling and smoother handover at the counter',
      'Give customers a clearer path from browsing to checkout',
    ],
    appSlugs: ['inventory-admin', 'sales-point', 'commerce-web'],
    href: '/solutions#retail-commerce',
  },
  {
    id: 'farm-operations',
    title: 'Farm operations and sales',
    summary:
      'Run farm operations and sales together, from livestock and feed to products and services.',
    icon: Sprout,
    gradient: 'from-green-500 to-emerald-600',
    capabilities: [
      'Track animals, feeding, breeding, mortality, and health',
      'Monitor finances and stock across daily farm activity',
      'Sell livestock, products, and services through one connected storefront',
    ],
    appSlugs: ['farm-health', 'farm-web-place'],
    href: '/solutions#farm-operations',
  },
  {
    id: 'ops-delivery',
    title: 'Project, facility, and field operations',
    summary:
      'Coordinate projects, field work, budgets, compliance, and oversight in one place.',
    icon: FolderKanban,
    gradient: 'from-violet-500 to-fuchsia-600',
    capabilities: [
      'Plan work, track progress, and monitor performance',
      'Coordinate maintenance, incidents, emergency response, and field activity',
      'Improve visibility across budgets, locations, and approvals',
    ],
    appSlugs: ['project-management'],
    href: '/solutions#ops-delivery',
  },
  {
    id: 'document-automation',
    title: 'System App',
    summary:
      'Reduce the time spent turning operational documents into clean, usable reports.',
    icon: FileText,
    gradient: 'from-slate-600 to-slate-800',
    capabilities: [
      'Bring in batches of PDFs with less manual effort',
      'Review and confirm extracted data before reporting',
      'Give teams a desktop option when browser access is not ideal',
    ],
    appSlugs: ['pdf-extractor'],
    href: '/solutions#document-automation',
  },
];

export function getAppsForTrack(appSlugs: string[]) {
  return portfolioApps.filter((app) => appSlugs.includes(app.slug));
}