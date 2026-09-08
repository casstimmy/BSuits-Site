import React from 'react';
import Image from 'next/image';
import {
  BadgeCheck,
  BarChart3,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  Monitor,
  Receipt,
  ShoppingCart,
  Leaf,
  HeartPulse,
  Sprout,
  Building2,
  AlertTriangle,
  Package,
} from 'lucide-react';

export type SolutionTrackId = 'retail-commerce' | 'farm-operations' | 'ops-delivery' | 'document-automation';

function DeviceFrame({
  label,
  className,
  children,
}: {
  label: string;
  variant?: 'laptop' | 'terminal' | 'tablet' | 'phone' | 'desktop';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-dark-500 mb-2">{label}</p>
      <div className="relative border-2 border-dark-950 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] overflow-hidden">
        <div className="bg-white min-h-[150px]">{children}</div>
      </div>
    </div>
  );
}

function AppHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="px-3.5 py-2.5 border-b border-dark-200 bg-dark-50">
      <p className="text-xs font-bold text-dark-900 tracking-tight">{title}</p>
      <p className="text-[10px] font-mono text-dark-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`border p-2.5 ${tone}`}>
      <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] opacity-80">{label}</p>
      <p className="text-sm font-bold font-mono mt-1">{value}</p>
    </div>
  );
}

