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
        <span
          className={clsx(
            'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-4',
            dark
              ? 'bg-white/10 text-white/90'
              : 'bg-primary-100 text-primary-700'
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance',
          dark ? 'text-white' : 'text-dark-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-lg md:text-xl max-w-3xl',
            centered && 'mx-auto',
            dark ? 'text-white/70' : 'text-dark-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
