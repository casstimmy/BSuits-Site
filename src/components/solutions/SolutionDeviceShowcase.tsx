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
  variant,
  className,
  children,
}: {
  label: string;
  variant: 'laptop' | 'terminal' | 'tablet' | 'phone' | 'desktop';
  className?: string;
  children: React.ReactNode;
}) {
  const shellClass =
    variant === 'phone'
      ? 'rounded-[2rem] border-[8px]'
      : variant === 'tablet'
      ? 'rounded-[1.75rem] border-[10px]'
      : variant === 'terminal'
      ? 'rounded-[1.5rem] border-[10px]'
      : 'rounded-[1.5rem] border-[10px]';

  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-400 mb-3">{label}</p>
      <div className={`relative border-dark-900 bg-dark-900 shadow-2xl ${shellClass}`}>
        <div className="rounded-[calc(1.5rem-6px)] bg-white overflow-hidden min-h-[150px]">{children}</div>
      </div>
    </div>
  );
}

function AppHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="px-4 py-3 border-b border-dark-100 bg-dark-50">
      <p className="text-sm font-semibold text-dark-900">{title}</p>
      <p className="text-xs text-dark-400 mt-1">{subtitle}</p>
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl border px-3 py-3 ${tone}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-75">{label}</p>
      <p className="text-sm font-bold mt-2">{value}</p>
    </div>
  );
}

