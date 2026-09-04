'use client';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import type {
  TenantFormData,
  TenantTier,
  TierPricing,
  ValidationError,
} from '@/lib/types/tenant-creation.types';
const TIER_PRICING: Record<TenantTier, TierPricing> = {
  starter: {
    monthly: 49,
    yearly: 490,
    features: ['Up to 5 users', '10,000 tokens/month', 'Email support'],
    description: 'Perfect for small businesses',
  },
  professional: {
    monthly: 199,
    yearly: 1990,
    features: ['Up to 25 users', '50,000 tokens/month', 'Priority support'],
    popular: true,
    description: 'Ideal for growing companies',
  },
  enterprise: {
    monthly: 499,
    yearly: 4990,
    features: ['Unlimited users', '100,000 tokens/month', 'Dedicated support'],
    description: 'For large organizations',
  },
  partner: {
    monthly: 999,
    yearly: 9990,
    features: ['White-label', '200,000 tokens/month', 'Revenue sharing'],
    description: 'For resellers and partners',
  },
};

interface Props {
  formData: TenantFormData;
  updateField: (field: keyof TenantFormData, value: string) => void;
}

export function StepPlan({ formData, updateField }: Props) {
  const [touchedFields] = useState<Set<keyof TenantFormData>>(new Set());
  const [errors] = useState<ValidationError[]>([]);
  const getFieldError = useCallback(
    (field: keyof TenantFormData): string | undefined => {
      return errors.find((error) => error.field === field)?.message;
    },
    [errors],
  );
  return (
    <div className="grid grid-cols-2 gap-4">
      {(Object.entries(TIER_PRICING) as [TenantTier, TierPricing][]).map(
        ([tier, info]) => (
          <div
            key={tier}
            onClick={() => updateField('tier', tier)}
            className={cn(
              'p-4 rounded-lg border cursor-pointer transition-all relative',
              formData.tier === tier
                ? 'border-blue-700 dark:border-blue-500 bg-blue-500/10'
                : 'border-black dark:border-white/10 dark:hover:border-white/20 hover:bg-white/5',
              getFieldError('tier') &&
                touchedFields.has('tier') &&
                'border-red-400',
            )}
          >
            {info.popular && (
              <span className="absolute -top-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                Popular
              </span>
            )}
            <h4 className="text-zinc-800 dark:text-white font-medium capitalize">
              {tier}
            </h4>
            {info.description && (
              <p className="text-xs text-zinc-600 dark:text-gray-400 mt-1">
                {info.description}
              </p>
            )}
            <p className="text-2xl font-bold text-zinc-800 dark:text-gray-400 mt-2">
              ${formData.billingCycle === 'yearly' ? info.yearly : info.monthly}
              <span className="text-sm text-zinc-800 dark:text-gray-400 font-normal">
                /{formData.billingCycle === 'yearly' ? 'year' : 'month'}
              </span>
            </p>
            <ul className="mt-3 space-y-1">
              {info.features.map((f, i) => (
                <li key={i} className="text-sm text-gray-400">
                  • {f}
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </div>
  );
}
