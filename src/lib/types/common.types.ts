export type TenantTier = 'starter' | 'professional' | 'enterprise' | 'partner';
export type BillingCycle = 'monthly' | 'yearly';
export type PaymentMethod = 'card' | 'bank_transfer' | 'invoice';
export type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'cancelled';
export type AlertSeverity =
  | 'critical'
  | 'warning'
  | 'info'
  | 'success'
  | 'high'
  | 'major'
  | 'medium'
  | 'minor'
  | 'low'
  | 'maintenance';