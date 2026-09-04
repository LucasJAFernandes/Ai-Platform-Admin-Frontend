import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-300 disabled:cursor-not-allowed dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-600',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
