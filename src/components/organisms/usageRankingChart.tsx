'use client';

import { CardContent } from '@/components/atoms/card';
import { BarChart } from '@mui/x-charts/BarChart';

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

  const chartData = data.slice(0, 8).map((d) => ({
    name: d.name.length > 18 ? `${d.name.slice(0, 16)}…` : d.name,
    fullName: d.name,
    value: d.value,
  }));

  const height = Math.max(160, chartData.length * 36);

  return (
    <div className="rounded-lg border border-white/5">
      <CardContent className="p-4">
        <h3 className="text-sm mt-4 font-semibold dark:text-white mb-4">
          {title}
        </h3>

        <BarChart
          layout="horizontal"
          height={height}
          margin={{
            top: 0,
            right: 20,
            bottom: 20,
            left: 120,
          }}
          xAxis={[
            {
              scaleType: 'linear',
              tickLabelStyle: {
                fill: '#a1a1aa',
                fontSize: 11,
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
                fontSize: 11,
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
