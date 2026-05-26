'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Building2,
  ChevronRight,
  DollarSign,
  FolderKanban,
  Hammer,
  Plus,
  Shield,
  TrendingUp,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── Types & Data ────────────────────────────────────────────

const TABS = ['Dashboard', 'Projects', 'Work Orders', 'Maintenance', 'Budgets', 'HSSE', 'Incidents'] as const;
type OpsTab = (typeof TABS)[number];

const projects = [
  { id: 'P001', name: 'Facility Renovation – Block C', type: 'Construction', status: 'in-progress', priority: 'high', pm: 'Olu A.', budget: 8500000, spent: 5200000, due: '2025-08-31' },
  { id: 'P002', name: 'Generator Overhaul – Site 2', type: 'Maintenance', status: 'in-progress', priority: 'high', pm: 'Emeka O.', budget: 2200000, spent: 900000, due: '2025-07-15' },
  { id: 'P003', name: 'Fire Safety Upgrade', type: 'HSSE', status: 'planned', priority: 'medium', pm: 'Ada C.', budget: 1800000, spent: 0, due: '2025-09-30' },
  { id: 'P004', name: 'Staff Quarters Painting', type: 'Facility', status: 'completed', priority: 'low', pm: 'Tobi M.', budget: 650000, spent: 620000, due: '2025-06-10' },
  { id: 'P005', name: 'CCTV Network Expansion', type: 'Security', status: 'planned', priority: 'medium', pm: 'Kola I.', budget: 3200000, spent: 0, due: '2025-10-15' },
];

const workOrders = [
  { id: 'WO-0041', title: 'Replace rooftop AC unit – Admin Block', assignee: 'Emeka O.', dept: 'Facilities', status: 'open', due: '2025-06-20', priority: 'high' },
  { id: 'WO-0042', title: 'Fix electrical fault – Canteen', assignee: 'Tobi M.', dept: 'Engineering', status: 'in-progress', due: '2025-06-18', priority: 'critical' },
  { id: 'WO-0043', title: 'Paint lobby – Reception area', assignee: 'Mary E.', dept: 'Facilities', status: 'completed', due: '2025-06-12', priority: 'low' },
  { id: 'WO-0044', title: 'Plumbing – Staff bathroom leak', assignee: 'Olu A.', dept: 'Engineering', status: 'open', due: '2025-06-22', priority: 'medium' },
  { id: 'WO-0045', title: 'Generator service schedule', assignee: 'Kola I.', dept: 'Mechanical', status: 'in-progress', due: '2025-06-25', priority: 'high' },
];

const maintenanceItems = [
  { asset: 'Generator – Site 1', lastService: '2025-04-10', nextDue: '2025-07-10', status: 'ok' },
  { asset: 'Generator – Site 2', lastService: '2024-12-15', nextDue: '2025-06-15', status: 'overdue' },
  { asset: 'Fire Extinguishers (30 units)', lastService: '2025-01-20', nextDue: '2025-07-20', status: 'ok' },
  { asset: 'HVAC System – Admin Block', lastService: '2025-03-05', nextDue: '2025-09-05', status: 'ok' },
  { asset: 'Elevator – Main Building', lastService: '2025-05-01', nextDue: '2025-08-01', status: 'upcoming' },
];

const budgets = [
  { dept: 'Facilities', allocated: 15000000, spent: 9200000 },
  { dept: 'Engineering', allocated: 8000000, spent: 6800000 },
  { dept: 'HSSE', allocated: 4500000, spent: 1200000 },
  { dept: 'IT & Security', allocated: 6000000, spent: 3800000 },
  { dept: 'Projects', allocated: 22000000, spent: 12400000 },
];

const hsseItems = [
  { category: 'Safety Inspections', score: 94, status: 'compliant', last: '2025-06-01' },
  { category: 'Fire Safety', score: 88, status: 'attention', last: '2025-05-15' },
  { category: 'Environmental', score: 97, status: 'compliant', last: '2025-06-03' },
  { category: 'Health & Hygiene', score: 91, status: 'compliant', last: '2025-05-28' },
  { category: 'Security Audit', score: 76, status: 'action-required', last: '2025-04-20' },
];

const incidents = [
  { id: 'INC-018', title: 'Electrical spark – Canteen kitchen', severity: 'medium', reportedBy: 'Tobi M.', date: '2025-06-10', status: 'investigating' },
  { id: 'INC-019', title: 'Slip & fall – Wet floor, Block B corridor', severity: 'low', reportedBy: 'Ada C.', date: '2025-06-12', status: 'closed' },
  { id: 'INC-020', title: 'Generator exhaust leak – Site 2', severity: 'high', reportedBy: 'Emeka O.', date: '2025-06-15', status: 'open' },
];

function fmt(n: number) {
  return '₦' + (n / 1000000).toFixed(1) + 'M';
}

function pct(spent: number, total: number) {
  return Math.min(100, Math.round((spent / total) * 100));
}

