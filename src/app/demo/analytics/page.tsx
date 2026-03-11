import React from 'react';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AnalyticsDemoPage() {
  return (
    <div className="min-h-screen bg-dark-50/40">
      <section className="pt-24 pb-10 gradient-bg-light">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-dark-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Analytics and Reports Demo</span>
          </div>
          <SectionHeading
            badge="Analytics Demo"
            title="Analytics and reports demo"
            subtitle="This demo page is being prepared. Request a tailored walkthrough for your business."
            centered={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="md" href="/features">
              Back to Features
            </Button>
            <Button variant="primary" size="md" href="/contact">
              Request Analytics Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <Card padding="lg" elevated>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-rose-700" />
              </div>
              <div>
                <p className="text-sm text-dark-500">Preview</p>
                <h3 className="text-xl font-bold text-dark-900">Analytics Demo Preview</h3>
              </div>
            </div>
            <div className="aspect-[16/10] rounded-2xl border border-dark-200 bg-white flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-sm font-semibold text-dark-900">Analytics Preview</p>
                <p className="text-xs text-dark-400">Image placeholder</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
