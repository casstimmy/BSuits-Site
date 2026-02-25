import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';

const footerLinks = {
  Products: [
    { name: 'Point of Sale', href: '/features#pos' },
    { name: 'Inventory Management', href: '/features#inventory' },
    { name: 'Accounting & Finance', href: '/features#accounting' },
    { name: 'HR & Payroll', href: '/features#hr' },
    { name: 'Analytics', href: '/features#analytics' },
  ],
  Solutions: [
    { name: 'Retail', href: '/solutions#retail' },
    { name: 'Restaurants', href: '/solutions#restaurants' },
    { name: 'Healthcare', href: '/solutions#healthcare' },
    { name: 'Professional Services', href: '/solutions#services' },
    { name: 'E-Commerce', href: '/solutions#ecommerce' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/about#careers' },
    { name: 'Press', href: '/about#press' },
    { name: 'Contact', href: '/contact' },
  ],
  Support: [
    { name: 'Help Center', href: '/contact' },
    { name: 'Documentation', href: '/blog' },
    { name: 'API Reference', href: '/blog' },
    { name: 'Status', href: '/contact' },
    { name: 'Community', href: '/blog' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-950 text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Ready to transform your business?
              </h2>
              <p className="text-lg text-white/60">
                Let BizSuits build the perfect system for your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-primary btn-lg whitespace-nowrap"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all whitespace-nowrap"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src="/images/logo.png"
                alt="BizSuits Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold">
                Biz<span className="text-primary-400">Suits</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              The all-in-one business management platform that brings POS, inventory,
              accounting, and HR into a single powerful suite.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@bizsuits.com" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                hello@bizsuits.com
              </a>
              <a href="tel:09166843265" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                09166843265
              </a>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4" />
                Lekki Schem 2, Lagos
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} BizSuits. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4 text-white/60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
