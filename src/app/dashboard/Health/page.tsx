'use client';
import { Suspense } from 'react';
import Health from '@/components/templates/pages/pageHealth';
export default function SystemHealthPage() {
  return (
    <Suspense fallback={null}>
      <Health />
    </Suspense>
  );
}
