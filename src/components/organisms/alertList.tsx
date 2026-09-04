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
            className={`p-4 rounded-xl bg-zinc-300 dark:bg-white/5 transition-all hover:bg-zinc-400 dark:hover:bg-white/10 
                            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg dark:bg-zinc-900 bg-zinc-200 mt-1`}
              >
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-zinc-900 dark:text-white font-medium">
                    {alert.title}
                  </p>

                  <Badge
                    className={`dark:bg-zinc-900 bg-zinc-200 ${config.color} border-0 text-xs`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {alert.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    {alert.tenant_name} • {formatDate(alert.created_at)}
                  </p>
                  {!alert.is_read && (
                    <Badge
                      variant="outline"
                      className="text-orange-500 border-orange-500 text-xs"
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
