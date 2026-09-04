import * as React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
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

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div className={['p-4', className].filter(Boolean).join(' ')} {...props} />
  );
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <div
      className={['text-sm font-semibold', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: DivProps) {
  return (
    <div
      className={['text-xs text-muted-foreground', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return (
    <div
      className={['p-4 pt-0', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      className={['p-4 pt-0', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
