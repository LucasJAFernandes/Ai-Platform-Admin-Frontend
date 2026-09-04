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

export type AlertSeverity =
  'critical' | 'high' | 'major' | 'medium' | 'minor' | 'low' | 'maintenance';

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
