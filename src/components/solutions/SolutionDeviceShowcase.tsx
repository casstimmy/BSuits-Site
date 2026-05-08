import React from 'react';
import {
  BadgeCheck,
  BarChart3,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  Monitor,
  Receipt,
  ShoppingCart,
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
    <div className="relative h-[420px] rounded-[2rem] bg-gradient-to-br from-sky-100 via-white to-cyan-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_38%)]" />

      <DeviceFrame label="Inventory admin on laptop" variant="laptop" className="relative z-10 max-w-[360px]">
        <AppHeader title="Inventory Admin" subtitle="Stock, expenses, locations, reports" />
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <MetricCard label="Stock value" value="NGN 8.4M" tone="bg-sky-50 border-sky-100 text-sky-700" />
            <MetricCard label="Low stock" value="12 items" tone="bg-amber-50 border-amber-100 text-amber-700" />
            <MetricCard label="Orders" value="84 today" tone="bg-emerald-50 border-emerald-100 text-emerald-700" />
          </div>
          <div className="rounded-2xl border border-dark-100 bg-dark-50 p-3 space-y-2">
            {['Outlet stock sync', 'Supplier deliveries', 'Expense approvals'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs text-dark-500">
                <span>{item}</span>
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </DeviceFrame>

      <DeviceFrame label="POS terminal" variant="terminal" className="absolute right-5 top-10 z-20 w-[190px]">
        <AppHeader title="Sales Point" subtitle="Fast till workflow" />
        <div className="p-3 space-y-3 bg-slate-950 text-white">
          <div className="rounded-2xl bg-slate-900 border border-white/10 px-3 py-3">
            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
              <span>Cart</span>
              <ShoppingCart className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span>Chicken Wings</span><span>NGN 6,500</span></div>
              <div className="flex justify-between"><span>Rice 5kg</span><span>NGN 8,000</span></div>
            </div>
            <div className="border-t border-white/10 mt-3 pt-3 flex justify-between text-sm font-bold">
              <span>Total</span>
              <span>NGN 14,500</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            {['Food', 'Hotel', 'Wine'].map((tab) => (
              <div key={tab} className="rounded-xl bg-teal-500/20 border border-teal-300/20 px-2 py-2 text-center">
                {tab}
              </div>
            ))}
          </div>
        </div>
      </DeviceFrame>

      <DeviceFrame label="Customer phone checkout" variant="phone" className="absolute left-[250px] bottom-4 z-20 w-[145px]">
        <AppHeader title="Commerce Web" subtitle="Cart and checkout" />
        <div className="p-3 space-y-3">
          <div className="rounded-2xl bg-sky-50 border border-sky-100 px-3 py-3 text-xs text-sky-700">
            Cart synced with warehouse stock
          </div>
          <div className="space-y-2">
            {['Fresh farm eggs', 'Cooking oil', 'Delivery'].map((item) => (
              <div key={item} className="rounded-xl border border-dark-100 px-3 py-2 text-xs text-dark-500">
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-dark-900 text-white px-3 py-3 text-xs font-semibold text-center">
            Proceed to payment
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}

function FarmOperationsMockup() {
  return (
    <div className="relative h-[420px] rounded-[2rem] bg-gradient-to-br from-emerald-100 via-white to-lime-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.12),transparent_32%)]" />

      <DeviceFrame label="Operations dashboard on laptop" variant="laptop" className="relative z-10 max-w-[365px]">
        <AppHeader title="Farm Health Manager" subtitle="Animals, feeding, finance, breeding" />
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <MetricCard label="Animals" value="248 active" tone="bg-emerald-50 border-emerald-100 text-emerald-700" />
            <MetricCard label="Feeding" value="6 pens due" tone="bg-amber-50 border-amber-100 text-amber-700" />
            <MetricCard label="Health logs" value="14 new" tone="bg-sky-50 border-sky-100 text-sky-700" />
          </div>
          <div className="rounded-2xl border border-dark-100 bg-white p-3">
            <div className="flex items-center justify-between text-xs font-semibold text-dark-600 mb-3">
              <span>Weekly performance</span>
              <BarChart3 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-end gap-2 h-20">
              {[38, 54, 60, 48, 70, 76, 64].map((value, index) => (
                <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-emerald-500 to-lime-300" style={{ height: `${value}%` }} />
              ))}
            </div>
          </div>
        </div>
      </DeviceFrame>

      <DeviceFrame label="Field phone" variant="phone" className="absolute right-6 top-12 z-20 w-[145px]">
        <AppHeader title="Animal log" subtitle="Mobile entry" />
        <div className="p-3 space-y-2 text-xs text-dark-500">
          {['Vaccination completed', 'Weight recorded', 'Feed adjusted'].map((item) => (
            <div key={item} className="rounded-xl border border-dark-100 px-3 py-2 bg-white">
              {item}
            </div>
          ))}
        </div>
      </DeviceFrame>

      <DeviceFrame label="Storefront on tablet" variant="tablet" className="absolute left-[255px] bottom-4 z-20 w-[220px]">
        <AppHeader title="Farm Web Place" subtitle="Animals, products, services" />
        <div className="p-3 grid grid-cols-2 gap-3 text-xs">
          {['Livestock', 'Feeds', 'Services', 'Orders'].map((item) => (
            <div key={item} className="rounded-2xl border border-dark-100 bg-white px-3 py-4 text-center text-dark-600 font-medium">
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
    <div className="relative h-[420px] rounded-[2rem] bg-gradient-to-br from-violet-100 via-white to-fuchsia-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_36%)]" />

      <DeviceFrame label="Project workspace on desktop" variant="desktop" className="relative z-10 max-w-[380px]">
        <AppHeader title="Project Management Suite" subtitle="Projects, work orders, budgets, HSSE" />
        <div className="p-4 grid grid-cols-[1.1fr_0.9fr] gap-4">
          <div className="rounded-2xl border border-dark-100 bg-dark-50 p-3 space-y-2 text-xs text-dark-500">
            {['Facility upgrade', 'Incident response', 'Maintenance queue'].map((item) => (
              <div key={item} className="rounded-xl bg-white px-3 py-2 border border-dark-100 flex items-center justify-between">
                <span>{item}</span>
                <FolderKanban className="w-3.5 h-3.5 text-violet-500" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <MetricCard label="Open tasks" value="26" tone="bg-violet-50 border-violet-100 text-violet-700" />
            <MetricCard label="Maintenance" value="8 active" tone="bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700" />
            <MetricCard label="Budget burn" value="63%" tone="bg-sky-50 border-sky-100 text-sky-700" />
          </div>
        </div>
      </DeviceFrame>

      <DeviceFrame label="Tablet work board" variant="tablet" className="absolute right-5 top-10 z-20 w-[225px]">
        <AppHeader title="Work Orders" subtitle="Field assignments" />
        <div className="p-3 space-y-2 text-xs text-dark-500">
          {['Electrical fix - Assigned', 'Safety audit - In review', 'Generator service - Planned'].map((item) => (
            <div key={item} className="rounded-xl border border-dark-100 bg-white px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </DeviceFrame>

      <DeviceFrame label="Manager phone" variant="phone" className="absolute left-[270px] bottom-4 z-20 w-[145px]">
        <AppHeader title="Approvals" subtitle="Quick decisions" />
        <div className="p-3 space-y-3 text-xs text-dark-500">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-3 text-emerald-700">Budget approved</div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-3 text-amber-700">2 incidents need review</div>
        </div>
      </DeviceFrame>
    </div>
  );
}

function DocumentAutomationMockup() {
  return (
    <div className="relative h-[420px] rounded-[2rem] bg-gradient-to-br from-slate-200 via-white to-slate-50 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,41,59,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(71,85,105,0.12),transparent_34%)]" />

      <DeviceFrame label="Desktop extraction app" variant="desktop" className="relative z-10 max-w-[360px]">
        <AppHeader title="PDF Statement Extractor" subtitle="Desktop workflow" />
        <div className="p-4 space-y-4">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            Drag bank statement PDFs here
          </div>
          <div className="grid grid-cols-3 gap-3">
            <MetricCard label="Files" value="18 queued" tone="bg-slate-50 border-slate-200 text-slate-700" />
            <MetricCard label="Profiles" value="4 banks" tone="bg-blue-50 border-blue-100 text-blue-700" />
            <MetricCard label="Exports" value="Excel + CSV" tone="bg-emerald-50 border-emerald-100 text-emerald-700" />
          </div>
        </div>
      </DeviceFrame>

      <div className="absolute right-6 top-12 z-20 w-[190px] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Output preview</p>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5">
          <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-3" />
          <p className="text-sm font-semibold text-slate-800">Statement Export.xlsx</p>
          <p className="text-xs text-slate-500 mt-1">Validated rows and formatted columns</p>
        </div>
      </div>

      <div className="absolute left-[250px] bottom-4 z-20 w-[210px] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Processing flow</p>
        <div className="space-y-2 text-xs text-slate-500">
          {[
            { label: 'Import PDF', icon: FileText },
            { label: 'Parse tables', icon: Receipt },
            { label: 'Export workbook', icon: Monitor },
          ].map((step) => (
            <div key={step.label} className="rounded-xl border border-slate-100 px-3 py-2 flex items-center gap-2 bg-slate-50">
              <step.icon className="w-3.5 h-3.5 text-slate-600" />
              <span>{step.label}</span>
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