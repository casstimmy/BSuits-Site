'use client';

import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  DollarSign,
  Droplets,
  Heart,
  Leaf,
  Package,
  Plus,
  Sprout,
  Stethoscope,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── Types ───────────────────────────────────────────────────

const TABS = ['Dashboard', 'Animals', 'Feeding', 'Health Records', 'Finance', 'Inventory'] as const;
type FarmTab = (typeof TABS)[number];

interface Animal {
  id: string;
  species: string;
  breed: string;
  tag: string;
  pen: string;
  age: string;
  weight: string;
  status: 'healthy' | 'sick' | 'quarantine' | 'pregnant';
  sex: 'M' | 'F';
}

// ─── Data ────────────────────────────────────────────────────

const animals: Animal[] = [
  { id: 'A001', species: 'Cattle', breed: 'Friesian', tag: 'CT-001', pen: 'Pen A', age: '3y', weight: '480kg', status: 'healthy', sex: 'F' },
  { id: 'A002', species: 'Cattle', breed: 'Angus', tag: 'CT-002', pen: 'Pen A', age: '4y', weight: '520kg', status: 'healthy', sex: 'M' },
  { id: 'A003', species: 'Goat', breed: 'Boer', tag: 'GT-001', pen: 'Pen B', age: '2y', weight: '55kg', status: 'pregnant', sex: 'F' },
  { id: 'A004', species: 'Goat', breed: 'West African Dwarf', tag: 'GT-002', pen: 'Pen B', age: '1y', weight: '30kg', status: 'healthy', sex: 'M' },
  { id: 'A005', species: 'Sheep', breed: 'Suffolk', tag: 'SH-001', pen: 'Pen C', age: '2y', weight: '70kg', status: 'sick', sex: 'F' },
  { id: 'A006', species: 'Sheep', breed: 'Dorper', tag: 'SH-002', pen: 'Pen C', age: '3y', weight: '85kg', status: 'healthy', sex: 'M' },
  { id: 'A007', species: 'Pig', breed: 'Large White', tag: 'PG-001', pen: 'Pen D', age: '8m', weight: '110kg', status: 'healthy', sex: 'F' },
  { id: 'A008', species: 'Poultry', breed: 'Broiler', tag: 'PL-001', pen: 'Poultry House', age: '6w', weight: '2.4kg', status: 'healthy', sex: 'F' },
];

const healthRecords = [
  { id: 'HR001', animalTag: 'CT-001', type: 'Vaccination', vet: 'Dr. Olu', date: '2025-05-10', notes: 'FMD vaccine administered', status: 'done' },
  { id: 'HR002', animalTag: 'SH-001', type: 'Treatment', vet: 'Dr. Olu', date: '2025-06-01', notes: 'Respiratory infection — antibiotics', status: 'active' },
  { id: 'HR003', animalTag: 'GT-001', type: 'Prenatal Check', vet: 'Dr. Emeka', date: '2025-06-05', notes: 'Due in 3 weeks', status: 'scheduled' },
  { id: 'HR004', animalTag: 'PG-001', type: 'Deworming', vet: 'Dr. Olu', date: '2025-05-28', notes: 'Routine deworming done', status: 'done' },
];

const feedingSchedule = [
  { pen: 'Pen A (Cattle)', feed: 'Hay + Concentrate', frequency: '2× daily', quantity: '12kg/head', lastFed: '07:30 AM', status: 'fed' },
  { pen: 'Pen B (Goat)', feed: 'Browse + Grain mix', frequency: '2× daily', quantity: '2kg/head', lastFed: '07:45 AM', status: 'fed' },
  { pen: 'Pen C (Sheep)', feed: 'Pasture + Hay', frequency: '2× daily', quantity: '3kg/head', lastFed: '—', status: 'pending' },
  { pen: 'Pen D (Pig)', feed: 'Swine finisher pellets', frequency: '3× daily', quantity: '2.5kg/head', lastFed: '06:00 AM', status: 'fed' },
  { pen: 'Poultry House', feed: 'Broiler finisher', frequency: 'Ad libitum', quantity: 'Auto feeder', lastFed: 'Continuous', status: 'fed' },
];

