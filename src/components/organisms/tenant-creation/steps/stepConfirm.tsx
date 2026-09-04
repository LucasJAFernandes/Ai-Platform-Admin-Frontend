'use client';

import type { TenantFormData } from '@/lib/types/tenant-creation.types';

interface Props {
  formData: TenantFormData;
}

export function StepConfirm({ formData }: Props) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-[#252b3b]">
        <p>
          <strong>Company:</strong> {formData.companyName}
        </p>
        <p>
          <strong>Email:</strong> {formData.contactEmail}
        </p>
        <p>
          <strong>Plan:</strong> {formData.tier}
        </p>
        <p>
          <strong>Admin:</strong> {formData.adminName}
        </p>
      </div>
    </div>
  );
}
