'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  BarChart3,
  Users,
  Calculator,
  Package,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const products = [
  { name: 'Point of Sale', description: 'Fast, reliable POS system', icon: ShoppingCart, href: '/features#pos' },
  { name: 'Inventory Management', description: 'Track stock in real-time', icon: Package, href: '/features#inventory' },
  { name: 'Accounting & Finance', description: 'Automated bookkeeping', icon: Calculator, href: '/features#accounting' },
  { name: 'HR & Payroll', description: 'Manage your team', icon: Users, href: '/features#hr' },
  { name: 'Analytics & Reports', description: 'Data-driven insights', icon: BarChart3, href: '/features#analytics' },
  { name: 'Customer Support', description: '24/7 expert assistance', icon: Headphones, href: '/contact' },
];

const navLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-dark-100'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              alt="BizSuits Logo"
              width={40}
              height={40}
              className="group-hover:shadow-lg group-hover:shadow-primary-500/40 transition-shadow"
            >
            </img>
            <span className="text-xl font-bold text-dark-900">
              Biz<span className="text-primary-600">Suits</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-dark-600 hover:text-dark-900 rounded-lg hover:bg-dark-50 transition-all">
                Products
                <ChevronDown className={clsx('w-4 h-4 transition-transform', isProductsOpen && 'rotate-180')} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={clsx(
                  'absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-dark-100 p-4 grid grid-cols-2 gap-2 transition-all duration-200',
                  isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                )}
              >
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors">
                      <product.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark-900">{product.name}</p>
                      <p className="text-xs text-dark-500">{product.description}</p>
                    </div>
                  </Link>
                ))}
                <div className="col-span-2 mt-2 pt-3 border-t border-dark-100">
                  <Link
                    href="/features"
                    className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    View all features <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-dark-600 hover:text-dark-900 hover:bg-dark-50'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="primary" size="sm" href="/contact">
              Contact Sales
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-dark-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-dark-700" />
            ) : (
              <Menu className="w-6 h-6 text-dark-700" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'lg:hidden transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-white border-t border-dark-100 px-4 py-6 space-y-2">
          <Link
            href="/features"
            className="block px-4 py-3 text-sm font-medium text-dark-600 hover:text-dark-900 rounded-xl hover:bg-dark-50 transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products & Features
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'block px-4 py-3 text-sm font-medium rounded-xl transition-all',
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-dark-600 hover:text-dark-900 hover:bg-dark-50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 space-y-3">
            <Button variant="primary" className="w-full" href="/contact">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
