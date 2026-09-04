'use client';

import { Card, CardContent } from '@/components/atoms/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface UsageStatusChartProps {
  completed: number;
  failed: number;
  running: number;
  cancelled: number;
}

const STATUS_COLORS = [
  { name: 'Completed', color: '#22c55e' },
  { name: 'Failed', color: '#ef4444' },
  { name: 'Running', color: '#eab308' },
  { name: 'Cancelled', color: '#71717a' },
];

export function UsageStatusChart({
  completed,
  failed,
  running,
  cancelled,
}: UsageStatusChartProps) {
  const chartData = [
    { name: 'Completed', value: completed },
    { name: 'Failed', value: failed },
    { name: 'Running', value: running },
    { name: 'Cancelled', value: cancelled },
  ].filter((d) => d.value > 0);

  const total = completed + failed + running + cancelled;

  if (total === 0) {
    return (
      <Card className="bg-[#1a1f2e] border-white/5">
        <CardContent className="p-4 flex items-center justify-center h-[280px]">
          <p className="text-sm text-gray-500">No runs in this period</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <CardContent className="p-4">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry) => {
                  const statusColor = STATUS_COLORS.find(
                    (s) => s.name === entry.name,
                  );
                  return (
                    <Cell
                      key={entry.name}
                      fill={statusColor?.color ?? '#71717a'}
                    />
                  );
                })}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f4f4f5',
                  border: '1px solid #d4d4d8',
                  borderRadius: 8,
                  color: '#18181b',
                  fontSize: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                itemStyle={{ color: '#18181b' }}
                formatter={(value, name) => {
                  const v = Number(value ?? 0);
                  return [`${v} (${((v / total) * 100).toFixed(1)}%)`, name];
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, color: '#a1a1aa' }}
                formatter={(value) => (
                  <span style={{ color: '#696969' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </div>
  );
}
