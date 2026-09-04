'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none cursor-pointer disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black hover:opacity-90 rounded-md ',
        destructive:
          'bg-red-100 border border-red-400 text-white dark:bg-red-200 dark:text-white hover:bg-red-300 rounded-md ',
        outline:
          'border border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-white/60 dark:hover:bg-white/5 rounded-md ',
        ghost: 'hover:bg-zinc-100/60 dark:hover:bg-white/10 rounded-md ',
        gradient:
          'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white rounded-md ',
        selection: 'bg-transparent hover:bg-white/60 dark:hover:bg-white/5',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
