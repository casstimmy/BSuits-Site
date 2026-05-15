'use client';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  POS Demo â€” layout strictly follows the reference app screenshots
//  Screen 1: Login  (blue bg, left content panel + right passcode card)
//  Screen 2/3: POS   (blue header + left products + right cart panel)
//  Screen 4: Payment (same header + left payment card + same right cart)
//  Receipt:          (centred receipt slip)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

import Image from 'next/image';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  ClipboardList,
  CreditCard,
  LogOut,
  Menu as MenuIcon,
  Minus,
  Pause,
  Printer,
  RefreshCcw,
  Search,
  Trash2,
  UtensilsCrossed,
  Wifi,
  X,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Screen = 'login' | 'pos' | 'payment' | 'receipt';

interface CartItem { name: string; price: number; qty: number; }
interface Product  { name: string; price: number; stock: number | null; emoji: string; category: string; }

// â”€â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STORE_NAME = 'Demo Business';
const LOCATIONS  = ['Warehouse', 'Hotel'];
const STORE_LOGO = '/images/logo.png';
const PRODUCT_PLACEHOLDER = '/images/product-placeholder.svg';

const STAFF = [
  { name: 'Jane Doe', role: 'Admin',        initial: 'J', pin: '1234' },
  { name: 'John Doe', role: 'Junior Staff', initial: 'J', pin: '5678' },
];

const UNAVAILABLE_PRODUCTS = new Set([
  'PORRIDE BEANS',
  'WHITE RICE & TURKEY',
  'FEARLESS ENERGY DRINK 500ML (Pack)',
  'GRILLED FISH',
  'STANDARD ROOM (1 NIGHT)',
  'SCOTCH EGG',
]);

function getDemoStock(index: number) {
  return 8 + (index % 7) * 4;
}

const CATEGORIES = ['Breakfast','Drinks','Extra','Pasta','Pastry','Pepper Soup','Protein','Rooms','Soup'];

// Category gradients paired with ASCII tile marks to avoid encoding issues.
const CAT_STYLE: Record<string, { grad: string; mark: string }> = {
  'Breakfast':   { grad: 'from-orange-500 to-yellow-400',  mark: 'BRF' },
  'Drinks':      { grad: 'from-amber-900 to-amber-600',    mark: 'DRK' },
  'Extra':       { grad: 'from-slate-600 to-slate-400',    mark: 'EXT' },
  'Pasta':       { grad: 'from-red-700 to-orange-500',     mark: 'PAS' },
  'Pastry':      { grad: 'from-yellow-600 to-amber-400',   mark: 'PTY' },
  'Pepper Soup': { grad: 'from-red-800 to-red-500',        mark: 'PPS' },
  'Protein':     { grad: 'from-orange-700 to-orange-400',  mark: 'PRO' },
  'Rooms':       { grad: 'from-blue-900 to-blue-600',      mark: 'ROM' },
  'Soup':        { grad: 'from-amber-700 to-yellow-500',   mark: 'SUP' },
};

