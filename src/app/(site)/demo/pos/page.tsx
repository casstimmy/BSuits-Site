'use client';

import React, { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────

type Screen = 'login' | 'pos' | 'payment' | 'receipt';

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

interface Product {
  name: string;
  price: number;
  stock: number | null;
  emoji: string;
  category: string;
}

// ─── Data ────────────────────────────────────────────────────

const staffList = [
  { name: 'John', user: '@john' },
  { name: 'Doe', user: '@doe' },
  { name: 'Jane', user: '@jane' },
];

const products: Product[] = [
  { name: 'Cheese Cheddar', price: 5000, emoji: '🧀', category: 'Food', stock: 45 },
  { name: 'Butter Salted', price: 4400, emoji: '🧈', category: 'Food', stock: null },
  { name: 'Tomato Fresh', price: 3000, emoji: '🍅', category: 'Food', stock: 20 },
  { name: 'Banana Yellow', price: 1700, emoji: '🍌', category: 'Food', stock: 155 },
  { name: 'Chicken Wings', price: 6500, emoji: '🍗', category: 'Food', stock: 30 },
  { name: 'Rice (5kg)', price: 8000, emoji: '🍚', category: 'Food', stock: 12 },
  { name: 'Room Standard', price: 25000, emoji: '🛏️', category: 'Hotel', stock: 5 },
  { name: 'Breakfast Buffet', price: 7500, emoji: '🍳', category: 'Hotel', stock: null },
  { name: 'Red Wine', price: 15000, emoji: '🍷', category: 'Bar', stock: 8 },
  { name: 'Cocktail Mix', price: 4000, emoji: '🍹', category: 'Bar', stock: null },
  { name: 'Sunflower Oil', price: 4200, emoji: '🫙', category: 'Grocery', stock: 60 },
  { name: 'Bottled Water', price: 300, emoji: '💧', category: 'Grocery', stock: 200 },
];

const CATEGORIES = ['All', 'Food', 'Hotel', 'Bar', 'Grocery'];

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: '💵' },
  { id: 'transfer', label: 'Transfer', icon: '📲' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'pos', label: 'POS Terminal', icon: '🖥️' },
];

function fmt(n: number) {
  return '₦' + n.toLocaleString();
}

