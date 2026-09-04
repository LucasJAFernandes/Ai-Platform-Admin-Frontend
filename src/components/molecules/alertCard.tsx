'use client';

import { CardContent } from '@/components/atoms/card';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface CardAlertProps {
  overallStatus: 'operational' | 'degraded' | 'outage';
  operationalCount: number;
  totalServices: number;
}

const statusConfig: Record<
  string,
  { color: string; bgColor: string; icon: React.ElementType; label: string }
> = {
  operational: {
    color: 'text-white',
    bgColor: 'bg-green-400',
    icon: CheckCircle,
    label: 'Operational',
  },
  degraded: {
    color: 'text-white',
    bgColor: 'bg-yellow-400',
    icon: AlertTriangle,
    label: 'Degraded',
  },
  outage: {
    color: 'text-white',
    bgColor: 'bg-red-600',
    icon: XCircle,
    label: 'Outage',
  },
};

export function CardAlert({
  overallStatus,
  operationalCount,
  totalServices,
}: CardAlertProps) {
  return (
    <div className="bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300 mb-4">
      <CardContent className="pt-4">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'p-4 rounded-xl',
                statusConfig[overallStatus].bgColor,
              )}
            >
              {(() => {
                const Icon = statusConfig[overallStatus].icon;
                return (
                  <Icon
                    className={cn('w-8 h-8', statusConfig[overallStatus].color)}
                  />
                );
              })()}
            </div>
            <div>
              <h2 className="md:text-2xl font-bold text-zinc-500 dark:text-zinc-200">
                {overallStatus === 'operational'
                  ? 'All Systems Operational'
                  : overallStatus === 'degraded'
                    ? 'Partial System Degradation'
                    : 'System Outage Detected'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {operationalCount} out of {totalServices} services operational
              </p>
            </div>
          </div>
          <div className="md:text-right text-center items-center mt-5 flex md:static md:mt-0">
            <p className="text-sm text-gray-400 mr-2">Last updated:</p>
            <p
              className="dark:text-white text-gray-900"
              suppressHydrationWarning
            >
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
