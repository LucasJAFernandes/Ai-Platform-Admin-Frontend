'use client';
import { Suspense } from 'react';
import AILogs from '@/components/templates/pages/pageLogs';
export default function AILogsPage() {
  return (
    <Suspense fallback={null}>
      <AILogs />
    </Suspense>
  );
}