// ─── Login Screen ────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (name: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  function handlePin(digit: string) {
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      if (next.length === 4) {
        if (next === '1234') {
          onLogin(selected!);
        } else {
          setTimeout(() => { setError('Incorrect PIN'); setPin(''); }, 300);
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8">
      <div className="mb-8 text-center">
        <div className="text-3xl font-extrabold text-white tracking-tight mb-1">Sales Point</div>
        <div className="text-teal-300 text-sm">Select your profile to continue</div>
      </div>
      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {staffList.map((s) => (
          <button
            key={s.user}
            onClick={() => { setSelected(s.user); setPin(''); setError(''); }}
            className={`flex flex-col items-center gap-1.5 px-5 py-4 rounded-2xl border-2 transition-all ${
              selected === s.user
                ? 'border-teal-300 bg-teal-700/60 shadow-lg scale-105'
                : 'border-teal-700/60 bg-teal-800/40 hover:border-teal-500'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-teal-600 border-2 border-teal-400 flex items-center justify-center text-white font-bold text-xl">
              {s.name[0]}
            </div>
            <span className="text-white text-sm font-semibold">{s.name}</span>
            <span className="text-teal-400 text-xs">{s.user}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="bg-teal-800/60 border border-teal-600/40 rounded-3xl p-6 w-full max-w-xs">
          <div className="flex justify-center gap-3 mb-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`w-4 h-4 rounded-full transition-all ${pin.length > i ? 'bg-teal-300 scale-110' : 'bg-teal-700 border border-teal-500'}`} />
            ))}
          </div>
          {error && <p className="text-red-400 text-xs text-center mb-3">{error}</p>}
          <div className="grid grid-cols-3 gap-2">
            {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k) => (
              <button
                key={k}
                onClick={() => {
                  if (k === '⌫') { setPin(p => p.slice(0,-1)); setError(''); }
                  else if (k !== '') handlePin(k);
                }}
                disabled={k === ''}
                className={`h-12 rounded-xl text-white font-semibold text-lg transition-all ${k === '' ? '' : k === '⌫' ? 'bg-teal-700/60 hover:bg-teal-600 active:scale-95' : 'bg-teal-700 hover:bg-teal-600 active:scale-95'}`}
              >
                {k}
              </button>
            ))}
          </div>
          <p className="text-teal-400 text-xs text-center mt-3">Demo PIN: 1234</p>
        </div>
      )}
    </div>
  );
}

// ─── POS Screen ──────────────────────────────────────────────

function POSScreen({ staff, cart, onAddToCart, onUpdateQty, onCheckout }: {
  staff: string;
  cart: CartItem[];
  onAddToCart: (p: Product) => void;
  onUpdateQty: (name: string, delta: number) => void;
  onCheckout: () => void;
}) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="bg-blue-800 border-b border-blue-700 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {staff[1]?.toUpperCase()}
          </div>
          <span className="text-white text-sm font-semibold">St&apos;s Michael Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-blue-300 text-xs">Till #1</span>
          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">● Open</span>
        </div>
      </div>
      <div className="bg-yellow-500 px-4 py-1 text-xs text-yellow-900 font-medium text-center shrink-0">
        ⚡ Live sync active — inventory updates in real time
      </div>
      <div className="bg-blue-900 border-b border-blue-700 px-4 flex gap-1 shrink-0">
        {['MENU', 'CUSTOMERS', 'ORDERS'].map((t) => (
          <button key={t} className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide border-b-2 ${t === 'MENU' ? 'border-teal-400 text-teal-300' : 'border-transparent text-blue-400'}`}>{t}</button>
        ))}
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 space-y-2 shrink-0 bg-slate-900/40">
            <input type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-blue-900/50 border border-blue-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-blue-400 focus:outline-none focus:border-teal-500" />
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${category === c ? 'bg-teal-500 text-white' : 'bg-blue-800/60 text-blue-300 hover:bg-blue-700'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filtered.map(p => {
                const inCart = cart.find(c => c.name === p.name);
                return (
                  <button key={p.name} onClick={() => onAddToCart(p)} className="relative rounded-xl bg-blue-800/60 border border-blue-700/60 hover:border-teal-500/70 hover:bg-blue-700/60 text-left p-2.5 transition-all active:scale-95">
                    {inCart && <div className="absolute top-1.5 right-1.5 bg-teal-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{inCart.qty}</div>}
                    {p.stock !== null && p.stock <= 15 && <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-bold px-1 rounded">LOW</div>}
                    <div className="text-2xl mb-1">{p.emoji}</div>
                    <div className="text-white text-xs font-semibold leading-tight mb-1">{p.name}</div>
                    <div className="text-teal-300 text-sm font-bold">{fmt(p.price)}</div>
                    {p.stock !== null && <div className="text-blue-400 text-[10px] mt-0.5">Stock: {p.stock}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-64 lg:w-72 bg-slate-900 border-l border-blue-800/60 flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-blue-800/40 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">Order</span>
            {itemCount > 0 && <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>}
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {cart.length === 0 ? (
              <div className="text-blue-400 text-xs text-center mt-8">Tap a product to add it</div>
            ) : cart.map(item => (
              <div key={item.name} className="bg-blue-900/50 rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{item.name}</div>
                  <div className="text-teal-400 text-xs">{fmt(item.price)}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => onUpdateQty(item.name, -1)} className="w-5 h-5 rounded bg-blue-700 text-white text-xs flex items-center justify-center hover:bg-blue-600">−</button>
                  <span className="text-white text-xs w-4 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.name, 1)} className="w-5 h-5 rounded bg-blue-700 text-white text-xs flex items-center justify-center hover:bg-blue-600">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-blue-800/40 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">Subtotal</span>
              <span className="text-white font-semibold">{fmt(total)}</span>
            </div>
            <button onClick={onCheckout} disabled={cart.length === 0} className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors">
              Charge {cart.length > 0 ? fmt(total) : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Screen ──────────────────────────────────────────

function PaymentScreen({ staff, cart, onConfirm, onCancel }: {
  staff: string;
  cart: CartItem[];
  onConfirm: (method: string) => void;
  onCancel: () => void;
}) {
  const [method, setMethod] = useState('cash');
  const [cashInput, setCashInput] = useState('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cashAmount = parseInt(cashInput || '0');
  const change = cashAmount - total;

  function handleKeypad(k: string) {
    if (k === '⌫') setCashInput(v => v.slice(0, -1));
    else if (k === '00') setCashInput(v => v === '' ? '' : v + '00');
    else setCashInput(v => v + k);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-slate-900">
      <div className="bg-blue-800 px-4 py-3 flex items-center gap-3 shrink-0 border-b border-blue-700">
        <button onClick={onCancel} className="text-blue-300 hover:text-white text-sm">← Back</button>
        <span className="text-white font-semibold">Payment — {staff}</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-56 bg-slate-800 border-r border-blue-800/40 p-3 space-y-2 shrink-0">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">Payment Method</p>
          {PAYMENT_METHODS.map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${method === m.id ? 'bg-teal-600 text-white border border-teal-400' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border border-transparent'}`}>
              <span className="text-lg">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          <div className="bg-blue-900/40 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-blue-300">Total Due</span>
              <span className="text-teal-300">{fmt(total)}</span>
            </div>
          </div>
          {method === 'cash' && (
            <>
              <div className="bg-slate-800 rounded-xl px-4 py-3 mb-3 text-right">
                <p className="text-blue-400 text-xs mb-1">Cash Received</p>
                <p className="text-white text-2xl font-bold">{cashInput ? fmt(parseInt(cashInput)) : '₦0'}</p>
                {cashAmount >= total && cashAmount > 0 && <p className="text-emerald-400 text-sm mt-1">Change: {fmt(change)}</p>}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['1','2','3','4','5','6','7','8','9','00','0','⌫'].map(k => (
                  <button key={k} onClick={() => handleKeypad(k)} className="h-12 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-lg active:scale-95 transition-all">{k}</button>
                ))}
              </div>
            </>
          )}
          <button onClick={() => onConfirm(method)} disabled={method === 'cash' && cashAmount < total} className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition-colors mt-auto">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Receipt Screen ──────────────────────────────────────────

function ReceiptScreen({ staff, cart, paymentMethod, onNewSale }: {
  staff: string;
  cart: CartItem[];
  paymentMethod: string;
  onNewSale: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const now = new Date();
  const receiptNo = '#' + Math.floor(Math.random() * 90000 + 10000);

  return (
    <div className="flex flex-col flex-1 items-center justify-start overflow-y-auto bg-slate-900 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-4">
          <div className="bg-teal-600 px-6 py-5 text-center">
            <div className="text-white text-xl font-extrabold">St&apos;s Michael Hub</div>
            <div className="text-teal-200 text-xs mt-0.5">Sales Receipt</div>
          </div>
          <div className="px-5 py-4 font-mono text-xs text-slate-600 space-y-3">
            <div className="flex justify-between"><span className="text-slate-400">Receipt</span><span className="font-bold">{receiptNo}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Date</span><span>{now.toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Cashier</span><span>{staff}</span></div>
            <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5">
              {cart.map(item => (
                <div key={item.name} className="flex justify-between">
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="ml-2 shrink-0">{item.qty} × {fmt(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className="flex justify-between font-bold text-slate-900 text-sm"><span>TOTAL</span><span>{fmt(total)}</span></div>
              <div className="flex justify-between text-slate-500 mt-1"><span>Payment</span><span className="capitalize">{paymentMethod}</span></div>
            </div>
            <div className="text-center pt-2 text-slate-400 text-[10px]">✓ Transaction Approved<br />Thank you for your purchase!</div>
          </div>
        </div>
        <button onClick={onNewSale} className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl text-base transition-colors">+ New Sale</button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────

export default function POSDemoPage() {
  const [screen, setScreen] = useState<Screen>('login');
  const [staff, setStaff] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  function handleAddToCart(p: Product) {
    setCart(prev => {
      const ex = prev.find(i => i.name === p.name);
      if (ex) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: p.name, price: p.price, qty: 1 }];
    });
  }

  function handleUpdateQty(name: string, delta: number) {
    setCart(prev => prev.map(i => i.name === name ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-teal-700 via-teal-800 to-teal-900">
      {/* Browser chrome */}
      <div className="bg-[#f1f3f4] border-b border-gray-300 px-3 py-2 flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 border border-gray-200 flex items-center gap-1.5">
          <span className="text-green-600 text-[11px]">🔒</span>
          demo.bizsuits.com/pos
        </div>
        <a href="/demo" className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors shrink-0">← All Demos</a>
      </div>

      {screen === 'login' && <LoginScreen onLogin={s => { setStaff(s); setScreen('pos'); }} />}
      {screen === 'pos' && (
        <POSScreen staff={staff} cart={cart} onAddToCart={handleAddToCart} onUpdateQty={handleUpdateQty} onCheckout={() => setScreen('payment')} />
      )}
      {screen === 'payment' && (
        <PaymentScreen staff={staff} cart={cart} onConfirm={m => { setPaymentMethod(m); setScreen('receipt'); }} onCancel={() => setScreen('pos')} />
      )}
      {screen === 'receipt' && (
        <ReceiptScreen staff={staff} cart={cart} paymentMethod={paymentMethod} onNewSale={() => { setCart([]); setScreen('pos'); }} />
      )}
    </div>
  );
}
