'use client';
import { LineChart } from '@mui/x-charts/LineChart';
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

export function DailyRunsTokensChart({ data }: { data: DailyBreakdown[] }) {
  const labels = data.map((d) => formatDay(d.day));
  const isMobile = useMediaQuery('(max-width: 639px)', { noSsr: true });
  const chartHeight = isMobile ? 320 : 280;
  const chartMargin = isMobile
    ? { left: 32, right: 24, top: 20, bottom: 24 }
    : { left: 40, right: 40, top: 30, bottom: 30 };

  if (isMobile) {
    return (
      <div className="grid h-[320px] w-full min-w-0 grid-cols-1 gap-3 py-2">
        <div className="min-w-0 rounded-md bg-white/5 px-3 py-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-blue-500">Runs</span>
            <span className="text-xs text-gray-500">
              {data.at(-1)?.runs?.toLocaleString() ?? '0'}
            </span>
          </div>
          <SparkLineChart
            data={data.map((item) => item.runs)}
            height={110}
            color="#3B82F6"
            showTooltip
            showHighlight
          />
        </div>
        <div className="min-w-0 rounded-md bg-white/5 px-3 py-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-purple-500">Tokens</span>
            <span className="text-xs text-gray-500">
              {data.at(-1)?.tokens?.toLocaleString() ?? '0'}
            </span>
          </div>
          <SparkLineChart
            data={data.map((item) => item.tokens)}
            height={110}
            color="#8B5CF6"
            showTooltip
            showHighlight
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 w-full h-[320px] sm:h-[280px]">
      <LineChart
        sx={{ width: '100%', minWidth: 0 }}
        height={chartHeight}
        xAxis={[
          {
            scaleType: 'band',
            data: labels,
            tickLabelStyle: { fontSize: isMobile ? 10 : 10, fill: '#71717a' },
            tickLabelInterval: isMobile
              ? (_, index) => index % 2 === 0
              : undefined,
            disableTicks: true,
          },
        ]}
        yAxis={[
          {
            id: 'runsAxis',
            tickLabelStyle: {
              fill: '#71717a',
              fontSize: isMobile ? 12 : 11,
            },
          },
          {
            id: 'tokensAxis',
            tickLabelStyle: {
              fill: '#71717a',
              fontSize: isMobile ? 12 : 11,
            },
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
        margin={chartMargin}
        hideLegend
      />
    </div>
  );
}
