'use client';
import { LineChart } from '@mui/x-charts/LineChart';
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

export function DailyRunsTokensChart({ data }: { data: DailyBreakdown[] }) {
  const labels = data.map((d) => formatDay(d.day));

  return (
    <div className="w-full h-[240px] sm:h-[280px]">
      <LineChart
        height={280}
        xAxis={[
          {
            scaleType: 'band',
            data: labels,
            tickLabelStyle: { fontSize: 10, fill: '#71717a' },
            disableTicks: true,
          },
        ]}
        yAxis={[
          {
            id: 'runsAxis',
            tickLabelStyle: { fill: '#71717a', fontSize: 11 },
          },
          {
            id: 'tokensAxis',
            tickLabelStyle: { fill: '#71717a', fontSize: 11 },
          },
        ]}
        series={[
          {
            id: 'runs',
            data: data.map((d) => d.runs),
            label: 'Runs',
            color: '#3B82F6',
            yAxisId: 'runsAxis',
            showMark: false,
            curve: 'monotoneX',
          },
          {
            id: 'tokens',
            data: data.map((d) => d.tokens),
            label: 'Tokens',
            color: '#8B5CF6',
            yAxisId: 'tokensAxis',
            showMark: false,
            curve: 'monotoneX',
          },
        ]}
        grid={{ horizontal: true }}
        margin={{ left: 40, right: 40, top: 30, bottom: 30 }}
        hideLegend
      />
    </div>
  );
}