function RetailCommerceMockup() {
  return (
    <div className="relative h-[460px] border-2 border-dark-950 bg-white p-5 overflow-hidden grid-pattern">
      {/* Inventory Admin — left laptop */}
      <DeviceFrame label="Inventory Admin — back office" variant="laptop" className="relative z-10 max-w-[340px]">
        <AppHeader title="Inventory Admin" subtitle="Dashboard · Stock · Expenses · Reporting" />
        <div className="flex min-h-[150px]">
          {/* Mini sidebar */}
          <div className="w-12 bg-dark-950 flex flex-col items-center py-3 gap-2 shrink-0">
            {[Package, BarChart3, ShoppingCart, FileText, BadgeCheck].map((Icon, i) => (
              <div key={i} className={`w-7 h-7 flex items-center justify-center border ${i === 0 ? 'bg-primary-600 border-primary-500 text-white' : 'border-dark-800 text-dark-400'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 space-y-2 bg-dark-50">
            <div className="grid grid-cols-3 gap-2">
              <MetricCard label="Revenue" value="₦8.4M" tone="bg-white border-dark-200 text-dark-900" />
              <MetricCard label="Low stock" value="12" tone="bg-white border-amber-300 text-amber-800" />
              <MetricCard label="Orders" value="84" tone="bg-white border-primary-200 text-primary-900" />
            </div>
            <div className="border border-dark-200 bg-white p-2 space-y-1">
              {['Outlet sync', 'Expense log', 'Stock alert'].map((item) => (
                <div key={item} className="flex items-center justify-between text-[10px] font-mono text-dark-600">
                  <span>{item}</span>
                  <BadgeCheck className="w-3.5 h-3.5 text-primary-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DeviceFrame>

      {/* Sales Point POS — center */}
      <div className="absolute right-28 top-5 z-20 w-[175px]">
        <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-dark-500 mb-2">Sales Point POS — till</p>
        <div className="relative border-2 border-dark-950 bg-dark-950 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] overflow-hidden">
          <Image
            src="/images/Point of sales preview 1.png"
            alt="Sales Point POS checkout interface"
            width={400}
            height={700}
            className="w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Commerce Web storefront — bottom right phone */}
      <DeviceFrame label="Commerce Web — storefront" variant="phone" className="absolute right-4 bottom-4 z-20 w-[140px]">
        <AppHeader title="Online Store" subtitle="Shop · Cart · Checkout" />
        <div className="p-2.5 space-y-2 bg-white">
          <div className="bg-dark-50 border border-dark-200 px-2 py-1.5 text-[10px] text-dark-800 font-mono">
            SHOP // ALL PRODUCTS
          </div>
          <div className="grid grid-cols-2 gap-1">
            {['Rice', 'Oil', 'Eggs', 'Water'].map((item) => (
              <div key={item} className="border border-dark-200 bg-white px-1 py-1 text-[9px] text-center font-mono text-dark-700">
                {item}
              </div>
            ))}
          </div>
          <div className="bg-dark-950 text-white px-2 py-1.5 text-[9px] font-mono uppercase tracking-wider text-center">
            Checkout →
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}

function FarmOperationsMockup() {
  return (
    <div className="relative h-[460px] border-2 border-dark-950 bg-white p-5 overflow-hidden grid-pattern">
      {/* Farm Health Manager — laptop */}
      <DeviceFrame label="Farm Health Manager — operations" variant="laptop" className="relative z-10 max-w-[365px]">
        <AppHeader title="Farm Health Manager" subtitle="Animals · Feeding · Breeding · Finance" />
        <div className="flex min-h-[150px]">
          {/* Sidebar */}
          <div className="w-12 bg-dark-950 flex flex-col items-center py-3 gap-2 shrink-0">
            {[Sprout, HeartPulse, Leaf, BarChart3, FileText].map((Icon, i) => (
              <div key={i} className={`w-7 h-7 flex items-center justify-center border ${i === 0 ? 'bg-primary-600 border-primary-500 text-white' : 'border-dark-800 text-dark-400'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 space-y-2 bg-dark-50">
            <div className="grid grid-cols-3 gap-2">
              <MetricCard label="Animals" value="248" tone="bg-white border-dark-200 text-dark-900" />
              <MetricCard label="Feeding" value="6 due" tone="bg-white border-amber-300 text-amber-800" />
              <MetricCard label="Health" value="14 new" tone="bg-white border-primary-200 text-primary-900" />
            </div>
            <div className="border border-dark-200 bg-white p-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-dark-600 mb-2">
                <span>WEEKLY LIVESTOCK</span>
                <BarChart3 className="w-3.5 h-3.5 text-primary-600" />
              </div>
              <div className="flex items-end gap-1 h-10">
                {[40, 55, 62, 50, 72, 78, 65].map((v, i) => (
                  <div key={i} className="flex-1 bg-dark-950" style={{ height: `${v}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DeviceFrame>

      {/* Farm Web Place storefront — tablet */}
      <DeviceFrame label="Farm Web Place — agri-storefront" variant="tablet" className="absolute right-4 top-6 z-20 w-[210px]">
        <AppHeader title="Farm Web Place" subtitle="Animals · Products · Services" />
        <div className="p-3 space-y-2">
          <div className="bg-dark-50 border border-dark-200 px-3 py-1.5 text-[10px] text-dark-800 font-mono flex items-center gap-2">
            <Leaf className="w-3 h-3 text-primary-600" /> DIRECT DISPATCH
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Livestock', tone: 'bg-white border-dark-200 text-dark-800' },
              { label: 'Products', tone: 'bg-white border-dark-200 text-dark-800' },
              { label: 'Services', tone: 'bg-white border-dark-200 text-dark-800' },
              { label: 'Cart', tone: 'bg-white border-dark-200 text-dark-800' },
            ].map((c) => (
              <div key={c.label} className={`border p-2 text-[10px] font-mono uppercase text-center ${c.tone}`}>
                {c.label}
              </div>
            ))}
          </div>
          <div className="bg-dark-950 text-white text-[10px] font-mono uppercase tracking-wider text-center py-2">
            Checkout →
          </div>
        </div>
      </DeviceFrame>

      {/* Field phone */}
      <DeviceFrame label="Field — mobile log" variant="phone" className="absolute left-[245px] bottom-4 z-20 w-[140px]">
        <AppHeader title="Animal log" subtitle="Field entry" />
        <div className="p-2 space-y-1.5">
          {['Vaccination done', 'Weight recorded', 'Feed adjusted'].map((item) => (
            <div key={item} className="border border-dark-200 bg-white px-2 py-1.5 text-[9px] font-mono text-dark-700 flex items-center gap-1.5">
              <BadgeCheck className="w-3 h-3 text-primary-600 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </DeviceFrame>
    </div>
  );
}

function OperationsMockup() {
  return (
    <div className="relative h-[460px] border-2 border-dark-950 bg-white p-5 overflow-hidden grid-pattern">
      {/* Project Management — main desktop */}
      <DeviceFrame label="OPALshire — project workspace" variant="desktop" className="relative z-10 max-w-[390px]">
        <AppHeader title="Project Management Suite" subtitle="Projects · Work Orders · Budgets · HSSE" />
        <div className="flex min-h-[170px]">
          {/* Dark sidebar like actual app */}
          <div className="w-12 bg-dark-950 flex flex-col items-center py-3 gap-2 shrink-0">
            {[Building2, FolderKanban, AlertTriangle, FileText, BarChart3].map((Icon, i) => (
              <div key={i} className={`w-7 h-7 flex items-center justify-center border ${i === 0 ? 'bg-primary-600 border-primary-500 text-white' : 'border-dark-800 text-dark-400'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 bg-dark-50 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <MetricCard label="Projects" value="12 live" tone="bg-white border-dark-200 text-dark-900" />
              <MetricCard label="W-Orders" value="8 open" tone="bg-white border-amber-300 text-amber-800" />
              <MetricCard label="Budget" value="63%" tone="bg-white border-primary-200 text-primary-900" />
            </div>
            <div className="border border-dark-200 bg-white p-2 space-y-1">
              {['Facility upgrade — In progress', 'Safety audit — Pending', 'Maintenance Q3 — Planned'].map((item) => (
                <div key={item} className="flex items-center justify-between text-[10px] font-mono text-dark-600">
                  <span className="truncate flex-1">{item}</span>
                  <FolderKanban className="w-3 h-3 text-primary-600 shrink-0 ml-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DeviceFrame>

      {/* Work orders on tablet */}
      <DeviceFrame label="Work orders — field tablet" variant="tablet" className="absolute right-4 top-8 z-20 w-[200px]">
        <AppHeader title="Work Orders" subtitle="Field assignments" />
        <div className="p-2 space-y-1.5">
          {[
            { text: 'Electrical fix', badge: 'Assigned', tone: 'bg-dark-100 text-dark-800' },
            { text: 'Safety audit', badge: 'Review', tone: 'bg-amber-100 text-amber-900' },
            { text: 'Generator svc', badge: 'Planned', tone: 'bg-dark-50 text-dark-600' },
          ].map((item) => (
            <div key={item.text} className="border border-dark-200 bg-white px-2 py-2 flex items-center justify-between text-[10px] font-mono">
              <span className="text-dark-700">{item.text}</span>
              <span className={`px-1.5 py-0.5 border border-dark-300 text-[9px] font-mono uppercase ${item.tone}`}>{item.badge}</span>
            </div>
          ))}
        </div>
      </DeviceFrame>

      {/* Manager approvals — phone */}
      <DeviceFrame label="Manager — quick approvals" variant="phone" className="absolute left-[270px] bottom-4 z-20 w-[150px]">
        <AppHeader title="Approvals" subtitle="Pending decisions" />
        <div className="p-2 space-y-2">
          <div className="border border-dark-200 bg-white px-2 py-1.5 text-[10px] font-mono text-dark-800 flex items-center gap-1.5">
            <BadgeCheck className="w-3 h-3 text-primary-600 shrink-0" /> Budget approved
          </div>
          <div className="border border-amber-300 bg-amber-50 px-2 py-1.5 text-[10px] font-mono text-amber-800 flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 shrink-0" /> 2 pending
          </div>
          <div className="border border-dark-200 bg-white px-2 py-1.5 text-[10px] font-mono text-dark-800 flex items-center gap-1.5">
            <FolderKanban className="w-3 h-3 text-dark-600 shrink-0" /> 3 tasks due
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}

function DocumentAutomationMockup() {
  return (
    <div className="relative h-[460px] border-2 border-dark-950 bg-white p-5 overflow-hidden grid-pattern">
      {/* Desktop extraction app — faithful to PyQt6 layout */}
      <DeviceFrame label="PDF Statement Extractor — desktop app" variant="desktop" className="relative z-10 max-w-[380px]">
        {/* App title bar */}
        <div className="bg-dark-950 text-white px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-white/70" />
            <span className="text-xs font-mono font-bold tracking-tight">PDF Statement Extractor</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-dark-700" />
            <div className="w-2.5 h-2.5 bg-dark-700" />
            <div className="w-2.5 h-2.5 bg-rose-600" />
          </div>
        </div>
        {/* Toolbar */}
        <div className="bg-dark-50 border-b border-dark-200 px-3 py-1.5 flex items-center gap-3 text-[10px] font-mono uppercase text-dark-600">
          <span className="hover:text-dark-950 cursor-pointer">File</span>
          <span className="hover:text-dark-950 cursor-pointer">Bank Profile</span>
          <span className="hover:text-dark-950 cursor-pointer">Export</span>
          <span className="hover:text-dark-950 cursor-pointer">Help</span>
        </div>
        <div className="p-3 space-y-3">
          {/* Drop zone */}
          <div className="border border-dashed border-dark-400 bg-white px-4 py-5 text-center">
            <FileText className="w-6 h-6 text-dark-400 mx-auto mb-1" />
            <p className="text-[10px] font-mono uppercase tracking-wider text-dark-700">Drag PDF bank statements here</p>
            <p className="text-[9px] font-mono text-dark-400 mt-0.5">or click to browse local files</p>
          </div>
          {/* Bank profile + file list */}
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-dark-200 bg-white p-2">
              <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-dark-500 mb-1.5">BANK PROFILE</p>
              {['Access Bank', 'GTBank', 'Zenith', 'UBA'].map((b, i) => (
                <div key={b} className={`text-[9px] font-mono px-2 py-1 mb-0.5 ${i === 0 ? 'bg-dark-950 text-white font-bold' : 'text-dark-700 hover:bg-dark-50'}`}>{b}</div>
              ))}
            </div>
            <div className="border border-dark-200 bg-white p-2">
              <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-dark-500 mb-1.5">QUEUED FILES</p>
              {['statement_jan.pdf', 'statement_feb.pdf', 'statement_mar.pdf'].map((f) => (
                <div key={f} className="text-[9px] font-mono text-dark-600 px-2 py-1 hover:bg-dark-50 truncate">{f}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="flex-1 bg-dark-950 text-white text-[10px] font-mono uppercase tracking-wider py-2 flex items-center justify-center gap-1 border border-dark-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)]">
              <Monitor className="w-3 h-3" /> Extract Tables
            </button>
            <button type="button" className="flex-1 bg-white text-dark-950 text-[10px] font-mono uppercase tracking-wider py-2 flex items-center justify-center gap-1 border border-dark-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)]">
              <FileSpreadsheet className="w-3 h-3" /> Export Excel
            </button>
          </div>
        </div>
      </DeviceFrame>

      {/* Output preview panel */}
      <div className="absolute right-4 top-8 z-20 w-[195px] border-2 border-dark-950 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)]">
        <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-dark-500 mb-3">Extraction preview</p>
        <div className="border border-dark-200 bg-dark-50 p-3 mb-3">
          <FileSpreadsheet className="w-6 h-6 text-dark-900 mb-2" />
          <p className="text-xs font-mono font-bold text-dark-900 truncate">Statement Export.xlsx</p>
          <p className="text-[10px] font-mono text-dark-500 mt-0.5">Validated · 318 rows</p>
        </div>
        <MetricCard label="Files done" value="18 / 18" tone="bg-white border-dark-200 text-dark-900" />
      </div>

      {/* Processing steps */}
      <div className="absolute left-[255px] bottom-5 z-20 w-[195px] border-2 border-dark-950 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)]">
        <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-dark-500 mb-3">Processing flow</p>
        <div className="space-y-1.5 text-[10px] font-mono text-dark-700">
          {[
            { label: 'Import PDFs', icon: FileText, done: true },
            { label: 'Parse tables', icon: Receipt, done: true },
            { label: 'Review & validate', icon: BadgeCheck, done: false },
            { label: 'Export workbook', icon: Monitor, done: false },
          ].map((step) => (
            <div key={step.label} className="border border-dark-200 px-2.5 py-1.5 flex items-center gap-2 bg-white">
              <step.icon className={`w-3 h-3 ${step.done ? 'text-dark-950' : 'text-dark-400'}`} />
              <span className="truncate">{step.label}</span>
              {step.done && <BadgeCheck className="w-3 h-3 text-dark-950 ml-auto" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SolutionDeviceShowcase({ trackId }: { trackId: SolutionTrackId }) {
  if (trackId === 'retail-commerce') {
    return <RetailCommerceMockup />;
  }

  if (trackId === 'farm-operations') {
    return <FarmOperationsMockup />;
  }

  if (trackId === 'ops-delivery') {
    return <OperationsMockup />;
  }

  return <DocumentAutomationMockup />;
}