import { cn } from '@/lib/utils';
import type { TenantUsageItem } from '@/lib/types/analytics.types';

interface TokenUsageByTenantProps {
  data: TenantUsageItem[];
  className?: string;
}

export function TokenUsageByTenant({
  data,
  className,
}: TokenUsageByTenantProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tenant usage data available
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {data.map((tenant) => (
        <div key={tenant.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-800 dark:text-white font-medium">
              {tenant.name}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {tenant.usage.toLocaleString()} tokens
              <span
                className={cn(
                  'ml-2 text-xs',
                  tenant.growth > 0
                    ? 'text-green-500'
                    : tenant.growth < 0
                      ? 'text-red-500'
                      : 'text-gray-500',
                )}
              >
                ({tenant.growth > 0 ? '+' : ''}
                {tenant.growth}%)
              </span>
            </span>
          </div>
          <div className="h-2 dark:bg-zinc-700 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                tenant.percentage > 80
                  ? 'bg-red-500'
                  : tenant.percentage > 50
                    ? 'bg-yellow-500'
                    : 'bg-teal-500',
              )}
              style={{ width: `${Math.min(tenant.percentage, 100)}%` }}
              role="progressbar"
              aria-valuenow={tenant.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
