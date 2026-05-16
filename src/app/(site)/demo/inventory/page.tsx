'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  MapPin,
  Package,
  RefreshCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

type StockFilter = 'all' | 'healthy' | 'low' | 'critical';

type InventoryItem = {
  sku: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  minStock: number;
  reorderLevel: number;
  unitCost: string;
  lastMovement: string;
};

const stockItems: InventoryItem[] = [
  {
    sku: 'INV-1042',
    name: 'Premium Rice 25kg',
    category: 'Staples',
    location: 'Lekki Outlet',
    quantity: 34,
    minStock: 20,
    reorderLevel: 24,
    unitCost: 'NGN 42,000',
    lastMovement: 'Received 12 bags today',
  },
  {
    sku: 'INV-2218',
    name: 'Sunflower Oil 5L',
    category: 'Consumables',
    location: 'Lekki Outlet',
    quantity: 11,
    minStock: 12,
    reorderLevel: 18,
    unitCost: 'NGN 11,500',
    lastMovement: '8 units sold this morning',
  },
  {
    sku: 'INV-3371',
    name: 'Bottled Water 75cl',
    category: 'Beverages',
    location: 'Ikeja Outlet',
    quantity: 8,
    minStock: 16,
    reorderLevel: 22,
    unitCost: 'NGN 320',
    lastMovement: 'Courier dispatch reduced stock',
  },
  {
    sku: 'INV-4410',
    name: 'Office Paper A4',
    category: 'Operations',
    location: 'HQ Store',
    quantity: 56,
    minStock: 15,
    reorderLevel: 20,
    unitCost: 'NGN 7,800',
    lastMovement: 'Monthly office stock refill',
  },
  {
    sku: 'INV-5524',
    name: 'Frozen Chicken Pack',
    category: 'Cold Room',
    location: 'Ikeja Outlet',
    quantity: 14,
    minStock: 14,
    reorderLevel: 20,
    unitCost: 'NGN 8,600',
    lastMovement: 'Supplier drop confirmed',
  },
  {
    sku: 'INV-6630',
    name: 'Cleaning Detergent',
    category: 'Household',
    location: 'Yaba Outlet',
    quantity: 61,
    minStock: 22,
    reorderLevel: 30,
    unitCost: 'NGN 2,450',
    lastMovement: 'Steady shelf movement',
  },
  {
    sku: 'INV-7741',
    name: 'POS Receipt Rolls',
    category: 'Operations',
    location: 'HQ Store',
    quantity: 5,
    minStock: 10,
    reorderLevel: 16,
    unitCost: 'NGN 850',
    lastMovement: 'Rollout to three outlets',
  },
  {
    sku: 'INV-8849',
    name: 'Goat Feed Mix',
    category: 'Agriculture',
    location: 'Farm Store',
    quantity: 29,
    minStock: 18,
    reorderLevel: 25,
    unitCost: 'NGN 18,200',
    lastMovement: 'Field transfer completed',
  },
];

function getStockState(item: InventoryItem): StockFilter {
  if (item.quantity <= Math.max(5, Math.floor(item.minStock * 0.65))) {
    return 'critical';
  }

  if (item.quantity <= item.minStock) {
    return 'low';
  }

  return 'healthy';
}

function getStockTone(state: StockFilter) {
  if (state === 'critical') {
    return 'bg-red-50 text-red-700 border-red-100';
  }

  if (state === 'low') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }

  return 'bg-emerald-50 text-emerald-700 border-emerald-100';
}

