'use client';

import { PieChart } from '@mui/x-charts';
import { useState } from 'react';
import type { TenantStatusChartProps } from '@/lib/types/healty.types';

const STATUS_COLORS: Record<string, string> = {
  active: '#10B981',
  trial: '#3B82F6',
  suspended: '#F59E0B',
  cancelled: '#EF4444',
};

export function TenantStatusChart({ data }: TenantStatusChartProps) {
  const [activeItem, setActiveItem] = useState<{
    label: string;
    value: number;
    color: string;
    pct: number;
  } | null>(null);

  if (!data) {
    return (
      <div className="min-w-0 w-full rounded-xl border border-gray-200 bg-zinc-200 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-4">
        <h3 className="mb-4 text-sm font-bold text-zinc-700 dark:text-zinc-100">
          Tenant Status
        </h3>
        <div className="flex h-32 items-center justify-center text-center text-zinc-500 dark:text-zinc-400">
          No status data available
        </div>
      </div>
    );
  }

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const items = Object.entries(data).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: STATUS_COLORS[key] ?? '#888',
    pct: total > 0 ? Math.round((value / total) * 100) : 0,
  }));

  return (
    <div className="min-w-0 w-full rounded-xl border border-gray-200 bg-zinc-200 p-3 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 sm:p-4">
      <h3 className="mb-4 text-sm font-bold text-zinc-700 dark:text-zinc-100">
        Tenant Status
      </h3>
      <div className="flex min-w-0 flex-col items-center gap-3 min-[420px]:flex-row">
        <div className="shrink-0">
          <PieChart
            series={[{ data: items.map((item, index) => ({ id: index, value: item.value, label: item.label, color: item.color })), innerRadius: 30, outerRadius: 60, paddingAngle: 2, cornerRadius: 4 }]}
            width={140}
            height={122}
            hideLegend
            onHighlightChange={(highlight) =>
              setActiveItem(
                highlight?.dataIndex !== undefined
                  ? items[highlight.dataIndex] ?? null
                  : null,
              )
            }
            slots={{ tooltip: () => null }}
          />
        </div>
        <div className="flex min-h-[122px] w-full min-w-0 flex-1 items-center">
          {activeItem ? (
            <div className="w-full">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: activeItem.color }} />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activeItem.label}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between gap-2"><span className="text-xs text-zinc-500 dark:text-zinc-400">Count</span><span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">{activeItem.value}</span></div>
                <div className="flex justify-between gap-2"><span className="text-xs text-zinc-500 dark:text-zinc-400">Percentage</span><span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">{activeItem.pct}%</span></div>
                <div className="pt-1"><div className="h-1.5 w-full rounded-full bg-zinc-300 dark:bg-zinc-700"><div className="h-1.5 rounded-full" style={{ width: `${activeItem.pct}%`, backgroundColor: activeItem.color }} /></div></div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-1.5">
              {items.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="min-w-0 flex-1 truncate text-xs text-zinc-600 dark:text-zinc-400">{item.label}</span>
                  <span className="shrink-0 text-xs font-medium text-zinc-700 dark:text-zinc-300">{item.pct}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-300 pt-3 dark:border-zinc-700">
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Total Tenants</span>
        <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">{total}</span>
      </div>
    </div>
  );
}