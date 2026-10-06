'use client';
import { Button } from '@/components/atoms/button';
import { CardAlert } from '@/components/molecules/alertCard';
import {
  ServiceStatus,
  mapToDisplayServices,
} from '@/components/organisms/servicesStatus';
import { IncidentList } from '@/components/molecules/serviceAlert';
import { StatsCards } from '@/components/molecules/statusCards';
import { mockServices, mockAlerts } from '@/mocks/health';
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { DisplayIncident, mapAlertToIncident } from '@/lib/utils/health.utils';

export default function Health() {
  const displayServices = mapToDisplayServices(mockServices);
  const operationalCount = mockServices
    ? mockServices.filter((s) => s.status === 'healthy').length
    : 0;
  const overallStatus = mockServices
    ? mockServices.every((s) => s.status === 'healthy')
      ? 'operational'
      : mockServices.some((s) => s.status === 'unhealthy')
        ? 'outage'
        : 'degraded'
    : 'operational';

  const displayIncidents: DisplayIncident[] =
    mockAlerts.map(mapAlertToIncident);

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:mb-2 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-zinc-700 dark:text-zinc-100 sm:text-3xl">
              System Health
            </h1>
            <p className="mt-1 text-sm text-gray-400 sm:text-base">
              Monitor platform status, performance, and incidents
            </p>
          </div>
          <Button
            variant="outline"
            className="border-black text-zinc-900 dark:border-zinc-600 dark:text-zinc-100 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2`} />
            Refresh
          </Button>
        </div>
        <CardAlert
          overallStatus={overallStatus}
          operationalCount={operationalCount}
          totalServices={mockServices?.length || 0}
        />
        <StatsCards
          variant="centered"
          className="mb-6"
          stats={[
            {
              label: 'System Uptime',
              value: '99.9%',
              icon: CheckCircle,
              color: 'bg-green-500 dark:bg-zinc-900',
              iconColor: 'text-white dark:text-green-500',
            },
            {
              label: 'Response Time',
              value: '120ms',
              icon: Clock,
              color: 'bg-yellow-500 dark:bg-zinc-900',
              iconColor: 'text-white dark:text-yellow-500',
            },
            {
              label: 'Error Rate',
              value: '0.1%',
              icon: AlertCircle,
              color: 'bg-red-500 dark:bg-zinc-900',
              iconColor: 'text-white dark:text-red-500',
            },
          ]}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ServiceStatus loading={false} displayServices={displayServices} />
          <IncidentList
            loading={false}
            displayIncidents={displayIncidents}
            alerts={mockAlerts}
          />
        </div>
      </div>
    </div>
  );
}
