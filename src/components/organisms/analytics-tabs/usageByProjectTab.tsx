'use client';

import { useMemo } from 'react';
import { UsageRankingChart } from '@/components/organisms/usageRankingChart';
import { usageByProjectMock } from '@/mocks/usageuser';
import { DataTable } from '../dataTable';
import { Column } from '@/components/templates/responsiveList';
import { UsageProjectItem } from '@/lib/types/analytics.types';

export function UsageByProjectTab() {
  const data = usageByProjectMock;

  const projectColumns: Column<UsageProjectItem>[] = [
    {
      key: 'project',
      header: 'Project',
      render: (project) => (
        <span className="font-medium text-zinc-900 dark:text-white">
          {project.project_name}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      hideBelow: 'lg',
      render: (project) => (
        <span className="text-gray-500 dark:text-gray-400">
          {project.project_type ?? '—'}
        </span>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      hideBelow: 'xl',
      render: (project) => (
        <span className="text-gray-500 dark:text-gray-400">
          {project.owner_name ?? '—'}
        </span>
      ),
    },
    {
      key: 'runs',
      header: 'Total Runs',
      align: 'right',
      render: (project) => (
        <span className="text-zinc-900 dark:text-white">
          {project.total_runs}
        </span>
      ),
    },
    {
      key: 'completed',
      header: 'Completed',
      align: 'right',
      render: (project) => (
        <span className="text-green-600 dark:text-green-400">
          {project.completed_runs}
        </span>
      ),
    },
    {
      key: 'failed',
      header: 'Failed',
      align: 'right',
      render: (project) => (
        <span className="text-red-600 dark:text-red-400">
          {project.failed_runs}
        </span>
      ),
    },
    {
      key: 'tokens',
      header: 'Tokens',
      align: 'right',
      hideBelow: 'xl',
      render: (project) => (
        <span className="text-zinc-900 dark:text-white">
          {project.total_tokens.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'cost',
      header: 'Cost ($)',
      align: 'right',
      hideBelow: 'xl',
      render: (project) => (
        <span className="text-zinc-900 dark:text-white">
          ${project.total_cost_usd.toFixed(4)}
        </span>
      ),
    },
    {
      key: 'messages',
      header: 'Messages',
      align: 'right',
      hideBelow: 'xl',
      render: (project) => (
        <span className="text-zinc-900 dark:text-white">
          {project.total_messages}
        </span>
      ),
    },
    {
      key: 'users',
      header: 'Users',
      align: 'right',
      hideBelow: 'lg',
      render: (project) => (
        <span className="text-zinc-900 dark:text-white">
          {project.active_users}
        </span>
      ),
    },
    {
      key: 'last_activity',
      header: 'Last Activity',
      hideBelow: 'lg',
      render: (project) => (
        <span className="text-sm text-gray-400">
          {project.last_activity
            ? new Date(project.last_activity).toLocaleDateString()
            : '—'}
        </span>
      ),
    },
  ];

  const ranking = useMemo(() => {
    const items = data?.items ?? [];

    const byRuns = [...items]
      .sort((a, b) => b.total_runs - a.total_runs)
      .slice(0, 8);

    const byTokens = [...items]
      .sort((a, b) => b.total_tokens - a.total_tokens)
      .slice(0, 8);

    const byCost = [...items]
      .sort((a, b) => b.total_cost_usd - a.total_cost_usd)
      .slice(0, 8);

    return {
      byRuns: byRuns.map((project) => ({
        name: project.project_name,
        value: project.total_runs,
      })),

      byTokens: byTokens.map((project) => ({
        name: project.project_name,
        value: project.total_tokens,
      })),

      byCost: byCost.map((project) => ({
        name: project.project_name,
        value: parseFloat(project.total_cost_usd.toFixed(4)),
      })),
    };
  }, [data]);

  return (
    <>
      {data.items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <UsageRankingChart
            title="Top Projects by Runs"
            data={ranking.byRuns}
            color="#06b6d4"
          />

          <UsageRankingChart
            title="Top Projects by Tokens"
            data={ranking.byTokens}
            color="#a78bfa"
          />

          <UsageRankingChart
            title="Top Projects by Cost"
            data={ranking.byCost}
            color="#f59e0b"
            valuePrefix="$"
          />
        </div>
      )}

      <DataTable
        data={data.items}
        columns={projectColumns}
        getKey={(project) => project.project_id}
        emptyMessage="No project data found for this period"
      />
    </>
  );
}
