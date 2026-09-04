import {
  AnalyticsResponse,
  UsageOverviewData,
} from '@/lib/types/analytics.types';

export const mockAnalyticsData: AnalyticsResponse = {
  summary: {
    tokens_this_month: 48_320_000,
    tokens_change_pct: 12.4,
    ai_queries: 182_430,
    ai_queries_change_pct: 8.9,
    active_users: 4210,
    new_users_this_week: 86,
    documents_processed: 12_540,
    documents_change_pct: -3.2,
  },
  weekly_query_volume: [
    { day: 'Mon', value: 4200 },
    { day: 'Tue', value: 5100 },
    { day: 'Wed', value: 4800 },
    { day: 'Thu', value: 6200 },
    { day: 'Fri', value: 5800 },
    { day: 'Sat', value: 2900 },
    { day: 'Sun', value: 2400 },
  ],
  module_usage: [
    { name: 'Billing', percentage: 34 },
    { name: 'Analytics', percentage: 26 },
    { name: 'AI Copilot', percentage: 31 },
    { name: 'Inventory', percentage: 9 },
  ],
  usage_by_tenant: [
    {
      tenant_name: 'Acme Manufacturing',
      active_users: 128,
      ai_queries: 18_420,
      tokens_used: 3_200_000,
      growth_pct: 12.4,
    },
    {
      tenant_name: 'Northwind Traders',
      active_users: 34,
      ai_queries: 4_210,
      tokens_used: 850_000,
      growth_pct: -3.1,
    },
    {
      tenant_name: 'Globex Corp',
      active_users: 210,
      ai_queries: 26_310,
      tokens_used: 4_900_000,
      growth_pct: 21.6,
    },
    {
      tenant_name: 'Initech Solutions',
      active_users: 3,
      ai_queries: 60,
      tokens_used: 12_000,
      growth_pct: -100,
    },
    {
      tenant_name: 'Umbrella Health',
      active_users: 58,
      ai_queries: 6_540,
      tokens_used: 400_000,
      growth_pct: 18.2,
    },
  ],
};

export const MOCK_OVERVIEW_DATA: UsageOverviewData = {
  total_runs: 1840,
  completed_runs: 1512,
  failed_runs: 142,
  running_runs: 58,
  cancelled_runs: 128,
  total_tokens: 1284600,
  total_cost_usd: 2569.2,
  total_messages: 7812,
  active_users: 214,
  active_conversations: 386,
  daily_breakdown: [
    { day: '2026-08-17', runs: 118, tokens: 82340, cost_usd: 164.68 },
    { day: '2026-08-18', runs: 132, tokens: 91120, cost_usd: 182.24 },
    { day: '2026-08-19', runs: 145, tokens: 98760, cost_usd: 197.52 },
    { day: '2026-08-20', runs: 139, tokens: 95430, cost_usd: 190.86 },
    { day: '2026-08-21', runs: 128, tokens: 88900, cost_usd: 177.8 },
    { day: '2026-08-22', runs: 54, tokens: 37200, cost_usd: 74.4 },
    { day: '2026-08-23', runs: 48, tokens: 32800, cost_usd: 65.6 },
    { day: '2026-08-24', runs: 151, tokens: 104200, cost_usd: 208.4 },
    { day: '2026-08-25', runs: 148, tokens: 101950, cost_usd: 203.9 },
    { day: '2026-08-26', runs: 156, tokens: 108300, cost_usd: 216.6 },
    { day: '2026-08-27', runs: 142, tokens: 97600, cost_usd: 195.2 },
    { day: '2026-08-28', runs: 133, tokens: 91800, cost_usd: 183.6 },
    { day: '2026-08-29', runs: 61, tokens: 42100, cost_usd: 84.2 },
    { day: '2026-08-30', runs: 85, tokens: 58120, cost_usd: 116.24 },
  ],
};
export const OVERVIEW_STATS = [
  {
    label: 'Total Runs',
    value: MOCK_OVERVIEW_DATA?.total_runs.toLocaleString() ?? '—',
    color: '#818CF8',
  },
  {
    label: 'Completed',
    value: MOCK_OVERVIEW_DATA?.completed_runs.toLocaleString() ?? '—',
    color: '#34D399',
  },
  {
    label: 'Failed',
    value: MOCK_OVERVIEW_DATA?.failed_runs.toLocaleString() ?? '—',
    color: '#F87171',
  },
  {
    label: 'Running',
    value: MOCK_OVERVIEW_DATA?.running_runs.toLocaleString() ?? '—',
    color: '#60A5FA',
  },
  {
    label: 'Cancelled',
    value: MOCK_OVERVIEW_DATA?.cancelled_runs.toLocaleString() ?? '—',
    color: '#9CA3AF',
  },
  {
    label: 'Total Tokens',
    value: MOCK_OVERVIEW_DATA?.total_tokens.toLocaleString() ?? '—',
    color: '#A78BFA',
  },
  {
    label: 'Total Cost',
    value: `$${MOCK_OVERVIEW_DATA?.total_cost_usd.toFixed(2) ?? '—'}`,
    color: '#FBBF24',
  },
  {
    label: 'Total Messages',
    value: MOCK_OVERVIEW_DATA?.total_messages.toLocaleString() ?? '—',
    color: '#22D3EE',
  },
  {
    label: 'Active Users',
    value: MOCK_OVERVIEW_DATA?.active_users.toLocaleString() ?? '—',
    color: '#F472B6',
  },
  {
    label: 'Active Conversations',
    value: MOCK_OVERVIEW_DATA?.active_conversations.toLocaleString() ?? '—',
    color: '#2DD4BF',
  },
];
