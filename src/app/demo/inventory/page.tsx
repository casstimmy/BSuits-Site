import React from 'react';
import { ArrowLeft, ShieldAlert, FlaskConical, HelpCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const findings = [
  {
    severity: 'Medium',
    text:
      'Products table uses colSpan="13" while the header has 14 columns, causing misalignment on loading/empty states.',
    refs: 'pages/manage/products.js:282, pages/manage/products.js:289',
  },
  {
    severity: 'Medium',
    text:
      'Stock management "Search by product or category..." does not actually search category names if categories are stored as IDs (it checks item.category directly). This makes category search misleading.',
    refs: 'pages/stock/management.js:169',
  },
  {
    severity: 'Medium',
    text:
      'Stock movement list shows "Loading movements..." whenever filteredMovements is empty, even when no results match filters. There is no true empty state.',
    refs: 'pages/stock/movement/index.js:210',
  },
  {
    severity: 'Low',
    text:
      '"SEARCH" button on stock movement does nothing (filtering already happens on input change).',
    refs: 'pages/stock/movement/index.js:177',
  },
  {
    severity: 'Low',
    text:
      'Mojibake symbols appear in currency and icons, indicating encoding issues.',
    refs:
      'pages/manage/products.js:220, pages/stock/management.js:310, pages/stock/movement/index.js:236, pages/stock/movement/[id].js:159, pages/manage/categories.js:324',
  },
];

const uiNotes = [
  'Color system feels fragmented: amber-heavy in products (pages/manage/products.js:231), neutral gray in categories (pages/manage/categories.js:243), gray/amber in stock management (pages/stock/management.js:195), and bluish background in stock movement (pages/stock/movement/index.js:70). Consider a shared palette via CSS variables or Tailwind config.',
  'Typography scale is inconsistent: text-2xl vs text-3xl for primary page titles varies across pages without hierarchy (pages/manage/products.js:231, pages/stock/management.js:197).',
  "Button style inconsistency: rounded-sm vs rounded, uppercase vs normal casing, different hover treatments across pages. This dilutes the product's visual language.",
];

const testGaps = [
  'No UI tests or visual regression checks for these pages. If these screens are business-critical, snapshot tests (e.g., Playwright) would catch the empty-state and mojibake regressions.',
];

const openQuestions = [
  'Are product categories stored as IDs or names in product documents? This affects the search/filter logic on pages/stock/management.js:169.',
  'Should stock movement empty state show "No movements found" (vs "Loading movements...") when filters exclude all records?',
];

function SeverityPill({ level }: { level: string }) {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold';
  const tone =
    level === 'Medium'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-700';
  return <span className={`${base} ${tone}`}>{level}</span>;
}

export default function InventoryDemoPage() {
  return (
    <div className="min-h-screen bg-dark-50/40">
      <section className="pt-24 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Inventory Management Demo</span>
          </div>
          <SectionHeading
            badge="Inventory Demo"
            title="Inventory management review and preview"
            subtitle="This demo summarizes the current inventory UI review and highlights the most important findings, gaps, and next questions."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">
              Back to Features
            </Button>
            <Button variant="primary" size="md" href="/contact">
              Request Inventory Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-2 gap-8">
          <Card padding="lg" elevated>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="text-sm text-dark-500">Preview</p>
                <h3 className="text-xl font-bold text-dark-900">Inventory UI Snapshot</h3>
              </div>
            </div>
            <div className="aspect-[16/10] rounded-2xl border border-dark-200 bg-white flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-sm font-semibold text-dark-900">Inventory Management Preview</p>
                <p className="text-xs text-dark-400">Image placeholder</p>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-accent-700" />
              </div>
              <div>
                <p className="text-sm text-dark-500">Summary</p>
                <h3 className="text-xl font-bold text-dark-900">Key findings at a glance</h3>
              </div>
            </div>
            <div className="space-y-4">
              {findings.slice(0, 3).map((item) => (
                <div key={item.text} className="flex gap-3">
                  <SeverityPill level={item.severity} />
                  <p className="text-sm text-dark-600">{item.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom grid lg:grid-cols-3 gap-6">
          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-yellow-600" />
              <h4 className="text-base font-bold text-dark-900">Findings</h4>
            </div>
            <div className="space-y-4">
              {findings.map((item) => (
                <div key={item.text} className="space-y-2">
                  <SeverityPill level={item.severity} />
                  <p className="text-sm text-dark-600">{item.text}</p>
                  <p className="text-xs text-dark-400">{item.refs}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-4 h-4 text-primary-600" />
              <h4 className="text-base font-bold text-dark-900">UI Consistency Notes</h4>
            </div>
            <ul className="space-y-3 text-sm text-dark-600 list-disc list-inside">
              {uiNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-rose-500" />
              <h4 className="text-base font-bold text-dark-900">Test Gaps</h4>
            </div>
            <ul className="space-y-3 text-sm text-dark-600 list-disc list-inside mb-6">
              {testGaps.map((gap) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-rose-500" />
              <h4 className="text-base font-bold text-dark-900">Open Questions</h4>
            </div>
            <ul className="space-y-3 text-sm text-dark-600 list-disc list-inside">
              {openQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
