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
    <div className="bg-zinc-200  h-full dark:bg-zinc-800 p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm">
            Infrastructure Costs Breakdown
          </h3>
        </div>
        <div className="flex bg-zinc-300 dark:bg-zinc-700 rounded-lg p-0.5 text-xs">
          {(['category', 'provider'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'px-3 py-1 rounded-md capitalize transition-all font-medium',
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
        <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
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
      <div className="space-y-2.5 max-h-[8vh] overflow-y-auto">
        {categories.map((item, i) => {
          const pct = Math.round((item.amount / total) * 100);
          const displayName = getDisplayName(item.category);
          return (
            <div key={item.category} className="flex items-center gap-3">
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
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      infraColors[i % infraColors.length],
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-500 w-8 text-right">
                  {pct}%
                </span>
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 w-16 text-right">
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
