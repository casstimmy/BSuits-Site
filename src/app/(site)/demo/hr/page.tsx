'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Users,
  XCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── Data ────────────────────────────────────────────────────

const LOCATIONS = ['All Locations', 'Ibile 1', 'Ibile 2', 'Victoria Island', 'Lekki'];

const HR_TABS = ['Staff', 'Payroll', 'Onboarding', 'Guarantors'] as const;
type HRTab = (typeof HR_TABS)[number];

interface StaffMember {
  id: string;
  name: string;
  role: string;
  location: string;
  salary: number;
  status: 'active' | 'on-leave' | 'probation';
  startDate: string;
  phone: string;
  onboardingComplete: boolean;
}

const staffData: StaffMember[] = [
  { id: 'S001', name: 'John Adeyemi', role: 'Cashier', location: 'Ibile 1', salary: 85000, status: 'active', startDate: '2024-01-15', phone: '080-1234-5678', onboardingComplete: true },
  { id: 'S002', name: 'Jane Okafor', role: 'Supervisor', location: 'Ibile 1', salary: 120000, status: 'active', startDate: '2023-06-01', phone: '080-9876-5432', onboardingComplete: true },
  { id: 'S003', name: 'Doe Babatunde', role: 'Storekeeper', location: 'Ibile 2', salary: 75000, status: 'probation', startDate: '2025-03-01', phone: '081-2345-6789', onboardingComplete: false },
  { id: 'S004', name: 'Mary Eze', role: 'Cashier', location: 'Victoria Island', salary: 85000, status: 'active', startDate: '2024-08-10', phone: '080-5555-1234', onboardingComplete: true },
  { id: 'S005', name: 'Kola Ibrahim', role: 'Driver', location: 'Lekki', salary: 60000, status: 'on-leave', startDate: '2023-11-20', phone: '090-3456-7890', onboardingComplete: true },
  { id: 'S006', name: 'Amara Nwosu', role: 'Accountant', location: 'Victoria Island', salary: 150000, status: 'active', startDate: '2022-03-05', phone: '080-7777-8888', onboardingComplete: true },
  { id: 'S007', name: 'Tobi Adeleke', role: 'Stock Auditor', location: 'Ibile 2', salary: 90000, status: 'active', startDate: '2024-05-12', phone: '080-1111-2222', onboardingComplete: false },
];

const STATUS_COLORS = {
  active: 'bg-emerald-100 text-emerald-700',
  'on-leave': 'bg-amber-100 text-amber-700',
  probation: 'bg-blue-100 text-blue-700',
};

function fmt(n: number) {
  return '₦' + n.toLocaleString();
}

// ─── Staff Tab ───────────────────────────────────────────────

