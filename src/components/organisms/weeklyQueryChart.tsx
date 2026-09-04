import type { WeeklyDatum } from '@/lib/types/analytics.types';

interface WeeklyQueryChartProps {
  data: WeeklyDatum[];
  className?: string;
}

export function WeeklyQueryChart({ data }: WeeklyQueryChartProps) {
  const maxQueries =
    data.length > 0 ? Math.max(...data.map((d) => d.queries)) : 1;

  return (
    <div className="space-y-4">
      {data.map((day) => (
        <div key={day.day} className="flex items-center gap-4">
          <span className="w-10 text-sm dark:text-gray-300 text-gray-900">
            {day.day}
          </span>
          <div className="flex-1 h-6 dark:bg-zinc-700 bg-zinc-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${(day.queries / maxQueries) * 100}%` }}
            />
          </div>
          <span className="w-20 text-sm dark:text-gray-300 text-gray-900 text-right">
            {day.queries.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
