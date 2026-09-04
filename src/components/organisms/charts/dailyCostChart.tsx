'use client';
import { BarChart } from '@mui/x-charts/BarChart';
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

  return (
    <div className="w-full h-[220px] sm:h-[260px]">
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
