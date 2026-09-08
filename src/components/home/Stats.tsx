import React from 'react';

const stats = [
  { value: '50K+', label: 'Businesses Served', suffix: '' },
  { value: '99.9%', label: 'Uptime Guarantee', suffix: '' },
  { value: '$2B+', label: 'Transactions Processed', suffix: '' },
  { value: '150+', label: 'Countries Worldwide', suffix: '' },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-20 bg-dark-950 text-white border-y border-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-10" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-dark-800 border border-dark-800 bg-dark-900/50">
          {stats.map((stat) => (
            <div key={stat.label} className="p-8 text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-white/60 font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
