'use client';

import { Download, FileText, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BizFaceLogo from '@/components/ui/BizFaceLogo';
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

type InvoiceVisibility = {
  showDueDate: boolean;
  showIssuerAddress: boolean;
  showVat: boolean;
  showTermsAndConditions: boolean;
};

type CalculatedLineItem = Omit<LineItem, 'quantity' | 'rate'> & {
  quantity: number;
  rate: number;
  amount: number;
};

type PdfTablePlan = {
  body: string[][];
  omittedItemCount: number;
};

type PdfNotesPlan = {
  text: string;
  wasTrimmed: boolean;
};

type PdfWrappedNotesPlan = {
  lines: string[];
  wasTrimmed: boolean;
};

type PdfDocument = InstanceType<typeof import('jspdf').jsPDF>;

type PdfMetaRow = {
  label: string;
  lines: string[];
  height: number;
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
const MAX_PDF_TABLE_ROWS = 7;
const MAX_PDF_NOTE_CHARACTERS = 240;
const MAX_PDF_NOTE_LINES = 5;

let bizFaceLogoDataUrlPromise: Promise<string> | null = null;

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

function compactWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function truncateText(value: string, maxLength: number) {
  const normalized = compactWhitespace(value);

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
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

function getSampleVisibility(): InvoiceVisibility {
  return {
    showDueDate: true,
    showIssuerAddress: true,
    showVat: true,
    showTermsAndConditions: true,
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
    issuerName: 'BizSuits',
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
    visibility: getSampleVisibility(),
  };
}

function getBizFaceLogoSvgMarkup() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318.34 318.34">
      <defs>
        <linearGradient id="biz-face-pdf-grad" x1="109.22" y1="58.65" x2="235.04" y2="311.86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#5398d2" />
          <stop offset="1" stop-color="#4c63ae" />
        </linearGradient>
      </defs>
      <rect fill="url(#biz-face-pdf-grad)" width="318.34" height="318.34" rx="83.83" ry="83.83" />
      <path fill="#fff" d="M147.28,130.83l-41.66-36.95c-5.73-5.08-14.74-.75-14.35,6.89l3.8,75.81c.38,7.53,9.55,10.99,14.81,5.59l37.86-38.85c3.44-3.53,3.23-9.22-.45-12.49l-41.66-36.95c-5.73-5.08-14.74-.75-14.35,6.89l3.8,75.81c.38,7.53,9.55,10.99,14.81,5.59l37.86-38.85c3.44-3.53,3.23-9.22-.45-12.49Z" />
      <path fill="#fff" d="M171.06,130.83l41.66-36.95c5.73-5.08,14.74-.75,14.35,6.89l-3.8,75.81c-.38,7.53-9.55,10.99-14.81,5.59l-37.86-38.85c-3.44-3.53-3.23-9.22.45-12.49l41.66-36.95c5.73-5.08,14.74-.75,14.35,6.89l-3.8,75.81c-.38,7.53-9.55,10.99-14.81,5.59l-37.86-38.85c-3.44-3.53-3.23-9.22.45-12.49Z" />
      <path fill="#fff" d="M165.87,183.43l13.66,35.39c1.75,4.53-1.62,9.4-6.48,9.37l-27.85-.21c-4.86-.04-8.15-4.96-6.34-9.46l14.19-35.18c2.34-5.8,10.56-5.73,12.81.1l13.66,35.39c1.75,4.53-1.62,9.4-6.48,9.37l-27.85-.21c-4.86-.04-8.15-4.96-6.34-9.46l14.19-35.18c2.34-5.8,10.56-5.73,12.81.1Z" />
    </svg>
  `;
}

async function getBizFaceLogoDataUrl(size = 220) {
  if (!bizFaceLogoDataUrlPromise) {
    bizFaceLogoDataUrlPromise = new Promise<string>((resolve, reject) => {
      const svgBlob = new Blob([getBizFaceLogoSvgMarkup()], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const objectUrl = URL.createObjectURL(svgBlob);
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          URL.revokeObjectURL(objectUrl);
          bizFaceLogoDataUrlPromise = null;
          reject(new Error('Could not prepare the business logo for PDF export.'));
          return;
        }

        canvas.width = size;
        canvas.height = size;
        context.drawImage(image, 0, 0, size, size);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL('image/png'));
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        bizFaceLogoDataUrlPromise = null;
        reject(new Error('Could not load the business logo for PDF export.'));
      };

      image.src = objectUrl;
    });
  }

  return bizFaceLogoDataUrlPromise;
}

function getPdfTablePlan(items: CalculatedLineItem[]): PdfTablePlan {
  const visibleItemCount = items.length > MAX_PDF_TABLE_ROWS ? MAX_PDF_TABLE_ROWS - 1 : MAX_PDF_TABLE_ROWS;
  const visibleItems = items.slice(0, visibleItemCount);
  const omittedItems = items.slice(visibleItemCount);
  const body = visibleItems.map((item, index) => {
    const description = compactWhitespace(item.description) || 'Line item';
    const detail = compactWhitespace(item.detail);
    const descriptionCell = [description, detail].filter(Boolean).join(' | ');

    return [
      String(index + 1),
      descriptionCell,
      item.quantity.toFixed(2),
      formatNaira(item.rate),
      formatNaira(item.amount),
    ];
  });

  if (omittedItems.length > 0) {
    const omittedAmount = roundMoney(omittedItems.reduce((sum, item) => sum + item.amount, 0));

    body.push([
      '+',
      `${omittedItems.length} additional billed item${omittedItems.length === 1 ? '' : 's'} summarized`,
      '',
      '',
      formatNaira(omittedAmount),
    ]);
  }

  return {
    body: body.length > 0 ? body : [['-', 'No line items added', '', '', '']],
    omittedItemCount: omittedItems.length,
  };
}

function getPdfNotesPlan(notesText: string): PdfNotesPlan {
  const normalized = compactWhitespace(notesText);

  if (!normalized) {
    return {
      text: '',
      wasTrimmed: false,
    };
  }

  const text = truncateText(normalized, MAX_PDF_NOTE_CHARACTERS);

  return {
    text,
    wasTrimmed: text !== normalized,
  };
}

function getWrappedPdfNotesPlan(lines: string[]): PdfWrappedNotesPlan {
  if (lines.length <= MAX_PDF_NOTE_LINES) {
    return {
      lines,
      wasTrimmed: false,
    };
  }

  const visibleLines = lines.slice(0, MAX_PDF_NOTE_LINES);
  const lastLineIndex = visibleLines.length - 1;

  visibleLines[lastLineIndex] = `${visibleLines[lastLineIndex].replace(/[.\s]+$/, '')}...`;

  return {
    lines: visibleLines,
    wasTrimmed: true,
  };
}

function getPdfMetaRows(doc: PdfDocument, meta: Array<{ label: string; value: string }>, maxWidth: number) {
  return meta.map((item) => {
    const rawLines = doc.splitTextToSize(compactWhitespace(item.value), maxWidth) as string[];
    const lines = rawLines.length > 0 ? rawLines.slice(0, 2) : ['-'];

    if (rawLines.length > 2 && lines.length === 2) {
      lines[1] = `${lines[1].replace(/[.\s]+$/, '')}...`;
    }

    return {
      label: item.label,
      lines,
      height: 6 + lines.length * 4.2,
    } satisfies PdfMetaRow;
  });
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

function ToggleControl({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
      />
    </label>
  );
}

export default function InvoiceDesk() {
  const [form, setForm] = useState<InvoiceForm>(() => getSampleForm());
  const [lineItems, setLineItems] = useState<LineItem[]>(() => getSampleLineItems());
  const [visibility, setVisibility] = useState<InvoiceVisibility>(() => getSampleVisibility());
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const invoiceItems: CalculatedLineItem[] = lineItems.map((item) => {
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
  const vatRate = visibility.showVat ? parseDecimal(form.vatRate) : 0;
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

  const issuerAddressLines = visibility.showIssuerAddress
    ? form.issuerAddress.split('\n').map((line) => line.trim()).filter(Boolean)
    : [];
  const clientAddressLines = form.clientAddress.split('\n').map((line) => line.trim()).filter(Boolean);
  const invoiceMeta = [
    { label: 'Invoice Date', value: formatDisplayDate(form.invoiceDate) },
    { label: 'Terms', value: form.terms || 'Custom' },
    ...(visibility.showDueDate ? [{ label: 'Due Date', value: formatDisplayDate(form.dueDate) }] : []),
    { label: 'Reference', value: form.reference || 'Add reference' },
  ];
  const notesText = form.notes.trim();
  const pdfTablePlan = getPdfTablePlan(filledItems);
  const pdfNotesPlan = visibility.showTermsAndConditions
    ? getPdfNotesPlan(notesText)
    : { text: '', wasTrimmed: false };
  const pdfProtectionMessages = [
    pdfTablePlan.omittedItemCount > 0
      ? `${pdfTablePlan.omittedItemCount} extra line item${pdfTablePlan.omittedItemCount === 1 ? '' : 's'} will be summarized in the PDF table.`
      : null,
    pdfNotesPlan.wasTrimmed
      ? 'Long terms and conditions will be shortened in the PDF export.'
      : null,
  ].filter(Boolean);
  function updateForm<Field extends keyof InvoiceForm>(field: Field, value: InvoiceForm[Field]) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function updateVisibility<Field extends keyof InvoiceVisibility>(
    field: Field,
    value: InvoiceVisibility[Field]
  ) {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      [field]: value,
    }));
  }

  function updateLineItem(id: number, field: keyof Omit<LineItem, 'id'>, value: string) {
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
    setVisibility(getSampleVisibility());
    setPdfError(null);
  }

  function startFreshInvoice() {
    const freshState = getFreshInvoiceState(form.invoiceNumber);

    setForm(freshState.form);
    setLineItems(freshState.lineItems);
    setVisibility(freshState.visibility);
    setPdfError(null);
  }

  async function downloadInvoicePdf() {
    try {
      setIsExportingPdf(true);
      setPdfError(null);

      const [{ jsPDF }, { default: autoTable }] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable'),
      ]);
      const logoDataUrl = await getBizFaceLogoDataUrl();
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;
      const metaBoxWidth = 76;
      const totalsBoxWidth = 68;
      const billToWidth = contentWidth - metaBoxWidth - 14;

      doc.addImage(logoDataUrl, 'PNG', margin + 3, margin + 3, 16, 16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(16);
      doc.text(form.issuerName || 'Issuer name', margin + 24, margin + 10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8.5);
      doc.text('Customer invoice', margin + 24, margin + 15.5);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(20);
      doc.text('INVOICE', pageWidth - margin - 1, margin + 10, { align: 'right' });
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`# ${form.invoiceNumber || 'Pending'}`, pageWidth - margin - 1, margin + 16.5, {
        align: 'right',
      });

      const balanceBoxX = pageWidth - margin - metaBoxWidth;
      const balanceBoxY = margin + 22;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(balanceBoxX, balanceBoxY, metaBoxWidth, 26, 4, 4, 'F');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(balanceLabel, balanceBoxX + 5, balanceBoxY + 8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.text(formatNaira(balanceValue), balanceBoxX + metaBoxWidth - 5, balanceBoxY + 19, {
        align: 'right',
      });

      let issuerY = margin + 31;
      const issuerLines = [
        ...issuerAddressLines,
        form.issuerPhone,
        form.issuerEmail,
        form.issuerWebsite,
      ].filter(Boolean) as string[];

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(8.5);
      issuerLines.forEach((line) => {
        const wrappedLine = doc.splitTextToSize(compactWhitespace(line), billToWidth) as string[];

        wrappedLine.forEach((segment) => {
          doc.text(segment, margin, issuerY);
          issuerY += 4.2;
        });
      });

      const sectionTop = Math.max(issuerY + 10, margin + 58);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('BILL TO', margin, sectionTop);

      let billToY = sectionTop + 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(form.clientName || 'Client name', margin, billToY);
      billToY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      [form.clientContact, form.clientEmail, ...clientAddressLines]
        .filter(Boolean)
        .forEach((line) => {
          const wrappedLine = doc.splitTextToSize(compactWhitespace(String(line)), billToWidth) as string[];

          wrappedLine.forEach((segment) => {
            doc.text(segment, margin, billToY);
            billToY += 4.2;
          });
        });

      const metaBoxX = pageWidth - margin - metaBoxWidth;
      const pdfMetaRows = getPdfMetaRows(doc, invoiceMeta, metaBoxWidth - 18);
      const metaBoxHeight = pdfMetaRows.reduce((sum, item) => sum + item.height, 0) + 8;

      doc.setFillColor(248, 250, 252);
      doc.roundedRect(metaBoxX, sectionTop - 6, metaBoxWidth, metaBoxHeight, 4, 4, 'F');

      let metaY = sectionTop + 2;
      pdfMetaRows.forEach((item) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(item.label, metaBoxX + 4, metaY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        item.lines.forEach((line, index) => {
          doc.text(line, metaBoxX + metaBoxWidth - 4, metaY + 4.2 + index * 4.2, {
            align: 'right',
          });
        });
        metaY += item.height;
      });

      const tableStartY = Math.max(billToY, sectionTop - 6 + metaBoxHeight) + 12;

      autoTable(doc, {
        startY: tableStartY,
        margin: { left: margin, right: margin },
        theme: 'grid',
        pageBreak: 'avoid',
        rowPageBreak: 'avoid',
        head: [['#', 'Item & Description', 'Qty', 'Rate', 'Amount']],
        body: pdfTablePlan.body,
        headStyles: {
          fillColor: [15, 23, 42],
          textColor: 255,
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'left',
        },
        styles: {
          fontSize: 7.6,
          textColor: [71, 85, 105],
          cellPadding: 2.8,
          overflow: 'linebreak',
          lineColor: [226, 232, 240],
          lineWidth: 0.1,
          valign: 'top',
        },
        bodyStyles: {
          minCellHeight: 9,
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 76 },
          2: { cellWidth: 18, halign: 'right' },
          3: { cellWidth: 31, halign: 'right' },
          4: { cellWidth: 35, halign: 'right' },
        },
      });

      const lastAutoTable = (
        doc as typeof doc & { lastAutoTable?: { finalY?: number } }
      ).lastAutoTable;
      const afterTableY = (lastAutoTable?.finalY ?? tableStartY) + 12;
      const totalsRows = [
        { label: 'Sub Total', value: formatNaira(subtotal) },
        ...(visibility.showVat ? [{ label: `VAT (${vatRate.toFixed(2)}%)`, value: formatNaira(vatAmount) }] : []),
        { label: 'Total', value: formatNaira(total), bold: true },
        { label: 'Payment Made', value: `(-) ${formatNaira(paymentMade)}` },
        { label: balanceLabel, value: formatNaira(balanceValue), bold: true },
      ];
      const totalsBoxHeight = totalsRows.length * 8 + 12;
      const totalsBoxX = pageWidth - margin - totalsBoxWidth;
      const totalsBoxY = afterTableY;
      let wrappedPdfNotesPlan: PdfWrappedNotesPlan = { lines: [], wasTrimmed: false };

      if (visibility.showTermsAndConditions && pdfNotesPlan.text) {
        const notesWidth = totalsBoxX - margin - 14;
        const wrappedNotes = doc.splitTextToSize(pdfNotesPlan.text, notesWidth - 12) as string[];

        wrappedPdfNotesPlan = getWrappedPdfNotesPlan(wrappedNotes);
      }

      doc.setFillColor(248, 250, 252);
      doc.roundedRect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsBoxHeight, 4, 4, 'F');

      let totalsY = totalsBoxY + 9;
      totalsRows.forEach((row, index) => {
        doc.setFont('helvetica', row.bold ? 'bold' : 'normal');
        doc.setFontSize(row.bold ? 9 : 8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(row.label, totalsBoxX + 4.5, totalsY);
        doc.text(row.value, totalsBoxX + totalsBoxWidth - 4.5, totalsY, { align: 'right' });

        if (index === 1 || index === totalsRows.length - 2) {
          doc.setDrawColor(226, 232, 240);
          doc.line(totalsBoxX + 4.5, totalsY + 3.2, totalsBoxX + totalsBoxWidth - 4.5, totalsY + 3.2);
        }

        totalsY += 8;
      });

      if (visibility.showTermsAndConditions && wrappedPdfNotesPlan.lines.length > 0) {
        const notesWidth = totalsBoxX - margin - 14;
        const notesBoxHeight = wrappedPdfNotesPlan.lines.length * 4.4 + 16;

        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, totalsBoxY, notesWidth, notesBoxHeight, 4, 4, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text('TERMS & CONDITIONS', margin + 6, totalsBoxY + 9);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(wrappedPdfNotesPlan.lines, margin + 6, totalsBoxY + 16);
      }

      doc.save(`${form.invoiceNumber || 'invoice'}.pdf`);
    } catch (error) {
      setPdfError(
        error instanceof Error
          ? error.message
          : 'Could not generate the PDF invoice. Please try again.'
      );
    } finally {
      setIsExportingPdf(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
              Invoice generator
            </span>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 md:text-5xl lg:text-6xl text-balance">
              Admin Invoice Desk
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding pt-10">
        <div className="container-custom">
          <SectionHeading
            badge="Invoice Generator"
            title="Create the invoice and export a clean one-page PDF"
            subtitle="Every field on the preview is driven by the inputs below, and optional sections can be turned on or off before export."
          />

          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
            <div className="space-y-6">
              <Card elevated hover={false} className="border border-slate-200 bg-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Quick actions
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-950">Generate invoice output</h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                      Use the controls below to start a fresh invoice, reset to the sample state, or
                      export the current invoice as a compact PDF.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => {
                        void downloadInvoicePdf();
                      }}
                      icon={<Download className="h-4 w-4" />}
                      disabled={isExportingPdf}
                    >
                      {isExportingPdf ? 'Generating...' : 'Download PDF'}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={startFreshInvoice} icon={<FileText className="h-4 w-4" />}>
                      New invoice
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetSampleInvoice} className="hover:!bg-slate-100" icon={<RotateCcw className="h-4 w-4" />}>
                      Reset sample
                    </Button>
                  </div>
                </div>

                {pdfProtectionMessages.length > 0 ? (
                  <div className="mt-4 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    {pdfProtectionMessages.join(' ')}
                  </div>
                ) : null}
                {pdfError ? <p className="mt-4 text-sm text-rose-600">{pdfError}</p> : null}
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
                  {visibility.showDueDate ? (
                    <LabeledInput
                      label="Due date"
                      value={form.dueDate}
                      onChange={(value) => updateForm('dueDate', value)}
                      type="date"
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <ToggleControl
                    label="Include due date"
                    description="Turn this off when the invoice should only show the issue date and reference."
                    checked={visibility.showDueDate}
                    onChange={(checked) => updateVisibility('showDueDate', checked)}
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
                    placeholder="BizSuits"
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
                  <ToggleControl
                    label="Include business address"
                    description="Show or hide the issuer address block on the invoice and PDF output."
                    checked={visibility.showIssuerAddress}
                    onChange={(checked) => updateVisibility('showIssuerAddress', checked)}
                  />
                </div>
                {visibility.showIssuerAddress ? (
                  <div className="mt-4">
                    <LabeledTextarea
                      label="Business address"
                      value={form.issuerAddress}
                      onChange={(value) => updateForm('issuerAddress', value)}
                      rows={4}
                      placeholder={'16B Business Systems Avenue\nMaryland, Lagos\nNigeria'}
                    />
                  </div>
                ) : null}
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
                <p className="mt-4 text-sm text-slate-500">
                  PDF export keeps up to {MAX_PDF_TABLE_ROWS} table rows on one page. Extra billed
                  items are summarized into a single overflow row.
                </p>
              </Card>

              <Card elevated hover={false}>
                <h2 className="text-2xl font-bold text-slate-950">Totals and notes</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <ToggleControl
                    label="Include VAT"
                    description="Turn VAT on or off without clearing the saved VAT rate value."
                    checked={visibility.showVat}
                    onChange={(checked) => updateVisibility('showVat', checked)}
                  />
                  <ToggleControl
                    label="Include terms and conditions"
                    description="Show or hide the notes section on the invoice and PDF export."
                    checked={visibility.showTermsAndConditions}
                    onChange={(checked) => updateVisibility('showTermsAndConditions', checked)}
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {visibility.showVat ? (
                    <LabeledInput
                      label="VAT rate (%)"
                      value={form.vatRate}
                      onChange={(value) => updateForm('vatRate', value)}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                      VAT is currently hidden from the invoice totals.
                    </div>
                  )}
                  <LabeledInput
                    label="Payment made"
                    value={form.paymentMade}
                    onChange={(value) => updateForm('paymentMade', value)}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </div>
                {visibility.showTermsAndConditions ? (
                  <div className="mt-4 grid gap-4">
                    <LabeledTextarea
                      label="Terms and conditions"
                      value={form.notes}
                      onChange={(value) => updateForm('notes', value)}
                      rows={5}
                      placeholder="Summarize payment terms, coverage, and renewal conditions."
                    />
                    <p className="text-sm text-slate-500">
                      Long terms will be shortened automatically in the PDF so the invoice stays on a
                      single page.
                    </p>
                  </div>
                ) : null}
              </Card>
            </div>

            <div className="xl:sticky xl:top-6">
              <Card
                elevated
                hover={false}
                padding="none"
                className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="border-b border-slate-200 bg-slate-50 px-7 py-4 sm:px-8 md:px-10 lg:px-12">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Invoice preview
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        The preview below mirrors the PDF that will be exported.
                      </p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                      One-page PDF invoice
                    </span>
                  </div>
                </div>

                <div className="px-8 py-9 sm:px-10 md:px-14 md:py-12 lg:px-16">
                  <div className="mx-auto max-w-[940px]">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                      <div className="lg:max-w-[380px]">
                        <div className="flex items-center gap-4">
                          <BizFaceLogo size={64} className="rounded-2xl shadow-lg shadow-sky-500/15" />
                          <div>
                            <p className="text-2xl font-bold text-slate-950">{form.issuerName || 'Issuer name'}</p>
                            <p className="text-sm text-slate-500">Customer invoice</p>
                          </div>
                        </div>

                        <div className="mt-7 max-w-[360px] rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                          {issuerAddressLines.map((line) => (
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

                        <div className="mt-8 inline-flex min-w-[270px] flex-col rounded-3xl border border-slate-200 bg-slate-50 px-8 py-7 text-left lg:items-end lg:text-right">
                          <p className="text-sm font-medium text-slate-500">{balanceLabel}</p>
                          <p className="mt-2 text-3xl font-bold text-slate-950">{formatNaira(balanceValue)}</p>
                          <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusClassName}`}>
                            {paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
                      <div className="max-w-[420px] rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bill To</p>
                        <div className="mt-5 space-y-1.5 text-sm leading-6 text-slate-600">
                          <p className="text-base font-semibold text-slate-950">{form.clientName || 'Client name'}</p>
                          {form.clientContact ? <p>{form.clientContact}</p> : null}
                          {form.clientEmail ? <p>{form.clientEmail}</p> : null}
                          {clientAddressLines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                        <div className="space-y-3">
                          {invoiceMeta.map((item) => (
                            <div key={item.label} className="flex items-start justify-between gap-5 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                              <span className="pt-0.5 text-sm font-medium text-slate-500">{item.label}</span>
                              <span className="max-w-[190px] break-words text-right text-sm font-semibold leading-relaxed text-slate-900">
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-14 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3 sm:p-4">
                      <div className="overflow-hidden rounded-[1.35rem] bg-white">
                        <div className="overflow-x-auto">
                          <div className="min-w-[720px]">
                            <div className="grid grid-cols-[60px,1.8fr,0.6fr,0.8fr,0.8fr] bg-slate-900 px-7 py-4 text-sm font-semibold text-white">
                              <span>#</span>
                              <span>Item &amp; Description</span>
                              <span className="text-right">Qty</span>
                              <span className="text-right">Rate</span>
                              <span className="text-right">Amount</span>
                            </div>

                            {filledItems.length === 0 ? (
                              <div className="px-7 py-10 text-sm text-slate-500">Add a line item to generate the invoice table.</div>
                            ) : (
                              filledItems.map((item, index) => (
                                <div
                                  key={item.id}
                                  className="grid grid-cols-[60px,1.8fr,0.6fr,0.8fr,0.8fr] items-start gap-4 border-t border-slate-200 px-7 py-6 text-sm text-slate-600"
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
                    </div>

                    <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
                      {visibility.showTermsAndConditions ? (
                        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Terms &amp; Conditions
                          </p>
                          <div className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600">
                            {notesText || 'Add invoice notes and payment terms.'}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                          Terms and conditions are currently hidden from the invoice output.
                        </div>
                      )}

                      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
                        <div className="space-y-5 text-sm">
                          <div className="flex items-center justify-between gap-4 text-slate-600">
                            <span>Sub Total</span>
                            <span className="font-semibold text-slate-900">{formatNaira(subtotal)}</span>
                          </div>
                          {visibility.showVat ? (
                            <div className="flex items-center justify-between gap-4 text-slate-600">
                              <span>VAT ({vatRate.toFixed(2)}%)</span>
                              <span className="font-semibold text-slate-900">{formatNaira(vatAmount)}</span>
                            </div>
                          ) : null}
                          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-950">
                            <span>Total</span>
                            <span>{formatNaira(total)}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-600">
                            <span>Payment Made</span>
                            <span className="font-semibold text-rose-500">(-) {formatNaira(paymentMade)}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4 text-base font-semibold text-slate-950 shadow-sm">
                            <span>{balanceLabel}</span>
                            <span>{formatNaira(balanceValue)}</span>
                          </div>
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
