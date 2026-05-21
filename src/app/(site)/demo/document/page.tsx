'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Download,
  FileText,
  Table,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── Types & Data ────────────────────────────────────────────

const BANK_PROFILES = [
  { id: 'access', label: 'Access Bank', color: 'text-orange-600' },
  { id: 'gtbank', label: 'GTBank', color: 'text-orange-500' },
  { id: 'zenith', label: 'Zenith Bank', color: 'text-red-600' },
  { id: 'uba', label: 'UBA', color: 'text-red-700' },
  { id: 'firstbank', label: 'First Bank', color: 'text-blue-800' },
];

interface QueuedFile {
  id: string;
  name: string;
  pages: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}

interface TransactionRow {
  date: string;
  description: string;
  ref: string;
  debit: string;
  credit: string;
  balance: string;
}

const SAMPLE_TRANSACTIONS: TransactionRow[] = [
  { date: '01 Jun 2025', description: 'POS Purchase - SHOPRITE LEKI', ref: 'TF2506010001', debit: '15,200.00', credit: '', balance: '284,800.00' },
  { date: '02 Jun 2025', description: 'Transfer Credit - JOHN OKAFOR', ref: 'TF2506020034', debit: '', credit: '50,000.00', balance: '334,800.00' },
  { date: '03 Jun 2025', description: 'ATM Withdrawal - IKEJA BRANCH', ref: 'ATM2506030012', debit: '20,000.00', credit: '', balance: '314,800.00' },
  { date: '05 Jun 2025', description: 'NIPS - ELECTRICITY BILL EKEDC', ref: 'NIP2506050088', debit: '12,500.00', credit: '', balance: '302,300.00' },
  { date: '07 Jun 2025', description: 'Mobile Transfer Credit - ADAEZE U.', ref: 'TF2506070156', debit: '', credit: '100,000.00', balance: '402,300.00' },
  { date: '09 Jun 2025', description: 'POS - CHICKEN REPUBLIC VGC', ref: 'POS2506090071', debit: '6,400.00', credit: '', balance: '395,900.00' },
  { date: '10 Jun 2025', description: 'Direct Debit - IROKOTV SUBSC', ref: 'DD2506100002', debit: '4,999.00', credit: '', balance: '390,901.00' },
  { date: '12 Jun 2025', description: 'Transfer Credit - PAYSTACK SETTLEMENTS', ref: 'TF2506120411', debit: '', credit: '225,000.00', balance: '615,901.00' },
  { date: '14 Jun 2025', description: 'Staff Salary Outward - JUNE 2025', ref: 'SAL2506140001', debit: '180,000.00', credit: '', balance: '435,901.00' },
  { date: '15 Jun 2025', description: 'POS - TOTAL FILLING STATION', ref: 'POS2506150018', debit: '35,000.00', credit: '', balance: '400,901.00' },
];

const MENUS = ['File', 'Bank Profile', 'Export', 'View', 'Help'];

let fileIdCounter = 1;

function genFile(bank: string): QueuedFile {
  return {
    id: `f${fileIdCounter++}`,
    name: `${bank}_statement_${new Date().toISOString().slice(0, 10)}.pdf`,
    pages: Math.floor(Math.random() * 6) + 2,
    status: 'pending',
  };
}

// ─── Page ─────────────────────────────────────────────────────

