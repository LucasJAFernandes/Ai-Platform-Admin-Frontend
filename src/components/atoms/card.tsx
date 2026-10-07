import React, { type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article';
}

type CardSectionProps = HTMLAttributes<HTMLDivElement>;

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function Card({ as: Component = 'div', className, ...props }: CardProps) {
  return (
    <Component
      className={[
        'rounded-lg border',
        'border-white/20 dark:border-zinc-800/40',
        'shadow-sm backdrop-blur',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardSectionProps) {
  return (
    <div className={['p-4', className].filter(Boolean).join(' ')} {...props} />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={['text-sm font-semibold', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={['text-xs text-muted-foreground', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={['p-4 pt-0', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={['p-4 pt-0', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
