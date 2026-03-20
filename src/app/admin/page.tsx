'use client';

import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Download,
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

const emptyItem: InvoiceItem = {
  id: Date.now(),
  description: '',
  quantity: 1,
  rate: 0,
};

export default function AdminPage() {
  const printRef = useRef<HTMLDivElement>(null);

  const [companyInfo] = useState({
    name: 'BizSuits',
    address: 'Lekki Scheme 2, Lagos, Nigeria',
    phone: '09166843265',
    email: 'hello@bizsuits.com',
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { ...emptyItem, id: Date.now() },
  ]);

  const [currency] = useState('₦');
  const [includeVat, setIncludeVat] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'paid'>('unpaid');

  const addItem = () => {
    setItems([...items, { ...emptyItem, id: Date.now() }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = includeVat ? subtotal * 0.075 : 0;
  const total = subtotal + tax;

  const formatCurrency = (amount: number) =>
    `${currency}${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header - hidden on print */}
      <header className="bg-dark-900 text-white py-4 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="BizSuits"
              width={32}
              height={32}
            />
            <div>
              <h1 className="text-lg font-bold">BizSuits Admin</h1>
              <p className="text-xs text-white/50">Invoice Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Side - hidden on print */}
          <div className="print:hidden space-y-6">
            {/* Client Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-600" />
                Client Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                    placeholder="Client or company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                    placeholder="client@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                    placeholder="+234..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                    placeholder="Client address"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Invoice Details</h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice #</label>
                  <input
                    type="text"
                    value={invoiceDetails.invoiceNumber}
                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={invoiceDetails.date}
                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={invoiceDetails.dueDate}
                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeVat}
                    onChange={(e) => setIncludeVat(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Include VAT (7.5%)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <button
                    type="button"
                    onClick={() => setPaymentStatus('unpaid')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                      paymentStatus === 'unpaid'
                        ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    Unpaid
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentStatus('paid')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                      paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-700 ring-2 ring-green-300'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    Paid
                  </button>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                        placeholder="Item description"
                      />
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-center"
                        placeholder="Qty"
                      />
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate || ''}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                        placeholder="Rate"
                      />
                    </div>
                    <div className="w-28 py-2 text-sm font-medium text-gray-700 text-right">
                      {formatCurrency(item.quantity * item.rate)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Notes</h2>
              <textarea
                value={invoiceDetails.notes}
                onChange={(e) => setInvoiceDetails({ ...invoiceDetails, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-none"
                placeholder="Additional notes (e.g. payment terms, bank details)..."
              />
            </div>
          </div>

          {/* Invoice Preview */}
          <div>
            <div className="print:hidden text-sm font-medium text-gray-500 mb-3">Preview</div>
            <div
              ref={printRef}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 print:shadow-none print:border-0 print:p-0"
            >
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="/images/logo.png"
                      alt="BizSuits"
                      width={36}
                      height={36}
                    />
                    <span className="text-xl font-bold text-gray-900">
                      Biz<span className="text-[#4c63ae]">Suits</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{companyInfo.address}</p>
                  <p className="text-xs text-gray-500">{companyInfo.phone}</p>
                  <p className="text-xs text-gray-500">{companyInfo.email}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">INVOICE</h2>
                  <p className="text-sm text-gray-600">{invoiceDetails.invoiceNumber}</p>
                  <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {paymentStatus === 'paid' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    {paymentStatus === 'paid' ? 'PAID' : 'UNPAID'}
                  </div>
                </div>
              </div>

              {/* Client + Dates */}
              <div className="grid grid-cols-2 gap-8 mb-8 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Bill To</p>
                  <p className="text-sm font-semibold text-gray-900">{clientInfo.name || 'Client Name'}</p>
                  {clientInfo.email && <p className="text-xs text-gray-500">{clientInfo.email}</p>}
                  {clientInfo.phone && <p className="text-xs text-gray-500">{clientInfo.phone}</p>}
                  {clientInfo.address && <p className="text-xs text-gray-500">{clientInfo.address}</p>}
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Date</p>
                    <p className="text-sm text-gray-700">
                      {invoiceDetails.date ? new Date(invoiceDetails.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                    </p>
                  </div>
                  {invoiceDetails.dueDate && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase">Due Date</p>
                      <p className="text-sm text-gray-700">
                        {new Date(invoiceDetails.dueDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase py-2">Description</th>
                    <th className="text-center text-xs font-semibold text-gray-400 uppercase py-2 w-16">Qty</th>
                    <th className="text-right text-xs font-semibold text-gray-400 uppercase py-2 w-28">Rate</th>
                    <th className="text-right text-xs font-semibold text-gray-400 uppercase py-2 w-28">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-700">{item.description || '-'}</td>
                      <td className="py-3 text-sm text-gray-700 text-center">{item.quantity}</td>
                      <td className="py-3 text-sm text-gray-700 text-right">{formatCurrency(item.rate)}</td>
                      <td className="py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(item.quantity * item.rate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-700">{formatCurrency(subtotal)}</span>
                  </div>
                  {includeVat && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">VAT (7.5%)</span>
                      <span className="text-gray-700">{formatCurrency(tax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoiceDetails.notes && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Notes</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceDetails.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-400">
                  Thank you for your business — BizSuits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body > *:not(.print-target) {
            /* handled by print: classes */
          }
          header, .print\\:hidden {
            display: none !important;
          }
          .bg-gray-100 {
            background: white !important;
          }
          .max-w-7xl {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .grid.lg\\:grid-cols-2 {
            display: block !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
