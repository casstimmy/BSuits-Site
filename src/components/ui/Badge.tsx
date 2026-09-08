import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses = {
  primary: 'border border-primary-300 bg-primary-50 text-primary-900',
  accent: 'border border-accent-300 bg-accent-50 text-accent-900',
  dark: 'border border-dark-900 bg-dark-950 text-white',
  outline: 'border border-dark-300 text-dark-700 bg-white',
};

export default function Badge({ children, variant = 'primary', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-mono uppercase tracking-[0.16em]',
        variantClasses[variant],
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
        className
      )}
    >
      {children}
    </span>
  );
}
