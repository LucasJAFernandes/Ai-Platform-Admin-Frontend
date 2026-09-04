'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { ListSubs } from '@/components/organisms/listSubscriptions';
import {
  DollarSign,
  TrendingUp,
  Receipt,
  AlertCircle,
  Users,
  Ban,
  RefreshCw,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { RecentInvoices } from '@/components/organisms/recentInvoicesCard';
import { AlertList } from '@/components/organisms/alertList';
import { mockBillingData, statusConfig, severityConfig } from '@/mocks/billing';
import { StatsCards } from '@/components/molecules/statusCards';
export default function Billing() {
  const summary = mockBillingData?.summary;
  const subscriptions = mockBillingData?.subscriptions || [];
  const recentInvoices = mockBillingData?.recent_invoices || [];
  const alerts = mockBillingData?.alerts || [];
  const billingStats = summary
    ? [
        {
          label: 'Monthly Revenue',
          value: `$${summary.mrr.toLocaleString()}`,
          change: `+${summary.mrr_growth_pct}%`,
          icon: DollarSign,
          trend: 'up',
        },
        {
          label: 'Annual Revenue',
          value: `$${summary.arr.toLocaleString()}`,
          change: 'ARR',
          icon: TrendingUp,
          trend: 'up',
        },
        {
          label: 'Paying Customers',
          value: summary.paying_customers.toString(),
          change: `Avg $${summary.avg_revenue_per_user.toFixed(2)}`,
          icon: Users,
          trend: 'neutral',
        },
        {
          label: 'Overdue Invoices',
          value: summary.overdue_invoices.toString(),
          change: `$${summary.overdue_amount.toLocaleString()}`,
          icon: Ban,
          trend: 'down',
        },
      ]
    : [];

  const totalRevenue = recentInvoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const pendingAmount = recentInvoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueAmount = recentInvoices
    .filter((i) => i.is_overdue)
    .reduce((sum, i) => sum + i.amount, 0);
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Billing Management
            </h1>
            <p className="text-gray-400 mt-1">
              Manage subscriptions, invoices, and payment methods
            </p>
          </div>
          <div className="flex mt:mt-2 mt-0 items-center gap-3">
            <Button
              variant="outline"
              className="border-black dark:border-zinc-600 text-zinc-900 dark:text-zinc-100"
            >
              <RefreshCw className={`w-4 h-4 mr-2`} />
              Refresh
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Receipt className="w-4 h-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </div>
        {billingStats.length > 0 && (
          <StatsCards
            variant="horizontal"
            stats={billingStats.map((s) => ({
              ...s,
              color: 'bg-blue-500',
              extraInfo: (
                <p className="text-xs text-gray-500 mt-1">{s.change}</p>
              ),
            }))}
            className="mb-6"
          />
        )}
        <StatsCards
          variant="centered"
          className="mb-6"
          stats={[
            {
              label: 'Collected This Month',
              value: `$${totalRevenue.toLocaleString()}`,
              icon: CheckCircle,
              color: 'bg-green-500 dark:bg-zinc-900',
              iconColor: 'text-white dark:text-green-500',
            },
            {
              label: 'Pending Payments',
              value: `$${pendingAmount.toLocaleString()}`,
              icon: Clock,
              color: 'bg-yellow-500 dark:bg-zinc-900',
              iconColor: 'text-white dark:text-yellow-500',
            },
            {
              label: 'Overdue Amount',
              value: `$${overdueAmount.toLocaleString()}`,
              icon: AlertCircle,
              color: 'bg-red-500 dark:bg-zinc-900',
              iconColor: 'text-white dark:text-red-500',
            },
          ]}
        />
        {summary?.revenue_by_plan && summary.revenue_by_plan.length > 0 && (
          <StatsCards
            variant="dot"
            className="mb-6"
            stats={summary.revenue_by_plan.map((plan) => ({
              label: plan.plan_name,
              value: `$${plan.mrr.toLocaleString()}`,
              color: plan.plan_color,
              subLabel: `${plan.tenant_count} tenants • ${plan.percentage}% of MRR`,
            }))}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <CardTitle className="text-zinc-800 dark:text-gray-200">
                    Recent Invoices
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RecentInvoices
                filteredInvoices={recentInvoices}
                statusConfig={statusConfig}
              />
            </CardContent>
          </div>
          <div className="group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                <CardTitle className="text-zinc-800 dark:text-gray-200">
                  Billing Alerts
                </CardTitle>
                {alerts.filter((a) => !a.is_read).length > 0 && (
                  <Badge className="bg-yellow-500 text-white border-0 ml-2">
                    {alerts.filter((a) => !a.is_read).length} new
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <AlertList
                alerts={alerts}
                severityConfig={severityConfig}
                formatDate={formatDate}
              />
            </CardContent>
          </div>
        </div>
        {subscriptions.length > 0 && <ListSubs subscriptions={subscriptions} />}
      </div>
    </div>
  );
}
