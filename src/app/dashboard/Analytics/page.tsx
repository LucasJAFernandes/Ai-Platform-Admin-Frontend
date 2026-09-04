'use client';
import { Suspense } from 'react';
import Analytics from '@/components/templates/pages/pageAnalytics';

export default function AnalyticsPage() {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  );
}
