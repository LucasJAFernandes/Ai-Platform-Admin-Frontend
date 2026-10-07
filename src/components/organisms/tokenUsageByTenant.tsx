import { cn } from '@/lib/utils';
import type { TokenUsageByTenantProps } from '@/lib/types/components/organisms';

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
    <div className={cn('min-w-0 space-y-3 sm:space-y-4', className)}>
      {data.map((tenant) => (
        <div key={tenant.name} className="min-w-0 space-y-2">
          <div className="flex flex-col items-start gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="min-w-0 max-w-full break-words font-medium text-zinc-800 dark:text-white">
              {tenant.name}
            </span>
            <span className="flex max-w-full flex-wrap items-center gap-x-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              <span className="whitespace-nowrap">
                {tenant.usage.toLocaleString()} tokens
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-xs',
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
