import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

const invoiceStats = [
  {
    value: 'v2.0',
    label: 'invoice layout',
    note: 'Document-first structure with stronger hierarchy.',
  },
  {
    value: '7.5%',
    label: 'vat handling',
    note: 'Tax is isolated instead of buried in the total.',
  },
  {
    value: 'A4',
    label: 'print fit',
    note: 'Single-page composition built for export and PDF.',
  },
  {
    value: 'Paid',
    label: 'payment state',
    note: 'Balance due and payment made now read instantly.',
  },
];

const reviewImprovements = [
  'Issuer details, invoice title, and balance due now own the top line instead of competing for attention.',
  'Bill-to details and invoice metadata are separated into cleaner blocks for faster scanning.',
  'The line-item area is now a proper invoice table with quantity, rate, and amount columns.',
  'Totals, payment made, and balance due are grouped into a finance summary instead of being visually scattered.',
  'Terms and renewal notes sit at the bottom of the page, matching how finance teams expect to review documents.',
];

const workflowCoverage = [
  { label: 'Template status', value: 'Ready for SaaS renewals' },
  { label: 'Approval path', value: 'Finance -> Operations -> Client' },
  { label: 'Export target', value: 'PDF / print-friendly document' },
  { label: 'Payment sync', value: 'Paid in full with zero balance' },
];

const invoiceMeta = [
  { label: 'Invoice Date', value: '22 Sep 2025' },
  { label: 'Terms', value: 'Custom' },
  { label: 'Due Date', value: '22 Oct 2025' },
  { label: 'Reference', value: 'Annual license renewal' },
];

const invoiceLineItems = [
  {
    id: 1,
    description: 'STANDARD SAAS USER LICENSE / TILL RENEWAL',
    detail: 'Expiry Date (October 22, 2026)',
    quantity: 2,
    rate: 356000,
  },
];

const subtotal = invoiceLineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
const vatAmount = subtotal * 0.075;
const total = subtotal + vatAmount;
const paymentMade = total;
const balanceDue = total - paymentMade;

const currencyFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatNaira(amount: number) {
  return `NGN${currencyFormatter.format(amount)}`;
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <section className="relative overflow-hidden bg-slate-950 pt-10 pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
                Internal finance surface
              </span>
              <h1 className="mt-5 text-4xl font-bold text-white md:text-5xl lg:text-6xl text-balance">
                Admin Invoice Desk
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
                The admin route now behaves like a proper invoice review screen: document-first,
                print-friendly, and structured around billing details, totals, and payment clarity.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="h-5 w-5" />}>
                  Discuss Approval Flow
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="/features"
                  className="!text-white hover:!bg-white/10"
                >
                  Review System Map
                </Button>
              </div>
            </div>

            <Card elevated hover={false} className="border border-white/10 bg-white/95">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Current sample
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm text-slate-500">Invoice No.</p>
                    <p className="text-lg font-semibold text-slate-950">INV-000626</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Paid in full
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Client</p>
                    <p className="font-medium text-slate-900">Ajah Retail Hub</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Due date</p>
                    <p className="font-medium text-slate-900">22 Oct 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Subtotal</p>
                    <p className="font-medium text-slate-900">{formatNaira(subtotal)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Balance due</p>
                    <p className="font-medium text-slate-900">{formatNaira(balanceDue)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-10">
        <div className="container-custom">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {invoiceStats.map((stat) => (
              <Card key={stat.label} elevated hover={false} className="h-full">
                <p className="text-2xl font-bold text-slate-950 md:text-3xl">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-600">{stat.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{stat.note}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-100">
        <div className="container-custom">
          <SectionHeading
            badge="Invoice Review"
            title="A cleaner invoice layout based on the current reference"
            subtitle="The page now prioritizes billing identity, invoice metadata, line items, totals, and payment status in the same reading order finance teams expect."
          />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr] xl:items-start">
            <Card elevated hover={false} padding="none" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 md:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Invoice preview
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Renewal invoice layout for internal review and print export.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm border border-slate-200">
                    One-page finance document
                  </span>
                </div>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl font-bold text-white shadow-lg">
                        BS
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-950">BizSuits Solutions</p>
                        <p className="text-sm text-slate-500">Internal billing workspace</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-1 text-sm leading-relaxed text-slate-600">
                      <p>16B Business Systems Avenue</p>
                      <p>Maryland, Lagos</p>
                      <p>Nigeria</p>
                      <p>+234 916 000 2839</p>
                      <p>finance@bizsuits.com</p>
                      <p>https://www.bizsuits.com</p>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                      INVOICE
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-500"># INV-000626</p>

                    <div className="mt-8 inline-flex flex-col rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-left lg:items-end lg:text-right">
                      <p className="text-sm font-medium text-slate-500">Balance Due</p>
                      <p className="mt-2 text-3xl font-bold text-slate-950">{formatNaira(balanceDue)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bill To</p>
                    <div className="mt-4 space-y-1 text-sm leading-relaxed text-slate-600">
                      <p className="text-base font-semibold text-slate-950">Ajah Retail Hub</p>
                      <p>Ogombo, Ajah</p>
                      <p>Lagos</p>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="space-y-3">
                      {invoiceMeta.map((item) => (
                        <div key={item.label} className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                          <span className="text-sm font-medium text-slate-500">{item.label}</span>
                          <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200">
                  <div className="overflow-x-auto">
                    <div className="min-w-[720px]">
                      <div className="grid grid-cols-[60px,1.8fr,0.6fr,0.8fr,0.8fr] bg-slate-900 px-6 py-4 text-sm font-semibold text-white">
                        <span>#</span>
                        <span>Item &amp; Description</span>
                        <span className="text-right">Qty</span>
                        <span className="text-right">Rate</span>
                        <span className="text-right">Amount</span>
                      </div>

                      {invoiceLineItems.map((item) => {
                        const amount = item.quantity * item.rate;

                        return (
                          <div
                            key={item.id}
                            className="grid grid-cols-[60px,1.8fr,0.6fr,0.8fr,0.8fr] items-start gap-4 border-t border-slate-200 px-6 py-5 text-sm text-slate-600"
                          >
                            <span className="font-medium text-slate-900">{item.id}</span>
                            <div>
                              <p className="font-medium uppercase tracking-[0.04em] text-slate-700">
                                {item.description}
                              </p>
                              <p className="mt-1 text-slate-500">{item.detail}</p>
                            </div>
                            <span className="text-right font-medium text-slate-900">{item.quantity.toFixed(2)}</span>
                            <span className="text-right font-medium text-slate-900">{currencyFormatter.format(item.rate)}</span>
                            <span className="text-right font-medium text-slate-900">{currencyFormatter.format(amount)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Terms &amp; Conditions
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
                      Annual license payment is calculated from the active renewal quantity and the
                      prevailing service rate. This layout keeps the tax line, payment confirmation,
                      and balance status explicit so finance and operations can review one document
                      without cross-checking a second summary panel.
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between gap-4 text-slate-600">
                        <span>Sub Total</span>
                        <span className="font-semibold text-slate-900">{formatNaira(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-600">
                        <span>VAT (7.5%)</span>
                        <span className="font-semibold text-slate-900">{formatNaira(vatAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-950">
                        <span>Total</span>
                        <span>{formatNaira(total)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-600">
                        <span>Payment Made</span>
                        <span className="font-semibold text-rose-500">(-) {formatNaira(paymentMade)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4 text-base font-semibold text-slate-950 shadow-sm">
                        <span>Balance Due</span>
                        <span>{formatNaira(balanceDue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card elevated hover={false} className="h-full">
                <h2 className="text-2xl font-bold text-slate-950">What improved</h2>
                <div className="mt-5 space-y-4">
                  {reviewImprovements.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated hover={false} className="h-full bg-slate-950 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Admin controls
                </p>
                <div className="mt-5 space-y-4">
                  {workflowCoverage.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-sm text-white/60">{item.label}</p>
                      <p className="mt-1 font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="accent" size="sm" href="/contact" icon={<ArrowRight className="h-4 w-4" />}>
                    Align Workflow
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    href="/features"
                    className="!text-white hover:!bg-white/10"
                  >
                    View Systems
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
