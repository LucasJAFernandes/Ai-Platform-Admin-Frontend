'use client';

import { BarChart } from '@mui/x-charts';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MODULES } from '@/mocks/dashboard';
import { Badge } from '@/components/atoms/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/atoms/select';

export default function ModalUsage({
  subscriptionDates,
  subscriptionTotals,
}: {
  subscriptionDates: string[];
  subscriptionTotals: number[];
}) {
  /**
   * The chart area is `width - margins - axis size`, so on small screens the
   * reserved space has to shrink, otherwise the bars and their labels overlap.
   * `noSsr` avoids a hydration mismatch between the server and the client.
   */
  const isSmallScreen = useMediaQuery('(max-width: 640px)', { noSsr: true });

  const chartHeight = isSmallScreen ? 240 : 300;
  const axisWidth = isSmallScreen ? 34 : 46;

  return (
    <div className="bg-zinc-200 p-4 sm:p-6 w-full rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md mt-5 border border-gray-200 dark:border-zinc-700 hover:border-gray-300">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h3 className="dark:text-white text-zinc-900 font-bold flex items-center gap-1">
          Module Usage
        </h3>
        <div className="dark:bg-zinc-700 text-zinc-900 dark:text-zinc-300 text-xs rounded-md outline-none shrink-0">
          <Select>
            <SelectTrigger>
              <SelectValue
                defaultValue="subscriptions"
                placeholder="Subscriptions"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="subscriptions">Subscriptions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Box sx={{ width: '100%', height: chartHeight }}>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>

        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: subscriptionDates,
              disableTicks: true,
              tickLabelStyle: { fill: 'transparent' },
            },
          ]}
          yAxis={[
            {
              width: axisWidth,
              tickMinStep: 25,
              valueFormatter: (value: number) => `${value}%`,
              tickLabelStyle: {
                fill: '#71717a',
                fontSize: isSmallScreen ? 10 : 11,
              },
            },
          ]}
          height={chartHeight}
          borderRadius={8}
          barLabel="value"
          series={[
            {
              data: subscriptionTotals,
              color: 'url(#barGradient)',
              valueFormatter: (value: number | null) => `${value}%`,
            },
          ]}
          margin={{
            top: isSmallScreen ? 24 : 30,
            bottom: isSmallScreen ? 12 : 20,
            left: 0,
            right: isSmallScreen ? 8 : 20,
          }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiChartsAxis-line': { stroke: '#27272a' },
            '& .MuiChartsGrid-line': {
              stroke: '#27272a',
              strokeDasharray: '3 3',
            },
            '& .MuiBarLabel-root': {
              fill: '#fafafa',
              fontSize: isSmallScreen ? 10 : 12,
              fontWeight: 600,
            },
            '& .MuiBarElement-root': {
              filter: 'drop-shadow(0px 2px 6px rgba(37,99,235,0.35))',
            },
          }}
        />
      </Box>

      <div className="w-full flex items-center justify-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Badge
                key={m.key}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full hover:text-white text-zinc-900 dark:bg-zinc-700 dark:text-zinc-300"
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]"
                  style={{ backgroundColor: m.color ?? '#3b82f6' }}
                >
                  <Icon size={14} color="white" />
                </span>
                {m.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
