import React from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  ShoppingCart,
  BarChart3,
  Package,
  Shield,
  Home,
  Settings,
  ClipboardList,
  Layers,
  TrendingUp,
  Wallet,
  Users,
  Headphones,
  Receipt,
  Banknote,
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-bg-light min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-900 leading-[1.1] mb-6">
              Custom-built software{' '}
              <span className="gradient-text">tailored</span>{' '}
              to your business.
            </h1>

            <p className="text-lg md:text-xl text-dark-500 leading-relaxed mb-8 max-w-xl">
              BizSuits builds POS, inventory, e-commerce, and management systems designed
              specifically for how your business operates — no compromises, fully yours.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: ShoppingCart, label: 'POS System' },
                { icon: Package, label: 'Inventory' },
                { icon: BarChart3, label: 'E-Commerce' },
                { icon: Shield, label: 'Fully Owned' },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-dark-600 border border-dark-100"
                >
                  <chip.icon className="w-4 h-4 text-primary-500" />
                  {chip.label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Schedule a Demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                icon={<Play className="w-5 h-5" />}
                iconPosition="left"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-sm text-dark-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-500" />
                Custom Built for You
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-500" />
                You Own It Forever
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview (Back Office style) */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-dark-100 overflow-hidden">
                {/* Top Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-dark-800 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white flex items-center justify-center">
                       <img
                        src="/images/logo.png"
                        alt="BizSuits Logo"
                        width={18}
                        height={18}
                        className="object-contain"
                       />
                    </div>
                    <span className="text-xs font-semibold">Back Office</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                        <span className="text-[7px] font-bold">A</span>
                      </div>
                      <span className="text-[10px] text-dark-300">Admin</span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-14 bg-dark-50 border-r border-dark-100 py-3 hidden sm:flex flex-col items-center gap-3">
                    {[
                      { icon: Home, active: true, label: 'Home' },
                      { icon: Settings, active: false, label: 'Setup' },
                      { icon: ClipboardList, active: false, label: 'Manage' },
                      { icon: Layers, active: false, label: 'Stock' },
                      { icon: TrendingUp, active: false, label: 'Reports' },
                      { icon: Wallet, active: false, label: 'Expenses' },
                      { icon: Users, active: false, label: 'Staff' },
                      { icon: Headphones, active: false, label: 'Support' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-default ${
                          item.active
                            ? 'bg-primary-500 text-white'
                            : 'text-dark-400 hover:text-dark-600'
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        <span className="text-[7px] font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-4">
                    {/* Welcome */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-bold text-dark-900">Welcome Admin</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded font-medium">+ Add Product</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: 'Sales', value: '₦2.4M' },
                        { label: 'Transactions', value: '384' },
                        { label: 'Avg Tx Value', value: '₦6,250' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white border border-dark-100 rounded-lg p-2.5">
                          <p className="text-sm font-bold text-dark-900">{stat.value}</p>
                          <p className="text-[9px] text-dark-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {/* Sales by Product Chart */}
                      <div className="bg-white border border-dark-100 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[9px] font-semibold text-dark-700">Sales by Product</p>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-sm bg-cyan-500" />
                            <span className="text-[7px] text-dark-400">Sales</span>
                          </div>
                        </div>
                        <div className="flex items-end gap-[3px] h-16">
                          {[
                            { h: 85, label: 'Rice' },
                            { h: 65, label: 'Oil' },
                            { h: 45, label: 'Flour' },
                            { h: 70, label: 'Sugar' },
                            { h: 55, label: 'Milk' },
                            { h: 90, label: 'Bread' },
                          ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div
                                className="w-full bg-cyan-500 rounded-t-sm transition-all"
                                style={{ height: `${bar.h}%` }}
                              />
                              <span className="text-[6px] text-dark-400">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expenses Breakdown Chart */}
                      <div className="bg-white border border-dark-100 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[9px] font-semibold text-dark-700">Expenses Breakdown</p>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-sm bg-red-500" />
                            <span className="text-[7px] text-dark-400">Expenses</span>
                          </div>
                        </div>
                        <div className="flex items-end gap-[3px] h-16">
                          {[
                            { h: 70, label: 'Rent' },
                            { h: 50, label: 'Power' },
                            { h: 35, label: 'Staff' },
                            { h: 25, label: 'Supply' },
                            { h: 15, label: 'Other' },
                          ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div
                                className="w-full bg-red-400 rounded-t-sm transition-all"
                                style={{ height: `${bar.h}%` }}
                              />
                              <span className="text-[6px] text-dark-400">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Cards Row */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* Recent Orders */}
                      <div className="bg-white border border-dark-100 rounded-lg p-2.5">
                        <p className="text-[9px] font-semibold text-dark-700 mb-2">Recent Orders</p>
                        <div className="space-y-1.5">
                          {[
                            { id: '#384', amount: '₦12,500' },
                            { id: '#383', amount: '₦8,200' },
                            { id: '#382', amount: '₦3,000' },
                          ].map((order) => (
                            <div key={order.id} className="flex items-center justify-between">
                              <span className="text-[8px] text-dark-500">{order.id}</span>
                              <span className="text-[8px] font-semibold text-dark-700">{order.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Staff */}
                      <div className="bg-white border border-dark-100 rounded-lg p-2.5">
                        <p className="text-[9px] font-semibold text-dark-700 mb-2">Top Staff</p>
                        <div className="space-y-1.5">
                          {[
                            { name: 'John', sales: '₦120K' },
                            { name: 'Doe', sales: '₦98K' },
                            { name: 'Jane', sales: '₦67K' },
                          ].map((staff) => (
                            <div key={staff.name} className="flex items-center justify-between">
                              <span className="text-[8px] text-dark-500">{staff.name}</span>
                              <span className="text-[8px] font-semibold text-accent-600">{staff.sales}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expenses List */}
                      <div className="bg-white border border-dark-100 rounded-lg p-2.5">
                        <p className="text-[9px] font-semibold text-dark-700 mb-2">Expenses</p>
                        <div className="space-y-1.5">
                          {[
                            { item: 'Diesel', amount: '₦45K' },
                            { item: 'Supplies', amount: '₦32K' },
                            { item: 'Transport', amount: '₦18K' },
                          ].map((expense) => (
                            <div key={expense.item} className="flex items-center justify-between">
                              <span className="text-[8px] text-dark-500">{expense.item}</span>
                              <span className="text-[8px] font-semibold text-red-500">{expense.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card - Sales */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl border border-dark-100 p-4 animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Today&apos;s Sales</p>
                    <p className="text-sm font-bold text-dark-900">₦2,400,000</p>
                  </div>
                </div>
              </div>

              {/* Floating Card - Transaction */}
              <div className="absolute -right-4 top-1/6 bg-white rounded-xl shadow-xl border border-dark-100 p-4 animate-float animate-delay-200 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">New Order</p>
                    <p className="text-sm font-bold text-accent-600">₦12,500</p>
                  </div>
                </div>
              </div>

              {/* Floating Card - Paid */}
              <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-xl border border-dark-100 p-4 animate-float animate-delay-400 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Invoice #047</p>
                    <p className="text-sm font-bold text-accent-600">Paid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
