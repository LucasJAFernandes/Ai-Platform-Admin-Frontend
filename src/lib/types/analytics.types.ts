export interface Summary {
  tokens_this_month: number;
  tokens_change_pct: number;
  ai_queries: number;
  ai_queries_change_pct: number;
  active_users: number;
  new_users_this_week: number;
  documents_processed: number;
  documents_change_pct: number;
}
export interface UsageConversationItem {
  conversation_id: string;
  title: string | null;
  user_name: string | null;
  created_at: string | null;
  last_activity_at: string | null;
  total_runs: number;
  total_tokens: number;
  total_cost_usd: number;
  total_messages: number;
}
export interface UsageProjectItem {
  project_id: string;
  project_name: string;
  project_type: string | null;
  owner_name: string | null;
  total_runs: number;
  completed_runs: number;
  failed_runs: number;
  total_tokens: number;
  total_cost_usd: number;
  total_messages: number;
  active_users: number;
  last_activity: string | null;
}
export interface DailyBreakdown {
  day: string;
  runs: number;
  tokens: number;
  cost_usd: number;
}

export interface UsageOverviewData {
  total_runs: number;
  completed_runs: number;
  failed_runs: number;
  running_runs: number;
  cancelled_runs: number;
  total_tokens: number;
  total_cost_usd: number;
  total_messages: number;
  active_users: number;
  active_conversations: number;
  daily_breakdown: DailyBreakdown[];
}

export interface WeeklyQueryVolume {
  day: string;
  value: number;
}

export interface ModuleUsage {
  name: string;
  percentage: number;
}

export interface TenantUsageData {
  tenant_name: string;
  active_users: number;
  ai_queries: number;
  tokens_used: number;
  growth_pct: number;
}

export interface AnalyticsResponse {
  summary: Summary;
  weekly_query_volume: WeeklyQueryVolume[];
  module_usage: ModuleUsage[];
  usage_by_tenant: TenantUsageData[];
}
export interface WeeklyDatum {
  day: string;
  queries: number;
}

export interface TenantUsageItem {
  name: string;
  usage: number;
  limit: number;
  percentage: number;
  growth: number;
}
export interface UsageUserItem {
  user_id: string;
  user_name: string;
  user_email: string;
  total_runs: number;
  completed_runs: number;
  failed_runs: number;
  total_tokens: number;
  total_cost_usd: number;
  total_messages: number;
  last_activity: string | null;
}

export interface UsageByUserData {
  items: UsageUserItem[];
  total: number;
  offset: number;
  limit: number;
}

export interface UsageUserDetailData {
  user_id: string;
  user_name: string;
  user_email: string;
  total_runs: number;
  total_tokens: number;
  total_cost_usd: number;
  total_messages: number;
  daily_breakdown: {
    date: string;
    runs: number;
    tokens: number;
    cost_usd: number;
  }[];
  recent_runs: {
    run_id: string;
    objective: string;
    status: string;
    tokens: number;
    cost_usd: number;
    created_at: string;
  }[];
}
