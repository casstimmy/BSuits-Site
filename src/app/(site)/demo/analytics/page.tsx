'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

type AnalyticsPeriod = 'day' | 'week' | 'month';

const periodLabels: Record<AnalyticsPeriod, string> = {
  day: 'Today',
  week: 'This Week',
  month: 'This Month',
};

const analyticsData: Record<
  AnalyticsPeriod,
  {
    sales: string;
    transactions: string;
    averageOrder: string;
    topCategory: string;
    delta: string;
    chart: Array<{ label: string; value: number }>;
    insights: Array<{ title: string; detail: string }>;
    activity: Array<{ title: string; meta: string; amount: string }>;
  }
> = {
  day: {
    sales: 'NGN 486,000',
    transactions: '84 orders',
    averageOrder: 'NGN 5,786',
    topCategory: 'Packaged goods',
    delta: '+12.4% vs yesterday',
    chart: [
      { label: '08:00', value: 28 },
      { label: '10:00', value: 42 },
      { label: '12:00', value: 58 },
      { label: '14:00', value: 74 },
      { label: '16:00', value: 67 },
      { label: '18:00', value: 90 },
      { label: '20:00', value: 62 },
    ],
    insights: [
      { title: 'Lunch spike', detail: 'Peak order flow hit between 13:00 and 16:00 after a combo promotion.' },
      { title: 'Payment mix', detail: 'Card transactions made up 68% of completed checkouts today.' },
      { title: 'Restock alert', detail: 'Cooking oil and bottled water are both within one day of min stock.' },
    ],
    activity: [
      { title: 'Outlet 01 closed a strong mid-day run', meta: '32 orders between 12:00 and 15:00', amount: 'NGN 176,000' },
      { title: 'Promo bundle converted repeat buyers', meta: '14 repeat customers used the lunch bundle', amount: 'NGN 84,000' },
      { title: 'Courier dispatches cleared backlog', meta: '9 delivery orders marked complete', amount: 'NGN 57,000' },
    ],
  },
  week: {
    sales: 'NGN 3,420,000',
    transactions: '618 orders',
    averageOrder: 'NGN 5,534',
    topCategory: 'Household essentials',
    delta: '+8.1% vs last week',
    chart: [
      { label: 'Mon', value: 58 },
      { label: 'Tue', value: 61 },
      { label: 'Wed', value: 66 },
      { label: 'Thu', value: 72 },
      { label: 'Fri', value: 86 },
      { label: 'Sat', value: 100 },
      { label: 'Sun', value: 73 },
    ],
    insights: [
      { title: 'Weekend acceleration', detail: 'Saturday carried the strongest basket size across all locations.' },
      { title: 'Inventory drag reduced', detail: 'Stockout-related missed sales fell by 19% after replenishment timing improved.' },
      { title: 'Best performing location', detail: 'Lekki outlet led both order volume and repeat purchase rate this week.' },
    ],
    activity: [
      { title: 'Weekend bundle lift', meta: 'Family-size basket promotions landed well in two outlets', amount: 'NGN 412,000' },
      { title: 'Inventory sync stabilized', meta: 'No negative stock movements recorded in the last 72 hours', amount: 'Operational gain' },
      { title: 'Category leader held steady', meta: 'Household essentials accounted for 27% of revenue', amount: 'NGN 923,000' },
    ],
  },
  month: {
    sales: 'NGN 14,860,000',
    transactions: '2,844 orders',
    averageOrder: 'NGN 5,225',
    topCategory: 'Mixed retail basket',
    delta: '+15.7% vs last month',
    chart: [
      { label: 'W1', value: 54 },
      { label: 'W2', value: 63 },
      { label: 'W3', value: 77 },
      { label: 'W4', value: 96 },
    ],
    insights: [
      { title: 'Margin protection', detail: 'Average order value held while discount rates stayed within target thresholds.' },
      { title: 'Expansion readiness', detail: 'The current volume pattern supports one more high-traffic branch without backend strain.' },
      { title: 'Reporting quality', detail: 'Daily sales, inventory, and movement data now reconcile cleanly into month-end review.' },
    ],
    activity: [
      { title: 'Month-end sales run-rate improved', meta: 'Weeks three and four outperformed the opening half', amount: 'NGN 8,440,000' },
      { title: 'Best inventory turn', meta: 'Fast-moving consumables rotated 1.4x faster than last month', amount: 'Efficiency gain' },
      { title: 'Customer retention signal', meta: 'Repeat customers accounted for 38% of monthly orders', amount: '1,081 orders' },
    ],
  },
};

