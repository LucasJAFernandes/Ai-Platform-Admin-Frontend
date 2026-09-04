'use client';

import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import {
  MapPin,
  CreditCard,
  Calendar,
  Receipt,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TenantFormData } from '@/lib/types/tenant-creation.types';
import { useCallback, useState } from 'react';

interface Props {
  formData: TenantFormData;
  updateField: (field: keyof TenantFormData, value: string) => void;
  error?: (field: keyof TenantFormData) => string | undefined;
}

const BILLING_CYCLES = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const;

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { value: 'invoice', label: 'Invoice', icon: Receipt },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: Building2 },
] as const;

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'PT', label: 'Portugal' },
  { value: 'ES', label: 'Spain' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'BR', label: 'Brazil' },
  { value: 'Other', label: 'Other' },
] as const;

export function StepPayment({ formData, updateField, error }: Props) {
  const [touchedFields, setTouchedFields] = useState<Set<keyof TenantFormData>>(
    new Set(),
  );

  const markFieldTouched = useCallback((field: keyof TenantFormData) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  }, []);

  const getFieldError = useCallback(
    (field: keyof TenantFormData): string | undefined => {
      return error ? error(field) : undefined;
    },
    [error],
  );

  const renderFieldError = useCallback(
    (field: keyof TenantFormData) => {
      const fieldError = getFieldError(field);
      if (fieldError && touchedFields.has(field)) {
        return (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {fieldError}
          </p>
        );
      }
      return null;
    },
    [getFieldError, touchedFields],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Billing Cycle
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">
              Billing Frequency{' '}
              <span className="text-red-600 dark:text-red-400">*</span>
            </Label>
            <Select
              value={formData.billingCycle}
              onValueChange={(v) => {
                updateField('billingCycle', v);
                markFieldTouched('billingCycle');
              }}
            >
              <SelectTrigger
                className={cn(
                  'bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white',
                  getFieldError('billingCycle') &&
                    touchedFields.has('billingCycle') &&
                    'border-red-400',
                )}
              >
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-300 dark:bg-[#252b3b] border-white/10">
                {BILLING_CYCLES.map((cycle) => (
                  <SelectItem key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {renderFieldError('billingCycle')}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Payment Method
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">
              Payment Method{' '}
              <span className="text-red-600 dark:text-red-400">*</span>
            </Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(v) => {
                updateField('paymentMethod', v);
                markFieldTouched('paymentMethod');
              }}
            >
              <SelectTrigger
                className={cn(
                  'bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white',
                  getFieldError('paymentMethod') &&
                    touchedFields.has('paymentMethod') &&
                    'border-red-400',
                )}
              >
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-300 dark:bg-[#252b3b] border-white/10">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {method.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {renderFieldError('paymentMethod')}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Billing Address
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">
              Street Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="123 Business St"
                className="pl-10 bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
                value={formData.address ?? ''}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">City</Label>
            <Input
              placeholder="San Francisco"
              className="bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
              value={formData.city ?? ''}
              onChange={(e) => updateField('city', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">
              State/Province
            </Label>
            <Input
              placeholder="CA"
              className="bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
              value={formData.state ?? ''}
              onChange={(e) => updateField('state', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">
              ZIP/Postal Code
            </Label>
            <Input
              placeholder="94105"
              className="bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
              value={formData.zipCode ?? ''}
              onChange={(e) => updateField('zipCode', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">Country</Label>
            <Select
              value={formData.country ?? ''}
              onValueChange={(v) => updateField('country', v)}
            >
              <SelectTrigger className="bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-300 dark:bg-[#252b3b] border-white/10">
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 space-y-2">
            <Label className="text-zinc-800 dark:text-gray-400">Region</Label>
            <Input
              placeholder="North America / EMEA / APAC"
              className="bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
              value={formData.region ?? ''}
              onChange={(e) => updateField('region', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
