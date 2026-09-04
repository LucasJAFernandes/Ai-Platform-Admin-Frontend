'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { BarChart3, Users, Download, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { WeeklyQueryChart } from '@/components/organisms/weeklyQueryChart';
import { TokenUsageByTenant } from '@/components/organisms/tokenUsageByTenant';
import { UsageOverviewTab } from '@/components/organisms/analytics-tabs/usageOverviewTab';
import { UsageByUserTab } from '@/components/organisms/analytics-tabs/usageByUserTab';
import { UsageByConversationTab } from '@/components/organisms/analytics-tabs/usageByConversationTab';
import { UsageByProjectTab } from '../../organisms/analytics-tabs/usageByProjectTab';
import { mockAnalyticsData } from '@/mocks/analytics';
import { WeeklyDatum, TenantUsageItem } from '@/lib/types/analytics.types';
import { DateRangePicker } from '@/components/atoms/dateRangePicker';
import TabsBar, { Tab } from '@/components/molecules/tabBar';

const tabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <LayoutDashboard width={14} height={14} />,
  },
  { id: 'by-user', label: 'By User', icon: <Users width={14} height={14} /> },
  {
    id: 'by-conversation',
    label: 'By Conversation',
    icon: <BarChart3 width={14} height={14} />,
  },
  {
    id: 'by-project',
    label: 'By Project',
    icon: <LayoutDashboard width={14} height={14} />,
  },
];
export default function Analytics() {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const weeklyData: WeeklyDatum[] = mockAnalyticsData
    ? mockAnalyticsData.weekly_query_volume.map((item) => ({
        day: item.day,
        queries: item.value,
      }))
    : [];
  const tenantUsage: TenantUsageItem[] = mockAnalyticsData
    ? (() => {
        const tenants = mockAnalyticsData.usage_by_tenant;
        const maxTokens = Math.max(...tenants.map((t) => t.tokens_used), 1);
        return tenants.map((tenant) => ({
          name: tenant.tenant_name,
          usage: tenant.tokens_used,
          limit: maxTokens,
          percentage: (tenant.tokens_used / maxTokens) * 100,
          growth: tenant.growth_pct,
        }));
      })()
    : [];

  const moduleUsage = mockAnalyticsData?.module_usage || [];
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-gray-400 mt-1">
              Platform usage metrics and performance insights
            </p>
          </div>
          <div className="flex md:mt-0 mt-2  items-center gap-3">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button
              variant="outline"
              className="border-white/10 text-gray-300 hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 p-6">
            <CardHeader>
              <CardTitle className="text-dark dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Weekly Query Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyQueryChart data={weeklyData} />
            </CardContent>
          </div>
          <div className="group overflow-auto bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 p-6 ">
            <CardHeader>
              <CardTitle className="dark:text-white text-zinc-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                Token Usage by Tenant
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-68 overflow-auto">
              <TokenUsageByTenant data={tenantUsage} />
            </CardContent>
          </div>
        </div>
        <div className="dark:border-zinc-700 mt-2">
          <TabsBar tabs={tabs} defaultTab="overview" />
        </div>
        <div className="mt-5 bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-300 dark:border-zinc-700 overflow-hidden mb-8">
          <div className="p-6">
            {activeTab === 'overview' && <UsageOverviewTab />}
            {activeTab === 'by-user' && <UsageByUserTab />}
            {activeTab === 'by-conversation' && <UsageByConversationTab />}
            {activeTab === 'by-project' && <UsageByProjectTab />}
          </div>
        </div>
        {moduleUsage.length > 0 ? (
          <div className="group mt-4 bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 p-1 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="dark:text-white text-zinc-800">
                Module Usage Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {moduleUsage.map((module, index) => {
                  const colors = [
                    'bg-blue-500',
                    'bg-purple-500',
                    'bg-teal-500',
                    'bg-orange-500',
                    'bg-pink-500',
                    'bg-indigo-500',
                  ];
                  const color = colors[index % colors.length];
                  return (
                    <div key={module.name} className="text-center">
                      <div
                        className={`w-16 h-16 mx-auto rounded-full ${color}/20 flex items-center justify-center mb-3`}
                      >
                        <div className={`w-8 h-8 rounded-full ${color}`} />
                      </div>
                      <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                        {module.percentage}%
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {module.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </div>
        ) : null}
      </div>
    </div>
  );
}
