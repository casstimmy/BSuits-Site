'use client';

import React, { useState, useEffect } from 'react';

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
  stock: number | null; // null = out of stock (shown as "Out")
  emoji: string;
  category: string;
}

// ─── Data ────────────────────────────────────────────────────

const STORE = "St's Michael's Place";
const LOCATIONS = ['Warehouse', 'Hotel'];

const STAFF_LIST = [
  { name: 'Ayoola', role: 'Admin', initial: 'A', pin: '1234' },
  { name: 'Precious', role: 'Junior Staff', initial: 'P', pin: '5678' },
];

const CATEGORIES = [
  'Breakfast', 'Drinks', 'Extra', 'Pasta', 'Pastry',
  'Pepper Soup', 'Protein', 'Rooms', 'Soup',
];

const CAT_META: Record<string, { emoji: string; grad: string }> = {
  Breakfast:     { emoji: '🍳', grad: 'from-orange-400 to-orange-600' },
  Drinks:        { emoji: '🥃', grad: 'from-amber-700 to-amber-900' },
  Extra:         { emoji: '➕', grad: 'from-slate-500 to-slate-700' },
  Pasta:         { emoji: '🍝', grad: 'from-red-500 to-red-700' },
  Pastry:        { emoji: '🍞', grad: 'from-yellow-400 to-yellow-600' },
  'Pepper Soup': { emoji: '🍲', grad: 'from-red-600 to-red-800' },
  Protein:       { emoji: '🍗', grad: 'from-orange-500 to-red-600' },
  Rooms:         { emoji: '🛏️', grad: 'from-blue-600 to-blue-800' },
  Soup:          { emoji: '🍜', grad: 'from-amber-500 to-amber-700' },
};

