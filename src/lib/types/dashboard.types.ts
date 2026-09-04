interface AICosts {
  date: string;
  costs: number;
  tokens: number;
}
export interface RevenueChartItem {
  value: number;
  label: string;
  color: string;
  type: 'plan' | 'module';
  mrr: number;
  pct: number;
  tenants?: number;
  subscribers?: number;
  paying?: number;
  trial?: number;
  price_monthly?: number;
}
export interface InfrastructureCosts {
  current_month: number;
  previous_month: number;
  change_pct: number;
  currency: string;
  by_category: Array<{ category: string; amount: number }>;
}

interface MRR {
  current: number;
  previous_month: number;
  change_pct: number;
  currency: string;
}
export interface subsc {
  date: string;
  module: string;
  subscriptions: number;
}
interface aiusage {
  date: string;
  tokens: number;
}
interface OnlineUsers {
  total_online: number;
  by_deployment: {
    cloud: number;
    on_premise: number;
  };
}

interface Organizations {
  total: number;
  new_last_30d: number;
  new_prev_30d: number;
  change_pct_30d: number | null;
  by_deployment: {
    cloud: number;
    on_premise: number;
  };
}

interface ProfitMargin {
  revenue: number;
  total_costs: number;
  profit: number;
  margin_pct: number;
  previous_margin_pct: number;
  margin_change_pp: number;
  currency: string;
}
interface CompanyUsage {
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
  modules: Details[];
}
export interface RevenueByModule {
  total_mrr: number;
  currency: string;
  modules: {
    module_key: string;
    display_name: string;
    category: string;
    price_monthly: number;
    price_yearly: number;
    subscribers: number;
    paying: number;
    trial: number;
    mrr: number;
    pct: number;
  }[];
}
interface Details {
  key: string;
  name: string;
}
interface tenant_health {
  healthy: number;
  warning: number;
  critical: number;
  inactive: number;
  details: {
    tenant_id: number;
    company_name: string;
    health_status: 'healthy' | 'warning' | 'critical' | 'inactive';
    score: number;
  }[];
}
export interface revenue_by_plan {
  total_mrr: number;
  currency: string;
  plans: {
    plan: string;
    plan_slug: string;
    color: string;
    tenants: number;
    mrr: number;
    pct: number;
  }[];
}
export interface AIModelsUsageData {
  current_month: number;
  previous_month: number;
  change_pct: number;
  currency: string;
  total_requests: number;
  total_tokens: number;
  by_model: Array<{
    model: string;
    cost: number;
    tokens: number;
    requests?: number;
  }>;
}

export interface DashboardData {
  ai_costs: AICosts[];
  infrastructure_costs: InfrastructureCosts;
  mrr: MRR;
  revenue_by_module: RevenueByModule;
  online_users: OnlineUsers;
  organizations: Organizations;
  profit_margin: ProfitMargin;
  module_subscriptions_graph: subsc[];
  ai_usage_graph: aiusage[];
  tenant_health?: tenant_health;
  revenue_by_plan?: revenue_by_plan;
  company_usage_table?: CompanyUsage[];
}
