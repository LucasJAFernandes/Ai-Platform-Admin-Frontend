import { CardContent } from '@/components/atoms/card';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
interface OverviewStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  icon: React.ElementType;
}

interface StatsInfoCardsProps {
  overviewStats: OverviewStat[];
}

export function StatsInfoCards({ overviewStats }: StatsInfoCardsProps) {
  return overviewStats.map((stat) => (
    <div
      key={stat.label}
      className="group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 p-1 mb-5 transition-all duration-300 transform hover:-translate-y-1"
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-zinc-700 dark:text-white mt-1">
              {stat.value}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>

            {stat.trend && (
              <div
                className={`flex items-center text-xs ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  ));
}
