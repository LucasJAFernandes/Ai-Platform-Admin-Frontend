import { Badge } from '@/components/atoms/badge';
import type { Alert } from '@/lib/types/billing.types';

interface StatsCardsProps {
  alerts: Alert[];
  severityConfig: Record<
    string,
    { color: string; bgColor: string; icon: React.ElementType }
  >;
  formatDate: (dateString: string) => string;
}

export function AlertList({
  alerts,
  severityConfig,
  formatDate,
}: StatsCardsProps) {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity] || severityConfig.info;
        const Icon = config.icon;

        return (
          <div
            key={alert.id}
            className="rounded-xl bg-zinc-300 p-3 transition-all hover:bg-zinc-400 dark:bg-white/5 dark:hover:bg-white/10 sm:p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-1 shrink-0 rounded-lg bg-zinc-200 p-2 dark:bg-zinc-900"
              >
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="min-w-0 break-words font-medium text-zinc-900 dark:text-white">
                    {alert.title}
                  </p>

                  <Badge
                    className={`shrink-0 border-0 bg-zinc-200 text-xs dark:bg-zinc-900 ${config.color}`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="mt-1 break-words text-sm text-gray-500 dark:text-gray-400">
                  {alert.message}
                </p>
                <div className="mt-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="break-words text-xs text-gray-500">
                    {alert.tenant_name} • {formatDate(alert.created_at)}
                  </p>
                  {!alert.is_read && (
                    <Badge
                      variant="outline"
                      className="border-orange-500 text-xs text-orange-500"
                    >
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
