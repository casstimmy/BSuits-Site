import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 md:p-10',
};

export default function Card({
  children,
  className,
  elevated = false,
  hover = true,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl transition-all duration-300 ease-in-out',
        elevated
          ? 'bg-white shadow-lg'
          : 'bg-white border border-dark-100 shadow-sm',
        hover && (elevated ? 'hover:shadow-xl hover:-translate-y-1' : 'hover:shadow-lg hover:-translate-y-1'),
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
