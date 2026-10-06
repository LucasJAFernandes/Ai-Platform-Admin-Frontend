'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { PlanStat } from '@/lib/types/organization.types';

interface ByPlanChartProps {
  data?: PlanStat[];
}

export function ByPlanChart({ data }: ByPlanChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const totalTenants = data?.reduce((sum, plan) => sum + plan.count, 0) ?? 0;
  const totalMrr = data?.reduce((sum, plan) => sum + plan.mrr, 0) ?? 0;

  useEffect(() => {
    if (!canvasRef.current || !data?.length) return;
    chartRef.current?.destroy();

    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const tickColor = isDark ? '#a1a1aa' : '#71717a';

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map((plan) => plan.plan_name),
        datasets: [
          {
            type: 'bar',
            label: 'Tenants',
            data: data.map((plan) => plan.count),
            backgroundColor: data.map((plan) => plan.plan_color || '#3B82F6'),
            borderRadius: 4,
            yAxisID: 'y',
            order: 2,
          },
          {
            type: 'line',
            label: 'MRR',
            data: data.map((plan) => plan.mrr),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#10B981',
            tension: 0.4,
            fill: false,
            yAxisID: 'y2',
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ctx.datasetIndex === 0
                  ? `Tenants: ${ctx.parsed.y}`
                  : `MRR: $${(ctx.parsed.y ?? 0).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            type: 'category',
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 10 },
              autoSkip: true,
              maxTicksLimit: 5,
              maxRotation: 35,
              minRotation: 0,
            },
          },
          y: {
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 10 },
              padding: 2,
              stepSize: 1,
              callback: (value) =>
                Number.isInteger(Number(value)) ? `${value}` : '',
            },
          },
          y2: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#10B981',
              font: { size: 10 },
              padding: 2,
              callback: (value) => `$${Number(value).toLocaleString()}`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data]);

  if (!data?.length) {
    return (
      <div className="min-w-0 w-full rounded-xl border border-gray-200 bg-zinc-200 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-4">
        <h3 className="mb-4 text-sm font-bold text-zinc-700 dark:text-zinc-100">By Plan</h3>
        <div className="flex h-32 items-center justify-center text-center text-zinc-500 dark:text-zinc-400">No plan data available</div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 rounded-xl border border-gray-200 bg-zinc-200 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 sm:p-4">
      <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-100">By Plan</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 sm:gap-3">
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: data[0]?.plan_color || '#3B82F6' }} />Tenants</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />MRR</span>
        </div>
      </div>
      <div className="relative h-[200px] w-full min-w-0 sm:h-[170px] lg:h-[190px]"><canvas ref={canvasRef} /></div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-300 pt-3 dark:border-zinc-700">
        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 sm:text-sm">{totalTenants} tenants · ${totalMrr.toLocaleString()} MRR</span>
      </div>
    </div>
  );
}