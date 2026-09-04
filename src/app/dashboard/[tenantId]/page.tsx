'use client';
import { Suspense } from 'react';
import TenantDetailsPage from '@/components/templates/pages/pageTenantDetails';

export default function TenantDashboard() {
  return (
    <Suspense fallback={null}>
      <TenantDetailsPage />
    </Suspense>
  );
}
