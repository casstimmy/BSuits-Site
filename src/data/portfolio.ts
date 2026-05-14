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
  demoHref?: string;
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
  { value: '7', label: 'active systems' },
  { value: '4', label: 'delivery tracks' },
  { value: '5', label: 'interactive demos' },
  { value: 'Web + Desktop', label: 'deployment coverage' },
];

export const portfolioApps: PortfolioApp[] = [
  {
    slug: 'inventory-admin',
    name: 'Inventory Admin',
    sourceProject: 'inventory-admin-app',
    category: 'Retail back office',
    deliveryMode: 'Web app',
    demoHref: '/demo/inventory',
    icon: Package,
    gradient: 'from-cyan-500 to-blue-600',
    summary:
      'Back-office control plane for stock, accounting, expenses, setup, onboarding, and reporting across locations.',
    stack: 'Next.js, MongoDB, Chart.js, barcode tooling, PDF generation',
    status: 'Operational dashboard with multi-module admin flows',
    modules: [
      'Sales, expense, and order intelligence dashboard',
      'Stock control, product setup, and category management',
      'Expenses, accounting, and reporting workspaces',
      'Onboarding, support, and multi-location setup flows',
    ],
    signals: ['Dashboard analytics', 'Stock and setup modules', 'Accounting and reporting'],
    href: '/features#inventory-admin',
  },
  {
    slug: 'sales-point',
    name: 'Sales Point POS',
    sourceProject: 'sales-point-app',
    category: 'Frontline checkout',
    deliveryMode: 'Desktop / Web App',
    demoHref: '/demo/pos',
    previewImage: '/images/Point of sales preview 1.png',
    icon: ShoppingCart,
    gradient: 'from-amber-500 to-orange-600',
    summary:
      'Counter-side POS flow with staff login, menu selling, customer handling, order views, and receipt-ready checkout.',
    stack: 'Next.js, React, local session flows, offline-aware UX',
    status: 'Operational POS experience with till and payment flows',
    modules: [
      'Staff authentication and location-aware access',
      'Fast menu-based selling with cart management',
      'Customer and order screens for service operations',
      'Receipt printing and resilient offline-ready interactions',
    ],
    signals: ['PIN login UX', 'Menu and order tabs', 'Receipt and payment flow'],
    href: '/features#sales-point',
  },
  {
    slug: 'commerce-web',
    name: 'Commerce Web Front',
    sourceProject: 'webpage-app',
    category: 'Customer storefront',
    deliveryMode: 'Web storefront',
    demoHref: '/demo',
    icon: Store,
    gradient: 'from-sky-500 to-indigo-600',
    summary:
      'Warehouse storefront with catalog browsing, cart, checkout, OTP account access, and payment-backed order handling.',
    stack: 'Next.js, MongoDB, Paystack, OTP account flows',
    status: 'Customer-facing commerce surface with order capture',
    modules: [
      'Catalog, categories, product detail, and account journeys',
      'Cart, checkout, and payment verification flows',
      'Customer OTP access and order history paths',
      'Seeded fallback behavior for preview resilience',
    ],
    signals: ['Checkout stack', 'Customer account UX', 'Store catalog'],
    href: '/features#commerce-web',
  },
  {
    slug: 'farm-health',
    name: 'Farm Health Manager',
    sourceProject: 'farm-health-app',
    category: 'Farm operations',
    deliveryMode: 'Web operations suite',
    demoHref: '/demo/farm',
    icon: Sprout,
    gradient: 'from-emerald-500 to-green-600',
    summary:
      'Farm operations dashboard covering animals, inventory, finance, mortality, breeding, health records, and feeding.',
    stack: 'Next.js, MongoDB, charting, cached operational dashboards',
    status: 'Role-aware agricultural management workspace',
    modules: [
      'Animal registry, lifecycle, and health history',
      'Breeding, feeding, and mortality tracking',
      'Inventory and finance records with analytics',
      'Role-based routing with staged data loading',
    ],
    signals: ['Animal dashboard', 'Finance and inventory', 'Breeding and health records'],
    href: '/features#farm-health',
  },
  {
    slug: 'farm-web-place',
    name: 'Farm Web Place',
    sourceProject: 'Web_Place',
    category: 'Agri-commerce storefront',
    deliveryMode: 'Web storefront',
    demoHref: '/demo/farm-store',
    icon: Leaf,
    gradient: 'from-lime-500 to-green-700',
    summary:
      'Agricultural storefront synchronized with farm operations for livestock, products, services, search, and cart-based buying.',
    stack: 'Next.js, shared API integration, synchronized stock and services',
    status: 'Linked sales surface for farm inventory and services',
    modules: [
      'Animals, products, and services catalogues',
      'Shared stock deduction and sales sync',
      'Search, category browsing, and service discovery',
      'Customer cart and authenticated checkout flow',
    ],
    signals: ['Shared inventory sync', 'Animals plus products catalog', 'Farm services checkout'],
    href: '/features#farm-web-place',
  },
  {
    slug: 'pdf-extractor',
    name: 'PDF Statement Extractor',
    sourceProject: 'Pdf extracter',
    category: 'Document automation',
    deliveryMode: 'Windows desktop app',
    demoHref: '/demo/document',
    icon: FileText,
    gradient: 'from-slate-700 to-slate-900',
    summary:
      'Desktop utility for extracting bank statement tables from PDFs into reviewed Excel and CSV outputs.',
    stack: 'Python, PyQt6, Camelot, Excel export, PyInstaller',
    status: 'Packaged desktop workflow with installer-ready release flow',
    modules: [
      'Drag-and-drop PDF intake with batch processing',
      'Bank profile-aware extraction and normalization',
      'Preview, verification, and formatted Excel export',
      'Portable executable and installer build pipeline',
    ],
    signals: ['Batch document processing', 'Excel export', 'Installer packaging'],
    href: '/features#pdf-extractor',
  },
  {
    slug: 'project-management',
    name: 'Project Management Suite',
    sourceProject: 'project_management',
    category: 'Operations and facility management',
    deliveryMode: 'Web operations suite',
    demoHref: '/demo/ops',
    icon: FolderKanban,
    gradient: 'from-violet-600 to-fuchsia-600',
    summary:
      'Operations workspace spanning projects, budgets, emergency response, HSSE, incidents, maintenance, and work orders.',
    stack: 'Next.js, MongoDB, gantt planning, reporting, role-based auth',
    status: 'Enterprise operations workspace with project and facility modules',
    modules: [
      'Projects, tasks, timelines, and delivery views',
      'Budgets, reports, and leadership oversight surfaces',
      'Maintenance, work order, and incident management',
      'Locations, emergency, HSSE, and access-controlled workflows',
    ],
    signals: ['Project and facility modules', 'Budget and incident workflows', 'Role-based access'],
    href: '/features#project-management',
  },
];

