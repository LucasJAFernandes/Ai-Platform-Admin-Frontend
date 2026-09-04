'use client';

import { useMemo } from 'react';
import { UsageRankingChart } from '@/components/organisms/usageRankingChart';
import { usageByConversationMock } from '@/mocks/usageuser';
import { DataTable } from '../dataTable';
import { Column } from '@/components/templates/responsiveList';
import { UsageConversationItem } from '@/lib/types/analytics.types';

export function UsageByConversationTab() {
  const data = usageByConversationMock;

  const conversationColumns: Column<UsageConversationItem>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (conversation) => (
        <span className="font-medium text-zinc-900 dark:text-white">
          {conversation.title ?? 'Untitled'}
        </span>
      ),
    },
    {
      key: 'user',
      header: 'User',
      hideBelow: 'lg',
      render: (conversation) => (
        <span className="text-gray-500 dark:text-gray-400">
          {conversation.user_name ?? '—'}
        </span>
      ),
    },
    {
      key: 'created',
      header: 'Created',
      hideBelow: 'xl',
      render: (conversation) => (
        <span className="text-sm text-gray-400">
          {conversation.created_at
            ? new Date(conversation.created_at).toLocaleDateString()
            : '—'}
        </span>
      ),
    },
    {
      key: 'last_activity',
      header: 'Last Activity',
      hideBelow: 'lg',
      render: (conversation) => (
        <span className="text-sm text-gray-400">
          {conversation.last_activity_at
            ? new Date(conversation.last_activity_at).toLocaleDateString()
            : '—'}
        </span>
      ),
    },
    {
      key: 'runs',
      header: 'Total Runs',
      align: 'right',
      render: (conversation) => (
        <span className="text-zinc-900 dark:text-white">
          {conversation.total_runs}
        </span>
      ),
    },
    {
      key: 'tokens',
      header: 'Tokens',
      align: 'right',
      hideBelow: 'xl',
      render: (conversation) => (
        <span className="text-zinc-900 dark:text-white">
          {conversation.total_tokens.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'cost',
      header: 'Cost ($)',
      align: 'right',
      hideBelow: 'xl',
      render: (conversation) => (
        <span className="text-zinc-900 dark:text-white">
          ${conversation.total_cost_usd.toFixed(4)}
        </span>
      ),
    },
    {
      key: 'messages',
      header: 'Messages',
      align: 'right',
      render: (conversation) => (
        <span className="text-zinc-900 dark:text-white">
          {conversation.total_messages}
        </span>
      ),
    },
  ];

  const ranking = useMemo(() => {
    const items = data?.items ?? [];

    const byTokens = [...items]
      .sort((a, b) => b.total_tokens - a.total_tokens)
      .slice(0, 8);

    const byCost = [...items]
      .sort((a, b) => b.total_cost_usd - a.total_cost_usd)
      .slice(0, 8);

    const byMessages = [...items]
      .sort((a, b) => b.total_messages - a.total_messages)
      .slice(0, 8);

    return {
      byTokens: byTokens.map((conversation) => ({
        name: conversation.title ?? 'Untitled',
        value: conversation.total_tokens,
      })),

      byCost: byCost.map((conversation) => ({
        name: conversation.title ?? 'Untitled',
        value: parseFloat(conversation.total_cost_usd.toFixed(4)),
      })),

      byMessages: byMessages.map((conversation) => ({
        name: conversation.title ?? 'Untitled',
        value: conversation.total_messages,
      })),
    };
  }, [data]);

  return (
    <>
      {data.items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <UsageRankingChart
            title="Top Conversations by Tokens"
            data={ranking.byTokens}
            color="#a78bfa"
          />

          <UsageRankingChart
            title="Top Conversations by Cost"
            data={ranking.byCost}
            color="#f59e0b"
            valuePrefix="$"
          />

          <UsageRankingChart
            title="Top Conversations by Messages"
            data={ranking.byMessages}
            color="#22c55e"
          />
        </div>
      )}

      <DataTable
        data={data.items}
        columns={conversationColumns}
        getKey={(conversation) => conversation.conversation_id}
        emptyMessage="No conversation data found for this period"
      />
    </>
  );
}