const PRODUCTS: Product[] = [
  // Breakfast
  { name: 'BEVERAGE (TEA, CHOCOLATE OR COFFEE)', price: 1000, stock: null, category: 'Breakfast', emoji: '☕' },
  { name: 'BEVERAGE, BREAD AND COMPLETE (COMBO)', price: 2000, stock: null, category: 'Breakfast', emoji: '🍞' },
  { name: 'FRIED PLANTAIN', price: 2000, stock: null, category: 'Breakfast', emoji: '🍌' },
  { name: 'PORRIDE BEANS', price: 1500, stock: null, category: 'Breakfast', emoji: '🫘' },
  { name: 'BEANS & PLANTAIN', price: 2500, stock: null, category: 'Breakfast', emoji: '🫘' },
  { name: 'PORRIDE BEANS WITH PLANTAIN & EGG', price: 4000, stock: null, category: 'Breakfast', emoji: '🥚' },
  { name: 'YAM PORRIDGE', price: 2500, stock: null, category: 'Breakfast', emoji: '🥔' },
  { name: 'PORRIDGE BEANS WITH YAM', price: 3500, stock: null, category: 'Breakfast', emoji: '🫘' },
  { name: 'YAM WITH E SAUCE (2PCS)', price: 4000, stock: null, category: 'Breakfast', emoji: '🥔' },
  { name: 'SALAD (COLESLAW)', price: 1000, stock: null, category: 'Breakfast', emoji: '🥗' },
  { name: 'EXTRA BEEF (2PCS)', price: 2000, stock: null, category: 'Breakfast', emoji: '🥩' },
  { name: 'WHITE RICE & BEEF', price: 4000, stock: null, category: 'Breakfast', emoji: '🍚' },
  { name: 'WHITE RICE', price: 2000, stock: null, category: 'Breakfast', emoji: '🍚' },
  { name: 'WHITE RICE & CHICKEN', price: 6000, stock: null, category: 'Breakfast', emoji: '🍚' },
  { name: 'WHITE RICE & TURKEY', price: 6000, stock: null, category: 'Breakfast', emoji: '🍚' },
  { name: 'WHITE RICE & GOATMEAT', price: 5000, stock: null, category: 'Breakfast', emoji: '🍚' },
  { name: 'WHITE RICE & FISH (CROCKER)', price: 4000, stock: null, category: 'Breakfast', emoji: '🐟' },
  { name: 'FRIED RICE/JOLLOF RICE', price: 2000, stock: null, category: 'Breakfast', emoji: '🍛' },
  { name: 'FRIED RICE/JOLLOF RICE & BEEF', price: 6500, stock: null, category: 'Breakfast', emoji: '🍛' },
  { name: 'FRIED RICE/JOLLOF RICE & CHICKEN', price: 6500, stock: null, category: 'Breakfast', emoji: '🍛' },
  // Drinks
  { name: 'Cway bottle water (Pack)', price: 1690, stock: 2992, category: 'Drinks', emoji: '💧' },
  { name: 'Cway bottle water (Unit)', price: 141, stock: 35904, category: 'Drinks', emoji: '💧' },
  { name: 'Action Bitters 20cl (Pack)', price: 16000, stock: 48, category: 'Drinks', emoji: '🍶' },
  { name: 'Action Bitters 20cl (Unit)', price: 900, stock: 1152, category: 'Drinks', emoji: '🍶' },
  { name: 'FEARLESS ENERGY DRINK 500ML (Pack)', price: 4450, stock: 142, category: 'Drinks', emoji: '⚡' },
  { name: 'FEARLESS ENERGY DRINK 500ML (Unit)', price: 500, stock: 1704, category: 'Drinks', emoji: '⚡' },
  { name: 'BIGI DRINKS 35cl (Pack)', price: 2350, stock: 303, category: 'Drinks', emoji: '🥤' },
  { name: 'BIGI DRINKS 35cl (Unit)', price: 250, stock: 3636, category: 'Drinks', emoji: '🥤' },
  { name: 'CAPRI SUN FRUIT DRINK 200ML x40 (Pack)', price: 10368, stock: 40, category: 'Drinks', emoji: '🧃' },
  { name: 'CAPRI SUN FRUIT DRINK 200ML (Unit)', price: 500, stock: 1600, category: 'Drinks', emoji: '🧃' },
  { name: 'HOLLANDIA YOGHURT 1 LTR (Pack)', price: 15308, stock: 39, category: 'Drinks', emoji: '🥛' },
  { name: 'HOLLANDIA YOGHURT 1 LTR (Unit)', price: 1800, stock: 390, category: 'Drinks', emoji: '🥛' },
  // Protein
  { name: 'PEPPER CHICKEN', price: 5000, stock: null, category: 'Protein', emoji: '🍗' },
  { name: 'GRILLED FISH', price: 3500, stock: null, category: 'Protein', emoji: '🐟' },
  { name: 'ASSORTED MEAT', price: 2000, stock: null, category: 'Protein', emoji: '🥩' },
  { name: 'POMO (COWSKIN)', price: 1500, stock: null, category: 'Protein', emoji: '🥩' },
  // Rooms
  { name: 'STANDARD ROOM (1 NIGHT)', price: 25000, stock: 5, category: 'Rooms', emoji: '🛏️' },
  { name: 'DELUXE ROOM (1 NIGHT)', price: 40000, stock: 3, category: 'Rooms', emoji: '🏨' },
  // Soup
  { name: 'EGUSI SOUP', price: 2500, stock: null, category: 'Soup', emoji: '🍲' },
  { name: 'OFE ONUGBU (BITTER LEAF SOUP)', price: 2500, stock: null, category: 'Soup', emoji: '🍲' },
  { name: 'OFE AKWU (PALM NUT SOUP)', price: 2000, stock: null, category: 'Soup', emoji: '🍲' },
  // Pepper Soup
  { name: 'ASSORTED PEPPER SOUP', price: 3000, stock: null, category: 'Pepper Soup', emoji: '🍲' },
  { name: 'CATFISH PEPPER SOUP', price: 4000, stock: null, category: 'Pepper Soup', emoji: '🐟' },
  // Pasta
  { name: 'SPAGHETTI BOLOGNESE', price: 3500, stock: null, category: 'Pasta', emoji: '🍝' },
  { name: 'PASTA WITH CHICKEN SAUCE', price: 4000, stock: null, category: 'Pasta', emoji: '🍝' },
  // Pastry
  { name: 'MEAT PIE', price: 500, stock: null, category: 'Pastry', emoji: '🥧' },
  { name: 'FISH ROLL', price: 300, stock: null, category: 'Pastry', emoji: '🥐' },
  { name: 'SCOTCH EGG', price: 600, stock: null, category: 'Pastry', emoji: '🥚' },
  // Extra
  { name: 'EXTRA STEW', price: 500, stock: null, category: 'Extra', emoji: '🍲' },
  { name: 'EXTRA EGG', price: 300, stock: null, category: 'Extra', emoji: '🥚' },
  { name: 'EXTRA PLANTAIN', price: 500, stock: null, category: 'Extra', emoji: '🍌' },
];

