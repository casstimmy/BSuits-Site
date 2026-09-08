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
              'inline-flex items-center px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] border',
              dark
                ? 'border-white/20 bg-white/5 text-white/90'
                : 'border-dark-300 bg-dark-50 text-dark-800'
            )}
          >
            {badge}
          </span>
        </div>
      )}
      <h2
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance tracking-tight',
          dark ? 'text-white' : 'text-dark-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-base md:text-lg max-w-3xl leading-relaxed',
            centered && 'mx-auto',
            dark ? 'text-white/70' : 'text-dark-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
