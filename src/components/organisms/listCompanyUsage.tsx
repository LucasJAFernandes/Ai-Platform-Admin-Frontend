'use client';
import { useRouter } from 'next/navigation';
import { Building2, Database } from 'lucide-react';
import { Badge } from '../atoms/badge';
import { ResponsiveList, Column } from '../templates/responsiveList';
import { CompanyUsage } from '@/lib/types/organization.types';

interface ListTenantsProps {
  tenants: CompanyUsage[];
  searchTerm: string;
}

const healthDot: Record<string, string> = {
  healthy: 'bg-green-500',
  warning: 'bg-yellow-500',
  critical: 'bg-red-500',
};

export function ListCompanyUsage({ tenants }: ListTenantsProps) {
  const router = useRouter();

  const formatCurrency = (value: number) => {
    if (value === undefined || value === null) return '€0.00';
    return `€${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const HealthDot = ({ status }: { status: string }) => (
    <div
      className={`w-2 h-2 rounded-full mr-2 shrink-0 ${healthDot[status] || 'bg-gray-500'}`}
    />
  );

  const DeploymentIcon = ({ type }: { type: string }) =>
    type === 'cloud' ? (
      <Database className="w-3 h-3" />
    ) : (
      <Building2 className="w-3 h-3" />
    );

  const TokenUsageBar = ({ pct }: { pct: number }) => (
    <div className="flex flex-col items-center">
      <span>{pct?.toLocaleString()}%</span>
      <div className="w-20 h-1.5 bg-gray-400 dark:bg-gray-700 rounded-full mt-1">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: pct > 0 ? `${Math.min(pct, 100)}%` : '0%' }}
        />
      </div>
    </div>
  );

  const columns: Column<CompanyUsage>[] = [
    {
      key: 'company',
      header: 'Company',
      render: (t) => (
        <div className="font-medium text-gray-900 dark:text-zinc-100">
          {t.company_name}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => (
        <span
          className={
            (t.status || '').toLowerCase() === 'active'
              ? 'text-green-600'
              : 'text-amber-600'
          }
        >
          {t.status || 'N/A'}
        </span>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (t) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
          {t.plan}
        </span>
      ),
    },
    {
      key: 'deploy',
      header: 'Deploy',
      hideBelow: 'lg',
      render: (t) => (
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-zinc-400">
          <DeploymentIcon type={t.deployment_type} />
          <span className="capitalize">{t.deployment_type}</span>
        </div>
      ),
    },
    {
      key: 'mrr',
      header: 'MRR',
      align: 'right',
      render: (t) => (
        <span className="font-medium text-gray-900 dark:text-zinc-100">
          {formatCurrency(t.mrr)}
        </span>
      ),
    },
    {
      key: 'users',
      header: 'Users',
      align: 'right',
      hideBelow: 'lg',
      render: (t) => (
        <span className="text-gray-900 dark:text-zinc-100">
          {t.active_users}
        </span>
      ),
    },
    {
      key: 'token_usage',
      header: 'Token Usage',
      hideBelow: 'xl',
      render: (t) => <TokenUsageBar pct={t.token_usage_pct} />,
    },
    {
      key: 'ai_queries',
      header: 'AI Queries',
      hideBelow: 'xl',
      render: (t) => (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
            {(t.ai_queries_mtd || 0).toLocaleString()}
          </span>
          {t.ai_queries_change_pct !== null && (
            <span
              className={`text-xs ${t.ai_queries_change_pct > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {t.ai_queries_change_pct > 0 ? '+' : ''}
              {t.ai_queries_change_pct}%
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'health',
      header: 'Health',
      render: (t) => (
        <div className="flex items-center">
          <HealthDot status={t.health_status} />
          <span className="text-sm text-gray-700 dark:text-zinc-300 capitalize">
            {t.health_status}
          </span>
        </div>
      ),
    },
    {
      key: 'modules',
      header: 'Modules',
      hideBelow: 'xl',
      render: (t) => (
        <div className="max-w-[100px] overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5">
          <div className="flex gap-2">
            {t.modules?.map((m, idx) => (
              <Badge
                key={idx}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-zinc-700 dark:text-white rounded-md whitespace-nowrap"
              >
                {m.name}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 max-h-[365px] rounded-xl w-full shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-700 shrink-0">
        <h3 className="font-semibold text-gray-900 dark:text-zinc-100 text-base">
          Company Overview
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          {tenants.length} organizations
        </p>
      </div>

      <ResponsiveList
        data={tenants}
        getKey={(t) => t.tenant_id}
        columns={columns}
        onRowClick={(t) => router.push(`/dashboard/${t.tenant_id}`)}
        emptyMessage="No Organizations found"
        mobileListClassName="overflow-y-auto"
        tableWrapperClassName="md:w-full overflow-auto"
        theadClassName="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-700 sticky top-0"
        renderMobileCard={(t) => (
          <div className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-700/50">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-medium text-gray-900 dark:text-zinc-100 truncate">
                {t.company_name}
              </span>
              <span
                className={`text-xs shrink-0 ${(t.status || '').toLowerCase() === 'active' ? 'text-green-600' : 'text-amber-600'}`}
              >
                {t.status || 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-zinc-400 mb-2">
              <span>{t.plan}</span>
              <div className="flex items-center gap-1">
                <DeploymentIcon type={t.deployment_type} />
                <span className="capitalize">{t.deployment_type}</span>
              </div>
              <div className="flex items-center">
                <HealthDot status={t.health_status} />
                <span className="capitalize">{t.health_status}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm mb-2">
              <div>
                <div className="text-[10px] uppercase text-gray-500 dark:text-zinc-400">
                  MRR
                </div>
                <div className="font-medium text-gray-900 dark:text-zinc-100">
                  {formatCurrency(t.mrr)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-gray-500 dark:text-zinc-400">
                  Users
                </div>
                <div className="text-gray-900 dark:text-zinc-100">
                  {t.active_users}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-gray-500 dark:text-zinc-400">
                  AI Queries
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 dark:text-zinc-100">
                    {(t.ai_queries_mtd || 0).toLocaleString()}
                  </span>
                  {t.ai_queries_change_pct !== null && (
                    <span
                      className={`text-[10px] ${t.ai_queries_change_pct > 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {t.ai_queries_change_pct > 0 ? '+' : ''}
                      {t.ai_queries_change_pct}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="w-24 h-1.5 bg-gray-400 dark:bg-gray-700 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width:
                      t.token_usage_pct > 0
                        ? `${Math.min(t.token_usage_pct, 100)}%`
                        : '0%',
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                {t.token_usage_pct?.toLocaleString()}% tokens
              </span>
            </div>

            {t.modules?.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2">
                {t.modules.map((m, idx) => (
                  <Badge
                    key={idx}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-[10px] text-white dark:text-white rounded-md whitespace-nowrap"
                  >
                    {m.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
