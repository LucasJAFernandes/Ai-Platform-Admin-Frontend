'use client';
import { useRouter } from 'next/navigation';
import { Eye, MoreVertical } from 'lucide-react';
import { TenantData } from '@/lib/types/organization.types';
import { ResponsiveList, Column } from '@/components/templates/responsiveList';
import { formatDate } from '@/lib/utils';
export function ListTenants({ tenants }: { tenants: TenantData[] }) {
  const router = useRouter();
  const getUsagePct = (t: TenantData) =>
    t.usage.tokens_used > 0 && t.usage.token_limit > 0
      ? Math.round((t.usage.tokens_used / t.usage.token_limit) * 100)
      : 0;

  const columns: Column<TenantData>[] = [
    {
      key: 'company',
      header: 'Company',
      render: (t) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-zinc-100">
            {t.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-zinc-400">
            {formatDate(t.created_at)}
          </div>
          <div className="text-sm text-gray-500 dark:text-zinc-400 xl:hidden truncate max-w-[180px]">
            {t.contact_email}
          </div>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (t) => (
        <span className="inline-flex items-center font-bold px-3 py-1 rounded-full text-sm">
          {t.plan.name}
        </span>
      ),
    },
    {
      key: 'region',
      header: 'Region',
      hideBelow: 'lg',
      render: (t) => t.region || 'PT',
    },
    {
      key: 'contact',
      header: 'Contact',
      hideBelow: 'xl',
      render: (t) => t.contact_email,
    },
    {
      key: 'usage',
      header: 'Usage',
      hideBelow: 'lg',
      render: (t) => (
        <div className="flex flex-col items-center">
          <span>{t.usage.tokens_used?.toLocaleString()}</span>
          <div className="w-20 h-1.5 bg-gray-400 dark:bg-gray-700 rounded-full mt-1">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${Math.min(getUsagePct(t), 100)}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => (
        <span
          className={
            t.status.toLowerCase() === 'active'
              ? 'text-green-600'
              : 'text-amber-600'
          }
        >
          {t.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (t) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/${t.id}`);
            }}
          >
            <Eye className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
          </button>
          <button
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ResponsiveList
      data={tenants}
      getKey={(t) => t.id}
      columns={columns}
      onRowClick={(t) => router.push(`/dashboard/${t.id}`)}
      emptyMessage="No Organizations found"
      renderMobileCard={(t) => (
        <div className="p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <div className="font-medium text-gray-900 dark:text-zinc-100 truncate">
                {t.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-zinc-400">
                {formatDate(t.created_at)}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/${t.id}`);
                }}
              >
                <Eye className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
              </button>
              <button
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="font-bold">{t.plan.name}</span>
            <span className="text-gray-600 dark:text-zinc-400">
              {t.region || 'PT'}
            </span>
            <span
              className={
                t.status.toLowerCase() === 'active'
                  ? 'text-green-600'
                  : 'text-amber-600'
              }
            >
              {t.status}
            </span>
          </div>
          <div className="text-sm text-gray-700 dark:text-zinc-300 truncate mb-2">
            {t.contact_email}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-400 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min(getUsagePct(t), 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 shrink-0">
              {t.usage.tokens_used?.toLocaleString()} /{' '}
              {t.usage.token_limit?.toLocaleString()} ({getUsagePct(t)}%)
            </span>
          </div>
        </div>
      )}
    />
  );
}
