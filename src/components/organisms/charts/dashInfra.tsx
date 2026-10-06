'use client';

import { useState } from 'react';
import { Server, HardDrive, Wifi, Database, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InfrastructureCosts as InfrastructureCosts } from '@/lib/types/dashboard.types';
import { infraColors } from '@/mocks/dashboard';
const infraIcons: Record<string, React.ReactNode> = {
  Compute: <Cpu className="w-4 h-4" />,
  Storage: <HardDrive className="w-4 h-4" />,
  Networking: <Wifi className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  backup: <HardDrive className="w-4 h-4" />,
  storage: <HardDrive className="w-4 h-4" />,
  licensing: <Server className="w-4 h-4" />,
  servers: <Server className="w-4 h-4" />,
  monitoring: <Database className="w-4 h-4" />,
  networking: <Wifi className="w-4 h-4" />,
  default: <Server className="w-4 h-4" />,
};

interface InfraBreakdownProps {
  data?: InfrastructureCosts;
}

export function InfrastructureBreakdown({ data }: InfraBreakdownProps) {
  const [view, setView] = useState<'category' | 'provider'>('category');

  const categories = data?.by_category || [];
  const total = categories.reduce((s, i) => s + i.amount, 0);
  const getDisplayName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="h-full min-w-0 rounded-xl border border-gray-200 bg-zinc-200 p-3 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 sm:p-4">
        <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-100">
            Infrastructure Costs Breakdown
          </h3>
        </div>
        <div className="flex w-full rounded-lg bg-zinc-300 p-0.5 text-xs dark:bg-zinc-700 sm:w-auto">
          {(['category', 'provider'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'flex-1 rounded-md px-2 py-1 capitalize font-medium transition-all sm:flex-none sm:px-3',
                view === v
                  ? 'bg-white dark:bg-zinc-600 text-zinc-800 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
              )}
            >
              By {v}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          €{total.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-zinc-500">Current month</p>
      </div>
      <div className="flex h-2.5 rounded-full overflow-hidden mb-4 gap-0.5">
        {categories.map((item, i) => (
          <div
            key={item.category}
            className={cn(
              'rounded-full transition-all duration-500',
              infraColors[i % infraColors.length],
            )}
            style={{ width: `${(item.amount / total) * 100}%` }}
            title={`${item.category}: €${item.amount.toFixed(2)}`}
          />
        ))}
      </div>
      <div className="max-h-[28vh] space-y-2.5 overflow-y-auto sm:max-h-[8vh]">
        {categories.map((item, i) => {
          const pct = Math.round((item.amount / total) * 100);
          const displayName = getDisplayName(item.category);
          return (
            <div key={item.category} className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
              <div
                className={cn(
                  'w-2 h-2 rounded-full flex-shrink-0',
                  infraColors[i % infraColors.length],
                )}
              />
              <div className="text-zinc-500 dark:text-zinc-400">
                {infraIcons[item.category.toLowerCase()] ?? infraIcons.default}
              </div>
              <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">
                {displayName}
              </span>
              <div className="ml-auto flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-300 dark:bg-zinc-700 sm:w-24">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      infraColors[i % infraColors.length],
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-7 text-right text-xs text-zinc-500 sm:w-8">
                  {pct}%
                </span>
                <span className="w-20 text-right text-sm font-semibold text-zinc-700 sm:w-16">
                  €{item.amount.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
