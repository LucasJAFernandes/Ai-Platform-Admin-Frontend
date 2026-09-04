import { z } from 'zod';

export const tenantTierSchema = z.enum([
  'starter',
  'professional',
  'enterprise',
  'partner',
]);
export const billingCycleSchema = z.enum(['monthly', 'yearly']);
export const paymentMethodSchema = z.enum(['card', 'bank_transfer', 'invoice']);
export const adminRoleSchema = z.enum([
  'super_admin',
  'admin',
  'billing_admin',
]);

export const stepCompanySchema = z.object({
  companyName: z.string().trim().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  adminName: z.string().trim().min(1, 'Admin name is required'),
  adminEmail: z
    .string()
    .trim()
    .min(1, 'Admin email is required')
    .email('Invalid email format'),
  contactEmail: z
    .string()
    .trim()
    .min(1, 'Contact email is required')
    .email('Invalid email format'),
  contactPhone: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export const stepPlanSchema = z.object({
  tier: tenantTierSchema,
  plan_id: z.number().int().positive('Please select a plan'),
});

export const stepPaymentSchema = z.object({
  billingCycle: billingCycleSchema,
  paymentMethod: paymentMethodSchema,
});

export const tenantFormSchema = z.object({
  companyName: z.string().trim().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  plan_id: z.number().int().positive('Please select a plan'),
  contactEmail: z
    .string()
    .trim()
    .min(1, 'Contact email is required')
    .email('Invalid email format'),
  contactPhone: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  address: z.string().optional(),
  region: z.string().optional(),
  tier: tenantTierSchema,
  billingCycle: billingCycleSchema,
  paymentMethod: paymentMethodSchema,
  adminName: z.string().trim().min(1, 'Admin name is required'),
  adminEmail: z
    .string()
    .trim()
    .min(1, 'Admin email is required')
    .email('Invalid email format'),
  adminRole: adminRoleSchema,
  adminJobTitle: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

export type TenantFormData = z.infer<typeof tenantFormSchema>;

export const stepSchemas: Record<number, z.ZodTypeAny> = {
  1: stepCompanySchema,
  2: stepPlanSchema,
  3: stepPaymentSchema,
};
