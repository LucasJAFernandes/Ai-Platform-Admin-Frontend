import { BarChart } from '@mui/x-charts';
import Box from '@mui/material/Box';
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
  return (
    <div className="bg-zinc-200 p-6 w-full rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md mt-5 border border-gray-200 dark:border-zinc-700 hover:border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="dark:text-white text-zinc-900 font-bold text-zinc-100 flex items-center gap-1">
          Module Usage
        </h3>
        <div className="dark:bg-zinc-700 text-zinc-900 dark:text-zinc-300 text-xs rounded-md outline-none">
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

      <Box sx={{ width: '100%', height: 280 }}>
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
              width: 46,
              tickMinStep: 25,
              valueFormatter: (value: number) => `${value}%`,
              tickLabelStyle: { fill: '#71717a', fontSize: 11 },
            },
          ]}
          height={300}
          borderRadius={8}
          barLabel="value"
          series={[
            {
              data: subscriptionTotals,
              color: 'url(#barGradient)',
              valueFormatter: (value: number | null) => `${value}%`,
            },
          ]}
          margin={{ top: 30, bottom: 20, left: 46, right: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiChartsAxis-line': { stroke: '#27272a' },
            '& .MuiChartsGrid-line': {
              stroke: '#27272a',
              strokeDasharray: '3 3',
            },
            '& .MuiBarLabel-root': {
              fill: '#fafafa',
              fontSize: 12,
              fontWeight: 600,
            },
            '& .MuiBarElement-root': {
              filter: 'drop-shadow(0px 2px 6px rgba(37,99,235,0.35))',
            },
          }}
        />
      </Box>

      <div className="w-full flex items-center justify-center">
        <div className="flex flex-wrap  justify-center">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Badge
                key={m.key}
                className="flex mx-2 items-center gap-1.5 text-xs px-2.5 py-1 rounded-full hover:text-white text-zinc-900 dark:bg-zinc-700 dark:text-zinc-300"
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
