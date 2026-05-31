'use client';

import { FileText, Plus, Printer, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

type InvoiceForm = {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  reference: string;
  terms: string;
  notes: string;
  vatRate: string;
  paymentMade: string;
  issuerName: string;
  issuerEmail: string;
  issuerPhone: string;
  issuerWebsite: string;
  issuerAddress: string;
  clientName: string;
  clientContact: string;
  clientEmail: string;
  clientAddress: string;
};

type LineItem = {
  id: number;
  description: string;
  detail: string;
  quantity: string;
  rate: string;
};

const currencyFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const fieldLabelClassName = 'text-xs font-semibold uppercase tracking-[0.18em] text-slate-500';
const fieldClassName =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100';

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatNaira(amount: number) {
  return `NGN${currencyFormatter.format(amount)}`;
}

function parseDecimal(value: string) {
  const normalized = Number(value);

  return Number.isFinite(normalized) ? normalized : 0;
}

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function addDays(dateValue: string, days: number) {
  const [year, month, day] = dateValue.split('-').map(Number);
  const nextDate = new Date(year, month - 1, day);

  nextDate.setDate(nextDate.getDate() + days);

  return formatDateForInput(nextDate);
}

function formatDisplayDate(dateValue: string) {
  if (!dateValue) {
    return 'Select date';
  }

  const [year, month, day] = dateValue.split('-').map(Number);

  if (![year, month, day].every(Number.isFinite)) {
    return dateValue;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
}

function nextInvoiceNumber(invoiceNumber: string) {
  const match = invoiceNumber.match(/(\d+)$/);

  if (!match) {
    return 'INV-000001';
  }

  const [digits] = match;
  const prefix = invoiceNumber.slice(0, -digits.length);
  const nextValue = String(Number(digits) + 1).padStart(digits.length, '0');

  return `${prefix}${nextValue}`;
}

function createLineItem(id: number, overrides?: Partial<LineItem>): LineItem {
  return {
    id,
    description: '',
    detail: '',
    quantity: '0',
    rate: '0',
    ...overrides,
  };
}

function getSampleForm(): InvoiceForm {
  return {
    invoiceNumber: 'INV-000626',
    invoiceDate: '2026-05-31',
    dueDate: '2026-06-30',
    reference: 'Annual license renewal',
    terms: 'Custom',
    notes:
      'Annual license payment is calculated from the active renewal quantity and the prevailing service rate. The generated invoice keeps tax, payment history, and balance status explicit for finance review.',
    vatRate: '7.5',
    paymentMade: '765400',
    issuerName: 'BizSuits Solutions',
    issuerEmail: 'finance@bizsuits.com',
    issuerPhone: '+234 916 000 2839',
    issuerWebsite: 'www.bizsuits.com',
    issuerAddress: '16B Business Systems Avenue\nMaryland, Lagos\nNigeria',
    clientName: 'Ajah Retail Hub',
    clientContact: 'Procurement Desk',
    clientEmail: 'billing@ajahretailhub.com',
    clientAddress: 'Ogombo, Ajah\nLagos',
  };
}

function getSampleLineItems() {
  return [
    createLineItem(1, {
      description: 'Standard SaaS user license / till renewal',
      detail: 'Expiry date (30 Jun 2027)',
      quantity: '2',
      rate: '356000',
    }),
  ];
}

function getFreshInvoiceState(currentInvoiceNumber: string) {
  const today = formatDateForInput(new Date());

  return {
    form: {
      ...getSampleForm(),
      invoiceNumber: nextInvoiceNumber(currentInvoiceNumber),
      invoiceDate: today,
      dueDate: addDays(today, 30),
      reference: '',
      terms: 'Net 30',
      notes: 'Payment is due within 30 days of issue unless otherwise agreed in writing.',
      paymentMade: '0',
      clientName: '',
      clientContact: '',
      clientEmail: '',
      clientAddress: '',
    },
    lineItems: [createLineItem(1)],
  };
}

function LabeledInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  min,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'number' | 'date';
  placeholder?: string;
  min?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClassName}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        className={fieldClassName}
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClassName}>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`${fieldClassName} resize-y`}
      />
    </label>
  );
}

