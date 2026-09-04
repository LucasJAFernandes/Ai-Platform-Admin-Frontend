'use client';
import { Suspense } from 'react';
import Support from '@/components/templates/pages/pageSupport';
export default function SupportPage() {
  return (
    <Suspense fallback={null}>
      <Support />
    </Suspense>
  );
}
