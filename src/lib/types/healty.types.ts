import type { AlertSeverity } from '@/lib/types/common.types';
import type { ElementType } from 'react';
import type { HealthSummary, ByStatus } from '@/lib/types/organization.types';

export type { AlertSeverity } from '@/lib/types/common.types';

export type ServiceCategory = 'ai' | 'core' | 'pipeline' | 'platform';
export type ServiceHealthStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface ServiceStatus {
  id: number;
  name: string;
  display_name: string;
  category: ServiceCategory;
  status: ServiceHealthStatus;
  response_time_ms: number | null;
  uptime_percentage: number;
  last_check_at: string;
}

export interface DisplayService {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  latency: number;
  uptime: number;
  lastCheck: string;
  icon: ElementType;
}

export interface ServiceStatusProps {
  loading: boolean;
  displayServices: DisplayService[] | null;
}

export interface HealthSummaryChartProps {
  data?: HealthSummary;
}

export interface TenantStatusChartProps {
  data?: ByStatus;
}

export type AlertType =
  'incident' | 'resolution' | 'recovery' | 'warning' | 'info';

export interface ServiceAlert {
  id: number;
  alert_type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  source_service: string;
  tenant_name: string;
  created_at: string;
  is_acknowledged: boolean;
}

export interface DisplayIncident {
  id: number;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: string;
  startTime: string;
  description: string;
}

export interface SystemMetrics {
  cpu: { usage: number; cores: number };
  memory: { used: number; total: number };
  disk: { used: number; total: number };
  network: { inbound: number; outbound: number };
}
