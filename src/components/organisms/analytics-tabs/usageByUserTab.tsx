'use client';

import { useMemo } from 'react';
import { UsageRankingChart } from '@/components/organisms/usageRankingChart';
import { usageByUserMock } from '@/mocks/usageuser';
import { DataTable } from '../dataTable';
import { Column } from '@/components/templates/responsiveList';
import { UsageUserItem } from '@/lib/types/analytics.types';
export function UsageByUserTab() {
  const data = usageByUserMock;
  const userColumns: Column<UsageUserItem>[] = [
    {
      key: 'user',
      header: 'User',
      render: (user) => (
        <span className="font-medium text-zinc-900 dark:text-white">
          {user.user_name}
        </span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      hideBelow: 'lg',
      render: (user) => (
        <span className="text-gray-500 dark:text-gray-400">
          {user.user_email}
        </span>
      ),
    },
    {
      key: 'runs',
      header: 'Total Runs',
      align: 'right',
      render: (user) => (
        <span className="text-zinc-900 dark:text-white">{user.total_runs}</span>
      ),
    },
    {
      key: 'completed',
      header: 'Completed',
      align: 'right',
      render: (user) => (
        <span className="text-green-600 dark:text-green-400">
          {user.completed_runs}
        </span>
      ),
    },
    {
      key: 'failed',
      header: 'Failed',
      align: 'right',
      render: (user) => (
        <span className="text-red-600 dark:text-red-400">
          {user.failed_runs}
        </span>
      ),
    },
    {
      key: 'tokens',
      header: 'Tokens',
      align: 'right',
      hideBelow: 'xl',
      render: (user) => (
        <span className="text-zinc-900 dark:text-white">
          {user.total_tokens.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'cost',
      header: 'Cost ($)',
      align: 'right',
      hideBelow: 'xl',
      render: (user) => (
        <span className="text-zinc-900 dark:text-white">
          ${user.total_cost_usd.toFixed(4)}
        </span>
      ),
    },
    {
      key: 'messages',
      header: 'Messages',
      align: 'right',
      hideBelow: 'xl',
      render: (user) => (
        <span className="text-zinc-900 dark:text-white">
          {user.total_messages}
        </span>
      ),
    },
    {
      key: 'last_activity',
      header: 'Last Activity',
      hideBelow: 'lg',
      render: (user) => (
        <span className="text-sm text-gray-400">
          {user.last_activity
            ? new Date(user.last_activity).toLocaleDateString()
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
      byRuns: byRuns.map((u) => ({
        name: u.user_name.split(' ')[0],
        value: u.total_runs,
      })),
      byTokens: byTokens.map((u) => ({
        name: u.user_name.split(' ')[0],
        value: u.total_tokens,
      })),
      byCost: byCost.map((u) => ({
        name: u.user_name.split(' ')[0],
        value: parseFloat(u.total_cost_usd.toFixed(4)),
      })),
    };
  }, [data]);

  return (
    <>
      {data.items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <UsageRankingChart
            title="Top Users by Runs"
            data={ranking.byRuns}
            color="#06b6d4"
          />
          <UsageRankingChart
            title="Top Users by Tokens"
            data={ranking.byTokens}
            color="#a78bfa"
          />
          <UsageRankingChart
            title="Top Users by Cost"
            data={ranking.byCost}
            color="#f59e0b"
            valuePrefix="$"
          />
        </div>
      )}

      <DataTable
        data={data.items}
        columns={userColumns}
        getKey={(user) => user.user_id}
        emptyMessage="No user data found for this period"
      />
    </>
  );
}
