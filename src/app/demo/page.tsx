'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Play,
  ChevronLeft,
  Wifi,
  Search,
  Minus,
  Plus,
  X,
  CheckCircle2,
  LogOut,
  RefreshCw,
  Menu,
  Delete,
  Printer,
} from 'lucide-react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────

type AppScreen =
  | 'login'
  | 'open-till'
  | 'pos'
  | 'payment'
  | 'receipt'
  | 'success';

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
  { name: 'Room Deluxe', price: 45000, emoji: '🏨', category: 'Hotel', stock: 3 },
  { name: 'Laundry Service', price: 3500, emoji: '👕', category: 'Hotel', stock: null },
  { name: 'Red Wine', price: 15000, emoji: '🍷', category: 'Wine', stock: 8 },
  { name: 'Champagne', price: 35000, emoji: '🥂', category: 'Wine', stock: 4 },
  { name: 'Beer Pack (6)', price: 4500, emoji: '🍺', category: 'Wine', stock: 24 },
];

const categories = [
  { name: 'Food', color: 'bg-orange-500', icon: '🍴' },
  { name: 'Hotel', color: 'bg-purple-500', icon: '🏨' },
  { name: 'Wine', color: 'bg-red-500', icon: '🍷' },
];

function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString();
}

// ─── Loader Modal ────────────────────────────────────────────

function LoaderModal({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-xs mx-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-sm font-semibold text-dark-700 text-center">{message}</p>
      </div>
    </div>
  );
}

// ─── Login Screen ────────────────────────────────────────────

