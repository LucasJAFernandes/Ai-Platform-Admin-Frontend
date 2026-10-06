'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Badge } from '@/components/atoms/badge';

Chart.register(...registerables);

interface AIUsageCostChartProps {
  aiCosts?: { date: string; tokens: number; costs: number }[];
}

export function AIUsageCostChart({ aiCosts }: AIUsageCostChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
    const tickColor = isDark ? '#888' : '#aaa';

    const labels = ['116k', '18k+', '130k', '165s', '195k', '164m', '24kr'];
    const dailyCost = (aiCosts || []).map((item) => item?.costs ?? null);
    const tokensUsed = (aiCosts || []).map((item) => item?.tokens ?? null);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Daily Cost',
            data: dailyCost,
            backgroundColor: '#fbbf24',
            borderRadius: 3,
            yAxisID: 'y',
            order: 2,
          },
          {
            type: 'line',
            label: 'Tokens Used',
            data: tokensUsed,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34,197,94,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#22c55e',
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
                  ? `Cost: €${ctx?.parsed?.y?.toFixed(1)}K`
                  : `Tokens: ${ctx?.parsed?.y?.toFixed(1)}K`,
            },
          },
        },
        scales: {
          x: {
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
              callback: (v) => `€${Number(v).toFixed(1)}K`,
            },
          },
          y2: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#22c55e',
              font: { size: 10 },
              padding: 2,
              callback: (v) => `${Number(v).toFixed(0)}K`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [aiCosts]);

  return (
    <div className="min-w-0 rounded-xl bg-zinc-200 p-2 transition-all duration-300 dark:bg-zinc-800 min-[400px]:p-3 sm:p-4">
      <div className="mb-2 flex flex-col items-start gap-1 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between min-[400px]:gap-2">
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-100 sm:text-base">
          AI Usage & Cost
        </h3>
        <Badge className="shrink-0 rounded-full bg-zinc-300 px-2 py-0.5 text-[10px] text-zinc-400 dark:bg-zinc-700 sm:text-xs">
          Last 30 days
        </Badge>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 min-[400px]:grid-cols-3 sm:flex sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] text-zinc-400">Tokens used</p>
          <p className="truncate text-sm font-semibold text-zinc-700 dark:text-zinc-100 sm:text-lg">
            430K
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-zinc-400">Daily cost avg</p>
          <p className="truncate text-sm font-semibold text-zinc-700 dark:text-zinc-100 sm:text-lg">
            €6.85K
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-zinc-400">Total cost</p>
          <p className="truncate text-sm font-semibold text-zinc-700 dark:text-zinc-100 sm:text-lg">
            15.0K
          </p>
        </div>
      </div>

      <div className="relative h-[240px] w-full min-w-0 min-[400px]:h-[220px] sm:h-[240px] lg:h-[220px]">
        <canvas ref={canvasRef} />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2 sm:flex sm:flex-wrap sm:gap-3">
        <span className="col-span-2 flex items-center gap-1 text-[11px] text-zinc-400 sm:col-span-1">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          Tokens Used
        </span>
        <span className="flex items-center gap-1 text-[11px] text-zinc-400">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" />
          Tokens (negado)
        </span>
        <span className="flex items-center gap-1 text-[11px] text-zinc-400">
          <span className="w-2.5 h-2.5 rounded bg-yellow-400 inline-block" />
          Daily Cost{' '}
          <strong className="text-zinc-600 dark:text-zinc-300 ml-1">
            €100
          </strong>{' '}
          /Tokens
        </span>
      </div>
    </div>
  );
}
