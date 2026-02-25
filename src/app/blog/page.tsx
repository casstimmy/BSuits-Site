import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog - BizSuits | Tips, Guides & Business Insights',
  description:
    'Read the latest tips, guides, and insights from BizSuits. Learn how to grow your business with expert advice on POS, inventory, accounting, and more.',
};

const featuredPost = {
  title: 'How Nigerian Restaurant Owners Can Scale Without Losing Control',
  excerpt:
    'Managing multiple locations shouldn\'t be a nightmare. Learn how successful Nigerian restaurant chains use unified inventory and POS systems to maintain quality, reduce costs by 30%, and free up time for strategic growth instead of firefighting daily issues.',
  category: 'Growth',
  date: 'Feb 10, 2026',
  readTime: '10 min read',
  author: 'Chidi Okonkwo',
  slug: '#',
};

const posts = [
  {
    title: 'Why Lagos Retailers Are Ditching Multiple Systems for Unified POS',
    excerpt:
      'Managing cash registers, inventory sheets, and accounting spreadsheets separately is killing your profit margins. See how 200+ Lagos retailers switched to unified systems and cut operations costs by 25%.',
    category: 'Inventory',
    date: 'Feb 8, 2026',
    readTime: '6 min read',
    author: 'Funmi Adeyemi',
    slug: '#',
  },
  {
    title: 'The Supermarket Owner\'s Tax Nightmare is Solved With Automation',
    excerpt:
      'End-of-year accounting stress doesn\'t have to leave you sleepless. Automated bookkeeping and tax-ready reports mean you spend 70% less time on admin and comply with FIRS requirements effortlessly.',
    category: 'Accounting',
    date: 'Feb 5, 2026',
    readTime: '7 min read',
    author: 'Tunde Olawale',
    slug: '#',
  },
  {
    title: 'How Kano Traders Are Using Inventory Systems to Prevent Stock Outs',
    excerpt:
      'Running out of bestselling items while overstocked on duds is a silent profit killer. Real-time inventory tracking helps traders like Amara in Kano maintain perfect stock balance and increase sales by 40%.',
    category: 'Inventory',
    date: 'Jan 28, 2026',
    readTime: '8 min read',
    author: 'Aisha Kumari',
    slug: '#',
  },
  {
    title: 'Restaurant Staff Scheduling Without the Drama: A Lagos Case Study',
    excerpt:
      'Manual shift scheduling creates conflicts and No-shows. Learn how restaurants in Victoria Island now use automated scheduling, cut staff turnover by 35%, and improve service quality.',
    category: 'Growth',
    date: 'Jan 22, 2026',
    readTime: '9 min read',
    author: 'Kadir Mohammed',
    slug: '#',
  },
  {
    title: 'E-Commerce Integration: How Nigerian Retailers Are Going Online Without Losing Control',
    excerpt:
      'Your physical store and online shop fight for inventory. Integrated e-commerce platforms let retailers like Chioma in Abuja manage one inventory across 3 channels and triple online revenue.',
    category: 'Growth',
    date: 'Jan 15, 2026',
    readTime: '11 min read',
    author: 'Eze Okoro',
    slug: '#',
  },
  {
    title: 'CBN Compliance Made Easy: Digital Systems That Handle Tax Reporting',
    excerpt:
      'CBN and FIRS regulations change constantly. Discover how modern business platforms auto-adjust to compliance requirements, saving you penalties and audit stress.',
    category: 'Accounting',
    date: 'Jan 8, 2026',
    readTime: '6 min read',
    author: 'Ngozi Eze',
    slug: '#',
  },
];

const categories = [
  'All',
  'Inventory',
  'Accounting',
  'Growth',
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            BizSuits Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6">
            Tips, guides &{' '}
            <span className="gradient-text">business insights</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-2xl mx-auto">
              Real stories from Nigerian business owners and the strategies they use to scale faster.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-dark-100 bg-white sticky top-16 md:top-20 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  index === 0
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-500 hover:bg-dark-50 hover:text-dark-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <Link
            href={featuredPost.slug}
            className="block group"
          >
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 border border-primary-100 hover:border-primary-200 transition-all">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-dark-600 text-xs font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-dark-500 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-dark-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 md:pb-28 bg-white">
        <div className="container-custom">
          <h3 className="text-xl font-bold text-dark-900 mb-8">Latest Articles</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <Link
                key={post.title}
                href={post.slug}
                className="group block"
              >
                <article className="bg-white rounded-2xl border border-dark-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {/* Thumbnail placeholder */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-dark-50 to-dark-100 flex items-center justify-center">
                    <Tag className="w-8 h-8 text-dark-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-dark-400">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-dark-500 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-dark-400">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-dark-400">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" size="lg" href="#" icon={<ArrowRight className="w-5 h-5" />}>
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay ahead of the curve
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            Get the latest business tips, product updates, and industry insights delivered
            straight to your inbox. No spam, ever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3.5 rounded-xl border-0 text-sm focus:ring-2 focus:ring-primary-300 outline-none"
            />
            <Button variant="accent" className="w-full sm:w-auto whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