export default function DocumentDemoPage() {
  const [bank, setBank] = useState('access');
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const bankLabel = BANK_PROFILES.find(b => b.id === bank)?.label ?? 'Access Bank';

  function addFile() {
    setQueue(q => [...q, genFile(bankLabel)]);
  }

  function removeFile(id: string) {
    setQueue(q => q.filter(f => f.id !== id));
    if (queue.length <= 1) setShowPreview(false);
  }

  async function runExtraction() {
    if (queue.length === 0) return;
    setProcessing(true);
    setShowPreview(false);

    // phase 1: all pending → processing
    setQueue(q => q.map(f => f.status === 'pending' ? { ...f, status: 'processing' } : f));
    await new Promise(r => setTimeout(r, 1200));

    // phase 2: processing → done one by one
    for (let i = 0; i < queue.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setQueue(q => {
        const processingFiles = q.filter(f => f.status === 'processing');
        if (processingFiles.length === 0) return q;
        const first = processingFiles[0];
        return q.map(f => f.id === first.id ? { ...f, status: 'done' } : f);
      });
    }

    setProcessing(false);
    setShowPreview(true);
  }

  function handleExport() {
    setShowExportSuccess(true);
    setOpenMenu(null);
    setTimeout(() => setShowExportSuccess(false), 3000);
  }

  const doneCount = queue.filter(f => f.status === 'done').length;

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
          demo.bizsuits.com/document
        </div>
        <a href="/demo" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← All Demos</a>
      </div>

      {/* Page header */}
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>PDF Statement Extractor Demo</span>
          </div>
          <SectionHeading
            badge="Document Automation Demo"
            title="Bank statement extractor — upload PDFs, extract transactions to spreadsheet"
            subtitle="This demo mirrors the PDF Statement Extractor app: select your bank profile, queue PDF statements, run extraction, and export clean transaction data to Excel."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">Back to Features</Button>
            <Button variant="primary" size="md" href="/contact">Request Document Demo</Button>
          </div>
        </div>
      </section>

      {/* Desktop app UI */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="rounded-2xl border border-slate-300 bg-slate-100 overflow-hidden shadow-md">
            {/* App title bar */}
            <div className="bg-slate-700 flex items-center px-3 py-2">
              <div className="flex items-center gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center text-xs text-slate-300 font-medium">
                PDF Bank Statement Extractor
              </div>
            </div>

            {/* Menu bar */}
            <div className="bg-slate-200 border-b border-slate-300 flex items-center gap-0 px-1 relative">
              {MENUS.map(m => (
                <div key={m} className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === m ? null : m)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${openMenu === m ? 'bg-slate-300 text-slate-900' : 'text-slate-600 hover:bg-slate-300'}`}
                  >
                    {m}
                  </button>
                  {openMenu === m && m === 'Export' && (
                    <div className="absolute top-full left-0 bg-white border border-slate-200 shadow-lg rounded-md py-1 z-10 min-w-[160px]">
                      <button onClick={handleExport} className="w-full text-left text-xs px-4 py-2 hover:bg-slate-50 text-slate-700">Export to Excel (.xlsx)</button>
                      <button onClick={handleExport} className="w-full text-left text-xs px-4 py-2 hover:bg-slate-50 text-slate-700">Export to CSV (.csv)</button>
                    </div>
                  )}
                  {openMenu === m && m !== 'Export' && (
                    <div className="absolute top-full left-0 bg-white border border-slate-200 shadow-lg rounded-md py-1 z-10 min-w-[140px]">
                      <div className="text-xs px-4 py-2 text-slate-400">No actions</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main layout */}
            <div className="flex h-[520px]" onClick={() => setOpenMenu(null)}>
              {/* Left panel – bank profile */}
              <div className="w-48 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <FileText className="w-3.5 h-3.5" />
                    Bank Profile
                  </div>
                </div>
                <div className="flex-1 p-3 space-y-1">
                  {BANK_PROFILES.map(b => (
                    <label key={b.id} className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-colors ${bank === b.id ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-50'}`}>
                      <input type="radio" name="bank" value={b.id} checked={bank === b.id} onChange={() => setBank(b.id)} className="w-3.5 h-3.5 accent-indigo-600" />
                      <span className={`text-xs font-semibold ${bank === b.id ? 'text-indigo-700' : 'text-slate-600'}`}>{b.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Center – drop zone + queue */}
              <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                {/* Drop zone */}
                <div className="p-4 border-b border-slate-200">
                  <button
                    onClick={addFile}
                    className="w-full border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 rounded-xl py-6 flex flex-col items-center gap-2 transition-colors group"
                  >
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-xs text-slate-500 group-hover:text-indigo-600">Click to add PDF (simulated)</span>
                    <span className="text-[10px] text-slate-400">{bankLabel} · PDF only</span>
                  </button>
                </div>

                {/* Queue */}
                <div className="flex-1 overflow-y-auto p-4">
                  {queue.length === 0 ? (
                    <div className="text-center text-slate-400 text-xs mt-8">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No files queued. Click the drop zone to add PDF statements.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {queue.map(f => (
                        <div key={f.id} className={`flex items-center gap-3 bg-white rounded-xl border px-3 py-2.5 text-xs transition-all ${f.status === 'done' ? 'border-emerald-200' : f.status === 'processing' ? 'border-indigo-200' : f.status === 'error' ? 'border-red-200' : 'border-slate-200'}`}>
                          <FileText className={`w-4 h-4 shrink-0 ${f.status === 'done' ? 'text-emerald-500' : f.status === 'processing' ? 'text-indigo-500' : 'text-slate-400'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-700 truncate">{f.name}</div>
                            <div className="text-slate-400">{f.pages} pages</div>
                          </div>
                          {f.status === 'processing' && (
                            <div className="flex items-center gap-1 text-indigo-600 font-semibold">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                              Processing…
                            </div>
                          )}
                          {f.status === 'done' && (
                            <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Done
                            </div>
                          )}
                          {f.status === 'pending' && !processing && (
                            <button onClick={() => removeFile(f.id)} className="text-slate-300 hover:text-red-400 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions bar */}
                <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between bg-white">
                  <span className="text-xs text-slate-500">{queue.length} file(s) queued{doneCount > 0 ? ` · ${doneCount} done` : ''}</span>
                  <div className="flex gap-2">
                    {doneCount > 0 && (
                      <button onClick={handleExport} className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-500 transition-colors font-semibold">
                        <Download className="w-3.5 h-3.5" />
                        Export
                      </button>
                    )}
                    <button
                      onClick={runExtraction}
                      disabled={processing || queue.length === 0}
                      className="flex items-center gap-1.5 text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? <><div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />Extracting…</> : <><Table className="w-3.5 h-3.5" />Extract</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview table */}
            {showPreview && (
              <div className="border-t border-slate-200 bg-white">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Table className="w-4 h-4 text-indigo-600" />
                    Extracted Transactions — {bankLabel}
                    <span className="text-xs text-slate-400 font-normal ml-1">{SAMPLE_TRANSACTIONS.length} rows</span>
                  </div>
                  <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        {['Date', 'Description', 'Ref No.', 'Debit', 'Credit', 'Balance'].map(h => (
                          <th key={h} className="text-left text-slate-500 font-semibold px-4 py-2.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SAMPLE_TRANSACTIONS.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-2 text-slate-500 whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-2 text-slate-800 max-w-[220px] truncate">{row.description}</td>
                          <td className="px-4 py-2 font-mono text-slate-400 text-[11px]">{row.ref}</td>
                          <td className="px-4 py-2 text-red-600 font-semibold text-right">{row.debit}</td>
                          <td className="px-4 py-2 text-emerald-600 font-semibold text-right">{row.credit}</td>
                          <td className="px-4 py-2 text-slate-700 font-semibold text-right">{row.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Export success toast */}
      {showExportSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-5 h-5" />
          Exported successfully as .xlsx
        </div>
      )}
    </div>
  );
}
