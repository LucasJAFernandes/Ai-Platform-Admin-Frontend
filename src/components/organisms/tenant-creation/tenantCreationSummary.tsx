'use client';

import {
  Building2,
  CreditCard,
  UserPlus,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { plans } from '@/components/molecules/planOptions';
import type { TenantFormData } from '@/lib/types/tenant-creation.types';

interface TenantCreationSummaryProps {
  formData: TenantFormData;
  getPlanById: (
    planId: number,
  ) => { name?: string; price?: number | string } | undefined;
}

export function TenantCreationSummary({
  formData,
  getPlanById,
}: TenantCreationSummaryProps) {
  const selectedPlan = getPlanById(formData.plan_id);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#252b3b] border border-gray-200 dark:border-white/5">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Company Information
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Name:</span>{' '}
            <span className="text-gray-900 dark:text-white font-medium">
              {formData.companyName || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Industry:</span>{' '}
            <span className="text-gray-900 dark:text-white capitalize">
              {formData.industry || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Email:</span>{' '}
            <span className="text-gray-900 dark:text-white">
              {formData.contactEmail || '—'}
            </span>
          </div>
          {formData.contactPhone && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">Phone:</span>{' '}
              <span className="text-gray-900 dark:text-white">
                {formData.contactPhone}
              </span>
            </div>
          )}
          {formData.website && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">Website:</span>{' '}
              <span className="text-gray-900 dark:text-white">
                {formData.website}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#252b3b] border border-gray-200 dark:border-white/5">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Subscription Details
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Plan:</span>{' '}
            <span className="text-white capitalize bg-blue-500 dark:bg-blue-500/20 px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedPlan?.name}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Billing:</span>{' '}
            <span className="text-gray-900 dark:text-white capitalize">
              {formData.billingCycle}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Price:</span>{' '}
            <span className="text-gray-900 dark:text-white font-medium">
              ${selectedPlan?.price}/
              {formData.billingCycle === 'yearly' ? 'year' : 'month'}
            </span>
          </div>
          <ul className="space-y-1 mt-2">
            {plans[formData.tier as keyof typeof plans]?.features
              .slice(0, 3)
              .map((feature, idx) => {
                const featureText =
                  typeof feature === 'string' ? feature : feature.text;

                return (
                  <li
                    key={idx}
                    className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-teal-500" />
                    {featureText}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="md:col-span-2 p-5 rounded-xl bg-gray-50 dark:bg-[#252b3b] border border-gray-200 dark:border-white/5">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Admin User
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Name:</span>{' '}
            <span className="text-gray-900 dark:text-white font-medium">
              {formData.adminName || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Email:</span>{' '}
            <span className="text-gray-900 dark:text-white">
              {formData.adminEmail || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Role:</span>{' '}
            <span className="text-gray-900 dark:text-white capitalize">
              {formData.adminRole.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 p-5 rounded-xl bg-gray-50 dark:bg-[#252b3b] border border-gray-200 dark:border-white/5">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Adress
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Country:</span>{' '}
            <span className="text-gray-900 dark:text-white font-medium">
              {formData.country || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">City:</span>{' '}
            <span className="text-gray-900 dark:text-white">
              {formData.city || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">State:</span>{' '}
            <span className="text-gray-900 dark:text-white font-medium">
              {formData.state || '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Region:</span>{' '}
            <span className="text-gray-900 dark:text-white capitalize">
              {formData.region || '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