const PAY_METHODS = [
  { id: 'moniepoint', label: 'Moniepoint Pos' },
  { id: 'cash', label: 'Cash' },
  { id: 'transfer', label: 'Bank Transfer' },
  { id: 'tips', label: 'Staff Tips' },
];

function fmt(n: number) {
  return '₦' + n.toLocaleString();
}

// ─── Login Screen ────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (staff: string, location: string) => void }) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('Warehouse');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => {
    function tick() {
      const d = new Date();
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      setClock(`${dd}/${mm}/${yyyy} - ${hh}:${min}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function handlePin(digit: string) {
    if (digit === '⌫') { setPin(p => p.slice(0, -1)); setError(''); return; }
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === 4) {
      const s = STAFF_LIST.find(x => x.name === selectedStaff);
      setTimeout(() => {
        if (!selectedStaff) { setError('Select a staff member first'); setPin(''); return; }
        if (next === s?.pin) { onLogin(selectedStaff, selectedLocation); }
        else { setError('Incorrect passcode'); setPin(''); }
      }, 200);
    }
  }

  const canLogin = !!selectedStaff && pin.length === 4;

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0e6ba8' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 shrink-0" style={{ backgroundColor: '#0a4f7e' }}>
        <button className="flex items-center gap-1.5 border border-white/40 rounded-full px-3 py-1.5 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
          ⏰ CLOCK IN / OUT
        </button>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs mb-0.5">B</div>
          <span className="text-white text-[10px] font-medium">TILL 1 - {clock}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-white/40 rounded-full px-3 py-1.5 text-white text-xs font-semibold hover:bg-white/10 transition-colors">❓ HELP</button>
          <button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1.5 text-xs font-bold transition-colors">⏻ EXIT</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Left panel */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-w-0">
          {/* Sync card */}
          <div className="rounded-xl p-3 border border-white/20" style={{ backgroundColor: '#0a4f7e' }}>
            <div className="flex items-center gap-1.5 text-white text-xs font-bold mb-2">
              <span>📋</span> HAS PENDING TRANSACTIONS
            </div>
            <div className="flex items-center justify-between text-[10px] mb-2">
              <span className="text-green-300 font-semibold">🟢 ONLINE</span>
              <span className="text-blue-300">2 locations cached</span>
            </div>
            <button
              onClick={() => { setSyncing(true); setTimeout(() => setSyncing(false), 1500); }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-lg py-2 text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {syncing ? '↻ Syncing...' : '↻ Sync Data from Cloud'}
            </button>
            <p className="text-center text-[10px] text-blue-300 mt-1.5">Last synced: 6 mins ago</p>
          </div>

          {/* Select Store */}
          <div>
            <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">SELECT STORE</p>
            <button className="w-full py-2.5 rounded-lg text-white text-sm font-semibold border-2 border-white/30 text-center" style={{ backgroundColor: '#0a3d62' }}>
              {STORE}
            </button>
          </div>

          {/* Select Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                <span className="text-red-400">▼</span> SELECT LOCATION
              </p>
              <button className="text-blue-300 text-[10px] hover:text-white">↻ Refresh</button>
            </div>
            <div className="flex gap-2">
              {LOCATIONS.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                    selectedLocation === loc
                      ? 'bg-amber-500 text-amber-900 border-amber-400'
                      : 'text-white border-white/30 hover:bg-white/10'
                  }`}
                  style={selectedLocation !== loc ? { backgroundColor: '#0a4f7e' } : {}}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Select Staff */}
          <div>
            <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">SELECT STAFF</p>
            <div className="flex gap-3 flex-wrap">
              {STAFF_LIST.map(s => (
                <button
                  key={s.name}
                  onClick={() => { setSelectedStaff(s.name); setPin(''); setError(''); }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[90px] ${
                    selectedStaff === s.name ? 'border-amber-400' : 'border-white/20 hover:border-white/40'
                  }`}
                  style={{ backgroundColor: '#0a4f7e' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-[#2a8aba]" style={{ backgroundColor: '#1a6a9a' }}>
                    {s.initial}
                  </div>
                  <span className="text-white text-xs font-semibold">{s.name}</span>
                  <span className="text-blue-300 text-[10px]">{s.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — passcode */}
        <div className="w-[300px] shrink-0 rounded-2xl p-5 flex flex-col items-center border border-white/20" style={{ backgroundColor: '#0a4f7e' }}>
          <p className="text-white text-sm font-bold tracking-wide mb-5 text-center">PLEASE ENTER YOUR PASSCODE</p>
          {/* Dots */}
          <div className="flex gap-3 mb-3">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all border ${
                  pin.length > i ? 'bg-blue-300 border-blue-300' : 'border-blue-500'
                }`}
                style={pin.length <= i ? { backgroundColor: '#0e6ba8' } : {}}
              />
            ))}
          </div>
          {error && <p className="text-red-400 text-xs mb-2 text-center">{error}</p>}
          <div className="w-full border-t border-white/20 mb-4" />
          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 w-full mb-3">
            {['1','2','3','4','5','6','7','8','9'].map(k => (
              <button
                key={k}
                onClick={() => handlePin(k)}
                className="h-12 rounded-xl text-white font-semibold text-lg transition-all active:scale-95 hover:brightness-110 border border-white/20"
                style={{ backgroundColor: '#0e6ba8' }}
              >
                {k}
              </button>
            ))}
            <button
              onClick={() => handlePin('0')}
              className="h-12 col-span-2 rounded-xl text-white font-semibold text-lg transition-all active:scale-95 hover:brightness-110 border border-white/20"
              style={{ backgroundColor: '#0e6ba8' }}
            >
              0
            </button>
            <button
              onClick={() => handlePin('⌫')}
              className="h-12 rounded-xl text-white font-semibold text-lg transition-all active:scale-95 hover:brightness-110 border border-white/20"
              style={{ backgroundColor: '#0e6ba8' }}
            >
              ⌫
            </button>
          </div>
          {/* Login */}
          <button
            onClick={() => canLogin && onLogin(selectedStaff!, selectedLocation)}
            disabled={!canLogin}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all mb-2"
            style={{ backgroundColor: canLogin ? '#1a6ab8' : '#0a3d62', color: canLogin ? '#fff' : '#4a7a9a' }}
          >
            LOGIN
          </button>
          <p className="text-blue-300 text-[10px] text-center leading-relaxed">
            Enter 4-digit passcode and select a Staff &amp; Location to continue
          </p>
          {selectedStaff && (
            <p className="text-amber-400 text-[10px] mt-2 text-center">
              Demo PIN: {STAFF_LIST.find(s => s.name === selectedStaff)?.pin}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── POS Screen ──────────────────────────────────────────────

function POSScreen({
  staffName, location, cart,
  onAddToCart, onUpdateQty, onRemoveItem, onCheckout, onLogout,
}: {
  staffName: string;
  location: string;
  cart: CartItem[];
  onAddToCart: (p: Product) => void;
  onUpdateQty: (name: string, delta: number) => void;
  onRemoveItem: (name: string) => void;
  onCheckout: () => void;
  onLogout: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activeTab, setActiveTab] = useState<'MENU' | 'CUSTOMERS' | 'ORDERS'>('MENU');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = (() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  })();

  const staffObj = STAFF_LIST.find(s => s.name === staffName);
  const filtered = PRODUCTS.filter(p =>
    p.category === activeCategory &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* App header */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ backgroundColor: '#0e6ba8' }}>
        <div className="flex items-center gap-3">
          <button className="text-white text-xl leading-none">☰</button>
          <div>
            <p className="text-white text-sm font-bold leading-tight">{STORE}</p>
            <p className="text-blue-200 text-[10px]">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white text-xs font-semibold">{staffName}</p>
            <p className="text-blue-200 text-[10px]">{staffObj?.role.toLowerCase()}</p>
          </div>
          <div className="text-right">
            <p className="text-white text-xs font-semibold">{dateStr}</p>
            <p className="text-blue-200 text-[10px]">{time}</p>
          </div>
          <span className="text-white text-sm">📶</span>
          <button onClick={onLogout} className="text-white hover:text-blue-200 transition-colors text-lg">↪</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — products */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">
          {/* Sync row */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-600 font-semibold">📶 Online</span>
              <span className="text-slate-400">Last sync: {time}</span>
            </div>
            <button className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#0e6ba8' }}>
              ↻ Sync Products
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-2 border-b border-slate-100 flex gap-2 shrink-0">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search products or categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400"
              />
            </div>
            <button className="text-white text-xs font-semibold px-4 py-2 rounded-lg" style={{ backgroundColor: '#0e6ba8' }}>
              🔍 Search
            </button>
          </div>

          {/* Categories */}
          <div className="px-4 pt-3 pb-1 shrink-0">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">CATEGORIES</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSearch(''); }}
                  className={`shrink-0 relative rounded-xl overflow-hidden w-[72px] h-14 border-2 transition-all ${
                    activeCategory === cat ? 'border-blue-500 shadow-md' : 'border-transparent'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${CAT_META[cat].grad}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                    <span className="text-xl">{CAT_META[cat].emoji}</span>
                    <span className="text-white text-[8px] font-bold drop-shadow-sm leading-tight text-center px-0.5">{cat}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">{activeCategory}</p>
            {filtered.length === 0 ? (
              <p className="text-slate-400 text-sm text-center mt-8">No products found</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {filtered.map(p => {
                  const isOut = p.stock === null;
                  return (
                    <button
                      key={p.name}
                      onClick={() => { if (!isOut) onAddToCart(p); }}
                      disabled={isOut}
                      className={`relative flex flex-col rounded-lg border border-slate-200 text-left overflow-hidden transition-all ${
                        isOut ? 'opacity-70 cursor-not-allowed' : 'hover:border-blue-300 hover:shadow-sm active:scale-95'
                      }`}
                    >
                      <div className="w-full h-10 bg-slate-50 flex items-center justify-center relative">
                        <span className="text-xl">{p.emoji}</span>
                        {isOut && (
                          <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[7px] font-bold px-1 rounded">Out</span>
                        )}
                      </div>
                      <div className="px-1.5 py-1 flex-1">
                        <p className="text-[9px] font-semibold text-slate-700 uppercase leading-tight line-clamp-2">{p.name}</p>
                        {p.stock !== null && (
                          <p className="text-[8px] text-green-600 font-medium mt-0.5">{p.stock.toLocaleString()}</p>
                        )}
                      </div>
                      <div className="text-white text-[10px] font-bold text-center py-1" style={{ backgroundColor: '#0e6ba8' }}>
                        {fmt(p.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-72 xl:w-80 border-l border-slate-200 flex flex-col shrink-0 bg-white">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 shrink-0">
            {(['MENU', 'CUSTOMERS', 'ORDERS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                  activeTab === tab
                    ? 'text-slate-800 border-b-2 border-slate-800 -mb-px'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'MENU' && (
            <>
              {/* Column headers */}
              {cart.length > 0 && (
                <div className="grid grid-cols-[1fr_24px_54px_54px] gap-1 px-3 py-1.5 border-b border-slate-100 shrink-0">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">PRODUCT</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase text-center">QTY</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase text-right">EACH</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase text-right">TOTAL</span>
                </div>
              )}

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
                    <div className="text-4xl opacity-20 mb-3">🍽️</div>
                    <p className="text-slate-400 text-sm font-semibold">Add a Dish or Drink</p>
                    <p className="text-slate-300 text-xs mt-1">Tap a product to add to the bill</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.name}>
                      <div
                        onClick={() => setSelectedItem(item.name === selectedItem ? null : item.name)}
                        className={`grid grid-cols-[1fr_24px_54px_54px] gap-1 px-3 py-2 cursor-pointer border-b border-slate-100 items-start transition-colors ${
                          selectedItem === item.name ? '' : 'hover:bg-slate-50'
                        }`}
                        style={selectedItem === item.name ? { backgroundColor: '#0e6ba8' } : {}}
                      >
                        <span className={`text-[10px] font-semibold uppercase leading-tight ${selectedItem === item.name ? 'text-white' : 'text-slate-700'}`}>
                          {item.name}
                        </span>
                        <span className={`text-[10px] font-bold text-center ${selectedItem === item.name ? 'text-white' : 'text-slate-700'}`}>
                          {item.qty}
                        </span>
                        <span className={`text-[10px] text-right ${selectedItem === item.name ? 'text-blue-200' : 'text-slate-500'}`}>
                          {fmt(item.price)}
                        </span>
                        <span className={`text-[10px] font-bold text-right ${selectedItem === item.name ? 'text-white' : 'text-slate-700'}`}>
                          {fmt(item.price * item.qty)}
                        </span>
                      </div>
                      {selectedItem === item.name && (
                        <div className="px-3 py-2 border-b border-blue-700" style={{ backgroundColor: '#0e6ba8' }}>
                          <div className="flex justify-between text-[9px] mb-1.5">
                            <span className="text-blue-200 uppercase">EACH</span>
                            <span className="text-white font-bold">{fmt(item.price)}</span>
                            <span className="text-blue-200 uppercase">TOTAL</span>
                            <span className="text-white font-bold">{fmt(item.price * item.qty)}</span>
                          </div>
                          <div className="flex items-center justify-center gap-4 mb-1.5">
                            <button
                              onClick={e => { e.stopPropagation(); onUpdateQty(item.name, -1); if (item.qty <= 1) setSelectedItem(null); }}
                              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg flex items-center justify-center"
                            >−</button>
                            <span className="text-white font-bold text-base w-8 text-center">{item.qty}</span>
                            <button
                              onClick={e => { e.stopPropagation(); onUpdateQty(item.name, 1); }}
                              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg flex items-center justify-center"
                            >+</button>
                          </div>
                          <p className="text-blue-200 text-[9px] text-center uppercase mb-2">QTY</p>
                          <div className="flex gap-1.5">
                            <button className="flex-1 bg-slate-600 hover:bg-slate-500 text-white text-[10px] font-bold py-1.5 rounded">NOTE</button>
                            <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded">DISC</button>
                            <button
                              onClick={e => { e.stopPropagation(); onRemoveItem(item.name); setSelectedItem(null); }}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1.5 rounded"
                            >DEL</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Cart footer */}
              {cart.length > 0 && (
                <div className="border-t border-slate-200 shrink-0">
                  <div className="flex justify-between px-3 py-1.5 border-b border-slate-100 text-[10px] text-slate-500">
                    <span>ITEMS <span className="font-bold text-slate-700">{itemCount}</span></span>
                    <span>SUBTOTAL <span className="font-bold text-slate-700">{fmt(total)}</span></span>
                  </div>
                  <div className="flex justify-between items-center px-3 py-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-700">TOTAL DUE</span>
                    <span className="text-sm font-bold" style={{ color: '#0e6ba8' }}>{fmt(total)}</span>
                  </div>
                  <div className="px-3 py-2 border-b border-slate-100">
                    <button className="w-full py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50">
                      🖨️ PRINT
                    </button>
                  </div>
                  <div className="px-3 pb-3 pt-2 grid grid-cols-3 gap-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-2.5 rounded-lg flex flex-col items-center gap-0.5 transition-colors">
                      <span>🗑️</span>DELETE
                    </button>
                    <button className="text-white text-[10px] font-bold py-2.5 rounded-lg flex flex-col items-center gap-0.5 transition-colors hover:brightness-110" style={{ backgroundColor: '#0e6ba8' }}>
                      <span>⏸️</span>HOLD
                    </button>
                    <button
                      onClick={onCheckout}
                      className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold py-2.5 rounded-lg flex flex-col items-center gap-0.5 transition-colors"
                    >
                      <span>💳</span>PAY
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {activeTab === 'CUSTOMERS' && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 text-sm">No customers found</p>
            </div>
          )}
          {activeTab === 'ORDERS' && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 text-sm">No recent orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Payment Screen ──────────────────────────────────────────

function PaymentScreen({ cart, onConfirm, onCancel }: {
  cart: CartItem[];
  onConfirm: (payments: Record<string, number>) => void;
  onCancel: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [payments, setPayments] = useState<Record<string, number>>({});
  const [activeMethod, setActiveMethod] = useState('moniepoint');
  const [input, setInput] = useState('');

  const totalPaid = Object.values(payments).reduce((s, v) => s + v, 0);
  const stillNeeded = Math.max(0, total - totalPaid);
  const isComplete = totalPaid >= total;
  const activeLabel = PAY_METHODS.find(m => m.id === activeMethod)?.label ?? '';

  function handleKey(k: string) {
    if (k === 'BACK') { setInput(v => v.slice(0, -1)); return; }
    if (k === 'CLEAR') { setInput(''); return; }
    if (k === 'EXACT') { setInput(String(stillNeeded)); return; }
    setInput(v => v + k);
  }

  function addAmount() {
    const amount = parseInt(input || '0');
    if (amount <= 0) return;
    setPayments(prev => ({ ...prev, [activeMethod]: (prev[activeMethod] ?? 0) + amount }));
    setInput('');
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 shrink-0">
        <button onClick={onCancel} className="text-slate-500 hover:text-slate-800 text-base font-bold">←</button>
        <span className="text-slate-800 font-semibold text-sm">Complete Payment</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Blue summary */}
        <div className="w-56 xl:w-64 rounded-2xl p-4 flex flex-col shrink-0 text-white overflow-y-auto" style={{ backgroundColor: '#0e6ba8' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-base font-bold">Complete Payment</p>
              <p className="text-blue-200 text-[10px] mt-0.5">Select payment method and enter amount</p>
            </div>
            <button onClick={onCancel} className="text-white/60 hover:text-white text-xl ml-2">✕</button>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-blue-200 text-[9px] uppercase mb-0.5">TOTAL DUE</p>
              <p className="text-2xl font-bold">{fmt(total)}</p>
            </div>
            <div className="rounded-xl p-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <p className="text-blue-200 text-[9px] uppercase mb-0.5">AMOUNT PAID</p>
              <p className="text-xl font-bold">{fmt(totalPaid)}</p>
            </div>
            {!isComplete && (
              <div className="rounded-xl p-2.5 border border-red-400/40" style={{ backgroundColor: 'rgba(239,68,68,0.2)' }}>
                <p className="text-red-300 text-[9px] uppercase mb-0.5">STILL NEEDED</p>
                <p className="text-xl font-bold text-red-200">{fmt(stillNeeded)}</p>
              </div>
            )}
          </div>
          {Object.keys(payments).length > 0 && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-blue-200 text-[9px] uppercase">PAYMENT BREAKDOWN</p>
                <button onClick={() => setPayments({})} className="text-red-300 text-[9px] hover:text-red-200">Clear All</button>
              </div>
              {Object.entries(payments).map(([method, amount]) => (
                <div key={method} className="flex justify-between text-[11px] py-0.5">
                  <span className="text-blue-200">{PAY_METHODS.find(m => m.id === method)?.label}</span>
                  <span className="font-bold">{fmt(amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Methods + keypad */}
        <div className="flex flex-1 gap-4 overflow-hidden min-w-0">
          {/* Methods */}
          <div className="flex flex-col gap-2 shrink-0">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">PAYMENT METHODS</p>
            {PAY_METHODS.filter(m => m.id !== 'tips').map(m => (
              <button
                key={m.id}
                onClick={() => { setActiveMethod(m.id); setInput(''); }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left min-w-[140px]"
                style={activeMethod === m.id
                  ? { backgroundColor: '#0e6ba8', color: '#fff', borderColor: '#0e6ba8' }
                  : { backgroundColor: '#fff', color: '#374151', borderColor: '#e5e7eb' }
                }
              >
                {m.label}
                <span className="block text-[10px] opacity-60">{payments[m.id] ? fmt(payments[m.id]) : '₦0.00'}</span>
              </button>
            ))}
            <button
              onClick={() => { setActiveMethod('tips'); setInput(''); }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left"
              style={activeMethod === 'tips'
                ? { backgroundColor: '#0e6ba8', color: '#fff', borderColor: '#0e6ba8' }
                : { backgroundColor: '#fff', color: '#374151', borderColor: '#e5e7eb' }
              }
            >
              STAFF TIPS
              <span className="block text-[10px] opacity-60">{payments['tips'] ? fmt(payments['tips']) : '₦0.00'}</span>
            </button>
          </div>

          {/* Keypad */}
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide mb-2">KEYPAD</p>
            <div className="grid grid-cols-3 gap-1.5 mb-2 shrink-0">
              {['1','2','3','4','5','6','7','8','9'].map(k => (
                <button key={k} onClick={() => handleKey(k)} className="h-10 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold text-sm hover:bg-slate-50 active:scale-95 transition-all">
                  {k}
                </button>
              ))}
              <button onClick={() => handleKey('0')} className="h-10 col-span-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold text-sm hover:bg-slate-50 active:scale-95 transition-all">0</button>
              <button onClick={() => handleKey('.')} className="h-10 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold text-sm hover:bg-slate-50 active:scale-95 transition-all">.</button>
            </div>
            {/* Input display */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 mb-2 shrink-0">
              <p className="text-slate-400 text-[9px] uppercase mb-0.5">ENTERING FOR: {activeLabel.toUpperCase()}</p>
              <p className="font-bold text-xl" style={{ color: '#0e6ba8' }}>{input ? fmt(parseInt(input)) : '₦0.00'}</p>
            </div>
            <div className="flex gap-1.5 mb-1.5 shrink-0">
              <button onClick={() => handleKey('EXACT')} className="flex-1 h-9 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50">EXACT</button>
              <button onClick={() => handleKey('BACK')} className="flex-1 h-9 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-200">← BACK</button>
            </div>
            <button onClick={() => handleKey('CLEAR')} className="w-full h-9 bg-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-300 mb-1.5 shrink-0">CLEAR</button>
            <button onClick={addAmount} className="w-full h-10 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xs font-bold transition-colors shrink-0">+ ADD AMOUNT</button>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-3 px-4 pb-4 pt-2 border-t border-slate-100 shrink-0">
        <button
          onClick={onCancel}
          className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
        >
          ✕ Cancel
        </button>
        <button
          onClick={() => isComplete && onConfirm(payments)}
          disabled={!isComplete}
          className="flex-1 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
          style={isComplete
            ? { backgroundColor: '#0e6ba8', color: '#fff' }
            : { backgroundColor: '#e2e8f0', color: '#94a3b8' }
          }
        >
          ✓ Confirm
        </button>
      </div>
    </div>
  );
}

// ─── Receipt Screen ──────────────────────────────────────────

function ReceiptScreen({ staffName, cart, payments, onNewSale }: {
  staffName: string;
  cart: CartItem[];
  payments: Record<string, number>;
  onNewSale: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const now = new Date();
  const receiptNo = '#' + Math.floor(Math.random() * 90000 + 10000);

  return (
    <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto bg-slate-100 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-4">
          <div className="px-6 py-5 text-center" style={{ backgroundColor: '#0e6ba8' }}>
            <p className="text-white text-xl font-extrabold">{STORE}</p>
            <p className="text-blue-200 text-xs mt-0.5">Sales Receipt</p>
          </div>
          <div className="px-5 py-4 font-mono text-xs text-slate-600 space-y-3">
            <div className="flex justify-between"><span className="text-slate-400">Receipt</span><span className="font-bold">{receiptNo}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Date</span><span>{now.toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Cashier</span><span>{staffName}</span></div>
            <div className="border-t border-dashed border-slate-200 pt-3 space-y-1">
              {cart.map(item => (
                <div key={item.name} className="flex justify-between">
                  <span className="flex-1 truncate uppercase text-[10px]">{item.name}</span>
                  <span className="ml-2 shrink-0 text-[10px]">{item.qty} × {fmt(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className="flex justify-between font-bold text-slate-900 text-sm"><span>TOTAL</span><span>{fmt(total)}</span></div>
              {Object.entries(payments).map(([method, amount]) => (
                <div key={method} className="flex justify-between text-slate-500 mt-1">
                  <span>{PAY_METHODS.find(m => m.id === method)?.label}</span>
                  <span>{fmt(amount)}</span>
                </div>
              ))}
            </div>
            <div className="text-center pt-2 text-slate-400 text-[10px]">
              ✓ Transaction Approved<br />Thank you for your purchase!
            </div>
          </div>
        </div>
        <button
          onClick={onNewSale}
          className="w-full text-white font-bold py-4 rounded-xl text-base transition-colors hover:brightness-110"
          style={{ backgroundColor: '#0e6ba8' }}
        >
          + New Sale
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────

export default function POSDemoPage() {
  const [screen, setScreen] = useState<Screen>('login');
  const [staffName, setStaffName] = useState('');
  const [location, setLocation] = useState('Hotel');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payments, setPayments] = useState<Record<string, number>>({});

  function addToCart(p: Product) {
    setCart(prev => {
      const ex = prev.find(i => i.name === p.name);
      if (ex) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: p.name, price: p.price, qty: 1 }];
    });
  }

  function updateQty(name: string, delta: number) {
    setCart(prev =>
      prev.map(i => i.name === name ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0)
    );
  }

  function removeItem(name: string) {
    setCart(prev => prev.filter(i => i.name !== name));
  }

  return (
    <div className="fixed inset-0 flex flex-col">
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

      {/* App */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {screen === 'login' && (
          <LoginScreen onLogin={(staff, loc) => { setStaffName(staff); setLocation(loc); setScreen('pos'); }} />
        )}
        {screen === 'pos' && (
          <POSScreen
            staffName={staffName}
            location={location}
            cart={cart}
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
            onCheckout={() => cart.length > 0 && setScreen('payment')}
            onLogout={() => { setCart([]); setScreen('login'); }}
          />
        )}
        {screen === 'payment' && (
          <PaymentScreen
            cart={cart}
            onConfirm={paidWith => { setPayments(paidWith); setScreen('receipt'); }}
            onCancel={() => setScreen('pos')}
          />
        )}
        {screen === 'receipt' && (
          <ReceiptScreen
            staffName={staffName}
            cart={cart}
            payments={payments}
            onNewSale={() => { setCart([]); setPayments({}); setScreen('pos'); }}
          />
        )}
      </div>
    </div>
  );
}