function LoginScreen({
  onLogin,
}: {
  onLogin: (staff: string) => void;
}) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleKeyPress = (key: string | number) => {
    if (key === 'del') {
      setPasscode((prev) => prev.slice(0, -1));
      setError('');
    } else if (passcode.length < 4) {
      setPasscode((prev) => prev + key);
      setError('');
    }
  };

  const handleLogin = () => {
    if (!selectedStaff) {
      setError('Please select a staff member');
      return;
    }
    if (passcode.length !== 4) {
      setError('Enter a 4-digit passcode');
      return;
    }
    onLogin(selectedStaff);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 flex">
      {/* Left Side */}
      <div className="flex-1 p-6 md:p-8 text-white overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs border border-white/30 rounded-full px-3 py-1 cursor-pointer hover:bg-white/10 transition-colors">
            🕐 CLOCK IN / OUT
          </span>
          <div className="text-center">
            <p className="text-xs text-teal-300">TILL 1 - 15/02/2026 - 13:31</p>
          </div>
          <div className="flex gap-2">
            <span className="text-xs border border-white/30 rounded-full px-3 py-1 cursor-pointer hover:bg-white/10 transition-colors">❓ HELP</span>
            <span className="text-xs border border-red-400/50 text-red-300 rounded-full px-3 py-1 cursor-pointer hover:bg-red-500/20 transition-colors">⏻ EXIT</span>
          </div>
        </div>

        {/* Online Status */}
        <div className="bg-teal-600/40 border border-teal-500/30 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold">ONLINE</span>
            </div>
            <span className="text-xs text-teal-300">2 locations cached</span>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-dark-900 font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync Data from Cloud
          </button>
          <p className="text-xs text-teal-300 text-center mt-2">Last synced: 2/14/2026, 1:37:12 PM</p>
        </div>

        {/* Select Store */}
        <div className="mb-4">
          <p className="text-xs font-bold text-teal-300 mb-2 tracking-wider">SELECT STORE</p>
          <div className="bg-teal-600/50 border-2 border-yellow-400 rounded-xl px-4 py-3 text-center cursor-pointer">
            <span className="text-sm font-semibold">St&apos;s Michael Hub</span>
          </div>
        </div>

        {/* Select Location */}
        <div className="mb-4">
          <p className="text-xs font-bold text-teal-300 mb-2 tracking-wider">SELECT LOCATION</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-teal-600/50 border border-teal-500/30 rounded-xl px-4 py-3">
              <span className="text-sm">Main Store</span>
            </div>
            <button className="bg-teal-600/50 border border-teal-500/30 rounded-xl px-3 hover:bg-teal-500/40 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Select Staff */}
        <div>
          <p className="text-xs font-bold text-teal-300 mb-2 tracking-wider">SELECT STAFF</p>
          <div className="space-y-2">
            {staffList.map((s) => (
              <button
                key={s.name}
                onClick={() => { setSelectedStaff(s.name); setError(''); }}
                className={`w-full text-left rounded-xl px-4 py-3 transition-all ${
                  selectedStaff === s.name
                    ? 'bg-yellow-500/20 border-2 border-yellow-400'
                    : 'bg-teal-600/30 border border-teal-500/20 hover:bg-teal-500/30'
                }`}
              >
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-teal-300">{s.user}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Keypad */}
      <div className="w-full max-w-sm bg-teal-800/60 p-6 md:p-8 flex flex-col items-center justify-center">
        <p className="text-sm font-bold text-white mb-4 tracking-wider">PLEASE ENTER YOUR PASSCODE</p>

        {/* Passcode dots */}
        <div className="flex gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-colors ${
                i < passcode.length ? 'bg-teal-300' : 'bg-teal-600'
              }`}
            />
          ))}
        </div>

        <div className="w-full max-w-[240px] h-0.5 bg-teal-600 mb-6" />

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[240px] mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="h-14 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-400 text-white text-xl font-bold transition-colors"
            >
              {key}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleKeyPress(0)}
            className="h-14 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-400 text-white text-xl font-bold transition-colors"
          >
            0
          </button>
          <button
            onClick={() => handleKeyPress('del')}
            className="h-14 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-400 text-white flex items-center justify-center transition-colors"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full max-w-[240px] py-3.5 rounded-xl font-bold text-sm transition-all ${
            selectedStaff && passcode.length === 4
              ? 'bg-green-500 hover:bg-green-400 text-white shadow-lg'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          LOGIN
        </button>

        {error && (
          <p className="text-xs text-red-300 mt-3 text-center">{error}</p>
        )}

        <p className="text-xs text-teal-400 mt-4 text-center">
          Enter 4-digit passcode and select a store to continue
        </p>
      </div>
    </div>
  );
}

// ─── Open Till Modal ─────────────────────────────────────────

function OpenTillModal({
  staff,
  onOpen,
  onCancel,
}: {
  staff: string;
  onOpen: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-dark-900 mb-4">Open Till</h3>

        <div className="bg-dark-50 rounded-xl p-4 mb-4 space-y-1.5">
          <p className="text-sm text-dark-600">
            <span className="font-semibold">Staff:</span> {staff}
          </p>
          <p className="text-sm text-dark-600">
            <span className="font-semibold">Location:</span> Main Store
          </p>
          <p className="text-sm text-dark-400">
            <span className="font-semibold">Date:</span> 2/15/2026
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-700">
            Opening cash entry is disabled in Settings. Opening balance will be set to ₦0.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-dark-200 hover:bg-dark-50 rounded-xl py-3 text-sm font-medium text-dark-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onOpen}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-xl py-3 text-sm font-bold transition-colors shadow-lg"
          >
            Open Till
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── POS Screen ──────────────────────────────────────────────

function POSScreen({
  staff,
  cart,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onPay,
  onLogout,
}: {
  staff: string;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQty: (name: string, delta: number) => void;
  onRemoveItem: (name: string) => void;
  onPay: () => void;
  onLogout: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState('Food');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'MENU' | 'CUSTOMERS' | 'ORDERS'>('MENU');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = p.category === activeCategory;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* Top Nav */}
      <div className="bg-blue-600 text-white px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button className="hover:bg-blue-500 p-1 rounded transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <p className="text-sm font-bold">St&apos;s Michael Hub</p>
            <p className="text-xs text-blue-200">Hotel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold">{staff}</p>
            <p className="text-[10px] text-blue-200">junior staff</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs">15/02/2026</p>
            <p className="text-[10px] text-blue-200">13:40:17</p>
          </div>
          <Wifi className="w-4 h-4 text-green-300" />
          <Search className="w-4 h-4" />
          <button onClick={onLogout} className="hover:bg-blue-500 p-1 rounded transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sync bar */}
      <div className="bg-dark-50 px-4 md:px-6 py-2 flex items-center justify-between border-b border-dark-100 shrink-0">
        <div className="flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs text-dark-500">Online</span>
          <span className="text-xs text-dark-400">Last sync: 1:40:05 PM</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
          <RefreshCw className="w-3 h-3" />
          Sync Products
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left - Products */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Search */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input
                type="text"
                placeholder="Search products or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          {/* Categories */}
          <p className="text-xs font-bold text-dark-700 mb-2 tracking-wider">CATEGORIES</p>
          <div className="flex gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`${cat.color} text-white rounded-xl px-5 py-3 text-center transition-all ${
                  activeCategory === cat.name
                    ? 'ring-2 ring-offset-2 ring-blue-400 scale-105'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                <p className="text-xl mb-1">{cat.icon}</p>
                <p className="text-xs font-semibold">{cat.name}</p>
              </button>
            ))}
          </div>

          {/* Products Header */}
          <div className="bg-dark-50 border border-dark-100 rounded-t-xl px-4 py-2">
            <p className="text-sm font-bold text-dark-700">{activeCategory}</p>
          </div>

          {/* Products Grid */}
          <div className="border border-t-0 border-dark-100 rounded-b-xl p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.name}
                  onClick={() => product.stock !== null ? onAddToCart(product) : undefined}
                  disabled={product.stock === null}
                  className={`border border-dark-100 rounded-xl overflow-hidden text-left transition-all ${
                    product.stock !== null
                      ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-95'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="bg-dark-50 h-16 flex items-center justify-center relative">
                    <span className="text-2xl">{product.emoji}</span>
                    {product.stock !== null ? (
                      <span className="absolute top-1 right-1 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="absolute top-1 right-1 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                        Out
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-dark-600 truncate font-medium">{product.name}</p>
                  </div>
                  <div className="bg-teal-500 text-white text-center py-1.5">
                    <span className="text-sm font-bold">{formatNaira(product.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Cart */}
        <div className="w-[280px] md:w-[340px] border-l border-dark-100 flex flex-col bg-dark-50 shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-dark-200 shrink-0">
            {(['MENU', 'CUSTOMERS', 'ORDERS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-3 text-xs font-bold transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-dark-900 border-b-2 border-blue-500'
                    : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cart Header */}
          <div className="px-4 py-2 border-b border-dark-200 bg-white shrink-0">
            <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-dark-400 tracking-wider">
              <span className="col-span-1">PRODUCT</span>
              <span className="text-center">QTY</span>
              <span className="text-right">EACH</span>
              <span className="text-right">TOTAL</span>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 && (
              <div className="flex items-center justify-center h-full text-dark-300 text-sm">
                No items added
              </div>
            )}
            {cart.map((item) => (
              <div key={item.name} className="border-b border-dark-100">
                <div className="bg-teal-600 text-white px-4 py-2">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <span className="col-span-1 font-semibold truncate">{item.name}</span>
                    <span className="text-center">{item.qty}</span>
                    <span className="text-right text-teal-200">{formatNaira(item.price)}</span>
                    <span className="text-right font-bold">{formatNaira(item.price * item.qty)}</span>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white flex items-center justify-center gap-4">
                  <button
                    onClick={() => onUpdateQty(item.name, -1)}
                    className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center transition-colors active:scale-90"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold text-dark-900 w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => onUpdateQty(item.name, 1)}
                    className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center transition-colors active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-4 pb-2 bg-white flex items-center justify-center gap-2">
                  <button className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded">NOTE</button>
                  <button className="bg-yellow-500 text-white text-[10px] font-bold px-3 py-1.5 rounded">DISC</button>
                  <button
                    onClick={() => onRemoveItem(item.name)}
                    className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded"
                  >
                    DEL
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="border-t border-dark-200 bg-white shrink-0">
            <div className="px-4 py-2 flex justify-between items-center border-b border-dark-100">
              <span className="text-xs text-dark-500 font-semibold">ITEMS {totalItems}</span>
              <span className="text-xs">
                <span className="text-dark-400">SUBTOTAL</span>{' '}
                <span className="font-bold text-dark-800">{formatNaira(total)}</span>
              </span>
            </div>
            <div className="px-4 py-3 flex justify-between items-center">
              <span className="text-sm font-bold text-dark-900">TOTAL DUE</span>
              <span className="text-lg font-bold text-red-500">{formatNaira(total)}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-1 px-2 pb-1">
              <button className="bg-dark-100 hover:bg-dark-200 text-dark-600 rounded-lg py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors">
                <Printer className="w-4 h-4" />
                PRINT
              </button>
              <button className="bg-dark-100 hover:bg-dark-200 text-dark-600 rounded-lg py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors">
                💵 PETTY CASH
              </button>
              <button className="bg-dark-100 hover:bg-dark-200 text-dark-600 rounded-lg py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors">
                ⚙️ ADJUST
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1 px-2 pb-2">
              <button
                onClick={() => { cart.forEach((item) => onRemoveItem(item.name)); }}
                className="bg-red-500 hover:bg-red-400 text-white rounded-lg py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors"
              >
                🗑️ DELETE
              </button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors">
                ⏸️ HOLD
              </button>
              <button
                onClick={onPay}
                disabled={cart.length === 0}
                className={`rounded-lg py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors ${
                  cart.length > 0
                    ? 'bg-green-500 hover:bg-green-400 text-white'
                    : 'bg-green-200 text-green-400 cursor-not-allowed'
                }`}
              >
                💳 PAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Screen ──────────────────────────────────────────

function PaymentScreen({
  staff,
  cart,
  onConfirm,
  onCancel,
}: {
  staff: string;
  cart: CartItem[];
  onConfirm: (method: string) => void;
  onCancel: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [selectedMethod, setSelectedMethod] = useState('ACCESS POS');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [breakdown, setBreakdown] = useState<{ method: string; amount: number }[]>([]);

  const handleKeyPress = (key: string) => {
    if (key === 'clear') {
      setEnteredAmount('');
    } else if (key === 'back') {
      setEnteredAmount((prev) => prev.slice(0, -1));
    } else {
      setEnteredAmount((prev) => prev + key);
    }
  };

  const handleAddAmount = () => {
    const amount = parseFloat(enteredAmount) || 0;
    if (amount <= 0) return;
    const newPaid = amountPaid + amount;
    setAmountPaid(newPaid);
    setBreakdown((prev) => [...prev, { method: selectedMethod, amount }]);
    setEnteredAmount('');
  };

  const canConfirm = amountPaid >= total;

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* Top Nav */}
      <div className="bg-blue-600 text-white px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-bold">St&apos;s Michael Hub</p>
            <p className="text-xs text-blue-200">Hotel</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span>{staff}</span>
          <span>15/02/2026</span>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8">
        {/* Back */}
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-sm text-dark-500 hover:text-dark-700 mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Complete Payment
        </button>

        {/* Header */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-teal-800 mb-1">Complete Payment</h2>
          <p className="text-sm text-teal-600">Select payment method and enter amount</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left - Amounts */}
          <div className="space-y-4">
            <div className="bg-dark-50 rounded-xl p-5">
              <p className="text-xs text-dark-400 mb-1">TOTAL DUE</p>
              <p className="text-2xl font-bold text-dark-900">{formatNaira(total)}.00</p>
            </div>
            <div className={`rounded-xl p-5 border ${amountPaid >= total ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-100'}`}>
              <p className={`text-xs mb-1 ${amountPaid >= total ? 'text-green-500' : 'text-red-400'}`}>AMOUNT PAID</p>
              <p className={`text-2xl font-bold ${amountPaid >= total ? 'text-green-600' : 'text-red-500'}`}>
                {formatNaira(amountPaid)}.00
              </p>
            </div>
            <div className="bg-dark-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-dark-500 mb-2">PAYMENT BREAKDOWN</p>
              {breakdown.length === 0 ? (
                <p className="text-xs text-dark-300 italic">No payments added yet</p>
              ) : (
                <div className="space-y-1">
                  {breakdown.map((b, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-dark-500">{b.method}</span>
                      <span className="font-semibold text-dark-700">{formatNaira(b.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center - Payment Methods + Keypad */}
          <div>
            <p className="text-xs font-bold text-dark-500 mb-3 tracking-wider">PAYMENT METHODS</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['ACCESS POS', 'CASH', 'STAFF TIPS'].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`rounded-xl px-3 py-3 text-center transition-all ${
                    selectedMethod === method
                      ? 'bg-teal-500 text-white ring-2 ring-teal-300'
                      : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
                  }`}
                >
                  <p className="text-xs font-bold">{method}</p>
                  <p className="text-[10px] mt-0.5 opacity-70">₦0.00</p>
                </button>
              ))}
            </div>

            {/* Entering for */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-4">
              <p className="text-xs text-teal-600 mb-1">ENTERING FOR: {selectedMethod}</p>
              <p className="text-2xl font-bold text-teal-700 text-right">
                {enteredAmount ? formatNaira(parseFloat(enteredAmount)) : '₦0'}
              </p>
            </div>

            <p className="text-xs font-bold text-dark-500 mb-2 tracking-wider">KEYPAD</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(String(key))}
                  className="h-12 bg-dark-50 border border-dark-200 hover:bg-dark-100 active:bg-dark-200 rounded-xl text-lg font-semibold text-dark-700 transition-colors"
                >
                  {key}
                </button>
              ))}
              <button
                onClick={() => handleKeyPress('.')}
                className="h-12 bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 rounded-xl text-lg font-semibold text-dark-700 transition-colors"
              >
                .
              </button>
            </div>

            <button
              onClick={() => handleKeyPress('back')}
              className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-xl py-2.5 text-sm font-bold mb-2 transition-colors"
            >
              ← BACK
            </button>
            <button
              onClick={() => handleKeyPress('clear')}
              className="w-full bg-dark-100 hover:bg-dark-200 text-dark-600 rounded-xl py-2.5 text-sm font-bold mb-2 transition-colors"
            >
              CLEAR
            </button>
            <button
              onClick={handleAddAmount}
              className="w-full bg-green-500 hover:bg-green-400 text-white rounded-xl py-3 text-sm font-bold transition-colors shadow-lg"
            >
              + ADD AMOUNT
            </button>
          </div>

          {/* Right - Cart summary (from POS screen) */}
          <div className="hidden md:block">
            <div className="bg-dark-50 rounded-xl p-4">
              <p className="text-xs font-bold text-dark-500 mb-3">ORDER SUMMARY</p>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="text-dark-600">{item.name} x{item.qty}</span>
                    <span className="font-semibold text-dark-700">{formatNaira(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dark-200 pt-2 flex justify-between">
                <span className="text-sm font-bold text-dark-900">Total</span>
                <span className="text-sm font-bold text-dark-900">{formatNaira(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 bg-dark-100 hover:bg-dark-200 rounded-xl py-4 text-sm font-semibold text-dark-600 flex items-center justify-center gap-2 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={() => canConfirm && onConfirm(selectedMethod)}
            className={`flex-1 rounded-xl py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              canConfirm
                ? 'bg-green-500 hover:bg-green-400 text-white shadow-lg'
                : 'bg-dark-200 text-dark-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Receipt Screen ──────────────────────────────────────────

function ReceiptScreen({
  staff,
  cart,
  paymentMethod,
  onNewSale,
}: {
  staff: string;
  cart: CartItem[];
  paymentMethod: string;
  onNewSale: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-full bg-gradient-to-br from-dark-100 to-dark-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-dark-100">
        {/* Store Header */}
        <div className="text-center border-b border-dashed border-dark-300 pb-4 mb-4">
          <p className="text-xl font-bold text-dark-900">St&apos;s Michael Hub</p>
          <p className="text-sm text-dark-400">Hotel</p>
          <p className="text-xs text-dark-400 mt-2">Receipt of Purchase (Inc Tax)</p>
        </div>

        {/* Meta */}
        <div className="text-xs text-dark-500 mb-4 space-y-1">
          <p>15/02/2026, 13:41:44 &nbsp;&nbsp; 17711593</p>
          <div className="flex justify-between">
            <span>Staff: {staff}</span>
            <span>Till #1</span>
          </div>
        </div>

        {/* Products */}
        <div className="border-t border-dashed border-dark-300 pt-3 mb-3">
          <div className="grid grid-cols-12 text-xs font-bold text-dark-700 mb-2">
            <span className="col-span-6">PRODUCT</span>
            <span className="col-span-2 text-center">QTY</span>
            <span className="col-span-4 text-right">PRICE</span>
          </div>
          {cart.map((item) => (
            <div key={item.name} className="grid grid-cols-12 text-sm text-dark-600 mb-1">
              <span className="col-span-6">{item.name}</span>
              <span className="col-span-2 text-center">{item.qty}</span>
              <span className="col-span-4 text-right">{formatNaira(item.price * item.qty)}.00</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-dashed border-dark-300 pt-3 mb-3">
          <div className="flex justify-between text-xs text-dark-500 mb-1">
            <span>Total: {totalItems} Items</span>
          </div>
          <div className="flex justify-between text-sm text-dark-600 mb-2">
            <span>Subtotal:</span>
            <span>{formatNaira(total)}.00</span>
          </div>
        </div>

        <div className="border-t border-dashed border-dark-300 pt-3 mb-4">
          <div className="flex justify-between text-lg font-bold text-dark-900">
            <span>TOTAL:</span>
            <span>{formatNaira(total)}.00</span>
          </div>
        </div>

        {/* Payment Tender */}
        <div className="border-t border-dashed border-dark-300 pt-3 mb-4">
          <p className="text-xs font-semibold text-dark-600 mb-1">PAYMENT BY TENDER</p>
          <div className="flex justify-between text-sm text-dark-500">
            <span>{paymentMethod}</span>
            <span>{formatNaira(total)}.00</span>
          </div>
        </div>

        {/* Thank You */}
        <div className="text-center border-t border-dashed border-dark-300 pt-4">
          <p className="text-xl font-bold text-dark-900 mb-2">THANK YOU!</p>
          <div className="bg-dark-900 text-white font-bold py-2 px-6 rounded-lg mb-3 inline-block text-sm tracking-wider">
            PAID
          </div>
          <p className="text-xs text-blue-500 mb-6">Thank you for shopping with us!</p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="flex-1 border border-dark-200 hover:bg-dark-50 text-dark-600 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onNewSale}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              New Sale →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Demo App ───────────────────────────────────────────

export default function DemoPage() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [staff, setStaff] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showTillModal, setShowTillModal] = useState(false);

  const showLoader = useCallback((message: string, duration: number) => {
    return new Promise<void>((resolve) => {
      setLoadingMessage(message);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setLoadingMessage('');
        resolve();
      }, duration);
    });
  }, []);

  const handleLogin = useCallback(async (staffName: string) => {
    setStaff(staffName);
    await showLoader('Authenticating...', 1200);
    setShowTillModal(true);
  }, [showLoader]);

  const handleOpenTill = useCallback(async () => {
    setShowTillModal(false);
    await showLoader('Opening till...', 1000);
    setScreen('pos');
  }, [showLoader]);

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { name: product.name, price: product.price, qty: 1 }];
    });
  }, []);

  const handleUpdateQty = useCallback((name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  }, []);

  const handlePay = useCallback(async () => {
    await showLoader('Loading payment...', 800);
    setScreen('payment');
  }, [showLoader]);

  const handleConfirmPayment = useCallback(async (method: string) => {
    setPaymentMethod(method);
    await showLoader('Processing payment...', 1500);
    setScreen('receipt');
  }, [showLoader]);

  const handleNewSale = useCallback(async () => {
    await showLoader('Preparing new sale...', 800);
    setCart([]);
    setPaymentMethod('');
    setScreen('pos');
  }, [showLoader]);

  const handleLogout = useCallback(async () => {
    await showLoader('Logging out...', 600);
    setStaff('');
    setCart([]);
    setPaymentMethod('');
    setScreen('login');
  }, [showLoader]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-100 overflow-hidden">
      {/* Loader Modal */}
      {loading && <LoaderModal message={loadingMessage} />}

      {/* Open Till Modal */}
      {showTillModal && (
        <OpenTillModal
          staff={staff}
          onOpen={handleOpenTill}
          onCancel={() => {
            setShowTillModal(false);
            setStaff('');
          }}
        />
      )}

      {/* Demo Banner */}
      <div className="bg-dark-900 text-white px-4 py-2 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-semibold">BizSuits POS — Interactive Demo</span>
          <span className="text-dark-400 hidden sm:inline">|&nbsp; Try the full sales flow, no data is saved</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="text-dark-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Play className="w-3 h-3" />
            Watch Video
          </Link>
          <Link
            href="/"
            className="text-dark-300 hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>

      {/* Screens */}
      <div className="flex-1 overflow-auto">
        {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {screen === 'pos' && (
          <POSScreen
            staff={staff}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onPay={handlePay}
            onLogout={handleLogout}
          />
        )}
        {screen === 'payment' && (
          <PaymentScreen
            staff={staff}
            cart={cart}
            onConfirm={handleConfirmPayment}
            onCancel={() => setScreen('pos')}
          />
        )}
        {screen === 'receipt' && (
          <ReceiptScreen
            staff={staff}
            cart={cart}
            paymentMethod={paymentMethod}
            onNewSale={handleNewSale}
          />
        )}
      </div>
    </div>
  );
}
