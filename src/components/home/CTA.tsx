'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, fadeInUp } from '@/components/ui/Motion';

export default function CTA() {
  return (
    <section className="py-20 md:py-28 gradient-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-15" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
        <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/80 mb-6">
          <span className="h-1.5 w-1.5 bg-accent-400" />
          Custom Systems // Built for Success
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-white mb-6 text-balance tracking-tight">
          Ready to scale with a custom system{' '}
          <span className="text-primary-400">built for your business</span>?
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
          We build powerful, scalable and secure systems tailored to your business needs — from retail and inventory to agriculture and document automation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            variant="accent"
            size="lg"
            href="/contact"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Get Started Today
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href="/pricing"
            className="!text-white border-white/20 hover:!bg-white/10 hover:border-white/40"
          >
            View Pricing
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-white/60">
          <div className="flex items-center gap-2 border border-white/10 px-3 py-1.5 bg-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
            Tailored To Your Business Needs
          </div>
          <div className="flex items-center gap-2 border border-white/10 px-3 py-1.5 bg-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
            Cloud &amp; Offline Resilient
          </div>
          <div className="flex items-center gap-2 border border-white/10 px-3 py-1.5 bg-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
            Support &amp; Maintenance Included
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