const financeData = {
  income: [
    { desc: 'Livestock Sales', amount: '₦680,000' },
    { desc: 'Milk Revenue', amount: '₦124,000' },
    { desc: 'Eggs', amount: '₦48,000' },
    { desc: 'Manure Sales', amount: '₦22,000' },
  ],
  expenses: [
    { desc: 'Feed Costs', amount: '₦310,000' },
    { desc: 'Veterinary', amount: '₦85,000' },
    { desc: 'Labour', amount: '₦120,000' },
    { desc: 'Medications', amount: '₦42,000' },
    { desc: 'Equipment', amount: '₦18,000' },
  ],
};

const inventoryItems = [
  { name: 'Hay Bales', qty: 84, unit: 'bales', reorder: 20, status: 'healthy' },
  { name: 'Concentrate Feed', qty: 450, unit: 'kg', reorder: 100, status: 'healthy' },
  { name: 'Swine Pellets', qty: 60, unit: 'kg', reorder: 50, status: 'low' },
  { name: 'Broiler Finisher', qty: 120, unit: 'kg', reorder: 80, status: 'healthy' },
  { name: 'FMD Vaccine', qty: 8, unit: 'vials', reorder: 10, status: 'critical' },
  { name: 'Antibiotics (OTC)', qty: 24, unit: 'packs', reorder: 10, status: 'healthy' },
  { name: 'Ear Tags', qty: 150, unit: 'units', reorder: 50, status: 'healthy' },
];

// ─── Status helpers ──────────────────────────────────────────

const ANIMAL_STATUS_COLORS = {
  healthy: 'bg-emerald-100 text-emerald-700',
  sick: 'bg-red-100 text-red-700',
  quarantine: 'bg-amber-100 text-amber-700',
  pregnant: 'bg-purple-100 text-purple-700',
};

const SPECIES_EMOJI: Record<string, string> = {
  Cattle: '🐄', Goat: '🐐', Sheep: '🐑', Pig: '🐷', Poultry: '🐓',
};

function fmt(n: number) {
  return '₦' + n.toLocaleString();
}

// ─── Dashboard ───────────────────────────────────────────────