export const deliveryTracks: DeliveryTrack[] = [
  {
    id: 'retail-commerce',
    title: 'Retail and warehouse commerce',
    summary:
      'A connected retail stack covering back-office inventory, frontline POS, and customer-facing web commerce.',
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-600',
    capabilities: [
      'Multi-location stock, setup, reporting, and expense control',
      'Fast checkout, staff access, and receipt-ready POS journeys',
      'Catalog, cart, account, and checkout paths for customers',
    ],
    appSlugs: ['inventory-admin', 'sales-point', 'commerce-web'],
    href: '/solutions#retail-commerce',
  },
  {
    id: 'farm-operations',
    title: 'Farm operations and agri-commerce',
    summary:
      'Operational agriculture software paired with a linked storefront for livestock, inventory, and services.',
    icon: Sprout,
    gradient: 'from-green-500 to-emerald-600',
    capabilities: [
      'Animal, feeding, breeding, mortality, and health record management',
      'Farm finance and stock control across daily operations',
      'Synchronized e-commerce for animals, products, and services',
    ],
    appSlugs: ['farm-health', 'farm-web-place'],
    href: '/solutions#farm-operations',
  },
  {
    id: 'ops-delivery',
    title: 'Project, facility, and field operations',
    summary:
      'A delivery stack for teams managing projects, work orders, budgets, locations, and compliance-heavy operations.',
    icon: FolderKanban,
    gradient: 'from-violet-500 to-fuchsia-600',
    capabilities: [
      'Project planning, task tracking, and reporting',
      'Maintenance, incidents, emergency, and work-order coordination',
      'Role-aware access across budgets, locations, and field workflows',
    ],
    appSlugs: ['project-management'],
    href: '/solutions#ops-delivery',
  },
  {
    id: 'document-automation',
    title: 'Document extraction and reporting',
    summary:
      'Automation workflows that turn raw operational documents into clean, usable spreadsheets and outputs.',
    icon: FileText,
    gradient: 'from-slate-600 to-slate-800',
    capabilities: [
      'Batch PDF intake and configurable parsing profiles',
      'Review-first extraction with validation before export',
      'Desktop packaging for teams that need offline distribution',
    ],
    appSlugs: ['pdf-extractor'],
    href: '/solutions#document-automation',
  },
];

export function getAppsForTrack(appSlugs: string[]) {
  return portfolioApps.filter((app) => appSlugs.includes(app.slug));
}