import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'BizSuits - Systems Tailored to Your Business',
    template: '%s | BizSuits',
  },
  description:
    'We build powerful, scalable and secure custom systems tailored to your business needs — from sales and POS to farm operations and automated reporting.',
  keywords: [
    'custom systems',
    'systems tailored to your business',
    'business operations',
    'system development',
    'business automation',
    'POS systems',
    'inventory control',
    'cloud solutions',
    'BizSuits',
  ],
  authors: [{ name: 'BizSuits' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bizsuits.com',
    siteName: 'BizSuits',
    title: 'BizSuits - Systems Tailored to Your Business',
    description:
      'We build powerful, scalable and secure custom systems tailored to your business needs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizSuits - Systems Tailored to Your Business',
    description:
      'We build powerful, scalable and secure custom systems tailored to your business needs.',
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/images/icon.ico" type="image/x-icon" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
