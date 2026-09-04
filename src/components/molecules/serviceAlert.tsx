'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { RefreshCw, Clock } from 'lucide-react';
import type { DisplayIncident, ServiceAlert } from '@/lib/types/healty.types';

interface IncidentListProps {
  loading: boolean;
  displayIncidents: DisplayIncident[];
  alerts?: ServiceAlert[] | null;
}

const incidentStatusConfig: Record<string, { color: string; label: string }> = {
  investigating: { color: 'text-yellow-500', label: 'Investigating' },
  identified: { color: 'text-orange-500', label: 'Identified' },
  monitoring: { color: 'text-blue-500', label: 'Monitoring' },
  resolved: { color: 'text-green-500', label: 'Resolved' },
  warning: { color: 'text-yellow-500', label: 'Warning' },
  error: { color: 'text-red-500', label: 'Error' },
  info: { color: 'text-blue-500', label: 'Info' },
  success: { color: 'text-green-500', label: 'Success' },
};

const severityConfig: Record<string, { color: string }> = {
  critical: { color: 'border-red-500 text-red-400' },
  high: { color: 'border-orange-500 text-orange-400' },
  major: { color: 'border-orange-500 text-orange-400' },
  medium: { color: 'border-yellow-500 text-yellow-400' },
  minor: { color: 'border-yellow-500 text-yellow-400' },
  low: { color: 'border-blue-500 text-blue-400' },
  maintenance: { color: 'border-blue-500 text-blue-400' },
};

export function IncidentList({
  loading,
  displayIncidents,
  alerts,
}: IncidentListProps) {
  const unacknowledgedCount = alerts
    ? alerts.filter((a) => !a.is_acknowledged).length
    : 0;

  return (
    <div className="bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-zinc-800 dark:text-zinc-100">
            Recent Incidents
          </CardTitle>
          {unacknowledgedCount > 0 && (
            <Badge className="bg-blue-500 text-white border-0">
              {unacknowledgedCount} unacknowledged
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading && displayIncidents.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : displayIncidents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent incidents
          </div>
        ) : (
          <div className="space-y-3 max-h-120 overflow-y-auto">
            {displayIncidents.map((incident) => {
              const statusConf =
                incidentStatusConfig[incident.status] ||
                incidentStatusConfig.investigating;
              const severityConf =
                severityConfig[incident.severity] || severityConfig.minor;

              return (
                <div
                  key={incident.id}
                  className="p-4 bg-zinc-300 dark:bg-white/5 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 border-0`}
                      >
                        {statusConf.label}
                      </Badge>
                      <Badge variant="outline" className={severityConf.color}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 whitespace-nowrap truncate line-clamp-1" />
                      {new Date(incident.startTime).toLocaleString()}
                    </div>
                  </div>
                  <h4 className="text-zinc-800 dark:text-zinc-100 font-medium">
                    {incident.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {incident.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </div>
  );
}
