'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion, fadeInUp } from '@/components/ui/Motion';

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-[#0F172A] text-white border-y border-dark-800 relative">
      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-500/40 bg-primary-950/60 text-xs font-mono uppercase tracking-wider text-accent-300 font-semibold mb-6">
            Production Deployment Ready
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6 text-balance tracking-tight">
            Ready to deploy a system{' '}
            <span className="text-primary-400">tailored to your business</span>?
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto font-sans">
            Whether you need counter-side till checkout, warehouse inventory sync, agro-operations tracking, or automated bank statement pipelines, BizSuits architects and deploys it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Schedule a Consultation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/pricing"
              className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white"
            >
              View Engagement Tiers
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-sans border-t border-slate-800 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
              <span>Full Source Ownership &amp; Code Handoff</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
              <span>Staff Training &amp; Operational Go-Live Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
              <span>Dedicated Maintenance &amp; Upgrade SLA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
