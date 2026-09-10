import React from 'react';
import { clsx } from 'clsx';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={clsx(centered && 'text-center', 'mb-12 md:mb-16', className)}>
      {badge && (
        <div className="mb-4">
          <span
            className={clsx(
              'inline-flex items-center px-3.5 py-1 text-xs font-semibold uppercase tracking-wider border',
              dark
                ? 'border-white/20 bg-white/5 text-white/90'
                : 'border-primary-200 bg-primary-50/60 text-primary-700'
            )}
          >
            {badge}
          </span>
        </div>
      )}
      <h2
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 text-balance tracking-tight',
          dark ? 'text-white' : 'text-dark-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-base md:text-lg max-w-3xl leading-relaxed font-sans',
            centered && 'mx-auto',
            dark ? 'text-slate-300' : 'text-dark-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