function Dashboard() {
  const speciesCount: Record<string, number> = {};
  animals.forEach((a) => { speciesCount[a.species] = (speciesCount[a.species] || 0) + 1; });
  const totalIncome = 874000;
  const totalExpenses = 575000;
  const weeklyData = [62, 74, 58, 80, 72, 88, 76];

  return (
    <div className="p-5 space-y-6">
      {/* Species cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(speciesCount).map(([species, count]) => (
          <div key={species} className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-center gap-3">
            <span className="text-2xl">{SPECIES_EMOJI[species] ?? '🐾'}</span>
            <div>
              <div className="text-xl font-bold text-emerald-800">{count}</div>
              <div className="text-xs text-emerald-600">{species}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Activity className="w-3.5 h-3.5 text-red-500" />
            Health Alerts
          </div>
          <div className="text-2xl font-bold text-slate-900">2</div>
          <div className="text-xs text-red-500 mt-0.5">1 sick · 1 scheduled</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            Feeding Status
          </div>
          <div className="text-2xl font-bold text-slate-900">4/5</div>
          <div className="text-xs text-amber-500 mt-0.5">Pen C pending</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Net Profit (June)
          </div>
          <div className="text-2xl font-bold text-emerald-700">{fmt(totalIncome - totalExpenses)}</div>
          <div className="text-xs text-slate-400 mt-0.5">Revenue: {fmt(totalIncome)}</div>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-slate-800">Weekly Performance Index</span>
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {weeklyData.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t bg-emerald-500" style={{ height: `${v}%` }} />
              <span className="text-[10px] text-slate-400">{['M','T','W','T','F','S','S'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Animals Tab ─────────────────────────────────────────────

function AnimalsTab() {
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const species = ['All', ...Object.keys(SPECIES_EMOJI)];
  const filtered = speciesFilter === 'All' ? animals : animals.filter((a) => a.species === speciesFilter);

  return (
    <div>
      <div className="flex items-center gap-2 p-4 border-b border-slate-200 overflow-x-auto">
        {species.map((s) => (
          <button key={s} onClick={() => setSpeciesFilter(s)} className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${speciesFilter === s ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {SPECIES_EMOJI[s] ?? ''} {s}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['Tag', 'Species / Breed', 'Pen', 'Age', 'Weight', 'Sex', 'Status'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-xs font-mono text-emerald-700 font-semibold">{a.tag}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span>{SPECIES_EMOJI[a.species]}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{a.species}</div>
                      <div className="text-xs text-slate-400">{a.breed}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">{a.pen}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{a.age}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{a.weight}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{a.sex}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${ANIMAL_STATUS_COLORS[a.status]}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Feeding Tab ─────────────────────────────────────────────

function FeedingTab() {
  return (
    <div className="p-4 space-y-3">
      {feedingSchedule.map((f) => (
        <div key={f.pen} className={`rounded-xl border p-4 ${f.status === 'pending' ? 'border-amber-200 bg-amber-50/50' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Droplets className={`w-5 h-5 shrink-0 ${f.status === 'pending' ? 'text-amber-500' : 'text-emerald-500'}`} />
              <div>
                <div className="text-sm font-semibold text-slate-800">{f.pen}</div>
                <div className="text-xs text-slate-500 mt-0.5">{f.feed}</div>
              </div>
            </div>
            {f.status === 'fed'
              ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              : <span className="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-semibold shrink-0">Pending</span>}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
            <div><span className="text-slate-400">Frequency</span><div className="font-medium text-slate-700">{f.frequency}</div></div>
            <div><span className="text-slate-400">Quantity</span><div className="font-medium text-slate-700">{f.quantity}</div></div>
            <div><span className="text-slate-400">Last Fed</span><div className={`font-medium ${f.status === 'pending' ? 'text-amber-600' : 'text-slate-700'}`}>{f.lastFed}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Health Records Tab ──────────────────────────────────────

function HealthTab() {
  const STATUS_COLORS: Record<string, string> = {
    done: 'bg-emerald-100 text-emerald-700',
    active: 'bg-red-100 text-red-700',
    scheduled: 'bg-blue-100 text-blue-700',
  };
  return (
    <div className="p-4 space-y-3">
      {healthRecords.map((r) => (
        <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-800 text-sm">{r.type}</span>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{r.animalTag}</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[r.status]}`}>{r.status}</span>
          </div>
          <div className="text-xs text-slate-500 space-y-1">
            <div>{r.notes}</div>
            <div className="flex gap-4">
              <span>Vet: <span className="text-slate-700 font-medium">{r.vet}</span></span>
              <span>Date: <span className="text-slate-700 font-medium">{r.date}</span></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Finance Tab ─────────────────────────────────────────────

function FinanceTab() {
  const totalIncome = 874000;
  const totalExpenses = 575000;
  return (
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4"><div className="text-xs text-emerald-600 font-semibold mb-1">Total Income</div><div className="text-xl font-bold text-emerald-800">{fmt(totalIncome)}</div></div>
        <div className="rounded-xl bg-red-50 border border-red-100 p-4"><div className="text-xs text-red-600 font-semibold mb-1">Total Expenses</div><div className="text-xl font-bold text-red-800">{fmt(totalExpenses)}</div></div>
        <div className="rounded-xl bg-slate-900 p-4"><div className="text-xs text-slate-400 font-semibold mb-1">Net Profit</div><div className="text-xl font-bold text-emerald-400">{fmt(totalIncome - totalExpenses)}</div></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-emerald-100 overflow-hidden">
          <div className="bg-emerald-50 px-4 py-3 flex items-center justify-between border-b border-emerald-100">
            <span className="text-sm font-semibold text-emerald-700">Income</span>
            <span className="text-sm font-bold text-emerald-700">{fmt(totalIncome)}</span>
          </div>
          {financeData.income.map((row) => (
            <div key={row.desc} className="flex justify-between px-4 py-2.5 border-b border-slate-100 last:border-0 text-sm">
              <span className="text-slate-600">{row.desc}</span>
              <span className="font-semibold text-slate-800">{row.amount}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-red-100 overflow-hidden">
          <div className="bg-red-50 px-4 py-3 flex items-center justify-between border-b border-red-100">
            <span className="text-sm font-semibold text-red-700">Expenses</span>
            <span className="text-sm font-bold text-red-700">{fmt(totalExpenses)}</span>
          </div>
          {financeData.expenses.map((row) => (
            <div key={row.desc} className="flex justify-between px-4 py-2.5 border-b border-slate-100 last:border-0 text-sm">
              <span className="text-slate-600">{row.desc}</span>
              <span className="font-semibold text-slate-800">{row.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Inventory Tab ───────────────────────────────────────────

function InventoryTab() {
  const STATUS_COLORS: Record<string, string> = {
    healthy: 'bg-emerald-100 text-emerald-700',
    low: 'bg-amber-100 text-amber-700',
    critical: 'bg-red-100 text-red-700',
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[540px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {['Item', 'Qty', 'Unit', 'Reorder At', 'Status'].map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {inventoryItems.map((item) => (
            <tr key={item.name} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-800">{item.name}</td>
              <td className="px-4 py-3 text-sm font-bold text-slate-900">{item.qty}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{item.unit}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{item.reorder}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[item.status]}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

const TAB_ICONS = {
  Dashboard: BarChart3,
  Animals: Leaf,
  Feeding: Droplets,
  'Health Records': Heart,
  Finance: DollarSign,
  Inventory: Package,
};

export default function FarmDemoPage() {
  const [tab, setTab] = useState<FarmTab>('Dashboard');

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
          demo.bizsuits.com/farm
        </div>
        <a href="/demo" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← All Demos</a>
      </div>

      {/* Page header */}
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Farm Health Manager Demo</span>
          </div>
          <SectionHeading
            badge="Farm Operations Demo"
            title="Farm management — animals, feeding, health, finance, and inventory"
            subtitle="This demo mirrors the Farm Health Manager system: species tracking, pen feeding schedules, veterinary health records, farm finance, and farm supply inventory."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">Back to Features</Button>
            <Button variant="primary" size="md" href="/contact">Request Farm Demo</Button>
          </div>
        </div>
      </section>

      {/* Main app layout */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex gap-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Sidebar */}
            <div className="w-52 bg-emerald-900 shrink-0 flex flex-col py-4 hidden md:flex">
              <div className="px-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-bold text-sm">Farm Manager</span>
                </div>
                <div className="text-emerald-400 text-xs mt-0.5">Greenfield Farm</div>
              </div>
              {TABS.map((t) => {
                const Icon = TAB_ICONS[t];
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left ${tab === t ? 'bg-emerald-700/60 text-white font-semibold' : 'text-emerald-300 hover:bg-emerald-800/60 hover:text-white'}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Mobile tab bar */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="md:hidden flex overflow-x-auto border-b border-slate-200">
                {TABS.map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3 py-3 text-xs font-semibold border-b-2 transition-colors ${tab === t ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500'}`}>{t}</button>
                ))}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = TAB_ICONS[tab]; return <Icon className="w-5 h-5 text-emerald-600" />; })()}
                  <span className="font-semibold text-slate-900 text-sm">{tab}</span>
                  <span className="text-xs text-slate-400">June 2025</span>
                </div>
                <button className="flex items-center gap-1.5 text-sm bg-emerald-600 text-white rounded-lg px-3 py-1.5 hover:bg-emerald-500 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              {tab === 'Dashboard' && <Dashboard />}
              {tab === 'Animals' && <AnimalsTab />}
              {tab === 'Feeding' && <FeedingTab />}
              {tab === 'Health Records' && <HealthTab />}
              {tab === 'Finance' && <FinanceTab />}
              {tab === 'Inventory' && <InventoryTab />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
