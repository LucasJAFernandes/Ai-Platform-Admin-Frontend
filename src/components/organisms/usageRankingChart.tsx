'use client';

import { CardContent } from '@/components/atoms/card';
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';

interface RankingItem {
  name: string;
  value: number;
}

interface UsageRankingChartProps {
  title: string;
  data: RankingItem[];
  color?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function UsageRankingChart({
  title,
  data,
  color = '#06b6d4',
  valuePrefix = '',
  valueSuffix = '',
}: UsageRankingChartProps) {
  if (data.length === 0) return null;

  const isMobile = useMediaQuery('(max-width: 639px)', { noSsr: true });
  const chartData = data.slice(0, 8).map((d) => ({
    name: d.name.length > (isMobile ? 12 : 18)
      ? `${d.name.slice(0, isMobile ? 10 : 16)}…`
      : d.name,
    fullName: d.name,
    value: d.value,
  }));

  const height = Math.max(isMobile ? 140 : 160, chartData.length * (isMobile ? 32 : 36));
  const maxValue = Math.max(...chartData.map((item) => item.value), 1);

  if (isMobile) {
    return (
      <div className="min-w-0 overflow-hidden rounded-lg border border-white/5">
        <CardContent className="p-3">
          <h3 className="mb-4 mt-2 text-sm font-semibold dark:text-white">
            {title}
          </h3>
          <div className="space-y-3">
            {chartData.map((item) => (
              <div key={item.fullName} className="min-w-0">
                <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                  <span className="min-w-0 truncate text-gray-600 dark:text-gray-400">
                    {item.fullName}
                  </span>
                  <span className="shrink-0 font-medium text-zinc-700 dark:text-gray-200">
                    {valuePrefix}
                    {item.value.toLocaleString()}
                    {valueSuffix}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: color,
                    }}
                    role="progressbar"
                    aria-label={item.fullName}
                    aria-valuemax={maxValue}
                    aria-valuemin={0}
                    aria-valuenow={item.value}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-white/5">
      <CardContent className="p-3 sm:p-4">
        <h3 className="mb-4 mt-2 text-sm font-semibold dark:text-white sm:mt-4">
          {title}
        </h3>

        <BarChart
          sx={{ width: '100%', minWidth: 0 }}
          layout="horizontal"
          height={height}
          margin={{
            top: 0,
            right: isMobile ? 12 : 20,
            bottom: isMobile ? 12 : 20,
            left: isMobile ? 78 : 120,
          }}
          xAxis={[
            {
              scaleType: 'linear',
              tickLabelStyle: {
                fill: '#a1a1aa',
                fontSize: isMobile ? 9 : 11,
              },
              disableLine: true,
              disableTicks: true,
              valueFormatter: (value) =>
                `${valuePrefix}${Number(value).toLocaleString()}${valueSuffix}`,
            },
          ]}
          yAxis={[
            {
              scaleType: 'band',
              data: chartData.map((item) => item.name),
              tickLabelStyle: {
                fill: '#a1a1aa',
                fontSize: isMobile ? 9 : 11,
              },
              disableLine: true,
              disableTicks: true,
            },
          ]}
          series={[
            {
              data: chartData.map((item) => item.value),
              color,
              label: title.replace('Top ', '').replace(' by ', ' — '),
            },
          ]}
          borderRadius={4}
          grid={{
            horizontal: false,
            vertical: true,
          }}
          hideLegend
        />
      </CardContent>
    </div>
  );
}
