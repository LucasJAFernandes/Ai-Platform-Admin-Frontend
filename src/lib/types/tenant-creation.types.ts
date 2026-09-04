import { LucideIcon } from 'lucide-react';

export type TenantTier = 'starter' | 'professional' | 'enterprise' | 'partner';
export type BillingCycle = 'monthly' | 'yearly';
export type PaymentMethod = 'card' | 'bank_transfer' | 'invoice';
export type AdminRole = 'super_admin' | 'admin' | 'billing_admin';
export interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  period: string;
  icon: LucideIcon;
  badge?: string;
  popular?: boolean;
  required?: string;
  features?: string[];
  category: 'drive' | 'ai' | 'other';
}
export interface TenantFormData {
  companyName: string;
  industry: string;
  plan_id: number;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
  region: string;
  tier: TenantTier;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethod;
  adminName: string;
  adminEmail: string;
  adminRole: AdminRole;
  adminJobTitle: string;
  state: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface TierPricing {
  monthly: number;
  yearly: number;
  features: string[];
  popular?: boolean;
  description?: string;
}

export interface ValidationError {
  field: keyof TenantFormData;
  message: string;
}

export interface TenantBasicData {
  name: string;
  industry: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  address: string;
  region: string;
  plan_id: number;
  billing_cycle: string;
  payment_method: string;
  token_limit: number;
}

export interface TenantAdminData {
  name: string;
  email: string;
  job_title: string;
  role: string;
}

export type CartItem = Module & {
  type: 'module' | 'addon';
  quantity: number;
  addedAt: string;
  totalPrice: number;
};

export interface CreatedTenantPlan {
  id: number;
  name: string;
}

export interface CreatedTenantCredentials {
  temporary_password?: string;
}

export interface CreatedTenantResult {
  id: number;
  name: string;
  plan: CreatedTenantPlan;
  contact_email: string;
  credentials?: CreatedTenantCredentials;
}
