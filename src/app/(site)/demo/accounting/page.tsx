'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Calculator,
  Calendar,
  FileText,
  Printer,
  Scale,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

type AccountingTabKey = 'profit-loss' | 'balance-sheet' | 'trial-balance';

const reportRanges = ['This month', 'Last quarter', 'FY 2026'];

const reportTabs: Array<{ key: AccountingTabKey; label: string; icon: typeof TrendingUp }> = [
  { key: 'profit-loss', label: 'Profit & Loss', icon: TrendingUp },
  { key: 'balance-sheet', label: 'Balance Sheet', icon: Scale },
  { key: 'trial-balance', label: 'Trial Balance', icon: FileText },
];

const accountingReports = {
  'profit-loss': {
    title: 'Financial Reports',
    subtitle: 'View the current business financial statements by reporting range.',
    summary: {
      title: 'Net Profit',
      value: 'NGN 3,240,000',
      revenue: 'NGN 8,420,000',
      expenses: 'NGN 5,180,000',
      positive: true,
    },
    panels: [
      {
        title: 'Revenue',
        total: 'NGN 8,420,000',
        headingClass: 'bg-green-50 text-green-800 border-green-100',
        valueClass: 'text-green-700',
        rows: [
          { name: 'Store sales', meta: 'Retail and counter', amount: 'NGN 4,920,000' },
          { name: 'Wholesale orders', meta: 'Bulk customers', amount: 'NGN 2,180,000' },
          { name: 'Service income', meta: 'Setup and support', amount: 'NGN 1,320,000' },
        ],
      },
      {
        title: 'Expenses',
        total: 'NGN 5,180,000',
        headingClass: 'bg-red-50 text-red-800 border-red-100',
        valueClass: 'text-red-700',
        rows: [
          { name: 'Stock purchases', meta: 'Replenishment', amount: 'NGN 2,640,000' },
          { name: 'Operations', meta: 'Power and logistics', amount: 'NGN 1,030,000' },
          { name: 'Payroll and contractor fees', meta: 'Team and field work', amount: 'NGN 1,510,000' },
        ],
      },
    ],
  },
  'balance-sheet': {
    title: 'Balance Sheet',
    subtitle: 'A working view of assets, liabilities, and equity from the source accounting reference.',
    summaryCards: [
      { label: 'Total Assets', value: 'NGN 14,600,000', className: 'border-blue-200 bg-blue-50 text-blue-700' },
      { label: 'Total Liabilities', value: 'NGN 5,200,000', className: 'border-red-200 bg-red-50 text-red-700' },
      { label: 'Total Equity', value: 'NGN 9,400,000', className: 'border-purple-200 bg-purple-50 text-purple-700' },
    ],
    groups: [
      {
        title: 'Assets',
        total: 'NGN 14,600,000',
        headingClass: 'bg-blue-50 text-blue-800 border-blue-100',
        rows: [
          { name: 'Cash and bank', amount: 'NGN 4,100,000' },
          { name: 'Inventory on hand', amount: 'NGN 6,800,000' },
          { name: 'Receivables and advances', amount: 'NGN 3,700,000' },
        ],
      },
      {
        title: 'Liabilities',
        total: 'NGN 5,200,000',
        headingClass: 'bg-red-50 text-red-800 border-red-100',
        rows: [
          { name: 'Supplier payables', amount: 'NGN 3,020,000' },
          { name: 'Accrued operations costs', amount: 'NGN 1,180,000' },
          { name: 'Tax obligations', amount: 'NGN 1,000,000' },
        ],
      },
      {
        title: 'Equity',
        total: 'NGN 9,400,000',
        headingClass: 'bg-purple-50 text-purple-800 border-purple-100',
        rows: [
          { name: 'Owner capital', amount: 'NGN 6,100,000' },
          { name: 'Retained earnings', amount: 'NGN 3,300,000' },
        ],
      },
    ],
    equation: 'Assets = Liabilities + Equity',
    equationResult: 'Balanced against the current reporting slice',
  },
  'trial-balance': {
    title: 'Trial Balance',
    subtitle: 'Debits and credits grouped into a review table similar to the source reports module.',
    totals: {
      debit: 'NGN 19,800,000',
      credit: 'NGN 19,800,000',
      status: 'Balanced',
    },
    rows: [
      { account: 'Cash at bank', debit: 'NGN 4,100,000', credit: 'NGN 0' },
      { account: 'Inventory', debit: 'NGN 6,800,000', credit: 'NGN 0' },
      { account: 'Accounts payable', debit: 'NGN 0', credit: 'NGN 3,020,000' },
      { account: 'Sales revenue', debit: 'NGN 0', credit: 'NGN 8,420,000' },
      { account: 'Operations expense', debit: 'NGN 1,030,000', credit: 'NGN 0' },
      { account: 'Payroll and contractor fees', debit: 'NGN 1,510,000', credit: 'NGN 0' },
      { account: 'Owner capital', debit: 'NGN 0', credit: 'NGN 6,850,000' },
      { account: 'Retained earnings', debit: 'NGN 360,000', credit: 'NGN 1,510,000' },
    ],
  },
};

