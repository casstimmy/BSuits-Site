import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BarChart3,
  Calculator,
  FileText,
  FolderKanban,
  Leaf,
  Package,
  ShoppingCart,
  Sprout,
  Store,
  Users,
  ExternalLink,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Demos - BizSuits | Live Business Examples',
  description:
    'Explore live examples of how BizSuits supports retail, farm operations, projects, and document-heavy work.',
};

// ─── Demo solution configs ────────────────────────────────────────────────────

const solutions = [
  {
    id: 'retail-commerce',
    title: 'Retail & Commerce',
    summary:
      'Bring back office, checkout, and customer ordering together in one retail experience.',
    gradient: 'from-sky-500 to-cyan-600',
    icon: Store,
    demos: [
      {
        name: 'Sales Point POS',
        description: 'Full till flow: staff login, categories, cart, payment, receipt.',
        href: '/demo/pos',
        icon: ShoppingCart,
        url: 'demo.bizsuits.com/pos',
        color: 'bg-teal-600',
        preview: (
          <div className="bg-teal-700 p-3 min-h-[120px]">
            <div className="bg-teal-800/50 rounded-lg px-3 py-2 mb-2 flex items-center justify-between text-white text-[10px]">
              <span className="font-semibold">St&apos;s Michael Hub</span>
              <span className="text-teal-300">Till #1</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {[{ e: '🍗', l: 'Chicken', p: '₦6,500' }, { e: '🍚', l: 'Rice 5kg', p: '₦8,000' }, { e: '🍷', l: 'Red Wine', p: '₦15,000' }].map((p) => (
                <div key={p.l} className="rounded-lg bg-teal-600/50 border border-teal-500/30 text-white text-[9px] text-center py-2 px-1">
                  <div className="text-sm mb-0.5">{p.e}</div>
                  <div className="truncate">{p.l}</div>
                  <div className="text-yellow-300 font-semibold mt-0.5">{p.p}</div>
                </div>
              ))}
            </div>
            <div className="bg-teal-900/60 rounded-lg p-2 text-[10px] text-white flex items-center justify-between">
              <span>Total due</span>
              <span className="font-bold text-yellow-300">₦14,500</span>
            </div>
          </div>
        ),
      },
      {
        name: 'Inventory Admin',
        description: 'Dashboard, stock management, expenses, accounting, and reporting.',
        href: '/demo/inventory',
        icon: Package,
        url: 'demo.bizsuits.com/inventory',
        color: 'bg-slate-800',
        preview: (
          <div className="flex min-h-[120px]">
            <div className="w-10 bg-slate-800 flex flex-col items-center py-2 gap-2">
              {[Package, BarChart3, Calculator].map((Icon, i) => (
                <div key={i} className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? 'bg-sky-500' : 'bg-slate-700'}`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
            <div className="flex-1 p-2 bg-slate-50 space-y-1.5">
              <div className="grid grid-cols-3 gap-1">
                {[['₦8.4M', 'bg-sky-50 text-sky-700 border-sky-100'], ['12 low', 'bg-amber-50 text-amber-700 border-amber-100'], ['84 orders', 'bg-emerald-50 text-emerald-700 border-emerald-100']].map(([v, cls]) => (
                  <div key={v} className={`rounded border px-1 py-1.5 text-[9px] font-semibold text-center ${cls}`}>{v}</div>
                ))}
              </div>
              <div className="rounded border border-slate-200 bg-white p-1 space-y-0.5">
                {['Premium Rice 25kg', 'Sunflower Oil 5L', 'Bottled Water 75cl'].map((item) => (
                  <div key={item} className="text-[9px] text-slate-500 flex items-center justify-between px-1">
                    <span className="truncate">{item}</span>
                    <span className="text-emerald-600">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Sales Analytics',
        description: 'Revenue trends, period comparisons, and sales intelligence charts.',
        href: '/demo/analytics',
        icon: BarChart3,
        url: 'demo.bizsuits.com/analytics',
        color: 'bg-indigo-600',
        preview: (
          <div className="bg-white p-3 min-h-[120px]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-slate-700">Sales — Today</p>
              <span className="text-[9px] text-emerald-600 font-semibold">+12.4%</span>
            </div>
            <div className="flex items-end gap-1 h-14 mb-2">
              {[28, 42, 58, 74, 67, 90, 62].map((v, i) => (
                <div key={i} className="flex-1 rounded-t bg-indigo-500" style={{ height: `${v}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-slate-400">
              {['8am', '10', '12', '2pm', '4', '6', '8'].map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>
        ),
      },
      {
        name: 'Accounting',
        description: 'Profit & loss, balance sheet, trial balance, and general ledger views.',
        href: '/demo/accounting',
        icon: Calculator,
        url: 'demo.bizsuits.com/accounting',
        color: 'bg-green-700',
        preview: (
          <div className="bg-white p-3 min-h-[120px]">
            <p className="text-[10px] font-semibold text-green-700 mb-2">Profit & Loss — This month</p>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] rounded bg-green-50 border border-green-100 px-2 py-1.5">
                <span className="text-green-700">Total Revenue</span>
                <span className="font-bold text-green-700">₦8.42M</span>
              </div>
              <div className="flex justify-between text-[9px] rounded bg-red-50 border border-red-100 px-2 py-1.5">
                <span className="text-red-700">Total Expenses</span>
                <span className="font-bold text-red-700">₦5.18M</span>
              </div>
              <div className="flex justify-between text-[9px] rounded bg-slate-900 px-2 py-1.5">
                <span className="text-white font-semibold">Net Profit</span>
                <span className="text-emerald-400 font-bold">₦3.24M</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'HR & Staff',
        description: 'Staff roster, salary, onboarding, guarantors, and payroll management.',
        href: '/demo/hr',
        icon: Users,
        url: 'demo.bizsuits.com/hr',
        color: 'bg-violet-700',
        preview: (
          <div className="bg-white p-3 min-h-[120px]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-violet-700">Staff — Ibile 1</p>
              <span className="text-[9px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">3 active</span>
            </div>
            <div className="space-y-1">
              {[{ n: 'John', r: 'Cashier', s: '₦85,000' }, { n: 'Jane', r: 'Supervisor', s: '₦120,000' }, { n: 'Doe', r: 'Storekeeper', s: '₦75,000' }].map((s) => (
                <div key={s.n} className="flex items-center gap-2 rounded bg-violet-50 border border-violet-100 px-2 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-bold text-[9px] shrink-0">
                    {s.n[0]}
                  </div>
                  <span className="text-[9px] text-violet-700 font-medium flex-1">{s.n} — {s.r}</span>
                  <span className="text-[9px] text-slate-500">{s.s}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'farm-operations',
    title: 'Farm Operations',
    summary:
      'Keep farm activity and farm sales aligned across livestock, products, and services.',
    gradient: 'from-emerald-500 to-green-600',
    icon: Sprout,
    demos: [
      {
        name: 'Farm Health Manager',
        description: 'Animals, breeding, feeding, health records, mortality, finance, and inventory.',
        href: '/demo/farm',
        icon: Leaf,
        url: 'demo.bizsuits.com/farm',
        color: 'bg-emerald-800',
        preview: (
          <div className="flex min-h-[120px]">
            <div className="w-10 bg-emerald-900 flex flex-col items-center py-2 gap-2">
              {[Sprout, Leaf, BarChart3].map((Icon, i) => (
                <div key={i} className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? 'bg-emerald-500' : 'bg-emerald-800'}`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
            <div className="flex-1 p-2 bg-slate-50 space-y-1.5">
              <div className="grid grid-cols-3 gap-1">
                {[['248 🐄', 'bg-emerald-50 text-emerald-700 border-emerald-100'], ['6 feeding', 'bg-amber-50 text-amber-700 border-amber-100'], ['14 health', 'bg-sky-50 text-sky-700 border-sky-100']].map(([v, cls]) => (
                  <div key={v} className={`rounded border px-1 py-1.5 text-[9px] font-semibold text-center ${cls}`}>{v}</div>
                ))}
              </div>
              <div className="flex items-end gap-1 h-10">
                {[40, 55, 62, 50, 72, 78, 65].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t bg-emerald-500" style={{ height: `${v}%` }} />
                ))}
              </div>
              <div className="rounded border border-slate-200 bg-white p-1 space-y-0.5">
                {['Animals · 248 active', 'Finance · ₦1.2M revenue', 'Inventory · 45 items'].map((item) => (
                  <div key={item} className="text-[9px] text-slate-500 px-1">{item}</div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'Farm Web Place',
        description: 'Agri-commerce storefront synchronized with farm operations for livestock, products, and services.',
        href: '/demo/farm-store',
        icon: Store,
        url: 'demo.bizsuits.com/farm-store',
        color: 'bg-lime-700',
        preview: (
          <div className="bg-white min-h-[120px]">
            <div className="bg-emerald-700 px-3 py-2 flex items-center justify-between text-white">
              <span className="text-[10px] font-bold">🌿 Farm Web Place</span>
              <span className="text-[10px]">🛒 Cart</span>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-3 gap-1.5">
                {[{ e: '🐄', l: 'Livestock' }, { e: '🌾', l: 'Products' }, { e: '🩺', l: 'Services' }].map((c) => (
                  <div key={c.l} className="rounded-lg bg-emerald-50 border border-emerald-100 text-[9px] text-center py-2 text-emerald-700">
                    <div className="text-sm mb-0.5">{c.e}</div>
                    {c.l}
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-lg bg-emerald-700 text-white text-[9px] font-semibold text-center py-1.5">
                Shop Now →
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ops-delivery',
    title: 'Project & Operations',
    summary:
      'Enterprise workspace for project delivery, work orders, facility maintenance, budgets, HSSE, and compliance management.',
    gradient: 'from-violet-600 to-fuchsia-600',
    icon: FolderKanban,
    demos: [
      {
        name: 'OPALshire — Project Management',
        description:
          'Projects, tasks, timelines, work orders, budgets, HSSE, incidents, and facility management.',
        href: '/demo/ops',
        icon: FolderKanban,
        url: 'demo.bizsuits.com/ops',
        color: 'bg-slate-900',
        preview: (
          <div className="flex min-h-[120px]">
            <div className="w-10 bg-slate-900 flex flex-col items-center py-2 gap-2">
              {[FolderKanban, BarChart3, FileText].map((Icon, i) => (
                <div key={i} className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
            <div className="flex-1 p-2 bg-slate-50 space-y-1.5">
              <div className="grid grid-cols-3 gap-1">
                {[['12 projects', 'bg-violet-50 text-violet-700 border-violet-100'], ['8 W-orders', 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100'], ['63% budget', 'bg-sky-50 text-sky-700 border-sky-100']].map(([v, cls]) => (
                  <div key={v} className={`rounded border px-1 py-1.5 text-[9px] font-semibold text-center ${cls}`}>{v}</div>
                ))}
              </div>
              <div className="rounded border border-slate-200 bg-white p-1 space-y-0.5">
                {['Facility upgrade — In progress', 'Safety audit — Pending', 'Generator svc — Planned'].map((item) => (
                  <div key={item} className="text-[9px] text-slate-500 flex items-center justify-between px-1">
                    <span className="truncate">{item}</span>
                    <FolderKanban className="w-2.5 h-2.5 text-violet-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'document-automation',
    title: 'Document Automation',
    summary:
      'Desktop utility for extracting bank statement tables from PDFs into reviewed Excel and CSV outputs.',
    gradient: 'from-slate-600 to-slate-800',
    icon: FileText,
    demos: [
      {
        name: 'PDF Statement Extractor',
        description:
          'Batch PDF intake, bank profile selection, table extraction, preview, and Excel export.',
        href: '/demo/document',
        icon: FileText,
        url: 'demo.bizsuits.com/document',
        color: 'bg-slate-700',
        preview: (
          <div className="bg-slate-200 min-h-[120px]">
            <div className="bg-slate-700 px-3 py-1.5 flex items-center justify-between text-white">
              <span className="text-[9px] font-semibold">PDF Statement Extractor</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="rounded border-2 border-dashed border-slate-300 bg-white px-3 py-3 text-center">
                <FileText className="w-5 h-5 text-slate-400 mx-auto mb-0.5" />
                <p className="text-[9px] text-slate-400">Drop PDF statements here</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-blue-600 text-white text-[9px] font-semibold rounded py-1.5 text-center">Extract Tables</div>
                <div className="bg-emerald-600 text-white text-[9px] font-semibold rounded py-1.5 text-center">Export .xlsx</div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DemoHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Interactive Demos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6 text-balance">
            Explore how BizSuits supports daily work{' '}
            <span className="gradient-text">live, in the browser</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-3xl mx-auto mb-8">
            Each example shows how selling, operations, reporting, and customer activity can work in practice. Click any card below to open the full walkthrough.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/demo/pos" icon={<ArrowRight className="w-5 h-5" />}>
              Start with Retail Example
            </Button>
            <Button variant="secondary" size="lg" href="/solutions">
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions with demos */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            badge="Live Examples"
            title="Examples organized by business area"
            subtitle="Each area includes interactive examples you can open directly in the browser."
          />

          {solutions.map((solution, solutionIndex) => (
            <div
              key={solution.id}
              id={solution.id}
              className={solutionIndex < solutions.length - 1 ? 'mb-20 md:mb-28' : ''}
            >
              {/* Solution header */}
              <div className="flex items-start gap-4 mb-7">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center shadow-lg shrink-0 mt-0.5`}
                >
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-1.5">
                    {solution.title}
                  </h2>
                  <p className="text-dark-500 leading-relaxed">{solution.summary}</p>
                </div>
              </div>

              {/* Demo cards */}
              <div
                className={`grid gap-5 ${
                  solution.demos.length === 1
                    ? 'max-w-md'
                    : solution.demos.length === 2
                    ? 'sm:grid-cols-2 max-w-2xl'
                    : solution.demos.length >= 4
                    ? 'sm:grid-cols-2 xl:grid-cols-3'
                    : 'sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {solution.demos.map((demo) => (
                  <Link key={demo.href} href={demo.href} className="group block">
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-200 group-hover:-translate-y-0.5">
                      {/* Browser chrome preview */}
                      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md mb-4">
                        <div className="bg-[#f1f3f4] border-b border-gray-200 px-2.5 py-1.5 flex items-center gap-2">
                          <div className="flex items-center gap-1 shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                          </div>
                          <div className="flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-gray-500 border border-gray-200 flex items-center gap-1">
                            <span className="text-green-600 text-[9px]">🔒</span>
                            <span className="truncate">{demo.url}</span>
                          </div>
                        </div>
                        {demo.preview}
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg ${demo.color} flex items-center justify-center shrink-0`}
                        >
                          <demo.icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-dark-900">{demo.name}</h3>
                      </div>
                      <p className="text-xs text-dark-500 mb-3">{demo.description}</p>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                        <ExternalLink className="w-3 h-3" />
                        Open interactive demo
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want a tailored walkthrough for your business?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            These examples show working BizSuits experiences. We can walk through the closest fit for your operation and recommend the best starting point.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-5 h-5" />}>
              Book a Walkthrough
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
