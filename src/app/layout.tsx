import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'BizSuits - Business Tools for Sales, Operations, and Reporting',
    template: '%s | BizSuits',
  },
  description:
    'BizSuits helps businesses manage sales, stock, reporting, agriculture, and day-to-day operations with more clarity and control.',
  keywords: [
    'business operations',
    'retail operations',
    'inventory control',
    'business reporting',
    'farm operations',
    'sales management',
    'business tools',
    'BizSuits',
  ],
  authors: [{ name: 'BizSuits' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bizsuits.com',
    siteName: 'BizSuits',
    title: 'BizSuits - Business Tools for Sales, Operations, and Reporting',
    description:
      'BizSuits helps businesses manage sales, stock, reporting, agriculture, and day-to-day operations with more clarity and control.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizSuits - Business Tools for Sales, Operations, and Reporting',
    description:
      'BizSuits helps businesses manage sales, stock, reporting, agriculture, and day-to-day operations with more clarity and control.',
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
      <head>
        <link rel="icon" href="/images/icon.ico" type="image/x-icon" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