function StaffTab({ staff }: { staff: StaffMember[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Name / Role</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Location</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Salary</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Start Date</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Onboarding</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {staff.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm shrink-0">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.id} · {s.role}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <MapPin className="w-3 h-3" />{s.location}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm font-semibold text-slate-800">{fmt(s.salary)}</span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{s.startDate}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[s.status]}`}>
                  {s.status.replace('-', ' ')}
                </span>
              </td>
              <td className="px-4 py-3">
                {s.onboardingComplete
                  ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                  : <Clock className="w-4 h-4 text-amber-500" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Payroll Tab ─────────────────────────────────────────────

function PayrollTab({ staff }: { staff: StaffMember[] }) {
  const [selectedMonth] = useState('June 2025');
  const totalPayroll = staff.reduce((s, m) => s + m.salary, 0);

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <DollarSign className="w-4 h-4 text-violet-600" />
          Payroll — {selectedMonth}
        </div>
        <button className="flex items-center gap-1 text-xs text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-violet-400 hover:text-violet-600 transition-colors">
          {selectedMonth} <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
          <div className="text-xs text-violet-500 font-semibold mb-1">Total Payroll</div>
          <div className="text-xl font-bold text-violet-800">{fmt(totalPayroll)}</div>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
          <div className="text-xs text-emerald-500 font-semibold mb-1">Staff Count</div>
          <div className="text-xl font-bold text-emerald-800">{staff.length}</div>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
          <div className="text-xs text-amber-500 font-semibold mb-1">Avg Salary</div>
          <div className="text-xl font-bold text-amber-800">{fmt(Math.round(totalPayroll / staff.length))}</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Staff</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Role</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-4 py-3">Gross</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-4 py-3">Deductions</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-4 py-3">Net Pay</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((s) => {
              const deduction = s.status === 'probation' ? s.salary * 0.1 : 0;
              const net = s.salary - deduction;
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{s.role}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-700">{fmt(s.salary)}</td>
                  <td className="px-4 py-3 text-sm text-right text-red-500">{deduction > 0 ? fmt(deduction) : '—'}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-slate-900">{fmt(net)}</td>
                  <td className="px-4 py-3">
                    {s.status === 'active' || s.status === 'on-leave'
                      ? <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" />Paid</span>
                      : <span className="text-xs text-amber-600 font-semibold flex items-center gap-1"><Clock className="w-3 h-3" />Pending</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Onboarding Tab ──────────────────────────────────────────

function OnboardingTab({ staff }: { staff: StaffMember[] }) {
  const incomplete = staff.filter((s) => !s.onboardingComplete);
  const complete = staff.filter((s) => s.onboardingComplete);

  const steps = ['Personal Info', 'Bank Details', 'Guarantor Info', 'ID Upload', 'Contract Signed'];

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
          <div>
            <div className="text-xl font-bold text-emerald-800">{complete.length}</div>
            <div className="text-xs text-emerald-600 font-semibold">Onboarding Complete</div>
          </div>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex items-center gap-3">
          <Clock className="w-8 h-8 text-amber-500 shrink-0" />
          <div>
            <div className="text-xl font-bold text-amber-800">{incomplete.length}</div>
            <div className="text-xs text-amber-600 font-semibold">In Progress</div>
          </div>
        </div>
      </div>

      {incomplete.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">In Progress</h3>
          <div className="space-y-3">
            {incomplete.map((s) => {
              const completedSteps = Math.floor(Math.random() * 3) + 1;
              return (
                <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-xs">
                        {s.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">{completedSteps}/{steps.length} steps</span>
                  </div>
                  <div className="flex gap-1.5">
                    {steps.map((step, i) => (
                      <div
                        key={step}
                        title={step}
                        className={`flex-1 h-1.5 rounded-full ${i < completedSteps ? 'bg-violet-500' : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">Next: {steps[completedSteps] ?? 'Complete'}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Completed</h3>
        <div className="space-y-2">
          {complete.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">
                  {s.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.role} · {s.location}</div>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Guarantors Tab ──────────────────────────────────────────

function GuarantorsTab({ staff }: { staff: StaffMember[] }) {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {staff.map((s) => (
          <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                  {s.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.role}</div>
                </div>
              </div>
              {s.onboardingComplete
                ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                : <XCircle className="w-4 h-4 text-slate-300" />}
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Guarantor Name</span>
                <span className="text-slate-700 font-medium">Mr. {s.name.split(' ')[1]} Sr.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Relationship</span>
                <span className="text-slate-700">Parent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone</span>
                <span className="text-slate-700">{s.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verification</span>
                <span className={s.onboardingComplete ? 'text-emerald-600 font-semibold' : 'text-amber-600'}>
                  {s.onboardingComplete ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function HRDemoPage() {
  const [location, setLocation] = useState('All Locations');
  const [tab, setTab] = useState<HRTab>('Staff');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const filteredStaff =
    location === 'All Locations' ? staffData : staffData.filter((s) => s.location === location);

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
          demo.bizsuits.com/hr
        </div>
        <a href="/features" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← Back to Features</a>
      </div>

      {/* Page header */}
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>HR & Staff Management Demo</span>
          </div>
          <SectionHeading
            badge="HR Demo"
            title="Staff management surface mirroring the inventory admin HR workflow"
            subtitle="View staff across locations, run payroll review, track onboarding progress, and manage guarantor records — all from the same admin used by the live system."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">Back to Features</Button>
            <Button variant="primary" size="md" href="/contact">Request HR Demo</Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-600" />
                <span className="font-semibold text-slate-900">Staff Management</span>
                <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {filteredStaff.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Location filter */}
                <div className="relative">
                  <button
                    onClick={() => setShowLocationMenu(!showLocationMenu)}
                    className="flex items-center gap-1.5 text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:border-violet-400 hover:text-violet-600 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {location}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {showLocationMenu && (
                    <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg z-10 py-1">
                      {LOCATIONS.map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLocation(l); setShowLocationMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm ${location === l ? 'text-violet-600 font-semibold bg-violet-50' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button className="flex items-center gap-1.5 text-sm bg-violet-600 text-white rounded-lg px-3 py-1.5 hover:bg-violet-500 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add Staff
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 px-5">
              {HR_TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                    tab === t
                      ? 'border-violet-500 text-violet-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {tab === 'Staff' && <StaffTab staff={filteredStaff} />}
            {tab === 'Payroll' && <PayrollTab staff={filteredStaff} />}
            {tab === 'Onboarding' && <OnboardingTab staff={filteredStaff} />}
            {tab === 'Guarantors' && <GuarantorsTab staff={filteredStaff} />}
          </div>
        </div>
      </section>
    </div>
  );
}
