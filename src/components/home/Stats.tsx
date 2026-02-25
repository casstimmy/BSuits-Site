import React from 'react';

const stats = [
  { value: '50K+', label: 'Businesses Served', suffix: '' },
  { value: '99.9%', label: 'Uptime Guarantee', suffix: '' },
  { value: '$2B+', label: 'Transactions Processed', suffix: '' },
  { value: '150+', label: 'Countries Worldwide', suffix: '' },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-20 gradient-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-white/60 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
