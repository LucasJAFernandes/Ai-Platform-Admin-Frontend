import {
  ServiceAlert,
  AlertSeverity,
  DisplayIncident,
} from '@/lib/types/healty.types';

export type { DisplayIncident };

const validSeverities: AlertSeverity[] = [
  'critical',
  'high',
  'major',
  'medium',
  'minor',
  'low',
  'maintenance',
];

export const mapAlertToIncident = (alert: ServiceAlert): DisplayIncident => {
  let severity = alert.severity.toLowerCase() as AlertSeverity;
  if (!validSeverities.includes(severity)) {
    severity = 'minor';
  }

  let status: DisplayIncident['status'] = 'investigating';
  if (alert.is_acknowledged) {
    status = 'monitoring';
  }
  if (alert.alert_type === 'resolution' || alert.alert_type === 'recovery') {
    status = 'resolved';
  }

  return {
    id: alert.id,
    title: alert.title,
    status,
    severity,
    startTime: alert.created_at,
    description: alert.message,
  };
};
