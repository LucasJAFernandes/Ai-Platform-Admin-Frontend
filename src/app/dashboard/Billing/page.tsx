'use client';
import { Suspense } from 'react';
import Billing from '@/components/templates/pages/pageBills';
export default function BillingPage() {
  return (
    <Suspense fallback={null}>
      <Billing />
    </Suspense>
  );
}
