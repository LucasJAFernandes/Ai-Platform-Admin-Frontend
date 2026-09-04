'use client';
import { RevenueByPlan } from '@/components/organisms/charts/dashRevenuePlan';
import { InfrastructureBreakdown } from '@/components/organisms/charts/dashInfra';
import { StatsCards } from '@/components/organisms/statsCards';
import { AIUsageCostChart } from '@/components/organisms/charts/aiUsageCostChart';
import { ListCompanyUsage } from '@/components/organisms/listCompanyUsage';
import { mockDashboardData as data, stats } from '@/mocks/dashboard';
import ModalUsage from '@/components/organisms/charts/moduleUsage';
export default function Dashboard() {
  const subscriptionsByDate = data.module_subscriptions_graph.reduce<
    Record<string, number>
  >((acc, item) => {
    acc[item.date] = (acc[item.date] ?? 0) + item.subscriptions;
    return acc;
  }, {});
  const subscriptionDates = Object.keys(subscriptionsByDate).sort();
  const subscriptionTotals = subscriptionDates.map(
    (d) => subscriptionsByDate[d],
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-2 justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Overview about all informations
            </p>
          </div>
        </div>

        <StatsCards stats={stats} />
        <div className="lg:flex relative">
          <ModalUsage
            subscriptionDates={subscriptionDates}
            subscriptionTotals={subscriptionTotals}
          />
          <div className="bg-zinc-200 p-3 lg:w-5/10 rounded-xl lg:ml-3 dark:bg-zinc-800 shadow-sm hover:shadow-md mt-5 border border-gray-200 dark:border-zinc-700 hover:border-gray-300">
            <div className="lg:pr-3 lg:ml-3">
              <AIUsageCostChart aiCosts={data.ai_costs} />
            </div>
          </div>
        </div>
        <div className="lg:flex mt-3 ">
          <div className="w-full lg:w-6/10  ">
            <InfrastructureBreakdown data={data.infrastructure_costs} />
          </div>
          <div className="w-full mt-2 lg:mt-0 lg:w-4/10 lg:pl-3 ">
            <RevenueByPlan
              data={data.revenue_by_plan}
              moduleData={data.revenue_by_module}
            />
          </div>
        </div>
        <div className="flex mt-3 ">
          <ListCompanyUsage
            tenants={data.company_usage_table ?? []}
            searchTerm={''}
          />
        </div>
      </div>
    </div>
  );
}
