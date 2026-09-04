'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Building2,
  Calendar,
  Coins,
  Edit,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  BadgeDollarSign,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { StatsCards } from '@/components/organisms/statsCards';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockTenantDetails } from '@/mocks/tenant-details';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Plug,
  Box,
  HeartHandshake,
  Activity,
  ArrowUpToLineIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  DateRangePicker,
  DateRange,
  defaultDateRange,
} from '@/components/atoms/dateRangePicker';
import TabsBar, { Tab } from '@/components/molecules/tabBar';
import { OverviewContent } from '@/components/organisms/tenant-details/overviewContent';
import { BillingContent } from '@/components/organisms/tenant-details/billingContent';
import { UsersContent } from '@/components/organisms/tenant-details/usersContent';
import { ConnectorsContent } from '@/components/organisms/tenant-details/connectorsContent';
import { ModulesContent } from '@/components/organisms/tenant-details/modulesContent';
import { ActivityContent } from '@/components/organisms/tenant-details/activityContent';

const statusConfig: Record<
  string,
  { color: string; bgColor: string; icon: LucideIcon; label: string }
> = {
  active: {
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-500/20',
    icon: CheckCircle,
    label: 'Active',
  },
  inactive: {
    color: 'text-gray-700 dark:text-gray-400',
    bgColor: 'bg-gray-500/20',
    icon: Clock,
    label: 'Inactive',
  },
  suspended: {
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-500/20',
    icon: AlertCircle,
    label: 'Suspended',
  },
};

const toApiDate = (date: Date) => format(date, 'yyyy-MM-dd');

export default function TenantDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const [refreshing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange(30));
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard width={14} height={14} />,
    },
    {
      id: 'billing',
      label: 'Usage & Billing',
      icon: <CreditCard width={14} height={14} />,
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users width={14} height={14} />,
      count: mockTenantDetails.users.length,
    },
    {
      id: 'connectors',
      label: 'Connectors',
      icon: <Plug width={14} height={14} />,
      count: mockTenantDetails.connectors.length,
    },
    {
      id: 'modules',
      label: 'Modules',
      icon: <Box width={14} height={14} />,
      count: mockTenantDetails.modules.length,
    },
    {
      id: 'activity',
      label: 'Activity Log',
      icon: <Activity width={14} height={14} />,
    },
  ];

  const tenantStats = [
    {
      label: 'Total Users',
      value: `${mockTenantDetails.users.length}/${mockTenantDetails.plan.limits.max_users}`,
      icon: Users,
      extraInfo: <div className="text-xs text-gray-500">active/max</div>,
      color: 'bg-blue-500',
    },
    {
      label: 'Modules',
      value: mockTenantDetails.modules.length,
      extraInfo: (
        <div className="text-xs text-gray-500">
          {
            mockTenantDetails.modules.filter((m) => m.status === 'active')
              .length
          }{' '}
          actives
        </div>
      ),
      icon: Plug,
      color: 'bg-purple-500',
    },
    {
      label: 'MRR',
      value: `${mockTenantDetails.billing.mrr}$`,
      extraInfo: <div className="text-xs text-gray-500">Monthly revenue</div>,
      icon: ArrowUpToLineIcon,
      color: 'bg-orange-500',
    },
    {
      label: 'Cost to serve',
      value: `${mockTenantDetails.usage.cost_to_serve}$`,
      extraInfo: (
        <div className="text-xs text-gray-500">
          ${mockTenantDetails.usage.gross_margin} margin
        </div>
      ),
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      label: 'Token Balance',
      value: mockTenantDetails.usage.tokens_used,
      extraInfo: (
        <div className="text-xs text-gray-500">
          of {mockTenantDetails.usage.token_limit}
        </div>
      ),
      icon: Coins,
      color: 'bg-red-500',
    },
    {
      label: 'Health Score',
      value: mockTenantDetails.health.score ?? 'Unknown',
      extraInfo: (
        <div className="text-xs text-gray-500">
          Last checked {formatDate(mockTenantDetails.health.last_check_at)}
        </div>
      ),
      icon: HeartHandshake,
      color: 'bg-green-500',
    },
  ];

  const statusInfo =
    statusConfig[mockTenantDetails.profile.status] || statusConfig.inactive;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-zinc-900">
      {refreshing && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
        </div>
      )}

      <div
        className={`max-w-7xl mx-auto transition-opacity duration-200 ${refreshing ? 'opacity-60' : 'opacity-100'}`}
      >
        <div className="md:flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tenants
          </Button>

          <div className="ml-auto mt-2 justify-center flex items-center gap-3">
            <Button variant="destructive" className="text-red-300">
              <AlertCircle className="text-red-700 w-4 h-4 lg:mr-2" />
              <p className="text-red-700">
                <span className="hidden lg:inline">Suspend</span>
              </p>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <BadgeDollarSign className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Plans & Modules</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Edit Tenant</span>
            </Button>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
                  <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2">
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
                      {mockTenantDetails.profile.name}
                    </h1>
                    <Badge
                      className={`${statusInfo.bgColor} ${statusInfo.color} border-0 shrink-0`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      {mockTenantDetails.profile.industry ||
                        'No industry specified'}
                    </p>
                    <span className="hidden sm:inline mx-1">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {formatDate(mockTenantDetails.profile.created_at)}
                    </span>
                    <span className="hidden sm:inline mx-1">•</span>
                    <span>
                      Last activity{' '}
                      {formatDate(mockTenantDetails.profile.last_activity_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className=" text-center md:text-right dark:text-white rounded-lg shrink-0">
                <p className="text-xs uppercase tracking-wide opacity-80">
                  {mockTenantDetails.plan.name} Plan
                </p>
                <p className="text-lg sm:text-xl font-semibold mt-1">
                  €{mockTenantDetails.billing.mrr}/mo
                </p>
                <p className="text-xs opacity-80 mt-1">
                  Next Billing:{' '}
                  {formatDate(mockTenantDetails.billing.next_billing_date)}
                </p>
                <p className="text-xs text-blue-400 mt-1">
                  {toApiDate(dateRange.from)} → {toApiDate(dateRange.to)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <StatsCards stats={tenantStats} className="mb-4" />
        <TabsBar tabs={tabs} defaultTab="overview" />
        {activeTab === 'overview' && (
          <OverviewContent
            tenant={mockTenantDetails}
            copied={copied}
            copyToClipboard={copyToClipboard}
          />
        )}
        {activeTab === 'billing' && (
          <BillingContent tenant={mockTenantDetails} />
        )}
        {activeTab === 'users' && <UsersContent tenant={mockTenantDetails} />}
        {activeTab === 'connectors' && (
          <ConnectorsContent tenant={mockTenantDetails} />
        )}
        {activeTab === 'modules' && (
          <ModulesContent tenant={mockTenantDetails} />
        )}
        {activeTab === 'activity' && (
          <ActivityContent tenant={mockTenantDetails} />
        )}
      </div>
    </div>
  );
}
