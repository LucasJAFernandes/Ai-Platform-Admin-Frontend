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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-2 justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100">
              System Health
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor platform status, performance, and incidents
            </p>
          </div>
          <Button
            variant="outline"
            className="border-black dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 hover:text-white"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
