'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ChevronDown, Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import BizFaceLogo from '@/components/ui/BizFaceLogo';
import { portfolioApps } from '@/data/portfolio';

const navLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
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
          <Link href="/" className="flex items-center gap-2.5 group">
            <BizFaceLogo size={36} />
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-tight text-dark-900 leading-none">
                Biz<span className="text-primary-600">Suits</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-primary-600 uppercase font-semibold hidden sm:inline-block mt-0.5">
                Custom Systems
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
              onFocus={() => setIsProductsOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsProductsOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-dark-700 hover:text-dark-950 hover:bg-dark-100/70 transition-all"
                onClick={() => setIsProductsOpen((current) => !current)}
                aria-haspopup="true"
                aria-expanded={isProductsOpen}
                aria-controls="solutions-library-menu"
              >
                Systems Suite
                <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform duration-200', isProductsOpen && 'rotate-180')} />
              </button>

              <div
                id="solutions-library-menu"
                className={clsx(
                  'absolute top-full left-0 mt-2 w-[580px] bg-white shadow-xl border border-dark-200 p-3 grid grid-cols-2 gap-1.5 transition-all duration-200',
                  isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                )}
              >
                {portfolioApps.map((product) => (
                  <Link
                    key={product.slug}
                    href={product.href}
                    className="flex items-start gap-3 p-3 border border-transparent hover:border-dark-200 hover:bg-dark-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 border border-dark-200 bg-dark-50 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:border-primary-600 transition-colors">
                      <product.icon className="w-4 h-4 text-dark-700 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-dark-900 group-hover:text-primary-700 transition-colors truncate">{product.name}</p>
                      <p className="text-[10px] text-dark-500 font-mono uppercase tracking-wider truncate">{product.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all',
                    isActive
                      ? 'text-primary-700 bg-primary-50/80 border-b-2 border-primary-600 font-bold'
                      : 'text-dark-600 hover:text-dark-950 hover:bg-dark-50'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="primary" size="sm" href="/contact">
              Contact Sales
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 border border-dark-200 hover:bg-dark-50 transition-colors"
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

      <div
        className={clsx(
          'lg:hidden transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-white border-t border-dark-200 px-4 py-6 space-y-2">
          <Link
            href="/features"
            className="block px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-700 hover:text-dark-950 hover:bg-dark-50 transition-all border border-transparent hover:border-dark-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Live Demos
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'block px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all border border-transparent',
                  isActive
                    ? 'text-dark-950 bg-dark-50 border-dark-200 font-bold'
                    : 'text-dark-600 hover:text-dark-950 hover:bg-dark-50'
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