function ReportTable({
  title,
  total,
  headingClass,
  valueClass,
  rows,
}: {
  title: string;
  total: string;
  headingClass: string;
  valueClass: string;
  rows: Array<{ name: string; meta?: string; amount: string }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-dark-100 bg-white shadow-sm">
      <div className={`flex items-center justify-between border-b px-5 py-4 ${headingClass}`}>
        <h3 className="text-base font-bold">{title}</h3>
        <span className={`text-sm font-bold ${valueClass}`}>{total}</span>
      </div>
      <div className="divide-y divide-dark-100">
        {rows.map((row) => (
          <div key={row.name} className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-dark-900">{row.name}</p>
              {row.meta ? <p className="text-xs text-dark-400 mt-1">{row.meta}</p> : null}
            </div>
            <span className="text-sm font-semibold text-dark-700">{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AccountingDemoPage() {
  const [activeTab, setActiveTab] = useState<AccountingTabKey>('profit-loss');
  const [activeRange, setActiveRange] = useState(reportRanges[0]);

  const currentReport = accountingReports[activeTab];
  const profitLossReport = accountingReports['profit-loss'];
  const balanceSheetReport = accountingReports['balance-sheet'];
  const trialBalanceReport = accountingReports['trial-balance'];

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
          demo.bizsuits.com/accounting
        </div>
        <a href="/demo" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← All Demos</a>
      </div>
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Accounting and Finance Demo</span>
          </div>
          <SectionHeading
            badge="Accounting Demo"
            title="Accounting reports built for day-to-day financial visibility"
            subtitle="Explore Profit & Loss, Balance Sheet, and Trial Balance views with date controls and print-ready review states."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">
              Back to Features
            </Button>
            <Button variant="primary" size="md" href="/contact">
              Request Accounting Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding pt-10">
        <div className="container-custom">
          <Card padding="lg" elevated>
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Calculator className="w-7 h-7 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm text-dark-500">Finance focus</p>
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">{currentReport.title}</h2>
                  <p className="text-dark-500 max-w-2xl leading-relaxed">{currentReport.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="rounded-xl border border-dark-100 bg-dark-50 px-4 py-3 text-sm font-medium text-dark-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-600" />
                  {activeRange}
                </div>
                <button className="rounded-xl border border-dark-100 bg-white px-4 py-3 text-sm font-semibold text-dark-700 flex items-center gap-2 hover:bg-dark-50 transition-colors">
                  <Printer className="w-4 h-4" />
                  Print Preview
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {reportRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-50 text-dark-500 hover:bg-dark-100'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8 border-b border-dark-100 pb-6">
              {reportTabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      activeTab === tab.key
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                        : 'bg-dark-50 text-dark-500 hover:bg-dark-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === 'profit-loss' ? (
              <div className="space-y-6">
                <div className={`rounded-2xl border px-6 py-5 ${profitLossReport.summary.positive ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${profitLossReport.summary.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                        {profitLossReport.summary.positive ? (
                          <TrendingUp className="w-7 h-7 text-green-700" />
                        ) : (
                          <TrendingDown className="w-7 h-7 text-red-700" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-dark-500">{profitLossReport.summary.title}</p>
                        <p className={`text-3xl font-bold mt-1 ${profitLossReport.summary.positive ? 'text-green-700' : 'text-red-700'}`}>
                          {profitLossReport.summary.value}
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 lg:min-w-[320px]">
                      <div className="rounded-xl bg-white/80 px-4 py-3 border border-white/70">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-400 mb-1">Revenue</p>
                        <p className="text-lg font-bold text-green-700">{profitLossReport.summary.revenue}</p>
                      </div>
                      <div className="rounded-xl bg-white/80 px-4 py-3 border border-white/70">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-400 mb-1">Expenses</p>
                        <p className="text-lg font-bold text-red-700">{profitLossReport.summary.expenses}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {profitLossReport.panels.map((panel) => (
                    <ReportTable
                      key={panel.title}
                      title={panel.title}
                      total={panel.total}
                      headingClass={panel.headingClass}
                      valueClass={panel.valueClass}
                      rows={panel.rows}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === 'balance-sheet' ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {balanceSheetReport.summaryCards.map((card) => (
                    <div key={card.label} className={`rounded-2xl border p-5 ${card.className}`}>
                      <p className="text-sm font-semibold opacity-80">{card.label}</p>
                      <p className="text-2xl font-bold mt-2">{card.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {balanceSheetReport.groups.map((group) => (
                    <ReportTable
                      key={group.title}
                      title={group.title}
                      total={group.total}
                      headingClass={group.headingClass}
                      valueClass="text-dark-700"
                      rows={group.rows}
                    />
                  ))}
                </div>

                <div className="rounded-2xl border border-dark-100 bg-dark-50 px-6 py-5 text-center">
                  <p className="text-lg font-bold text-dark-900">{balanceSheetReport.equation}</p>
                  <p className="text-sm text-accent-600 font-semibold mt-2">{balanceSheetReport.equationResult}</p>
                </div>
              </div>
            ) : null}

            {activeTab === 'trial-balance' ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                    <p className="text-sm font-semibold text-sky-700">Total Debit</p>
                    <p className="text-2xl font-bold text-sky-800 mt-2">{trialBalanceReport.totals.debit}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-sm font-semibold text-emerald-700">Total Credit</p>
                    <p className="text-2xl font-bold text-emerald-800 mt-2">{trialBalanceReport.totals.credit}</p>
                  </div>
                  <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                    <p className="text-sm font-semibold text-purple-700">Status</p>
                    <p className="text-2xl font-bold text-purple-800 mt-2">{trialBalanceReport.totals.status}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-dark-100 bg-white shadow-sm">
                  <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 border-b border-dark-100 bg-dark-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-dark-400">
                    <span>Account</span>
                    <span className="text-right">Debit</span>
                    <span className="text-right">Credit</span>
                  </div>
                  <div className="divide-y divide-dark-100">
                    {trialBalanceReport.rows.map((row) => (
                      <div key={row.account} className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-5 py-4 text-sm">
                        <span className="font-medium text-dark-900">{row.account}</span>
                        <span className="text-right text-dark-600">{row.debit}</span>
                        <span className="text-right text-dark-600">{row.credit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      </section>
    </div>
  );
}
