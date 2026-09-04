'use client';
import { Suspense } from 'react';
import Dashboard from '@/components/templates/pages/pageDashboard';

export default function DashboardManager() {
  return (
    <Suspense fallback={null}>
      <Dashboard />
    </Suspense>
  );
}
