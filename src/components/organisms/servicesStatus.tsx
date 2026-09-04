'use client';
import { CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ServiceStatus } from '@/lib/types/healty.types';

interface DisplayService {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  latency: number;
  uptime: number;
  lastCheck: string;
  icon: React.ElementType;
}

interface ServiceStatusProps {
  loading: boolean;
  displayServices: DisplayService[] | null;
}
const statusConfig: Record<
  string,
  { color: string; iconColor: string; icon: React.ElementType; label: string }
> = {
  operational: {
    color: 'text-white',
    iconColor: 'text-green-700 dark:text-green-400',
    icon: RefreshCw,
    label: 'Operational',
  },
  degraded: {
    color: 'text-white',
    iconColor: 'text-yellow-700 dark:text-yellow-400',
    icon: RefreshCw,
    label: 'Degraded',
  },
  outage: {
    color: 'text-white',
    iconColor: 'text-red-700 dark:text-red-400',
    icon: RefreshCw,
    label: 'Outage',
  },
};

const iconMap: Record<string, React.ElementType> = {
  api_gateway: RefreshCw,
  auth_service: RefreshCw,
  rag_engine: RefreshCw,
  llm_orchestrator: RefreshCw,
  vector_store: RefreshCw,
  doc_processor: RefreshCw,
  search_indexer: RefreshCw,
  notification_service: RefreshCw,
  webhook_relay: RefreshCw,
  celery_workers: RefreshCw,
};

const getServiceIcon = (service: DisplayService): React.ElementType => {
  return iconMap[service.name] || RefreshCw;
};

const mapApiStatusToDisplay = (
  status: string,
): 'operational' | 'degraded' | 'outage' => {
  if (status === 'healthy') return 'operational';
  if (status === 'degraded') return 'degraded';
  return 'outage';
};

export const mapToDisplayServices = (
  services: ServiceStatus[] | null,
): DisplayService[] => {
  if (!services) return [];

  return services.map((service) => ({
    name: service.display_name,
    status: mapApiStatusToDisplay(service.status),
    latency: service.response_time_ms || 0,
    uptime: service.uptime_percentage,
    lastCheck: new Date(service.last_check_at).toLocaleString(),
    icon: getServiceIcon({
      name: service.display_name,
      status: 'operational',
      latency: 0,
      uptime: 0,
      lastCheck: '',
      icon: RefreshCw,
    }),
  }));
};

export function ServiceStatus({
  loading,
  displayServices,
}: ServiceStatusProps) {
  return (
    <div className="bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-zinc-800 dark:text-zinc-100">
          Service Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (!displayServices || displayServices.length === 0) ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : !displayServices || displayServices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No services available
          </div>
        ) : (
          <div className="space-y-3 max-h-120 overflow-y-auto">
            {displayServices.map((service) => {
              const config = statusConfig[service.status];
              const StatusIcon = config.icon;
              const ServiceIcon = service.icon;

              return (
                <div
                  key={service.name}
                  className="md:flex items-center justify-between p-3 rounded-lg bg-zinc-300 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg dark:bg-zinc-900 bg-zinc-200 mt-1',
                      )}
                    >
                      <ServiceIcon
                        className={cn('w-4 h-4', config.iconColor)}
                      />
                    </div>
                    <div>
                      <p className="text-zinc-800 dark:text-zinc-100 font-medium">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last check: {service.lastCheck}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-zinc-800 dark:text-gray-300">
                        {service.latency}ms
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.uptime}% uptime
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        config.iconColor,
                        'hover:bg-zinc-200 dark:hover:bg-zinc-700 border-0',
                      )}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </div>
  );
}