export default function InventoryDemoPage() {
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');

  const locations = useMemo(
    () => ['All locations', ...Array.from(new Set(stockItems.map((item) => item.location)))],
    []
  );

  const filteredItems = useMemo(() => {
    return stockItems.filter((item) => {
      const state = getStockState(item);
      const matchesQuery =
        query.trim().length === 0 ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.sku.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = selectedLocation === 'All locations' || item.location === selectedLocation;
      const matchesStock = stockFilter === 'all' || state === stockFilter;

      return matchesQuery && matchesLocation && matchesStock;
    });
  }, [query, selectedLocation, stockFilter]);

  const inventorySummary = useMemo(() => {
    const totalUnits = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
    const lowStock = filteredItems.filter((item) => getStockState(item) === 'low').length;
    const criticalStock = filteredItems.filter((item) => getStockState(item) === 'critical').length;
    const healthyStock = filteredItems.filter((item) => getStockState(item) === 'healthy').length;

    return { totalUnits, lowStock, criticalStock, healthyStock };
  }, [filteredItems]);

  const locationBreakdown = useMemo(() => {
    return locations
      .filter((location) => location !== 'All locations')
      .map((location) => {
        const items = stockItems.filter((item) => item.location === location);
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        const alerts = items.filter((item) => getStockState(item) !== 'healthy').length;

        return { location, total, alerts };
      });
  }, [locations]);

  const alertItems = filteredItems.filter((item) => getStockState(item) !== 'healthy');

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
          demo.bizsuits.com/inventory
        </div>
        <a href="/features" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← Back to Features</a>
      </div>
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Inventory Management Demo</span>
          </div>
          <SectionHeading
            badge="Inventory Demo"
            title="Stock management surface rebuilt from the current inventory admin workflow"
            subtitle="This demo now mirrors the source stock-management page: searchable inventory, location filters, stock-state badges, and a practical alert rail for replenishment work."
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

      <section className="section-padding pt-10">
        <div className="container-custom space-y-8">
          <Card padding="lg" elevated>
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0">
                  <Boxes className="w-7 h-7 text-primary-700" />
                </div>
                <div>
                  <p className="text-sm text-dark-500">Source pattern</p>
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">Stock Overview</h2>
                  <p className="text-dark-500 max-w-2xl leading-relaxed">
                    The inventory admin build already includes a strong stock-management backbone.
                    This fragment translates that workflow into a cleaner client demo with filtering, table review, and replenishment cues.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm" href="/demo/analytics">
                  Review Sales Signals
                </Button>
                <button className="rounded-xl border border-dark-100 bg-white px-4 py-3 text-sm font-semibold text-dark-700 flex items-center gap-2 hover:bg-dark-50 transition-colors">
                  <RefreshCcw className="w-4 h-4" />
                  Sync Snapshot
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <p className="text-sm font-semibold text-sky-700">Visible SKUs</p>
                <p className="text-2xl font-bold text-sky-800 mt-2">{filteredItems.length}</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-700">Healthy Stock</p>
                <p className="text-2xl font-bold text-emerald-800 mt-2">{inventorySummary.healthyStock}</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-700">Low Stock</p>
                <p className="text-2xl font-bold text-amber-800 mt-2">{inventorySummary.lowStock}</p>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-semibold text-red-700">Critical Items</p>
                <p className="text-2xl font-bold text-red-800 mt-2">{inventorySummary.criticalStock}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.45fr_0.9fr] gap-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-dark-100 bg-dark-50 p-4">
                  <div className="flex items-center gap-3 rounded-xl border border-dark-100 bg-white px-4 py-3 mb-4">
                    <Search className="w-4 h-4 text-dark-400" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search by product, category, or SKU"
                      className="w-full bg-transparent text-sm text-dark-700 placeholder:text-dark-400 outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-dark-600">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        Location filter
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedLocation === location
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-dark-500 border border-dark-100 hover:bg-dark-100'
                            }`}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-dark-600">
                        <SlidersHorizontal className="w-4 h-4 text-primary-600" />
                        Stock state
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(['all', 'healthy', 'low', 'critical'] as StockFilter[]).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setStockFilter(filter)}
                            className={`px-3 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                              stockFilter === filter
                                ? 'bg-dark-900 text-white'
                                : 'bg-white text-dark-500 border border-dark-100 hover:bg-dark-100'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-dark-100 bg-white shadow-sm">
                  <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.9fr] gap-4 border-b border-dark-100 bg-dark-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-dark-400">
                    <span>Item</span>
                    <span>Location</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Reorder</span>
                    <span className="text-right">Status</span>
                  </div>
                  <div className="divide-y divide-dark-100">
                    {filteredItems.map((item) => {
                      const state = getStockState(item);

                      return (
                        <div key={item.sku} className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.9fr] gap-4 px-5 py-4 items-center text-sm">
                          <div>
                            <p className="font-semibold text-dark-900">{item.name}</p>
                            <p className="text-xs text-dark-400 mt-1">
                              {item.sku} • {item.category} • {item.unitCost}
                            </p>
                            <p className="text-xs text-dark-500 mt-2">{item.lastMovement}</p>
                          </div>
                          <span className="text-dark-600">{item.location}</span>
                          <span className="text-right font-semibold text-dark-700">{item.quantity}</span>
                          <span className="text-right text-dark-500">{item.reorderLevel}</span>
                          <div className="flex justify-end">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStockTone(state)}`}>
                              {state}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {filteredItems.length === 0 ? (
                      <div className="px-5 py-12 text-center">
                        <p className="text-sm font-semibold text-dark-900">No items match this filter set</p>
                        <p className="text-sm text-dark-500 mt-2">
                          Try widening the location or stock-state filters to return more products.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card padding="md" elevated>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h3 className="text-base font-bold text-dark-900">Replenishment alerts</h3>
                  </div>
                  <div className="space-y-3">
                    {alertItems.length > 0 ? (
                      alertItems.map((item) => {
                        const state = getStockState(item);

                        return (
                          <div key={item.sku} className="rounded-2xl border border-dark-100 bg-dark-50 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-semibold text-dark-900">{item.name}</p>
                                <p className="text-xs text-dark-400 mt-1">{item.location}</p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStockTone(state)}`}>
                                {state}
                              </span>
                            </div>
                            <p className="text-sm text-dark-500 mt-3">
                              {item.quantity} units left. Reorder target is {item.reorderLevel}.
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-dark-500">No active stock alerts for the current filter.</p>
                    )}
                  </div>
                </Card>

                <Card padding="md" elevated>
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-4 h-4 text-primary-600" />
                    <h3 className="text-base font-bold text-dark-900">Location summary</h3>
                  </div>
                  <div className="space-y-3">
                    {locationBreakdown.map((entry) => (
                      <div key={entry.location} className="rounded-2xl border border-dark-100 bg-white p-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-semibold text-dark-900">{entry.location}</p>
                          <span className="text-sm font-semibold text-dark-700">{entry.total} units</span>
                        </div>
                        <p className="text-xs text-dark-400 mt-2">
                          {entry.alerts === 0 ? 'No active alerts' : `${entry.alerts} items need attention`}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="rounded-2xl border border-dark-100 bg-dark-900 text-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-3">
                    Source alignment
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">
                    This demo keeps the stock-management emphasis of the source inventory admin app,
                    but removes the review-only framing so buyers see a usable operations surface.
                  </p>
                  <p className="text-lg font-bold text-white mt-4">{inventorySummary.totalUnits} units in current filtered view</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
