'use client';
import { BarChart } from '@mui/x-charts/BarChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { DailyBreakdown } from '@/lib/types/analytics.types';

function formatDay(day: string | null) {
  if (!day) return '—';
  try {
    return new Date(day).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return day;
  }
}

export function DailyCostChart({ data }: { data: DailyBreakdown[] }) {
  const labels = data.map((d) => formatDay(d.day));
  const isMobile = useMediaQuery('(max-width: 639px)', { noSsr: true });

  if (isMobile) {
    return (
      <div className="h-[260px] w-full min-w-0 rounded-md bg-white/5 px-3 py-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-amber-500">Cost (USD)</span>
          <span className="text-xs text-gray-500">
            ${data.at(-1)?.cost_usd?.toFixed(2) ?? '0.00'}
          </span>
        </div>
        <SparkLineChart
          data={data.map((item) => item.cost_usd)}
          height={220}
          color="#F59E0B"
          showTooltip
          showHighlight
        />
      </div>
    );
  }

  return (
    <div className="h-[260px] w-full min-w-0 sm:h-[260px]">
      <BarChart
        height={260}
        hideLegend
        xAxis={[
          {
            scaleType: 'band',
            data: labels,
            tickLabelStyle: { fontSize: 10, fill: '#71717a' },
          },
        ]}
        yAxis={[
          {
            scaleType: 'linear',
            tickLabelStyle: { fontSize: 10, fill: '#71717a' },
          },
        ]}
        series={[
          {
            data: data.map((d) => d.cost_usd),
            label: 'Cost (USD)',
            color: '#F59E0B',
            valueFormatter: (v) => `$${v?.toFixed(2)}`,
          },
        ]}
        grid={{ horizontal: true }}
        margin={{ left: 50, right: 20, top: 30, bottom: 30 }}
      />
    </div>
  );
}
