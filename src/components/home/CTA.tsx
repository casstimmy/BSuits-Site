import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-20 md:py-28 gradient-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance">
          Ready to get your custom{' '}
          <span className="text-primary-300">business system</span>?
        </h2>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
          Every BizSuits system is custom-built for your specific operations,
          fully owned by you, with complete setup and training included.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            variant="accent"
            size="lg"
            href="/contact"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Schedule a Demo
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href="/pricing"
            className="!text-white hover:!bg-white/10"
          >
            View Pricing
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-400" />
            Custom Built for Your Business
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-400" />
            Full Setup & Training Included
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-400" />
            You Own It Forever
          </div>
        </div>
      </div>
    </section>
  );
}
