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
            ticks: { color: tickColor, font: { size: 11 }, autoSkip: false },
          },
          y: {
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 11 },
              callback: (v) => `€${Number(v).toFixed(1)}K`,
            },
          },
          y2: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#22c55e',
              font: { size: 11 },
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
    <div className="bg-zinc-200 p-3 rounded-xl dark:bg-zinc-800 transition-all duration-300 ">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-zinc-700 dark:text-zinc-100">
          AI Usage & Cost
        </h3>
        <Badge className="text-xs text-zinc-400 bg-zinc-300 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
          Last 30 days
        </Badge>
      </div>

      <div className="flex gap-4 mb-3">
        <div>
          <p className="text-[10px] text-zinc-400">Tokens used</p>
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
            430K
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-400">Daily cost avg</p>
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
            €6.85K
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-400">Total cost</p>
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
            15.0K
          </p>
        </div>
      </div>

      <div className="relative w-full h-[200px]">
        <canvas ref={canvasRef} />
      </div>

      <div className="flex gap-3 mt-2 flex-wrap">
        <span className="flex items-center gap-1 text-[11px] text-zinc-400">
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
