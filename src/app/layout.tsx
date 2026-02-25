import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'BizSuits - All-in-One Business Management Platform',
    template: '%s | BizSuits',
  },
  description:
    'BizSuits brings POS, inventory, accounting, HR, and analytics together in one powerful suite. Manage your entire business from a single platform.',
  keywords: [
    'business management',
    'POS system',
    'inventory management',
    'accounting software',
    'HR payroll',
    'business analytics',
    'all-in-one business',
    'BizSuits',
  ],
  authors: [{ name: 'BizSuits' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bizsuits.com',
    siteName: 'BizSuits',
    title: 'BizSuits - All-in-One Business Management Platform',
    description:
      'BizSuits brings POS, inventory, accounting, HR, and analytics together in one powerful suite.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizSuits - All-in-One Business Management Platform',
    description:
      'BizSuits brings POS, inventory, accounting, HR, and analytics together in one powerful suite.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
