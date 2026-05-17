import React from 'react';
import Link from 'next/link';

const BackOfficeDemoImplementation = () => {
    return (
        <div className="min-h-screen bg-dark-50/40 px-3 py-4 md:px-6 md:py-6">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-slate-300 bg-white shadow-[0_25px_70px_-30px_rgba(15,23,42,0.45)]">
                <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-300 bg-[#f1f3f4] px-3 py-2">
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex flex-1 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500">
                        <span className="text-[11px] text-green-600">LOCK</span>
                        demo.bizsuits.com/inventory
                    </div>
                    <Link
                        href="/features"
                        className="shrink-0 rounded px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
                    >
                        ← Back to Features
                    </Link>
                </div>

                <div className="bg-[#f4f7fb] p-6 md:p-8">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h1 className="mb-2 text-2xl font-bold text-slate-900">Back-Office Inventory Management</h1>
                        <p className="mb-6 text-sm text-slate-500">
                            This demo is presented inside a browser-style window, consistent with the other non-POS demo routes.
                        </p>
                        <div className="overflow-hidden rounded-xl border border-slate-200">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Item Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">SKU</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Stock Level</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-slate-900">Widget A</td>
                                        <td className="px-4 py-3">WID-001</td>
                                        <td className="px-4 py-3">150</td>
                                        <td className="px-4 py-3 text-emerald-600">In Stock</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-slate-900">Gadget B</td>
                                        <td className="px-4 py-3">GAD-002</td>
                                        <td className="px-4 py-3">12</td>
                                        <td className="px-4 py-3 text-amber-600">Low Stock</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackOfficeDemoImplementation;
