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
import { Building2, Mail, Phone, Globe, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TenantFormData } from '@/lib/types/tenant-creation.types';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  formData: TenantFormData;
  updateField: (field: keyof TenantFormData, value: string) => void;
  error?: (field: keyof TenantFormData) => string | undefined;
}

const INDUSTRIES = [
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Education', label: 'Education' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Other', label: 'Other' },
] as const;

export function StepCompany({ formData, updateField, error }: Props) {
  const [touchedFields, setTouchedFields] = useState<Set<keyof TenantFormData>>(
    new Set(),
  );

  const markFieldTouched = useCallback((field: keyof TenantFormData) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  }, []);

  useEffect(() => {
    const industryValues = INDUSTRIES.map((i) => i.value);
    if (
      formData.industry &&
      !industryValues.includes(
        formData.industry as (typeof INDUSTRIES)[number]['value'],
      )
    ) {
      updateField('industry', 'Other');
    }
  }, [formData.industry, updateField]);

  const renderFieldError = useCallback(
    (field: keyof TenantFormData) => {
      const message = error?.(field);
      if (message && touchedFields.has(field)) {
        return (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {message}
          </p>
        );
      }
      return null;
    },
    [error, touchedFields],
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-2">
        <Label className="text-zinc-800 dark:text-gray-400">
          Company Name <span className="text-red-600 dark:text-red-400">*</span>
        </Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Enter company name"
            className={cn(
              'pl-10 bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white',
              error?.('companyName') &&
                touchedFields.has('companyName') &&
                'border-red-400',
            )}
            value={formData.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            onBlur={() => markFieldTouched('companyName')}
          />
        </div>
        {renderFieldError('companyName')}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-400">
          Industry <span className="text-red-600 dark:text-red-400">*</span>
        </Label>
        <Select
          value={formData.industry}
          onValueChange={(v) => {
            updateField('industry', v);
            markFieldTouched('industry');
          }}
        >
          <SelectTrigger
            className={cn(
              'bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white',
              error?.('industry') &&
                touchedFields.has('industry') &&
                'border-red-400',
            )}
          >
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-300 dark:bg-[#252b3b] border-white/10">
            {INDUSTRIES.map((industry) => (
              <SelectItem key={industry.value} value={industry.value}>
                {industry.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {renderFieldError('industry')}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-400">
          Contact Email{' '}
          <span className="text-red-600 dark:text-red-400">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="email"
            placeholder="contact@company.com"
            className={cn(
              'pl-10 bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white',
              error?.('contactEmail') &&
                touchedFields.has('contactEmail') &&
                'border-red-400',
            )}
            value={formData.contactEmail}
            onChange={(e) => updateField('contactEmail', e.target.value)}
            onBlur={() => markFieldTouched('contactEmail')}
          />
        </div>
        {renderFieldError('contactEmail')}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-400">Phone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="+1 (555) 000-0000"
            className="pl-10 bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
            value={formData.contactPhone ?? ''}
            onChange={(e) => updateField('contactPhone', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-400">Website</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="https://company.com"
            className="pl-10 bg-zinc-200 dark:bg-[#252b3b] border-white/10 text-zinc-900 dark:text-white"
            value={formData.website ?? ''}
            onChange={(e) => updateField('website', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-300">
          Admin Name <span className="text-red-400">*</span>
        </Label>
        <Input
          placeholder="Full name"
          className={cn(
            'bg-zinc-200 dark:bg-[#252b3b] border-white/10 dark:text-white',
            error?.('adminName') &&
              touchedFields.has('adminName') &&
              'border-red-400',
          )}
          value={formData.adminName}
          onChange={(e) => updateField('adminName', e.target.value)}
          onBlur={() => markFieldTouched('adminName')}
        />
        {renderFieldError('adminName')}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-300">
          Admin Email <span className="text-red-400">*</span>
        </Label>
        <Input
          type="email"
          placeholder="admin@company.com"
          className={cn(
            'bg-zinc-200 dark:bg-[#252b3b] border-white/10 dark:text-white',
            error?.('adminEmail') &&
              touchedFields.has('adminEmail') &&
              'border-red-400',
          )}
          value={formData.adminEmail}
          onChange={(e) => updateField('adminEmail', e.target.value)}
          onBlur={() => markFieldTouched('adminEmail')}
        />
        {renderFieldError('adminEmail')}
      </div>
    </div>
  );
}
