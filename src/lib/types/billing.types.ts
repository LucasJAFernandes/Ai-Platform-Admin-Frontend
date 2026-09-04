export interface RevenueByPlan {
  plan_name: string;
  plan_color: string;
  tenant_count: number;
  mrr: number;
  percentage: number;
}

export interface BillingSummary {
  mrr: number;
  mrr_growth_pct: number;
  arr: number;
  paying_customers: number;
  total_revenue: number;
  avg_revenue_per_user: number;
  overdue_invoices: number;
  overdue_amount: number;
  revenue_by_plan: RevenueByPlan[];
}
export type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'cancelled';
export type PaymentMethod = 'card' | 'bank_transfer' | 'invoice';

export interface Subscription {
  tenant_id: number;
  tenant_name: string;
  plan_name: string;
  plan_color: string;
  monthly_fee: number;
  token_usage: string;
  usage_pct: number;
  status: SubscriptionStatus;
  payment_method: PaymentMethod;
  next_billing: string;
}

export interface LineItem {
  amount: number;
  quantity: number;
  description: string;
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

export interface Invoice {
  id: number;
  invoice_number: string;
  tenant_name: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  description: string;
  period_start: string;
  period_end: string;
  due_date: string;
  paid_at: string | null;
  pdf_url: string;
  line_items: LineItem[];
  is_overdue: boolean;
  created_at: string;
}

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

export interface Alert {
  id: number;
  tenant_id: number;
  tenant_name: string;
  alert_type: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  is_read: boolean;
  is_resolved: boolean;
  created_at: string;
}

export interface BillingResponse {
  summary: BillingSummary;
  subscriptions: Subscription[];
  recent_invoices: Invoice[];
  alerts: Alert[];
}