export default function AnalyticsDemoPage() {
  const [activePeriod, setActivePeriod] = useState<AnalyticsPeriod>('week');

  const current = analyticsData[activePeriod];
  const maxValue = useMemo(
    () => Math.max(...current.chart.map((item) => item.value)),
    [current.chart]
  );

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
          demo.bizsuits.com/analytics
        </div>
        <a href="/demo" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← All Demos</a>
      </div>
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Analytics and Reports Demo</span>
          </div>
          <SectionHeading
            badge="Analytics Demo"
            title="Reporting dashboard aligned to the current inventory admin analytics flow"
            subtitle="This fragment mirrors the source reporting surface: period switching, summary metrics, operational signals, and a trend panel built from sales activity rather than placeholder charts."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">
              Back to Features
            </Button>
            <Button variant="primary" size="md" href="/contact">
              Request Analytics Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding pt-10">
        <div className="container-custom space-y-8">
          <Card padding="lg" elevated>
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-7 h-7 text-rose-700" />
                </div>
                <div>
                  <p className="text-sm text-dark-500">Source pattern</p>
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">Business Reporting Overview</h2>
                  <p className="text-dark-500 max-w-2xl leading-relaxed">
                    The original reporting page centered on quick period changes and high-signal metrics.
                    This version keeps that same rhythm while presenting BizSuits as a credible client demo surface.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-xl border border-dark-100 bg-dark-50 px-4 py-3 text-sm font-medium text-dark-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-600" />
                  {periodLabels[activePeriod]}
                </div>
                <Button variant="secondary" size="sm" href="/demo/inventory">
                  View Stock Context
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 border-b border-dark-100 pb-6">
              {(Object.keys(periodLabels) as AnalyticsPeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors ${
                    activePeriod === period
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                      : 'bg-dark-50 text-dark-500 hover:bg-dark-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-700 mb-3">
                  <CircleDollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">Sales</span>
                </div>
                <p className="text-2xl font-bold text-emerald-800">{current.sales}</p>
                <p className="text-sm text-emerald-700 mt-2">{current.delta}</p>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <div className="flex items-center gap-2 text-sky-700 mb-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm font-semibold">Transactions</span>
                </div>
                <p className="text-2xl font-bold text-sky-800">{current.transactions}</p>
                <p className="text-sm text-sky-700 mt-2">Across active checkout sessions</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2 text-amber-700 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">Average Order</span>
                </div>
                <p className="text-2xl font-bold text-amber-800">{current.averageOrder}</p>
                <p className="text-sm text-amber-700 mt-2">Maintaining margin while scaling volume</p>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <div className="flex items-center gap-2 text-violet-700 mb-3">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-semibold">Top Category</span>
                </div>
                <p className="text-2xl font-bold text-violet-800">{current.topCategory}</p>
                <p className="text-sm text-violet-700 mt-2">Best performing segment in this window</p>
              </div>
            </div>
          </Card>

          <div className="grid xl:grid-cols-[1.45fr_0.95fr] gap-6 lg:gap-8">
            <Card padding="lg" elevated>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-dark-500">Trend view</p>
                  <h3 className="text-xl font-bold text-dark-900">Sales trend by selected period</h3>
                </div>
                <div className="rounded-full bg-dark-50 px-3 py-1 text-xs font-semibold text-dark-500">
                  {periodLabels[activePeriod]}
                </div>
              </div>

              <div className="rounded-2xl border border-dark-100 bg-white p-6">
                <div className="h-72 flex items-end gap-3 md:gap-4">
                  {current.chart.map((item) => (
                    <div key={item.label} className="flex-1 h-full flex flex-col justify-end items-center gap-3">
                      <div className="w-full flex-1 flex items-end">
                        <div
                          className="w-full rounded-t-2xl bg-gradient-to-t from-rose-500 via-rose-400 to-amber-300"
                          style={{ height: `${(item.value / maxValue) * 100}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-dark-700">{item.value}</p>
                        <p className="text-xs text-dark-400 mt-1">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {current.activity.map((entry) => (
                  <div key={entry.title} className="rounded-2xl border border-dark-100 bg-dark-50 p-4">
                    <p className="text-sm font-semibold text-dark-900">{entry.title}</p>
                    <p className="text-sm text-dark-500 leading-relaxed mt-2">{entry.meta}</p>
                    <p className="text-sm font-semibold text-primary-600 mt-3">{entry.amount}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="lg" elevated>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-dark-500">Operational signals</p>
                  <h3 className="text-xl font-bold text-dark-900">What the reporting view is telling the team</h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live-style demo
                </span>
              </div>

              <div className="space-y-4">
                {current.insights.map((insight) => (
                  <div key={insight.title} className="rounded-2xl border border-dark-100 bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-dark-900">{insight.title}</p>
                        <p className="text-sm text-dark-500 leading-relaxed mt-2">{insight.detail}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-dark-300 shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-dark-100 bg-dark-900 text-white p-5 mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-3">
                  Source alignment
                </p>
                <p className="text-sm leading-relaxed text-white/80">
                  This page mirrors the reporting index flow from the inventory admin reference:
                  period toggles at the top, KPI cards underneath, and a compact decision panel for operators.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