const PRODUCTS: Product[] = [
  // Breakfast (all out of stock â€” mirrors the reference app)
  { name: 'BEVERAGE (TEA, CHOCOLATE OR COFFEE)',   price: 1000, stock: null, category: 'Breakfast', emoji: 'â˜•' },
  { name: 'BEVERAGE, BREAD AND COMPLETE (COMBO)',  price: 2000, stock: null, category: 'Breakfast', emoji: 'ðŸž' },
  { name: 'FRIED PLAINTAIN',                       price: 2000, stock: null, category: 'Breakfast', emoji: 'ðŸŒ' },
  { name: 'PORRIDE BEANS',                         price: 1500, stock: null, category: 'Breakfast', emoji: 'ðŸ«˜' },
  { name: 'BEANS & PLANTAIN',                      price: 2500, stock: null, category: 'Breakfast', emoji: 'ðŸ«˜' },
  { name: 'PORRIDE BEANS WITH PLANTAIN & EGG',     price: 4000, stock: null, category: 'Breakfast', emoji: 'ðŸ¥š' },
  { name: 'YAM PORRIDGE',                          price: 2500, stock: null, category: 'Breakfast', emoji: 'ðŸ¥”' },
  { name: 'PORRIDGE BEANS WITH YAM',               price: 3500, stock: null, category: 'Breakfast', emoji: 'ðŸ«˜' },
  { name: 'YAM WITH E SAUCE (2PCS)',               price: 4000, stock: null, category: 'Breakfast', emoji: 'ðŸ¥”' },
  { name: 'SALAD (COLESLAW)',                      price: 1000, stock: null, category: 'Breakfast', emoji: 'ðŸ¥—' },
  { name: 'EXTRA BEEF (2PCS)',                     price: 2000, stock: null, category: 'Breakfast', emoji: 'ðŸ¥©' },
  { name: 'WHITE RICE & BEEF',                     price: 4000, stock: null, category: 'Breakfast', emoji: 'ðŸš' },
  { name: 'WHITE RICE',                            price: 2000, stock: null, category: 'Breakfast', emoji: 'ðŸš' },
  { name: 'WHITE RICE & CHICKEN',                  price: 6000, stock: null, category: 'Breakfast', emoji: 'ðŸš' },
  { name: 'WHITE RICE & TURKEY',                   price: 6000, stock: null, category: 'Breakfast', emoji: 'ðŸš' },
  { name: 'WHITE RICE & GOATMEAT',                 price: 5000, stock: null, category: 'Breakfast', emoji: 'ðŸš' },
  { name: 'WHITE RICE & FISH (CROCKER)',           price: 4000, stock: null, category: 'Breakfast', emoji: 'ðŸŸ' },
  { name: 'FRIED RICE/JOLLOF RICE',               price: 2000, stock: null, category: 'Breakfast', emoji: 'ðŸ›' },
  { name: 'FRIED RICE/JOLLOF RICE & BEEF',        price: 6500, stock: null, category: 'Breakfast', emoji: 'ðŸ›' },
  { name: 'FRIED RICE/JOLLOF RICE & CHICKEN',     price: 6500, stock: null, category: 'Breakfast', emoji: 'ðŸ›' },
  // Drinks (have stock numbers)
  { name: 'Cway bottle water (Pack)',                      price:  1690, stock:  2992, category: 'Drinks', emoji: 'ðŸ’§' },
  { name: 'Cway bottle water (Unit)',                      price:   141, stock: 35904, category: 'Drinks', emoji: 'ðŸ’§' },
  { name: 'Action Bitters 20cl (Pack)',                    price: 16000, stock:    48, category: 'Drinks', emoji: 'ðŸ¶' },
  { name: 'Action Bitters 20cl (Unit)',                    price:   900, stock:  1152, category: 'Drinks', emoji: 'ðŸ¶' },
  { name: 'FEARLESS ENERGY DRINK 500ML (Pack)',            price:  4450, stock:   142, category: 'Drinks', emoji: 'âš¡' },
  { name: 'FEARLESS ENERGY DRINK 500ML (Unit)',            price:   500, stock:  1704, category: 'Drinks', emoji: 'âš¡' },
  { name: 'BIGI DRINKS 35cl (Pack)',                       price:  2350, stock:   303, category: 'Drinks', emoji: 'ðŸ¥¤' },
  { name: 'BIGI DRINKS 35cl (Unit)',                       price:   250, stock:  3636, category: 'Drinks', emoji: 'ðŸ¥¤' },
  { name: 'CAPRI SUN FRUIT DRINK 200ML x40 (Pack)',        price: 10368, stock:    40, category: 'Drinks', emoji: 'ðŸ§ƒ' },
  { name: 'CAPRI SUN FRUIT DRINK 200ML (Unit)',            price:   500, stock:  1600, category: 'Drinks', emoji: 'ðŸ§ƒ' },
  { name: 'HOLLANDIA YOGHURT 1 LTR (Pack)',                price: 15308, stock:    39, category: 'Drinks', emoji: 'ðŸ¥›' },
  { name: 'HOLLANDIA YOGHURT 1 LTR (Unit)',                price:  1800, stock:   390, category: 'Drinks', emoji: 'ðŸ¥›' },
  // Protein
  { name: 'PEPPER CHICKEN',   price: 5000, stock: null, category: 'Protein', emoji: 'ðŸ—' },
  { name: 'GRILLED FISH',     price: 3500, stock: null, category: 'Protein', emoji: 'ðŸŸ' },
  { name: 'ASSORTED MEAT',    price: 2000, stock: null, category: 'Protein', emoji: 'ðŸ¥©' },
  { name: 'POMO (COWSKIN)',   price: 1500, stock: null, category: 'Protein', emoji: 'ðŸ¥©' },
  // Rooms
  { name: 'STANDARD ROOM (1 NIGHT)', price: 25000, stock: 5, category: 'Rooms', emoji: 'ðŸ›ï¸' },
  { name: 'DELUXE ROOM (1 NIGHT)',   price: 40000, stock: 3, category: 'Rooms', emoji: 'ðŸ¨' },
  // Soup
  { name: 'EGUSI SOUP',                   price: 2500, stock: null, category: 'Soup', emoji: 'ðŸ²' },
  { name: 'OFE ONUGBU (BITTER LEAF SOUP)', price: 2500, stock: null, category: 'Soup', emoji: 'ðŸ²' },
  { name: 'OFE AKWU (PALM NUT SOUP)',     price: 2000, stock: null, category: 'Soup', emoji: 'ðŸ²' },
  // Pepper Soup
  { name: 'ASSORTED PEPPER SOUP', price: 3000, stock: null, category: 'Pepper Soup', emoji: 'ðŸ²' },
  { name: 'CATFISH PEPPER SOUP',  price: 4000, stock: null, category: 'Pepper Soup', emoji: 'ðŸŸ' },
  // Pasta
  { name: 'SPAGHETTI BOLOGNESE',      price: 3500, stock: null, category: 'Pasta', emoji: 'ðŸ' },
  { name: 'PASTA WITH CHICKEN SAUCE', price: 4000, stock: null, category: 'Pasta', emoji: 'ðŸ' },
  // Pastry
  { name: 'MEAT PIE',   price: 500, stock: null, category: 'Pastry', emoji: 'ðŸ¥§' },
  { name: 'FISH ROLL',  price: 300, stock: null, category: 'Pastry', emoji: 'ðŸ¥' },
  { name: 'SCOTCH EGG', price: 600, stock: null, category: 'Pastry', emoji: 'ðŸ¥š' },
  // Extra
  { name: 'EXTRA STEW',    price: 500, stock: null, category: 'Extra', emoji: 'ðŸ²' },
  { name: 'EXTRA EGG',     price: 300, stock: null, category: 'Extra', emoji: 'ðŸ¥š' },
  { name: 'EXTRA PLANTAIN',price: 500, stock: null, category: 'Extra', emoji: 'ðŸŒ' },
].map((product, index) => {
  if (UNAVAILABLE_PRODUCTS.has(product.name)) {
    return { ...product, stock: null };
  }

  return { ...product, stock: getDemoStock(index) };
});

