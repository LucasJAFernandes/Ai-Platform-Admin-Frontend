'use client';

import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { cn } from '@/lib/utils';
import type { TenantFormData } from '@/lib/types/tenant-creation.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { AlertCircle } from 'lucide-react';
import { useCallback } from 'react';
import type { ValidationError } from '@/lib/types/tenant-creation.types';

const ADMIN_ROLES = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'finance_admin', label: 'Finance Admin' },
  { value: 'support_admin', label: 'Support Admin' },
  { value: 'operations_admin', label: 'Operations Admin' },
] as const;

interface Props {
  formData: TenantFormData;
  updateField: (field: keyof TenantFormData, value: string) => void;
  errors?: ValidationError[];
  touchedFields?: Set<keyof TenantFormData>;
}

export function StepAdmin({
  formData,
  updateField,
  errors = [],
  touchedFields = new Set(),
}: Props) {
  const getFieldError = useCallback(
    (field: keyof TenantFormData): string | undefined => {
      return errors.find((error) => error.field === field)?.message;
    },
    [errors],
  );

  const renderFieldError = useCallback(
    (field: keyof TenantFormData) => {
      const error = getFieldError(field);
      if (error && touchedFields.has(field)) {
        return (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        );
      }
      return null;
    },
    [getFieldError, touchedFields],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-300">
          Admin Name <span className="text-red-400">*</span>
        </Label>
        <Input
          placeholder="Full name"
          className={cn(
            'bg-zinc-200 dark:bg-[#252b3b] border-white/10 dark:text-white',
            getFieldError('adminName') &&
              touchedFields.has('adminName') &&
              'border-red-400',
          )}
          value={formData.adminName}
          onChange={(e) => updateField('adminName', e.target.value)}
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
            getFieldError('adminEmail') &&
              touchedFields.has('adminEmail') &&
              'border-red-400',
          )}
          value={formData.adminEmail}
          onChange={(e) => updateField('adminEmail', e.target.value)}
        />
        {renderFieldError('adminEmail')}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-800 dark:text-gray-300">Admin Role</Label>
        <Select
          value={formData.adminRole}
          onValueChange={(v) =>
            updateField('adminRole', v as TenantFormData['adminRole'])
          }
        >
          <SelectTrigger className="bg-zinc-200 dark:bg-[#252b3b] border-white/10 dark:text-white">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent className="text-dark dark:text-white bg-zinc-200 dark:bg-[#252b3b] border-white/10">
            {ADMIN_ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
