export interface TenantDetails {
  profile: Profile;
  plan: Plan;
  billing: Billing;
  usage: Usage;
  health: Health;
  resources: Resources;
  risk_indicators: RiskIndicator[];
  users: User[];
  connectors: Connector[];
  modules: Module[];
}

export interface Profile {
  id: number;
  name: string;
  slug: string;
  industry: string;
  website: string;
  address: string;
  domain: string;
  logo_url: string | null;
  contact_email: string;
  contact_name: string;
  contact_phone: string | null;
  region: string;
  country: string;
  vat_number: string | null;
  status: 'active' | 'inactive';
  deployment_type: 'cloud' | 'on_premise';
  created_at: string;
  onboarded_at: string;
  last_activity_at: string;
}

export interface Plan {
  id: number;
  name: string;
  billing_cycle: 'monthly' | 'yearly';
  features: {
    rag: boolean;
    sso: boolean;
    analytics: boolean;
  };
  limits: {
    max_users: number;
    max_documents: number;
    max_connectors: number;
    token_limit: number;
  };
  consumed: {
    users: number;
    documents: number;
    connectors: number;
    tokens_used: number;
  };
}

export interface Billing {
  mrr: number;
  payment_status: 'active' | 'past_due' | 'failed';
  payment_method: 'card' | 'invoice';
  next_billing_date: string;
  outstanding_balance: number;
  currency: string;
}

export interface Usage {
  tokens_used: number;
  token_limit: number;
  token_balance: number;
  usage_pct: number;
  usage_cost_usd: number;
  cost_to_serve: number;
  gross_margin: number;
  ai_queries_mtd: number;
  ai_queries_prev_month: number;
  trend_pct: number;
  cost_breakdown: {
    llm_tokens: number;
    embeddings: number;
    vector_storage: number;
    image_generation: number;
    speech_to_text: number;
  };
}

export interface Health {
  status: 'healthy' | 'degraded' | 'down';
  score: number;
  last_check_at: string;
  error_rate_24h: number;
  embeddings_stale: boolean;
}

export interface Resources {
  total_users: number;
  active_users_30d: number;
  total_documents: number;
  knowledge_bases: number;
  active_connectors: number;
}

export interface RiskIndicator {
  type: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  created_at: string;
  last_login_at: string | null;
  role: {
    key: 'admin' | 'editor' | 'viewer';
    label: string;
    light: { bg: string; text: string };
    dark: { bg: string; text: string };
  };
}

export interface Connector {
  id: number;
  connector_key: string;
  display_name: string;
  connector_type: string;
  status: 'active' | 'inactive' | 'error';
  connected_at: string;
  last_sync_at: string;
}

export interface Module {
  id: number;
  module_key: string;
  display_name: string;
  description: string;
  category: string;
  icon: string;
  status: 'active' | 'inactive';
  billing_cycle: 'monthly' | 'yearly';
  starts_at: string;
  expires_at: string | null;
  is_trial: boolean;
  trial_ends_at: string | null;
  provisioned_by: 'sales' | 'system' | 'self-service';
}
