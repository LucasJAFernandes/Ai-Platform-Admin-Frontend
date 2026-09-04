'use client';
import { Suspense } from 'react';
import Organization from '@/components/templates/pages/pageOrganization';

export default function OrganizationManager() {
  return (
    <Suspense fallback={null}>
      <Organization />
    </Suspense>
  );
}
