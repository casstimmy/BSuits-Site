'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── Types & Data ────────────────────────────────────────────

type StoreTab = 'Animals' | 'Products' | 'Services';

interface StoreItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  badge?: string;
}

interface CartItem extends StoreItem {
  qty: number;
}

const storeData: Record<StoreTab, StoreItem[]> = {
  Animals: [
    { id: 'AN1', name: 'Boer Goat (Female)', desc: 'Crossbred, 2 yrs, 48kg, vaccinated', price: 95000, emoji: '🐐', badge: 'Available' },
    { id: 'AN2', name: 'Friesian Heifer', desc: 'Dairy breed, 18m, 280kg', price: 420000, emoji: '🐄', badge: 'Available' },
    { id: 'AN3', name: 'Broiler Batch (100)', desc: '6-week finisher, ~2.4kg each', price: 85000, emoji: '🐓', badge: 'Pre-order' },
    { id: 'AN4', name: 'Dorper Ram', desc: 'Pure breed, 3 yrs, 90kg, papers', price: 180000, emoji: '🐑' },
    { id: 'AN5', name: 'Large White Piglet', desc: '8 weeks, weaned, 12kg', price: 28000, emoji: '🐷', badge: 'Low Stock' },
    { id: 'AN6', name: 'Turkeys (Pair)', desc: 'Tom + Hen, broad-breasted white', price: 48000, emoji: '🦃' },
  ],
  Products: [
    { id: 'PR1', name: 'Fresh Farm Milk (10L)', desc: 'Pasteurised whole milk, same-day dispatch', price: 8500, emoji: '🥛' },
    { id: 'PR2', name: 'Organic Eggs (Tray)', desc: '30 eggs, free-range layer hens', price: 3500, emoji: '🥚', badge: 'Best Seller' },
    { id: 'PR3', name: 'Goat Manure (50kg)', desc: 'Composted, bagged, ready to use', price: 4200, emoji: '🌱' },
    { id: 'PR4', name: 'Hay Bale (25kg)', desc: 'Dry-cut teff hay, low dust', price: 2800, emoji: '🌾' },
    { id: 'PR5', name: 'Broiler Finisher Feed (25kg)', desc: 'High-protein pellets for finishing stage', price: 9800, emoji: '🫙' },
    { id: 'PR6', name: 'Smoked Goat Meat (1kg)', desc: 'Seasoned, vacuum-packed', price: 6500, emoji: '🍖', badge: 'New' },
  ],
  Services: [
    { id: 'SV1', name: 'Veterinary Farm Visit', desc: 'On-site health assessment, diagnosis & treatment', price: 25000, emoji: '🩺' },
    { id: 'SV2', name: 'Vaccination Programme', desc: 'FMD + brucellosis + blackleg (per 10 animals)', price: 18000, emoji: '💉' },
    { id: 'SV3', name: 'Farm Setup Consultation', desc: '2-hour session with our agronomist', price: 35000, emoji: '📋' },
    { id: 'SV4', name: 'Animal Delivery (Lagos)', desc: 'Live livestock transport to your location', price: 15000, emoji: '🚛' },
    { id: 'SV5', name: 'Pregnancy Diagnosis', desc: 'Ultrasound scan per animal', price: 8500, emoji: '🔬' },
  ],
};

function fmt(n: number) {
  return '₦' + n.toLocaleString();
}



// ─── Page ─────────────────────────────────────────────────────

export default function FarmStoreDemoPage() {
  const [tab, setTab] = useState<StoreTab>('Animals');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [checkedOut, setCheckedOut] = useState(false);

  const items = storeData[tab].filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(item: StoreItem) {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function handleCheckout() {
    setCheckedOut(true);
    setTimeout(() => { setCheckedOut(false); setCart([]); setCartOpen(false); }, 3000);
  }

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
          demo.bizsuits.com/farm-store
        </div>
        <a href="/features" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← Back to Features</a>
      </div>

      {/* Page header */}
      <section className="pt-10 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Farm Web Place Demo</span>
          </div>
          <SectionHeading
            badge="Farm Storefront Demo"
            title="Agri-commerce storefront — animals, products, and farm services"
            subtitle="This demo reflects the Farm Web Place storefront: live listing of animals for sale, farm products, and professional services, synchronized with the Farm Health Manager system."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">Back to Features</Button>
            <Button variant="primary" size="md" href="/contact">Request Storefront Demo</Button>
          </div>
        </div>
      </section>

      {/* Store */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Store header */}
            <div className="bg-emerald-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <div>
                  <div className="text-white font-bold text-lg">Farm Web Place</div>
                  <div className="text-emerald-300 text-xs">Greenfield Farm &amp; Agri-Commerce</div>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-yellow-400 text-emerald-900 text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Search + tabs */}
            <div className="border-b border-slate-200 px-5 pt-3 pb-0 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex gap-0">
                {(['Animals', 'Products', 'Services'] as StoreTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setSearch(''); }}
                    className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === t ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex-1 sm:max-w-xs ml-auto pb-3">
                <input
                  type="text"
                  placeholder={`Search ${tab.toLowerCase()}…`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Items grid */}
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  return (
                    <div key={item.id} className="rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all overflow-hidden">
                      <div className="bg-emerald-50 flex items-center justify-center py-6 text-5xl">
                        {item.emoji}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-slate-900 leading-tight">{item.name}</h3>
                          {item.badge && (
                            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badge === 'Low Stock' ? 'bg-amber-100 text-amber-700' : item.badge === 'Pre-order' ? 'bg-blue-100 text-blue-700' : item.badge === 'Best Seller' ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700'}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{item.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-emerald-700">{fmt(item.price)}</span>
                          {inCart ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                                ✓ In cart ({inCart.qty})
                              </span>
                              <button onClick={() => addToCart(item)} className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-lg hover:bg-emerald-500">+</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-emerald-500 transition-colors"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-slate-900">Cart ({cartCount})</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkedOut ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Order Placed!</h3>
                <p className="text-slate-500 text-sm">We&apos;ll contact you to confirm your order and arrange delivery.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center mt-8">Your cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">{item.name}</div>
                          <div className="text-xs text-emerald-600 font-semibold">{fmt(item.price)} × {item.qty}</div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="p-4 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Total</span>
                      <span className="font-bold text-slate-900 text-base">{fmt(cartTotal)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