export default function InvoiceDesk() {
  const [form, setForm] = useState<InvoiceForm>(() => getSampleForm());
  const [lineItems, setLineItems] = useState<LineItem[]>(() => getSampleLineItems());

  const invoiceItems = lineItems.map((item) => {
    const quantity = parseDecimal(item.quantity);
    const rate = parseDecimal(item.rate);
    const amount = roundMoney(quantity * rate);

    return {
      ...item,
      quantity,
      rate,
      amount,
    };
  });

  const filledItems = invoiceItems.filter(
    (item) => item.description.trim() || item.detail.trim() || item.quantity > 0 || item.rate > 0
  );
  const subtotal = roundMoney(filledItems.reduce((sum, item) => sum + item.amount, 0));
  const vatRate = parseDecimal(form.vatRate);
  const vatAmount = roundMoney(subtotal * (vatRate / 100));
  const total = roundMoney(subtotal + vatAmount);
  const paymentMade = roundMoney(parseDecimal(form.paymentMade));
  const balanceDelta = roundMoney(total - paymentMade);
  const balanceLabel = balanceDelta < 0 ? 'Client credit' : 'Balance due';
  const balanceValue = Math.abs(balanceDelta);
  const paymentStatus =
    balanceDelta < 0
      ? 'Credit balance'
      : balanceDelta === 0
        ? 'Paid in full'
        : paymentMade > 0
          ? 'Partially paid'
          : 'Awaiting payment';
  const paymentStatusClassName =
    balanceDelta <= 0
      ? 'bg-emerald-50 text-emerald-700'
      : paymentMade > 0
        ? 'bg-amber-50 text-amber-700'
        : 'bg-slate-100 text-slate-700';

  const dashboardStats = [
    { label: 'Invoice no.', value: form.invoiceNumber || 'Not set' },
    { label: 'Live items', value: String(filledItems.length) },
    { label: 'Grand total', value: formatNaira(total) },
    { label: balanceLabel, value: formatNaira(balanceValue) },
  ];

  function updateForm<Field extends keyof InvoiceForm>(field: Field, value: InvoiceForm[Field]) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function updateLineItem(
    id: number,
    field: keyof Omit<LineItem, 'id'>,
    value: string
  ) {
    setLineItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function addLineItemRow() {
    setLineItems((currentItems) => {
      const nextId = currentItems.length === 0 ? 1 : Math.max(...currentItems.map((item) => item.id)) + 1;

      return [...currentItems, createLineItem(nextId)];
    });
  }

  function removeLineItemRow(id: number) {
    setLineItems((currentItems) => {
      if (currentItems.length === 1) {
        return [createLineItem(1)];
      }

      return currentItems.filter((item) => item.id !== id);
    });
  }

  function resetSampleInvoice() {
    setForm(getSampleForm());
    setLineItems(getSampleLineItems());
  }

  function startFreshInvoice() {
    const freshState = getFreshInvoiceState(form.invoiceNumber);

    setForm(freshState.form);
    setLineItems(freshState.lineItems);
  }

  function printInvoice() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      <section className="relative overflow-hidden bg-slate-950 pt-10 pb-20 print:hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
                Internal finance surface
              </span>
              <h1 className="mt-5 text-4xl font-bold text-white md:text-5xl lg:text-6xl text-balance">
                Admin Invoice Desk
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
                Build invoices from editable business, client, and line-item inputs, then print the
                final document directly from the same workspace.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="accent" size="lg" onClick={printInvoice} icon={<Printer className="h-5 w-5" />}>
                  Print Invoice
                </Button>
                <Button variant="secondary" size="lg" onClick={startFreshInvoice} icon={<FileText className="h-5 w-5" />}>
                  Start Fresh Invoice
                </Button>
              </div>
            </div>

            <Card elevated hover={false} className="border border-white/10 bg-white/95">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Current document state
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm text-slate-500">Invoice no.</p>
                    <p className="text-lg font-semibold text-slate-950">{form.invoiceNumber || 'Pending'}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusClassName}`}>
                    {paymentStatus}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Client</p>
                    <p className="font-medium text-slate-900">{form.clientName || 'Add client name'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Due date</p>
                    <p className="font-medium text-slate-900">{formatDisplayDate(form.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Subtotal</p>
                    <p className="font-medium text-slate-900">{formatNaira(subtotal)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{balanceLabel}</p>
                    <p className="font-medium text-slate-900">{formatNaira(balanceValue)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-10 print:hidden">
        <div className="container-custom">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <Card key={stat.label} elevated hover={false} className="h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-10 print:pt-0">
        <div className="container-custom print:max-w-none print:px-0">
          <div className="print:hidden">
            <SectionHeading
              badge="Invoice Generator"
              title="Create the invoice and preview the final document side by side"
              subtitle="Every field on the preview is driven by the inputs below, so finance can generate, review, and export the invoice from one internal page."
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start print:grid-cols-1">
            <div className="space-y-6 print:hidden">
              <Card elevated hover={false} className="bg-slate-950 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                      Quick actions
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">Generate invoice output</h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
                      Use the controls below to create a new invoice, reset to the sample state, or
                      print the current document.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="accent" size="sm" onClick={printInvoice} icon={<Printer className="h-4 w-4" />}>
                      Print
                    </Button>
                    <Button variant="secondary" size="sm" onClick={startFreshInvoice} icon={<FileText className="h-4 w-4" />}>
                      New invoice
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetSampleInvoice} className="!text-white hover:!bg-white/10" icon={<RotateCcw className="h-4 w-4" />}>
                      Reset sample
                    </Button>
                  </div>
                </div>
              </Card>

              <Card elevated hover={false}>
                <h2 className="text-2xl font-bold text-slate-950">Invoice setup</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <LabeledInput
                    label="Invoice number"
                    value={form.invoiceNumber}
                    onChange={(value) => updateForm('invoiceNumber', value)}
                    placeholder="INV-000001"
                  />
                  <LabeledInput
                    label="Reference"
                    value={form.reference}
                    onChange={(value) => updateForm('reference', value)}
                    placeholder="Annual license renewal"
                  />
                  <LabeledInput
                    label="Invoice date"
                    value={form.invoiceDate}
                    onChange={(value) => updateForm('invoiceDate', value)}
                    type="date"
                  />
                  <LabeledInput
                    label="Due date"
                    value={form.dueDate}
                    onChange={(value) => updateForm('dueDate', value)}
                    type="date"
                  />
                </div>
              </Card>

              <Card elevated hover={false}>
                <h2 className="text-2xl font-bold text-slate-950">Issuer details</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <LabeledInput
                    label="Business name"
                    value={form.issuerName}
                    onChange={(value) => updateForm('issuerName', value)}
                    placeholder="BizSuits Solutions"
                  />
                  <LabeledInput
                    label="Website"
                    value={form.issuerWebsite}
                    onChange={(value) => updateForm('issuerWebsite', value)}
                    placeholder="www.bizsuits.com"
                  />
                  <LabeledInput
                    label="Finance email"
                    value={form.issuerEmail}
                    onChange={(value) => updateForm('issuerEmail', value)}
                    type="email"
                    placeholder="finance@bizsuits.com"
                  />
                  <LabeledInput
                    label="Phone"
                    value={form.issuerPhone}
                    onChange={(value) => updateForm('issuerPhone', value)}
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div className="mt-4">
                  <LabeledTextarea
                    label="Business address"
                    value={form.issuerAddress}
                    onChange={(value) => updateForm('issuerAddress', value)}
                    rows={4}
                    placeholder={'16B Business Systems Avenue\nMaryland, Lagos\nNigeria'}
                  />
                </div>
              </Card>

              <Card elevated hover={false}>
                <h2 className="text-2xl font-bold text-slate-950">Client details</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <LabeledInput
                    label="Client name"
                    value={form.clientName}
                    onChange={(value) => updateForm('clientName', value)}
                    placeholder="Ajah Retail Hub"
                  />
                  <LabeledInput
                    label="Contact"
                    value={form.clientContact}
                    onChange={(value) => updateForm('clientContact', value)}
                    placeholder="Procurement Desk"
                  />
                  <LabeledInput
                    label="Billing email"
                    value={form.clientEmail}
                    onChange={(value) => updateForm('clientEmail', value)}
                    type="email"
                    placeholder="billing@client.com"
                  />
                  <LabeledInput
                    label="Terms"
                    value={form.terms}
                    onChange={(value) => updateForm('terms', value)}
                    placeholder="Net 30"
                  />
                </div>
                <div className="mt-4">
                  <LabeledTextarea
                    label="Client address"
                    value={form.clientAddress}
                    onChange={(value) => updateForm('clientAddress', value)}
                    rows={4}
                    placeholder={'Ogombo, Ajah\nLagos'}
                  />
                </div>
              </Card>

              <Card elevated hover={false}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950">Line items</h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Add each billed item here and the preview will update immediately.
                    </p>
                  </div>

                  <Button variant="accent" size="sm" onClick={addLineItemRow} icon={<Plus className="h-4 w-4" />}>
                    Add item
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {lineItems.map((item, index) => (
                    <div key={item.id} className="rounded-[1.75rem] border border-slate-200 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Item {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeLineItemRow(item.id)}
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <LabeledInput
                          label="Description"
                          value={item.description}
                          onChange={(value) => updateLineItem(item.id, 'description', value)}
                          placeholder="Standard SaaS user license / till renewal"
                        />
                        <LabeledInput
                          label="Detail"
                          value={item.detail}
                          onChange={(value) => updateLineItem(item.id, 'detail', value)}
                          placeholder="Expiry date or billing note"
                        />
                        <LabeledInput
                          label="Quantity"
                          value={item.quantity}
                          onChange={(value) => updateLineItem(item.id, 'quantity', value)}
                          type="number"
                          min="0"
                          step="0.01"
                        />
                        <LabeledInput
                          label="Rate"
                          value={item.rate}
                          onChange={(value) => updateLineItem(item.id, 'rate', value)}
                          type="number"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card elevated hover={false}>
                <h2 className="text-2xl font-bold text-slate-950">Totals and notes</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <LabeledInput
                    label="VAT rate (%)"
                    value={form.vatRate}
                    onChange={(value) => updateForm('vatRate', value)}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                  <LabeledInput
                    label="Payment made"
                    value={form.paymentMade}
                    onChange={(value) => updateForm('paymentMade', value)}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mt-4 grid gap-4">
                  <LabeledTextarea
                    label="Terms and conditions"
                    value={form.notes}
                    onChange={(value) => updateForm('notes', value)}
                    rows={5}
                    placeholder="Summarize payment terms, coverage, and renewal conditions."
                  />
                </div>
              </Card>
            </div>

            <div className="xl:sticky xl:top-6 print:static">
              <Card
                elevated
                hover={false}
                padding="none"
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] print:rounded-none print:border-0 print:shadow-none"
              >
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 md:px-8 print:hidden">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Invoice preview
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        The preview below mirrors the final printable invoice.
                      </p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                      One-page finance document
                    </span>
                  </div>
                </div>

                <div className="px-6 py-8 md:px-10 md:py-10 print:px-0 print:py-0">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl font-bold text-white shadow-lg print:shadow-none">
                          BS
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-slate-950">{form.issuerName || 'Issuer name'}</p>
                          <p className="text-sm text-slate-500">Internal billing workspace</p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-1 text-sm leading-relaxed text-slate-600">
                        {form.issuerAddress
                          .split('\n')
                          .filter(Boolean)
                          .map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        {form.issuerPhone ? <p>{form.issuerPhone}</p> : null}
                        {form.issuerEmail ? <p>{form.issuerEmail}</p> : null}
                        {form.issuerWebsite ? <p>{form.issuerWebsite}</p> : null}
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                        INVOICE
                      </p>
                      <p className="mt-3 text-sm font-semibold text-slate-500"># {form.invoiceNumber || 'Pending'}</p>

                      <div className="mt-8 inline-flex flex-col rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-left lg:items-end lg:text-right print:border-slate-300 print:bg-white">
                        <p className="text-sm font-medium text-slate-500">{balanceLabel}</p>
                        <p className="mt-2 text-3xl font-bold text-slate-950">{formatNaira(balanceValue)}</p>
                        <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusClassName}`}>
                          {paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bill To</p>
                      <div className="mt-4 space-y-1 text-sm leading-relaxed text-slate-600">
                        <p className="text-base font-semibold text-slate-950">{form.clientName || 'Client name'}</p>
                        {form.clientContact ? <p>{form.clientContact}</p> : null}
                        {form.clientEmail ? <p>{form.clientEmail}</p> : null}
                        {form.clientAddress
                          .split('\n')
                          .filter(Boolean)
                          .map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 print:border-slate-300 print:bg-white">
                      <div className="space-y-3">
                        {[
                          { label: 'Invoice Date', value: formatDisplayDate(form.invoiceDate) },
                          { label: 'Terms', value: form.terms || 'Custom' },
                          { label: 'Due Date', value: formatDisplayDate(form.dueDate) },
                          { label: 'Reference', value: form.reference || 'Add reference' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                            <span className="text-sm font-medium text-slate-500">{item.label}</span>
                            <span className="text-right text-sm font-semibold text-slate-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 print:border-slate-300">
                    <div className="overflow-x-auto">
                      <div className="min-w-[720px]">
                        <div className="grid grid-cols-[60px,1.8fr,0.6fr,0.8fr,0.8fr] bg-slate-900 px-6 py-4 text-sm font-semibold text-white print:bg-slate-800">
                          <span>#</span>
                          <span>Item &amp; Description</span>
                          <span className="text-right">Qty</span>
                          <span className="text-right">Rate</span>
                          <span className="text-right">Amount</span>
                        </div>

                        {filledItems.length === 0 ? (
                          <div className="px-6 py-10 text-sm text-slate-500">Add a line item to generate the invoice table.</div>
                        ) : (
                          filledItems.map((item, index) => (
                            <div
                              key={item.id}
                              className="grid grid-cols-[60px,1.8fr,0.6fr,0.8fr,0.8fr] items-start gap-4 border-t border-slate-200 px-6 py-5 text-sm text-slate-600"
                            >
                              <span className="font-medium text-slate-900">{index + 1}</span>
                              <div>
                                <p className="font-medium uppercase tracking-[0.04em] text-slate-700">
                                  {item.description || 'Line item'}
                                </p>
                                {item.detail ? <p className="mt-1 text-slate-500">{item.detail}</p> : null}
                              </div>
                              <span className="text-right font-medium text-slate-900">{item.quantity.toFixed(2)}</span>
                              <span className="text-right font-medium text-slate-900">{currencyFormatter.format(item.rate)}</span>
                              <span className="text-right font-medium text-slate-900">{currencyFormatter.format(item.amount)}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Terms &amp; Conditions
                      </p>
                      <div className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-slate-600">
                        {form.notes || 'Add invoice notes and payment terms.'}
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 print:border-slate-300 print:bg-white">
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between gap-4 text-slate-600">
                          <span>Sub Total</span>
                          <span className="font-semibold text-slate-900">{formatNaira(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-slate-600">
                          <span>VAT ({vatRate.toFixed(2)}%)</span>
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
                        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4 text-base font-semibold text-slate-950 shadow-sm print:border print:border-slate-300 print:shadow-none">
                          <span>{balanceLabel}</span>
                          <span>{formatNaira(balanceValue)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}