const PAY_METHODS = [
  { id: 'moniepoint', label: 'Moniepoint Pos' },
  { id: 'cash',       label: 'Cash'           },
  { id: 'transfer',   label: 'Bank Transfer'  },
  { id: 'tips',       label: 'Staff Tips'     },
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function fmt(n: number) { return 'N' + n.toLocaleString(); }
function fmtFixed(n: number) {
  const s = n.toFixed(2);
  const parts = s.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return 'N' + parts.join('.');
}

// â”€â”€â”€ Shared: App Header Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function AppHeader({
  staffName, role, location, onLogout,
}: {
  staffName: string; role: string; location: string; onLogout: () => void;
}) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2,'0')}:` +
        `${String(d.getMinutes()).padStart(2,'0')}:` +
        `${String(d.getSeconds()).padStart(2,'0')}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const d = new Date();
  const dateStr =
    `${String(d.getDate()).padStart(2,'0')}/` +
    `${String(d.getMonth()+1).padStart(2,'0')}/` +
    d.getFullYear();

  return (
    <div
      className="flex items-center justify-between border-b-[3px] border-[#0b5d8f] px-4 py-2.5 shrink-0"
      style={{ backgroundColor: '#0e6ba8' }}
    >
      <div className="flex items-center gap-3">
        <button className="text-white transition-colors hover:text-blue-200" aria-label="Open navigation">
          <MenuIcon className="h-5 w-5" />
        </button>
        <div>
          <p className="text-white text-sm font-bold leading-tight">{STORE_NAME}</p>
          <p className="text-blue-200 text-[11px]">{location}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-white text-xs font-semibold">{staffName}</p>
          <p className="text-blue-200 text-[10px]">{role.toLowerCase()}</p>
        </div>
        <div className="text-right">
          <p className="text-white text-xs font-semibold">{dateStr}</p>
          <p className="text-blue-200 text-[10px]">{time}</p>
        </div>
        <Wifi className="h-4 w-4 text-white" />
        <button
          onClick={onLogout}
          className="text-white transition-colors hover:text-blue-200"
          title="Log out"
          aria-label="Log out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ Shared: Right Cart Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CartPanel({
  cart, selectedItem, onSelectItem, onUpdateQty, onRemoveItem, onCheckout,
}: {
  cart: CartItem[];
  selectedItem: string | null;
  onSelectItem: (name: string | null) => void;
  onUpdateQty:  (name: string, delta: number) => void;
  onRemoveItem: (name: string) => void;
  onCheckout:   () => void;
}) {
  const [activeTab, setActiveTab] = useState<'MENU'|'CUSTOMERS'|'ORDERS'>('MENU');
  const total     = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="w-[34%] min-w-[360px] max-w-[520px] border-l border-slate-200 flex flex-col shrink-0 bg-white">

      {/* Tab bar */}
      <div className="border-b border-slate-200 px-3 py-3 shrink-0">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-200 p-1">
          {(['MENU','CUSTOMERS','ORDERS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-wide transition-all ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'MENU' && (
        <>
          {/* Column headers */}
          {cart.length > 0 && (
            <div className="grid grid-cols-[1fr_20px_52px_52px] gap-0.5 px-3 py-1.5 border-b border-slate-100 shrink-0">
              <span className="text-[9px] font-bold text-slate-500 uppercase">PRODUCT</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase text-center">QTY</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase text-right">EACH</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase text-right">TOTAL</span>
            </div>
          )}

          {/* Item list */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10">
                <UtensilsCrossed className="mb-3 h-12 w-12 text-slate-200" />
                <p className="text-slate-500 text-sm font-semibold">Add a Dish or Drink</p>
                <p className="text-slate-400 text-xs mt-1">Tap a product to add to the bill</p>
              </div>
            ) : cart.map(item => {
              const isSelected = selectedItem === item.name;
              return (
                <div key={item.name}>
                  {/* Row */}
                  <div
                    onClick={() => onSelectItem(isSelected ? null : item.name)}
                    className={`grid grid-cols-[1fr_20px_52px_52px] gap-0.5 px-3 py-2.5 border-b border-slate-100 cursor-pointer items-start transition-colors ${
                      isSelected ? '' : 'hover:bg-slate-50'
                    }`}
                    style={isSelected ? { backgroundColor: '#0e6ba8' } : {}}
                  >
                    <span className={`text-[10px] font-semibold uppercase leading-tight ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                      {item.name}
                    </span>
                    <span className={`text-[10px] font-bold text-center ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                      {item.qty}
                    </span>
                    <span className={`text-[10px] text-right ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                      {fmt(item.price)}
                    </span>
                    <span className={`text-[10px] font-bold text-right ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {fmt(item.price * item.qty)}
                    </span>
                  </div>

                  {/* Expanded inline controls */}
                  {isSelected && (
                    <div className="border-b border-white/20 px-3 pb-2 pt-1" style={{ backgroundColor: '#0e6ba8' }}>
                      <div className="flex justify-between text-[9px] mb-2">
                        <div>
                          <span className="text-blue-300 uppercase block">EACH</span>
                          <span className="text-white font-bold">{fmt(item.price)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-blue-300 uppercase block">TOTAL</span>
                          <span className="text-white font-bold">{fmt(item.price * item.qty)}</span>
                        </div>
                      </div>
                      {/* QTY stepper */}
                      <div className="flex items-center justify-center gap-3 mb-1">
                        <button
                          onClick={e => { e.stopPropagation(); onUpdateQty(item.name, -1); if (item.qty <= 1) onSelectItem(null); }}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-white font-bold text-base w-8 text-center">{item.qty}</span>
                        <button
                          onClick={e => { e.stopPropagation(); onUpdateQty(item.name, 1); }}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg flex items-center justify-center"
                        >+</button>
                      </div>
                      <p className="text-blue-300 text-[9px] uppercase text-center mb-2">QTY</p>
                      {/* NOTE / DISC / DEL */}
                      <div className="flex gap-1.5">
                        <button className="flex-1 rounded py-1.5 text-[9px] font-bold uppercase text-white bg-slate-600/80 hover:bg-slate-500/80">NOTE</button>
                        <button className="flex-1 rounded py-1.5 text-[9px] font-bold uppercase text-white bg-blue-700/60 hover:bg-blue-700/80">DISC</button>
                        <button
                          onClick={e => { e.stopPropagation(); onRemoveItem(item.name); onSelectItem(null); }}
                          className="flex-1 rounded py-1.5 text-[9px] font-bold uppercase text-white bg-red-500/90 hover:bg-red-500"
                        >DEL</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer â€” only visible when cart has items */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 shrink-0">
              {/* Chevron separator */}
              <div className="flex justify-center py-1.5 border-b border-slate-100">
                <ChevronUp className="h-4 w-4 text-slate-400" />
              </div>
              {/* Subtotal row */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 text-[11px]">
                <span className="text-slate-500">
                  ITEMS <span className="font-bold text-slate-700">{itemCount}</span>
                </span>
                <span className="text-slate-500">
                  SUBTOTAL <span className="font-bold text-slate-700">{fmt(total)}</span>
                </span>
              </div>
              {/* Total due */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800">TOTAL DUE</span>
                <span className="text-sm font-bold" style={{ color: '#0e6ba8' }}>{fmt(total)}</span>
              </div>
              {/* Print */}
              <div className="px-3 py-2 border-b border-slate-100">
                <button className="w-full py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors">
                  <Printer className="h-4 w-4" />
                  PRINT
                </button>
              </div>
              {/* DELETE / HOLD / PAY */}
              <div className="px-3 py-2.5 grid grid-cols-3 gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-3 rounded-lg flex flex-col items-center gap-0.5 transition-colors">
                  <Trash2 className="h-4 w-4" />
                  DELETE
                </button>
                <button className="text-white text-[10px] font-bold py-3 rounded-lg flex flex-col items-center gap-0.5 transition-colors hover:brightness-110" style={{ backgroundColor: '#0e6ba8' }}>
                  <Pause className="h-4 w-4" />
                  HOLD
                </button>
                <button
                  onClick={onCheckout}
                  className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold py-3 rounded-lg flex flex-col items-center gap-0.5 transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  PAY
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab !== 'MENU' && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-sm">
            {activeTab === 'CUSTOMERS' ? 'No customers found' : 'No recent orders'}
          </p>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Screen 1: Login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LoginScreen({ onLogin }: { onLogin: (staff: string, location: string) => void }) {
  const [selectedStaff,    setSelectedStaff]    = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('Warehouse');
  const [pin,   setPin]   = useState('');
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [clock,   setClock]   = useState('');

  useEffect(() => {
    const tick = () => {
      const d  = new Date();
      const dd = String(d.getDate()).padStart(2,'0');
      const mm = String(d.getMonth()+1).padStart(2,'0');
      const hh = String(d.getHours()).padStart(2,'0');
      const mi = String(d.getMinutes()).padStart(2,'0');
      setClock(`${dd}/${mm}/${d.getFullYear()} - ${hh}:${mi}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function handlePin(digit: string) {
    if (digit === 'BACKSPACE') { setPin(p => p.slice(0,-1)); setError(''); return; }
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === 4) {
      const s = STAFF.find(x => x.name === selectedStaff);
      setTimeout(() => {
        if (!selectedStaff) { setError('Select a staff member first'); setPin(''); return; }
        if (s && next === s.pin) { onLogin(selectedStaff, selectedLocation); }
        else { setError('Incorrect passcode'); setPin(''); }
      }, 150);
    }
  }

  const canLogin = !!selectedStaff && pin.length === 4;

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0e6ba8' }}>

      {/* â”€â”€ Top bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="grid grid-cols-[1fr_auto_1fr] items-center border-b-[3px] border-[#083d5e] px-4 sm:px-5 py-2.5 shrink-0"
        style={{ backgroundColor: '#0a4d7a' }}
      >
        <div className="h-10 w-[104px] justify-self-start" aria-hidden="true" />
        <div className="flex flex-col items-center justify-self-center">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white shadow-lg ring-2 ring-white/20">
            <Image
              src={STORE_LOGO}
              alt="BizSuits store logo"
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </div>
          <span className="text-white text-[10px] font-medium mt-0.5">TILL 1 - {clock}</span>
        </div>
        <div className="justify-self-end">
          <button className="inline-flex items-center gap-1.5 border-2 border-white/70 rounded-full px-4 py-1.5 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
            <CircleHelp className="h-4 w-4" />
            HELP
          </button>
        </div>
      </div>

      {/* â”€â”€ Body: left content + right passcode card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

        {/* Left content */}
        <div className="min-w-0 flex-1 overflow-y-auto px-4 py-4 md:px-5 md:py-5">
          <div className="flex flex-col gap-4">

          {/* Pending-transactions card */}
          <div className="rounded-xl p-4 border border-white/10" style={{ backgroundColor: '#083d5e' }}>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="h-4 w-4 text-amber-200" />
              <span className="text-white text-xs font-bold uppercase tracking-wide">HAS PENDING TRANSACTIONS</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                <Wifi className="h-3.5 w-3.5" />
                ONLINE
              </span>
              <span className="text-blue-300 text-xs">2 locations cached</span>
            </div>
            <button
              onClick={() => { setSyncing(true); setTimeout(() => setSyncing(false), 1500); }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCcw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Data from Cloud'}
            </button>
            <p className="text-center text-[11px] text-blue-400 mt-2">Last synced: 6 mins ago</p>
          </div>

          {/* Select Store */}
          <div className="max-w-[470px]">
            <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">SELECT STORE</p>
            <div
              className="rounded-lg py-2.5 px-4 text-center text-white text-sm font-medium border border-white/20"
              style={{ backgroundColor: '#083d5e' }}
            >
              {STORE_NAME}
            </div>
          </div>

          {/* Select Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                <ChevronDown className="h-3 w-3" />
                SELECT LOCATION
              </p>
              <button className="flex items-center gap-1 text-blue-300 text-[10px] hover:text-white transition-colors">
                <RefreshCcw className="h-3 w-3" />
                Refresh
              </button>
            </div>
            <div className="flex gap-2">
              {LOCATIONS.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all border ${
                    selectedLocation === loc
                      ? 'bg-amber-500 text-amber-900 border-amber-400'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                  style={selectedLocation !== loc ? { backgroundColor: '#083d5e' } : {}}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Select Staff */}
          <div>
            <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-2">SELECT STAFF</p>
            <div className="flex gap-3 flex-wrap">
              {STAFF.map(s => (
                <button
                  key={s.name}
                  onClick={() => { setSelectedStaff(s.name); setPin(''); setError(''); }}
                  className={`flex w-[184px] flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                    selectedStaff === s.name ? 'border-amber-400' : 'border-white/15 hover:border-white/30'
                  }`}
                  style={{ backgroundColor: '#083d5e' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl border-2"
                    style={{ backgroundColor: '#1a6a9a', borderColor: '#2a8aba' }}
                  >
                    {s.initial}
                  </div>
                  <span className="text-white text-xs font-bold">{s.name}</span>
                  <span className="text-blue-300 text-[10px]">{s.role}</span>
                </button>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Right: passcode card */}
        <div
          className="flex items-center justify-center border-t px-4 py-8 lg:w-[38%] lg:min-w-[360px] lg:border-l lg:border-t-0 lg:px-8"
          style={{ backgroundColor: 'rgba(6, 61, 94, 0.24)', borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <div
            className="w-full max-w-[325px] shrink-0 rounded-[22px] p-5 flex flex-col items-center border shadow-2xl"
            style={{ backgroundColor: 'rgba(13, 95, 145, 0.45)', borderColor: 'rgba(255,255,255,0.45)' }}
          >
            <p className="text-white text-[14px] font-bold tracking-wide text-center mb-6">
              PLEASE ENTER YOUR PASSCODE
            </p>

            {/* Dots */}
            <div className="flex gap-3 mb-4">
              {[0,1,2,3].map(i => (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-full transition-all ${
                    pin.length > i ? 'bg-[#8db7c8]' : 'bg-[#8db7c8]/45'
                  }`}
                />
              ))}
            </div>

            {error && <p className="text-red-300 text-xs text-center mb-2">{error}</p>}

            <div className="h-4" />

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2.5 w-full mb-3">
              {['1','2','3','4','5','6','7','8','9'].map(k => (
                <button
                  key={k}
                  onClick={() => handlePin(k)}
                  className="h-12 rounded-xl text-white font-semibold text-xl border border-white/55 hover:bg-white/10 active:scale-95 transition-all"
                  style={{ backgroundColor: 'transparent' }}
                >
                  {k}
                </button>
              ))}
              <button
                onClick={() => handlePin('0')}
                className="col-span-2 h-12 rounded-xl text-white font-semibold text-xl border border-white/55 hover:bg-white/10 active:scale-95 transition-all"
                style={{ backgroundColor: 'transparent' }}
              >
                0
              </button>
              <button
                onClick={() => handlePin('BACKSPACE')}
                className="h-12 rounded-xl text-white font-semibold text-sm border border-white/55 hover:bg-white/10 active:scale-95 transition-all"
                style={{ backgroundColor: 'transparent' }}
              >
                DEL
              </button>
            </div>

            {/* LOGIN */}
            <button
              onClick={() => canLogin && onLogin(selectedStaff!, selectedLocation)}
              disabled={!canLogin}
              className="w-full py-3 rounded-xl text-sm font-bold tracking-wide mb-3 transition-all shadow-sm"
              style={{
                backgroundColor: canLogin ? '#f2b957' : '#b8becb',
                color: canLogin ? '#083d5e' : '#4f5d6f',
              }}
            >
              LOGIN
            </button>

            <p className="text-blue-200/80 text-[10px] text-center leading-relaxed">
              Enter 4-digit passcode and select a Staff &amp; Location to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Screen 2 / 3: POS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function POSScreen({
  staffName, location, cart, selectedItem,
  onAddToCart, onSelectItem, onUpdateQty, onRemoveItem, onCheckout, onLogout,
}: {
  staffName: string; location: string; cart: CartItem[]; selectedItem: string | null;
  onAddToCart:  (p: Product) => void;
  onSelectItem: (name: string | null) => void;
  onUpdateQty:  (name: string, delta: number) => void;
  onRemoveItem: (name: string) => void;
  onCheckout:   () => void;
  onLogout:     () => void;
}) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState('');
  const staffRole = STAFF.find(s => s.name === staffName)?.role ?? 'Staff';
  const filtered  = PRODUCTS.filter(p =>
    p.category === activeCategory &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <AppHeader staffName={staffName} role={staffRole} location={location} onLogout={onLogout} />

      <div className="flex flex-1 overflow-hidden">

        {/* â”€â”€ Left: product browser â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Sync bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 shrink-0">
            <span className="text-green-600 text-xs font-semibold">
              <Wifi className="mr-1 inline h-3.5 w-3.5" />
              Online{' '}
              <span className="text-slate-400 font-normal">Last sync: 11:27:31 PM</span>
            </span>
            <button
              className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors hover:brightness-110"
              style={{ backgroundColor: '#0e6ba8' }}
            >
              <RefreshCcw className="h-4 w-4" />
              Sync Products
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-2.5 border-b border-slate-100 flex gap-2 shrink-0">
            <div className="flex-1 flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <Search className="mx-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 py-2 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              className="text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:brightness-110 transition-colors"
              style={{ backgroundColor: '#0e6ba8' }}
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          {/* Category tiles â€” photo-style rectangles */}
          <div className="px-4 pt-3 pb-2 shrink-0">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">CATEGORIES</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              {CATEGORIES.map(cat => {
                const s = CAT_STYLE[cat];
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSearch(''); }}
                    className={`relative w-full rounded-2xl overflow-hidden border-2 transition-all ${
                      active ? 'border-sky-400 shadow-md scale-[1.02]' : 'border-transparent hover:brightness-105'
                    }`}
                    style={{ height: 96 }}
                  >
                    {/* Gradient "photo" background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.grad}`} />
                    {/* Highlight shimmer to fake a photo texture */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{ backgroundImage: 'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.5) 0%, transparent 52%), linear-gradient(180deg, transparent 32%, rgba(0,0,0,0.22) 100%)' }}
                    />
                    {/* Central tile mark */}
                    <div className="absolute inset-0 flex items-center justify-center pb-4">
                      <span className="font-black tracking-[0.14em] text-slate-900/80" style={{ fontSize: 26, lineHeight: 1 }}>{s.mark}</span>
                    </div>
                    {/* Label band at bottom (dark overlay) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/35 px-2 py-1.5">
                      <span className="text-white text-[10px] font-bold block text-center leading-none">{cat}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">{activeCategory}</p>
            {filtered.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">No products found</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {filtered.map(p => {
                  const isOut  = p.stock === null;
                  const inCart = cart.find(c => c.name === p.name);
                  const style = CAT_STYLE[p.category] ?? CAT_STYLE.Breakfast;
                  return (
                    <button
                      key={p.name}
                      onClick={() => !isOut && onAddToCart(p)}
                      disabled={isOut}
                      className={`relative flex min-h-[188px] flex-col overflow-hidden rounded-lg border bg-white text-left transition-all ${
                        isOut
                          ? 'border-slate-200 cursor-not-allowed opacity-80'
                          : 'border-slate-200 hover:border-blue-300 hover:shadow active:scale-95'
                      } ${inCart ? 'ring-2 ring-blue-400' : ''}`}
                    >
                      {/* Tile image area */}
                      <div className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br ${style.grad}`} style={{ height: 82 }}>
                        <div
                          className="absolute inset-0 opacity-25"
                          style={{ backgroundImage: 'radial-gradient(circle at 26% 24%, rgba(255,255,255,0.55) 0%, transparent 48%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)' }}
                        />
                        <div className="relative h-12 w-16 overflow-hidden rounded-xl border border-white/40 bg-white/15 p-2 shadow-sm backdrop-blur-sm">
                          <Image
                            src={PRODUCT_PLACEHOLDER}
                            alt={`${p.name} placeholder preview`}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>
                        {inCart && !isOut && (
                          <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
                            {inCart.qty}
                          </span>
                        )}
                      </div>
                      {/* Name + stock */}
                      <div className="flex-1 bg-white px-2.5 pb-2 pt-2">
                        <p className="min-h-[2.25rem] text-[9px] font-semibold uppercase leading-tight text-slate-700 line-clamp-2">
                          {p.name}
                        </p>
                        <p className={`mt-1 text-[8px] font-semibold ${isOut ? 'text-red-500' : 'text-emerald-600'}`}>
                          {isOut ? 'Out of stock' : `Qty: ${p.stock?.toLocaleString()}`}
                        </p>
                      </div>
                      {/* Price bar */}
                      <div
                        className="text-white text-[10px] font-bold text-center py-1.5"
                        style={{ backgroundColor: '#0e6ba8' }}
                      >
                        {fmt(p.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* â”€â”€ Right: cart â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <CartPanel
          cart={cart}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          onUpdateQty={onUpdateQty}
          onRemoveItem={onRemoveItem}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Screen 4: Payment â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Keeps the app header + right cart panel identical to POS screen.
// The left area is replaced by the payment card.

function PaymentScreen({
  staffName, location, cart, selectedItem,
  onConfirm, onCancel, onLogout,
  onSelectItem, onUpdateQty, onRemoveItem,
}: {
  staffName: string; location: string; cart: CartItem[]; selectedItem: string | null;
  onConfirm:    (payments: Record<string, number>) => void;
  onCancel:     () => void;
  onLogout:     () => void;
  onSelectItem: (name: string | null) => void;
  onUpdateQty:  (name: string, delta: number) => void;
  onRemoveItem: (name: string) => void;
}) {
  const total     = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const staffRole = STAFF.find(s => s.name === staffName)?.role ?? 'Staff';

  const [payments,     setPayments]     = useState<Record<string, number>>({});
  const [activeMethod, setActiveMethod] = useState('moniepoint');
  const [input,        setInput]        = useState('');

  const totalPaid   = Object.values(payments).reduce((s, v) => s + v, 0);
  const stillNeeded = Math.max(0, total - totalPaid);
  const isComplete  = totalPaid >= total;
  const activeLabel = PAY_METHODS.find(m => m.id === activeMethod)?.label ?? '';

  function handleKey(k: string) {
    if (k === 'BACK')  { setInput(v => v.slice(0,-1)); return; }
    if (k === 'CLEAR') { setInput(''); return; }
    if (k === 'EXACT') { setInput(String(stillNeeded)); return; }
    if (input.length < 10) setInput(v => v + k);
  }

  function addAmount() {
    const amount = parseInt(input || '0');
    if (amount <= 0) return;
    setPayments(prev => ({ ...prev, [activeMethod]: (prev[activeMethod] ?? 0) + amount }));
    setInput('');
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <AppHeader staffName={staffName} role={staffRole} location={location} onLogout={onLogout} />

      <div className="flex flex-1 overflow-hidden">

        {/* â”€â”€ Left: payment panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-slate-100">

          {/* Back header row */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 shrink-0">
            <button onClick={onCancel} className="text-slate-600 hover:text-slate-900" aria-label="Back to menu">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-slate-700 font-semibold text-sm">Complete Payment</span>
          </div>

          {/* Big blue payment card */}
          <div className="flex-1 overflow-hidden p-4">
            <div
              className="h-full rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: '#0e6ba8' }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between px-5 py-4 border-b border-white/15 shrink-0">
                <div>
                  <p className="text-white font-bold text-base leading-tight">Complete Payment</p>
                  <p className="text-blue-200 text-xs mt-0.5">Select payment method and enter amount</p>
                </div>
                <button onClick={onCancel} className="ml-4 text-white/60 hover:text-white" aria-label="Close payment modal">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 3-column body */}
              <div className="flex flex-1 overflow-hidden divide-x divide-white/15">

                {/* Col 1 â€” Totals */}
                <div className="w-52 xl:w-60 shrink-0 p-4 flex flex-col gap-3 overflow-y-auto">
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase mb-1 font-semibold">TOTAL DUE</p>
                    <p className="text-white text-2xl font-bold">{fmtFixed(total)}</p>
                  </div>
                  <div
                    className="rounded-xl p-3"
                    style={{ backgroundColor: 'rgba(186,230,253,0.15)', border: '1px solid rgba(186,230,253,0.25)' }}
                  >
                    <p className="text-blue-300 text-[9px] uppercase mb-1 font-semibold">AMOUNT PAID</p>
                    <p className="text-white text-xl font-bold">{fmtFixed(totalPaid)}</p>
                  </div>
                  {!isComplete && (
                    <div
                      className="rounded-xl p-3"
                      style={{ backgroundColor: 'rgba(254,202,202,0.15)', border: '1px solid rgba(254,202,202,0.25)' }}
                    >
                      <p className="text-red-300 text-[9px] uppercase mb-1 font-semibold">STILL NEEDED</p>
                      <p className="text-red-200 text-xl font-bold">{fmtFixed(stillNeeded)}</p>
                    </div>
                  )}
                  {Object.keys(payments).length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-blue-300 text-[9px] uppercase font-semibold">PAYMENT BREAKDOWN</p>
                        <button onClick={() => setPayments({})} className="text-red-300 text-[9px] hover:text-red-200 underline">
                          Clear All
                        </button>
                      </div>
                      {Object.entries(payments).map(([method, amount]) => (
                        <div key={method} className="flex justify-between text-[11px] py-0.5">
                          <span className="text-blue-200">{PAY_METHODS.find(m => m.id === method)?.label}</span>
                          <span className="text-white font-bold">{fmt(amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Col 2 â€” Payment methods */}
                <div className="w-48 xl:w-52 shrink-0 p-4 flex flex-col overflow-y-auto">
                  <p className="text-blue-300 text-[9px] uppercase mb-3 font-semibold">PAYMENT METHODS</p>
                  {PAY_METHODS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setActiveMethod(m.id); setInput(''); }}
                      className="mb-2 px-3 py-3 rounded-xl text-xs font-semibold text-left border transition-all"
                      style={
                        activeMethod === m.id
                          ? { backgroundColor: '#1a72b8', border: '1px solid rgba(255,255,255,0.45)', color: '#fff' }
                          : { backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#93c5fd' }
                      }
                    >
                      {m.label}
                      <span className="block text-[10px] opacity-60 mt-0.5 font-normal">
                        {payments[m.id] ? fmt(payments[m.id]) : 'N0.00'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Col 3 â€” Keypad */}
                <div className="flex-1 p-4 flex flex-col min-w-0 overflow-hidden">
                  <p className="text-blue-300 text-[9px] uppercase mb-2 font-semibold shrink-0">KEYPAD</p>
                  <div className="grid grid-cols-3 gap-1.5 mb-2 shrink-0">
                    {['1','2','3','4','5','6','7','8','9'].map(k => (
                      <button
                        key={k}
                        onClick={() => handleKey(k)}
                        className="h-11 rounded-lg text-white font-semibold text-base border border-white/20 hover:brightness-110 active:scale-95 transition-all"
                        style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                      >
                        {k}
                      </button>
                    ))}
                    <button
                      onClick={() => handleKey('0')}
                      className="col-span-2 h-11 rounded-lg text-white font-semibold text-base border border-white/20 hover:brightness-110 active:scale-95 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                    >
                      0
                    </button>
                    <button
                      onClick={() => handleKey('.')}
                      className="h-11 rounded-lg text-white font-semibold text-base border border-white/20 hover:brightness-110 active:scale-95 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                    >
                      .
                    </button>
                  </div>
                  {/* Amount display */}
                  <div
                    className="rounded-xl px-3 py-2.5 mb-2 shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    <p className="text-blue-300 text-[9px] uppercase mb-0.5 font-semibold">
                      ENTERING FOR: {activeLabel.toUpperCase()}
                    </p>
                    <p className="text-white text-xl font-bold">
                      {input ? fmt(parseInt(input)) : 'N0'}
                    </p>
                  </div>
                  <div className="flex gap-1.5 mb-1.5 shrink-0">
                    <button
                      onClick={() => handleKey('EXACT')}
                      className="flex-1 h-9 rounded-lg text-white text-xs font-semibold border border-white/20 hover:brightness-110 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      EXACT
                    </button>
                    <button
                      onClick={() => handleKey('BACK')}
                      className="flex-1 h-9 rounded-lg text-white text-xs font-semibold border border-white/20 hover:brightness-110 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        BACK
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleKey('CLEAR')}
                    className="w-full h-9 rounded-lg text-white text-xs font-semibold border border-white/20 hover:brightness-110 mb-2 shrink-0 transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={addAmount}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm bg-green-500 hover:bg-green-600 transition-colors mt-auto shrink-0"
                  >
                    + ADD AMOUNT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cancel / Confirm */}
          <div className="flex gap-3 px-4 pb-4 shrink-0">
            <button
              onClick={onCancel}
              className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={() => isComplete && onConfirm(payments)}
              disabled={!isComplete}
              className="flex-1 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
              style={
                isComplete
                  ? { backgroundColor: '#0e6ba8', color: '#fff' }
                  : { backgroundColor: '#e2e8f0', color: '#94a3b8' }
              }
            >
              <Check className="h-4 w-4" />
              Confirm
            </button>
          </div>
        </div>

        {/* â”€â”€ Right: cart (same panel, state persists) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <CartPanel
          cart={cart}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          onUpdateQty={onUpdateQty}
          onRemoveItem={onRemoveItem}
          onCheckout={() => {/* no-op during payment */}}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Receipt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ReceiptScreen({
  staffName, cart, payments, onNewSale,
}: {
  staffName: string;
  cart: CartItem[];
  payments: Record<string, number>;
  onNewSale: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const now   = new Date();
  const receiptNo = '#' + Math.floor(Math.random() * 90000 + 10000);

  return (
    <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto bg-slate-100 p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-4">
          <div className="px-6 py-5 text-center" style={{ backgroundColor: '#0e6ba8' }}>
            <p className="text-white text-xl font-extrabold">{STORE_NAME}</p>
            <p className="text-blue-200 text-xs mt-0.5">Sales Receipt</p>
          </div>
          <div className="px-5 py-4 font-mono text-xs text-slate-600 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Receipt</span><span className="font-bold">{receiptNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date</span><span>{now.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cashier</span><span>{staffName}</span>
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3 space-y-1">
              {cart.map(item => (
                <div key={item.name} className="flex justify-between">
                  <span className="flex-1 truncate uppercase">{item.name}</span>
                  <span className="ml-2 shrink-0">{item.qty} x {fmt(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className="flex justify-between font-bold text-slate-900 text-sm">
                <span>TOTAL</span><span>{fmt(total)}</span>
              </div>
              {Object.entries(payments).map(([method, amount]) => (
                <div key={method} className="flex justify-between text-slate-500 mt-1 text-[11px]">
                  <span>{PAY_METHODS.find(m => m.id === method)?.label}</span>
                  <span>{fmt(amount)}</span>
                </div>
              ))}
            </div>
            <div className="text-center pt-2 text-slate-400 text-[10px]">
              <Check className="mx-auto mb-1 h-4 w-4" />
              Transaction Approved<br />Thank you for your purchase!
            </div>
          </div>
        </div>
        <button
          onClick={onNewSale}
          className="w-full text-white font-bold py-4 rounded-xl text-base hover:brightness-110 transition-all"
          style={{ backgroundColor: '#0e6ba8' }}
        >
          + New Sale
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ Root â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function POSDemoPage() {
  const [screen,       setScreen]       = useState<Screen>('login');
  const [staffName,    setStaffName]    = useState('');
  const [location,     setLocation]     = useState('Hotel');
  const [cart,         setCart]         = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [payments,     setPayments]     = useState<Record<string, number>>({});

  function addToCart(p: Product) {
    setCart(prev => {
      const ex = prev.find(i => i.name === p.name);
      if (ex) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: p.name, price: p.price, qty: 1 }];
    });
  }

  function updateQty(name: string, delta: number) {
    setCart(prev =>
      prev
        .map(i => i.name === name ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    );
  }

  function removeItem(name: string) {
    setCart(prev => prev.filter(i => i.name !== name));
    setSelectedItem(null);
  }

  return (
    <div className="bg-slate-100 pt-16 md:pt-20">
      <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
        {screen === 'login' && (
          <LoginScreen
            onLogin={(staff, loc) => {
              setStaffName(staff);
              setLocation(loc);
              setScreen('pos');
            }}
          />
        )}

        {screen === 'pos' && (
          <POSScreen
            staffName={staffName}
            location={location}
            cart={cart}
            selectedItem={selectedItem}
            onAddToCart={addToCart}
            onSelectItem={setSelectedItem}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
            onCheckout={() => cart.length > 0 && setScreen('payment')}
            onLogout={() => { setCart([]); setSelectedItem(null); setScreen('login'); }}
          />
        )}

        {screen === 'payment' && (
          <PaymentScreen
            staffName={staffName}
            location={location}
            cart={cart}
            selectedItem={selectedItem}
            onConfirm={paidWith => { setPayments(paidWith); setScreen('receipt'); }}
            onCancel={() => setScreen('pos')}
            onLogout={() => { setCart([]); setSelectedItem(null); setScreen('login'); }}
            onSelectItem={setSelectedItem}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
          />
        )}

        {screen === 'receipt' && (
          <ReceiptScreen
            staffName={staffName}
            cart={cart}
            payments={payments}
            onNewSale={() => {
              setCart([]);
              setSelectedItem(null);
              setPayments({});
              setScreen('pos');
            }}
          />
        )}
      </div>
    </div>
  );
}
