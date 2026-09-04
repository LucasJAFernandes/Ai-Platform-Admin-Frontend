'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type FormCardProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  showBrand?: boolean;
  className?: string;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl';
  footer?: React.ReactNode;
}>;

export default function FormCard({
  title,
  description,
  showBrand = true,
  className,
  maxWidth = 'md',
  children,
  footer,
}: FormCardProps) {
  const maxWClass =
    maxWidth === '2xl'
      ? 'max-w-2xl'
      : maxWidth === 'xl'
        ? 'max-w-xl'
        : maxWidth === 'lg'
          ? 'max-w-lg'
          : 'max-w-md';

  return (
    <div
      className={cn(
        'w-full',
        maxWClass,
        'rounded-2xl border border-zinc-200 dark:border-zinc-600 p-2 bg-white/70 dark:bg-black/40',
        className,
      )}
      data-neural-quiet
    >
      {showBrand && (
        <div>
          <div className="flex justify-center items-center  py-3">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                priority
                className="rounded-sm"
              />
            </Link>
          </div>
        </div>
      )}
      <div className="px-4">
        {(title || description) && (
          <div className="flex flex-col text-center mb-3">
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-4">{children}</div>
        {footer && (
          <div className="flex flex-col text-center items-center gap-2 pt-2 pb-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
