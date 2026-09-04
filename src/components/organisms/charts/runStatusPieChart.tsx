'use client';
import { PieChart } from '@mui/x-charts/PieChart';

interface RunStatusPieChartProps {
  completed: number;
  failed: number;
  running: number;
  cancelled: number;
}

export function RunStatusPieChart({
  completed,
  failed,
  running,
  cancelled,
}: RunStatusPieChartProps) {
  const items = [
    { id: 0, value: completed, label: 'Completed', color: '#22C55E' },
    { id: 1, value: failed, label: 'Failed', color: '#EF4444' },
    { id: 2, value: running, label: 'Running', color: '#EAB308' },
    { id: 3, value: cancelled, label: 'Cancelled', color: '#6B7280' },
  ].filter((i) => i.value > 0);

  const total = items.reduce((sum, i) => sum + i.value, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="shrink-0">
        <PieChart
          series={[
            {
              data: items,
              innerRadius: 30,
              outerRadius: 60,
              paddingAngle: 2,
              cornerRadius: 4,
            },
          ]}
          width={140}
          height={140}
          hideLegend
          slots={{ tooltip: () => null }}
        />
      </div>
      <div className="w-full space-y-1.5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
              {item.label}
            </span>
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {total > 0 ? Math.round((item.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
