import type { ElementType } from 'react';
import type { PlanStat, CompanyUsage } from '@/lib/types/organization.types';
import type { WeeklyDatum, TenantUsageItem } from '@/lib/types/analytics.types';
import type { Subscription, Invoice, Alert } from '@/lib/types/billing.types';

export interface ByPlanChartProps {
  data?: PlanStat[];
}

export interface WeeklyQueryChartProps {
  data: WeeklyDatum[];
  className?: string;
}

export interface UsageStatusChartProps {
  completed: number;
  failed: number;
  running: number;
  cancelled: number;
}

export interface RankingItem {
  name: string;
  value: number;
}

export interface UsageRankingChartProps {
  title: string;
  data: RankingItem[];
  color?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export interface TokenUsageByTenantProps {
  data: TenantUsageItem[];
  className?: string;
}

export interface ListCompanyUsageProps {
  tenants: CompanyUsage[];
  searchTerm: string;
}

export interface ListSubscriptionsProps {
  subscriptions: Subscription[];
}

export interface InvoiceStatusConfig {
  color: string;
  bgColor: string;
  icon: ElementType;
  label: string;
}

export interface RecentInvoicesProps {
  filteredInvoices: Invoice[];
  statusConfig: Record<string, InvoiceStatusConfig>;
}

export interface AlertStatusConfig {
  color: string;
  bgColor: string;
  icon: ElementType;
}

export interface AlertListProps {
  alerts: Alert[];
  severityConfig: Record<string, AlertStatusConfig>;
  formatDate: (dateString: string) => string;
}