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
        'transition-all duration-200 ease-in-out',
        elevated
          ? 'card-elevated'
          : 'card',
        hover && 'hover:border-dark-900',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