const STATUS_COLORS: Record<string, string> = {
  'in-progress': 'bg-blue-100 text-blue-700',
  planned: 'bg-slate-100 text-slate-600',
  completed: 'bg-emerald-100 text-emerald-700',
  open: 'bg-amber-100 text-amber-700',
  critical: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-slate-100 text-slate-500',
  compliant: 'bg-emerald-100 text-emerald-700',
  attention: 'bg-amber-100 text-amber-700',
  'action-required': 'bg-red-100 text-red-700',
  ok: 'bg-emerald-100 text-emerald-700',
  overdue: 'bg-red-100 text-red-700',
  upcoming: 'bg-amber-100 text-amber-700',
  investigating: 'bg-blue-100 text-blue-700',
  closed: 'bg-slate-100 text-slate-500',
};

const TAB_ICONS = {
  Dashboard: BarChart3,
  Projects: FolderKanban,
  'Work Orders': Hammer,
  Maintenance: Building2,
  Budgets: DollarSign,
  HSSE: Shield,
  Incidents: AlertTriangle,
};

// ─── Dashboard ───────────────────────────────────────────────

function Dashboard() {
  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Projects', value: '3', color: 'bg-violet-50 text-violet-700 border-violet-100', icon: FolderKanban },
          { label: 'Open Work Orders', value: '5', color: 'bg-amber-50 text-amber-700 border-amber-100', icon: Hammer },
          { label: 'HSSE Score', value: '89%', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: Shield },
          { label: 'Budget Used', value: '58%', color: 'bg-sky-50 text-sky-700 border-sky-100', icon: TrendingUp },
        ].map((m) => (
          <div key={m.label} className={`rounded-xl border p-4 ${m.color}`}>
            <m.icon className="w-4 h-4 mb-2 opacity-70" />
            <div className="text-xl font-bold">{m.value}</div>
            <div className="text-xs font-semibold mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Projects summary */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
          <FolderKanban className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-semibold text-slate-800">Active Projects</span>
        </div>
        <div className="divide-y divide-slate-100">
          {projects.filter(p => p.status !== 'completed').map(p => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-medium text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-400">{p.pm} · Due {p.due}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[p.status]}`}>{p.status.replace('-', ' ')}</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget overview */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-800">Budget Overview</span>
        </div>
        <div className="space-y-2">
          {budgets.slice(0, 3).map(b => (
            <div key={b.dept}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{b.dept}</span>
                <span className="text-slate-500">{fmt(b.spent)} / {fmt(b.allocated)}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${pct(b.spent, b.allocated) > 85 ? 'bg-red-500' : 'bg-violet-500'}`} style={{ width: `${pct(b.spent, b.allocated)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Projects Tab ────────────────────────────────────────────

function ProjectsTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {['Project', 'Type', 'PM', 'Budget', 'Progress', 'Due', 'Status'].map(h => (
              <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.map(p => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-400">{p.id}</div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">{p.type}</td>
              <td className="px-4 py-3 text-xs text-slate-600">{p.pm}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-700">{fmt(p.budget)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${pct(p.spent, p.budget)}%` }} />
                  </div>
                  <span className="text-xs text-slate-500">{pct(p.spent, p.budget)}%</span>
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{p.due}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[p.status]}`}>{p.status.replace('-', ' ')}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Work Orders Tab ─────────────────────────────────────────

function WorkOrdersTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {['ID', 'Title', 'Assignee', 'Dept', 'Priority', 'Due', 'Status'].map(h => (
              <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {workOrders.map(wo => (
            <tr key={wo.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-xs font-mono text-violet-700 font-semibold">{wo.id}</td>
              <td className="px-4 py-3 text-sm text-slate-800 font-medium">{wo.title}</td>
              <td className="px-4 py-3 text-xs text-slate-600">{wo.assignee}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{wo.dept}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[wo.priority]}`}>{wo.priority}</span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{wo.due}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[wo.status]}`}>{wo.status.replace('-', ' ')}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Maintenance Tab ─────────────────────────────────────────

function MaintenanceTab() {
  return (
    <div className="p-5 space-y-3">
      {maintenanceItems.map(m => (
        <div key={m.asset} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4">
          <Building2 className={`w-5 h-5 shrink-0 ${m.status === 'overdue' ? 'text-red-500' : m.status === 'upcoming' ? 'text-amber-500' : 'text-emerald-500'}`} />
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-800 mb-0.5">{m.asset}</div>
            <div className="text-xs text-slate-400">Last: {m.lastService} · Next: {m.nextDue}</div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[m.status]}`}>{m.status}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Budgets Tab ─────────────────────────────────────────────

function BudgetsTab() {
  const total = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  return (
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-4"><div className="text-xs text-violet-600 font-semibold mb-1">Total Allocated</div><div className="text-xl font-bold text-violet-800">{fmt(total)}</div></div>
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4"><div className="text-xs text-amber-600 font-semibold mb-1">Total Spent</div><div className="text-xl font-bold text-amber-800">{fmt(totalSpent)}</div></div>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4"><div className="text-xs text-slate-500 font-semibold mb-1">Remaining</div><div className="text-xl font-bold text-slate-800">{fmt(total - totalSpent)}</div></div>
      </div>
      <div className="space-y-4">
        {budgets.map(b => {
          const p = pct(b.spent, b.allocated);
          return (
            <div key={b.dept} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-slate-800 text-sm">{b.dept}</div>
                <div className="text-xs text-slate-500 text-right">{fmt(b.spent)} / {fmt(b.allocated)}</div>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${p > 85 ? 'bg-red-500' : p > 65 ? 'bg-amber-500' : 'bg-violet-500'}`} style={{ width: `${p}%` }} />
              </div>
              <div className="text-xs text-slate-400 mt-1.5">{p}% used</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HSSE Tab ────────────────────────────────────────────────

function HSSETab() {
  return (
    <div className="p-5 space-y-3">
      {hsseItems.map(h => (
        <div key={h.category} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-sm text-slate-800">{h.category}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[h.status]}`}>{h.status.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${h.score >= 90 ? 'bg-emerald-500' : h.score >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${h.score}%` }} />
            </div>
            <span className="text-sm font-bold text-slate-700 w-8 text-right">{h.score}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1.5">Last inspection: {h.last}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Incidents Tab ───────────────────────────────────────────

function IncidentsTab() {
  const SEVERITY_COLORS: Record<string, string> = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-slate-100 text-slate-500' };
  return (
    <div className="p-5 space-y-3">
      {incidents.map(inc => (
        <div key={inc.id} className={`rounded-xl border p-4 ${inc.severity === 'high' ? 'border-red-200 bg-red-50/40' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-4 h-4 shrink-0 ${inc.severity === 'high' ? 'text-red-500' : inc.severity === 'medium' ? 'text-amber-500' : 'text-slate-400'}`} />
              <span className="font-semibold text-sm text-slate-800">{inc.title}</span>
            </div>
            <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[inc.status]}`}>{inc.status}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>ID: <span className="text-violet-700 font-mono font-semibold">{inc.id}</span></span>
            <span>Severity: <span className={`px-1.5 py-0.5 rounded-full font-semibold ${SEVERITY_COLORS[inc.severity]}`}>{inc.severity}</span></span>
            <span>By: {inc.reportedBy}</span>
            <span>Date: {inc.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function OpsDemoPage() {
  const [tab, setTab] = useState<OpsTab>('Dashboard');

  return (
    <div className="min-h-screen bg-dark-50/40">
      {/* Browser chrome bar */}
      <div className="sticky top-0 z-50 bg-[#f1f3f4] border-b border-gray-300 px-3 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 border border-gray-200 flex items-center gap-1.5">
          <span className="text-green-600 text-[11px]">🔒</span>
          demo.bizsuits.com/ops
        </div>
        <a href="/demo" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← All Demos</a>
      </div>

      {/* Page header */}
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>OPALshire — Project & Operations Management Demo</span>
          </div>
          <SectionHeading
            badge="Operations Demo"
            title="Enterprise operations — projects, work orders, HSSE, budgets, and incidents"
            subtitle="This example shows how teams can manage projects, facilities, safety, budgets, and incidents across locations from one operational view."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">Back to Features</Button>
            <Button variant="primary" size="md" href="/contact">Request Ops Demo</Button>
          </div>
        </div>
      </section>

      {/* Main app layout */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Sidebar */}
            <div className="w-52 bg-slate-900 shrink-0 flex-col py-4 hidden md:flex">
              <div className="px-4 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-bold text-sm">OPALshire</span>
                </div>
                <div className="text-slate-400 text-xs mt-0.5">Operations Workspace</div>
              </div>
              {TABS.map(t => {
                const Icon = TAB_ICONS[t];
                return (
                  <button key={t} onClick={() => setTab(t)} className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left ${tab === t ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}>
                    <Icon className="w-4 h-4 shrink-0" />
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Mobile tabs */}
              <div className="md:hidden flex overflow-x-auto border-b border-slate-200">
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3 py-3 text-xs font-semibold border-b-2 transition-colors ${tab === t ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500'}`}>{t}</button>
                ))}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = TAB_ICONS[tab]; return <Icon className="w-5 h-5 text-indigo-600" />; })()}
                  <span className="font-semibold text-slate-900 text-sm">{tab}</span>
                </div>
                <button className="flex items-center gap-1.5 text-sm bg-indigo-600 text-white rounded-lg px-3 py-1.5 hover:bg-indigo-500 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  New
                </button>
              </div>

              {tab === 'Dashboard' && <Dashboard />}
              {tab === 'Projects' && <ProjectsTab />}
              {tab === 'Work Orders' && <WorkOrdersTab />}
              {tab === 'Maintenance' && <MaintenanceTab />}
              {tab === 'Budgets' && <BudgetsTab />}
              {tab === 'HSSE' && <HSSETab />}
              {tab === 'Incidents' && <IncidentsTab />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
