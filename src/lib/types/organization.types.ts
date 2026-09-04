export type Currency = 'EUR' | 'USD' | 'GBP';
interface Module {
  key: string;
  name: string;
}
export interface Plan {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export interface CompanyUsage {
  tenant_id: number;
  company_name: string;
  slug: string;
  status: 'active' | 'inactive' | 'suspended' | 'trial';
  plan: string;
  plan_slug: string;
  deployment_type: 'cloud' | 'premise' | 'hybrid';
  company_size: 'enterprise' | 'mid-market' | 'startup' | 'small_business';
  mrr: number;
  tokens_used: number;
  token_limit: number;
  token_usage_pct: number;
  active_users: number;
  ai_queries_mtd: number;
  ai_queries_change_pct: number;
  health_status: 'healthy' | 'warning' | 'critical' | 'inactive';
  last_activity_at: string;
  modules: Module[];
}

export interface Totals {
  tenants: number;
  users: number;
  knowledge_bases: number;
  ai_usage_usd: number;
  billing: number;
}

export interface PlanStat {
  plan_name: string;
  plan_color?: string;
  count: number;
  mrr: number;
}

export interface ByStatus {
  active: number;
  trial: number;
  suspended: number;
  cancelled: number;
}
export interface TenantUsage {
  tokens_used: number;
  token_limit: number;
  token_balance: number;
}
export interface ByDeployment {
  cloud: number;
  on_prem: number;
  hybrid: number;
}

export interface HealthSummary {
  healthy: number;
  degraded: number;
  critical: number;
  offline: number;
}

export interface UsageMtd {
  total_tokens: number;
  total_ai_queries: number;
  total_cost_usd: number;
  vs_prev_month_pct: number;
}

export interface StatsData {
  totals: Totals;
  by_status: ByStatus;
  by_deployment: ByDeployment;
  health_summary: HealthSummary;
  usage_mtd: UsageMtd;
  risk_alerts_count: number;
  tenants_near_limit_count: number;
  tenants_with_errors_count: number;
}
export interface FilterParams {
  search: string | null;
  status: TenantStatus | null;
  deployment_type: DeploymentType | null;
  health_status: HealthStatus | null;
  plan_id: number | null;
  risk_level: RiskLevel | null;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  page: number;
  page_size: number;
}
export type TenantStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type DeploymentType = 'cloud' | 'on-premise' | 'hybrid';
export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'maintenance';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface TenantData {
  id: number;
  name: string;
  slug: string;
  industry: string | null;
  website: string | null;
  contact_email: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  region: string | null;
  status: TenantStatus;
  deployment_type?: DeploymentType;
  health_status?: HealthStatus;
  risk_level?: RiskLevel;
  plan_id: number;
  usage: TenantUsage;
  created_at: string;
  plan: Plan;
}
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