function RetailCommerceMockup() {
  return (
    <div className="relative h-[460px] rounded-[2rem] bg-gradient-to-br from-sky-100 via-white to-cyan-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_38%)]" />

      {/* Inventory Admin — left laptop */}
      <DeviceFrame label="Inventory Admin — back office" variant="laptop" className="relative z-10 max-w-[340px]">
        <AppHeader title="Inventory Admin" subtitle="Dashboard · Stock · Expenses · Reporting" />
        <div className="flex min-h-[150px]">
          {/* Mini sidebar */}
          <div className="w-14 bg-slate-800 flex flex-col items-center py-3 gap-3 shrink-0">
            {[Package, BarChart3, ShoppingCart, FileText, BadgeCheck].map((Icon, i) => (
              <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-sky-500' : 'bg-slate-700'}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 space-y-2 bg-slate-50">
            <div className="grid grid-cols-3 gap-2">
              <MetricCard label="Revenue" value="₦8.4M" tone="bg-sky-50 border-sky-100 text-sky-700" />
              <MetricCard label="Low stock" value="12" tone="bg-amber-50 border-amber-100 text-amber-700" />
              <MetricCard label="Orders" value="84" tone="bg-emerald-50 border-emerald-100 text-emerald-700" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-2 space-y-1">
              {['Outlet sync', 'Expense log', 'Stock alert'].map((item) => (
                <div key={item} className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{item}</span>
                  <BadgeCheck className="w-3 h-3 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DeviceFrame>

      {/* Sales Point POS — center, using actual screenshot */}
      <div className="absolute right-28 top-5 z-20 w-[175px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-400 mb-2">Sales Point POS — till</p>
        <div className="relative border-[8px] border-dark-900 bg-dark-900 shadow-2xl rounded-[1.5rem] overflow-hidden">
          <Image
            src="/images/Point of sales preview.png"
            alt="Sales Point POS checkout interface"
            width={400}
            height={700}
            className="w-full object-cover object-top rounded-[calc(1.5rem-6px)]"
          />
        </div>
      </div>

      {/* Commerce Web storefront — bottom right phone */}
      <DeviceFrame label="Commerce Web — storefront" variant="phone" className="absolute right-4 bottom-4 z-20 w-[130px]">
        <AppHeader title="Online Store" subtitle="Shop · Cart · Checkout" />
        <div className="p-2 space-y-2 bg-white">
          <div className="rounded-xl bg-sky-50 border border-sky-100 px-2 py-2 text-[10px] text-sky-700 font-medium">
            🛒 Shop — all products
          </div>
          <div className="grid grid-cols-2 gap-1">
            {['Rice', 'Oil', 'Eggs', 'Water'].map((item) => (
              <div key={item} className="rounded-lg border border-slate-100 bg-slate-50 px-1 py-1.5 text-[9px] text-center text-slate-600">
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-slate-900 text-white px-2 py-1.5 text-[9px] font-semibold text-center">
            Checkout →
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}

function FarmOperationsMockup() {
  return (
    <div className="relative h-[460px] rounded-[2rem] bg-gradient-to-br from-emerald-100 via-white to-lime-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.12),transparent_32%)]" />

      {/* Farm Health Manager — laptop */}
      <DeviceFrame label="Farm Health Manager — operations" variant="laptop" className="relative z-10 max-w-[365px]">
        <AppHeader title="Farm Health Manager" subtitle="Animals · Feeding · Breeding · Finance" />
        <div className="flex min-h-[150px]">
          {/* Sidebar */}
          <div className="w-14 bg-emerald-900 flex flex-col items-center py-3 gap-3 shrink-0">
            {[Sprout, HeartPulse, Leaf, BarChart3, FileText].map((Icon, i) => (
              <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-emerald-500' : 'bg-emerald-800'}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 space-y-2 bg-slate-50">
            <div className="grid grid-cols-3 gap-2">
              <MetricCard label="Animals" value="248" tone="bg-emerald-50 border-emerald-100 text-emerald-700" />
              <MetricCard label="Feeding" value="6 due" tone="bg-amber-50 border-amber-100 text-amber-700" />
              <MetricCard label="Health" value="14 new" tone="bg-sky-50 border-sky-100 text-sky-700" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                <span>Weekly livestock</span>
                <BarChart3 className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="flex items-end gap-1 h-10">
                {[40, 55, 62, 50, 72, 78, 65].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-lime-400" style={{ height: `${v}%` }} />
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
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-[10px] text-emerald-700 font-medium flex items-center gap-2">
            <Leaf className="w-3 h-3" /> Fresh from the farm
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '🐄 Livestock', tone: 'bg-amber-50 border-amber-100 text-amber-700' },
              { label: '🌾 Products', tone: 'bg-lime-50 border-lime-100 text-lime-700' },
              { label: '🩺 Services', tone: 'bg-sky-50 border-sky-100 text-sky-700' },
              { label: '🛒 Cart', tone: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
            ].map((c) => (
              <div key={c.label} className={`rounded-xl border px-2 py-3 text-[10px] font-medium text-center ${c.tone}`}>
                {c.label}
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-emerald-700 text-white text-[10px] font-semibold text-center py-2">
            Checkout →
          </div>
        </div>
      </DeviceFrame>

      {/* Field phone */}
      <DeviceFrame label="Field — mobile log" variant="phone" className="absolute left-[245px] bottom-4 z-20 w-[140px]">
        <AppHeader title="Animal log" subtitle="Field entry" />
        <div className="p-2 space-y-1.5">
          {['Vaccination done', 'Weight recorded', 'Feed adjusted'].map((item) => (
            <div key={item} className="rounded-lg border border-slate-100 bg-white px-2 py-1.5 text-[9px] text-slate-600 flex items-center gap-1">
              <BadgeCheck className="w-3 h-3 text-emerald-500 shrink-0" />
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
    <div className="relative h-[460px] rounded-[2rem] bg-gradient-to-br from-violet-100 via-white to-fuchsia-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_36%)]" />

      {/* Project Management — main desktop */}
      <DeviceFrame label="OPALshire — project workspace" variant="desktop" className="relative z-10 max-w-[390px]">
        <AppHeader title="Project Management Suite" subtitle="Projects · Work Orders · Budgets · HSSE" />
        <div className="flex min-h-[170px]">
          {/* Dark sidebar like actual app */}
          <div className="w-14 bg-slate-900 flex flex-col items-center py-3 gap-2.5 shrink-0">
            {[Building2, FolderKanban, AlertTriangle, FileText, BarChart3].map((Icon, i) => (
              <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 bg-slate-50 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <MetricCard label="Projects" value="12 live" tone="bg-violet-50 border-violet-100 text-violet-700" />
              <MetricCard label="W-Orders" value="8 open" tone="bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700" />
              <MetricCard label="Budget" value="63% used" tone="bg-sky-50 border-sky-100 text-sky-700" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-2 space-y-1">
              {['Facility upgrade — In progress', 'Safety audit — Pending', 'Maintenance Q3 — Planned'].map((item) => (
                <div key={item} className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate flex-1">{item}</span>
                  <FolderKanban className="w-3 h-3 text-violet-500 shrink-0 ml-1" />
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
            { text: 'Electrical fix', badge: 'Assigned', tone: 'bg-sky-50 text-sky-700' },
            { text: 'Safety audit', badge: 'Review', tone: 'bg-amber-50 text-amber-700' },
            { text: 'Generator svc', badge: 'Planned', tone: 'bg-slate-50 text-slate-600' },
          ].map((item) => (
            <div key={item.text} className="rounded-lg border border-slate-100 bg-white px-2 py-2 flex items-center justify-between text-[10px]">
              <span className="text-slate-600">{item.text}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${item.tone}`}>{item.badge}</span>
            </div>
          ))}
        </div>
      </DeviceFrame>

      {/* Manager approvals — phone */}
      <DeviceFrame label="Manager — quick approvals" variant="phone" className="absolute left-[270px] bottom-4 z-20 w-[140px]">
        <AppHeader title="Approvals" subtitle="Pending decisions" />
        <div className="p-2 space-y-2">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-2 py-2 text-[10px] text-emerald-700 flex items-center gap-1.5">
            <BadgeCheck className="w-3 h-3 shrink-0" /> Budget approved
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 px-2 py-2 text-[10px] text-amber-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 shrink-0" /> 2 incidents pending
          </div>
          <div className="rounded-xl bg-violet-50 border border-violet-100 px-2 py-2 text-[10px] text-violet-700 flex items-center gap-1.5">
            <FolderKanban className="w-3 h-3 shrink-0" /> 3 tasks due today
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}

function DocumentAutomationMockup() {
  return (
    <div className="relative h-[460px] rounded-[2rem] bg-gradient-to-br from-slate-200 via-white to-slate-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,41,59,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(71,85,105,0.12),transparent_34%)]" />

      {/* Desktop extraction app — faithful to PyQt6 layout */}
      <DeviceFrame label="PDF Statement Extractor — desktop app" variant="desktop" className="relative z-10 max-w-[380px]">
        {/* App title bar */}
        <div className="bg-slate-700 text-white px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-xs font-semibold">PDF Bank Statement Extractor</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
        </div>
        {/* Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-1.5 flex items-center gap-3 text-[10px] text-slate-600">
          <span className="hover:text-slate-900 cursor-pointer">File</span>
          <span className="hover:text-slate-900 cursor-pointer">Bank Profile</span>
          <span className="hover:text-slate-900 cursor-pointer">Export</span>
          <span className="hover:text-slate-900 cursor-pointer">Help</span>
        </div>
        <div className="p-3 space-y-3">
          {/* Drop zone */}
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center">
            <FileText className="w-6 h-6 text-slate-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500">Drag PDF bank statements here</p>
            <p className="text-[9px] text-slate-400 mt-0.5">or click to browse</p>
          </div>
          {/* Bank profile + file list */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-slate-200 bg-white p-2">
              <p className="text-[9px] font-semibold text-slate-500 mb-1.5">BANK PROFILE</p>
              {['Access Bank', 'GTBank', 'Zenith', 'UBA'].map((b, i) => (
                <div key={b} className={`text-[9px] px-2 py-1 rounded mb-0.5 ${i === 0 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>{b}</div>
              ))}
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-2">
              <p className="text-[9px] font-semibold text-slate-500 mb-1.5">QUEUED FILES</p>
              {['statement_jan.pdf', 'statement_feb.pdf', 'statement_mar.pdf'].map((f) => (
                <div key={f} className="text-[9px] text-slate-600 px-2 py-1 rounded hover:bg-slate-50 truncate">{f}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white text-[10px] font-semibold rounded-lg py-2 flex items-center justify-center gap-1">
              <Monitor className="w-3 h-3" /> Extract Tables
            </button>
            <button className="flex-1 bg-emerald-600 text-white text-[10px] font-semibold rounded-lg py-2 flex items-center justify-center gap-1">
              <FileSpreadsheet className="w-3 h-3" /> Export Excel
            </button>
          </div>
        </div>
      </DeviceFrame>

      {/* Output preview panel */}
      <div className="absolute right-4 top-8 z-20 w-[195px] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Extraction preview</p>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 mb-3">
          <FileSpreadsheet className="w-7 h-7 text-emerald-600 mb-2" />
          <p className="text-xs font-semibold text-slate-800">Statement Export.xlsx</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Validated · 318 rows</p>
        </div>
        <MetricCard label="Files done" value="18 / 18" tone="bg-emerald-50 border-emerald-100 text-emerald-700" />
      </div>

      {/* Processing steps */}
      <div className="absolute left-[255px] bottom-5 z-20 w-[195px] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Processing flow</p>
        <div className="space-y-2 text-[10px] text-slate-500">
          {[
            { label: 'Import PDFs', icon: FileText, done: true },
            { label: 'Parse tables', icon: Receipt, done: true },
            { label: 'Review & validate', icon: BadgeCheck, done: false },
            { label: 'Export workbook', icon: Monitor, done: false },
          ].map((step) => (
            <div key={step.label} className="rounded-lg border border-slate-100 px-2.5 py-2 flex items-center gap-2 bg-slate-50">
              <step.icon className={`w-3 h-3 ${step.done ? 'text-emerald-500' : 'text-slate-400'}`} />
              <span>{step.label}</span>
              {step.done && <BadgeCheck className="w-3 h-3 text-emerald-500 ml-auto" />}
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