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
          <Link href="/" className="flex items-center gap-2 group">
            <BizFaceLogo size={40} />
            <span className="text-xl font-bold text-dark-900">
              Biz<span className="text-primary-600">Suits</span>
            </span>
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
                className="flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-dark-700 hover:text-dark-950 hover:bg-dark-100 transition-all"
                onClick={() => setIsProductsOpen((current) => !current)}
                aria-haspopup="true"
                aria-expanded={isProductsOpen}
                aria-controls="solutions-library-menu"
              >
                Solutions Library
                <ChevronDown className={clsx('w-4 h-4 transition-transform', isProductsOpen && 'rotate-180')} />
              </button>

              <div
                id="solutions-library-menu"
                className={clsx(
                  'absolute top-full left-0 mt-2 w-[560px] bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,0.12)] border border-dark-900 p-4 grid grid-cols-2 gap-2 transition-all duration-200',
                  isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                )}
              >
                {portfolioApps.map((product) => (
                  <Link
                    key={product.slug}
                    href={product.href}
                    className="flex items-start gap-3 p-3 border border-transparent hover:border-dark-200 hover:bg-dark-50 transition-colors group"
                  >
                    <div className="w-10 h-10 border border-dark-200 bg-dark-50 flex items-center justify-center shrink-0 group-hover:bg-dark-900 group-hover:text-white transition-colors">
                      <product.icon className="w-5 h-5 text-dark-700 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark-900">{product.name}</p>
                      <p className="text-xs text-dark-500 font-mono uppercase tracking-wider">{product.category}</p>
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
                    'px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all',
                    isActive
                      ? 'text-dark-950 font-bold border-b-2 border-dark-950 bg-dark-50'
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
