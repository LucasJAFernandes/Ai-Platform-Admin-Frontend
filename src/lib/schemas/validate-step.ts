import { ZodError } from 'zod';
import { stepSchemas, TenantFormData } from './tenant-creation.schema';
import type { ValidationError } from '@/lib/types/tenant-creation.types';

export type { ValidationError };

export function validateStep(
  step: number,
  formData: TenantFormData,
): ValidationError[] {
  const schema = stepSchemas[step];
  if (!schema) return [];

  const result = schema.safeParse(formData);
  if (result.success) return [];

  const zodError = result.error as ZodError;
  return zodError.issues.map((issue) => ({
    field: issue.path[0] as keyof TenantFormData,
    message: issue.message,
  }));
}
