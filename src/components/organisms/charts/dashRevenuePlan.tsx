'use client';
import { PieChart } from '@mui/x-charts/PieChart';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  revenue_by_plan,
  RevenueByModule,
  RevenueChartItem,
} from '@/lib/types/dashboard.types';
import { getCurrencySymbol } from '@/lib/utils';
interface RevenueByPlanProps {
  data?: revenue_by_plan;
  moduleData?: RevenueByModule;
}

const generateModuleColor = (moduleKey: string, index: number) => {
  const colors = [
    '#F59E0B',
    '#8B5CF6',
    '#10B981',
    '#EF4444',
    '#3B82F6',
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#6366F1',
    '#A855F7',
  ];
  return colors[index % colors.length];
};

export function RevenueByPlan({ data, moduleData }: RevenueByPlanProps) {
  const [view, setView] = useState<'Plans' | 'Models'>('Plans');
  const [activeItem, setActiveItem] = useState<RevenueChartItem | null>(null);
  const hasPlansData = data?.plans && data.plans.length > 0;
  const hasModulesData = moduleData;

  if (!hasPlansData && !hasModulesData) {
    return (
      <div className="bg-zinc-200 h-full dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm">
            Revenue by {view}
          </h3>
          <div className="flex bg-zinc-300 dark:bg-zinc-700 rounded-lg p-0.5 text-xs">
            {(['Plans', 'Models'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'px-3 py-1 rounded-md capitalize transition-all font-medium',
                  view === v
                    ? 'bg-white dark:bg-zinc-600 text-zinc-800 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
                )}
              >
                By {v}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center h-32 text-zinc-500 dark:text-zinc-400">
          No {view.toLowerCase()} data available
        </div>
      </div>
    );
  }
  const currentData =
    view === 'Plans' && hasPlansData
      ? {
          items: data!.plans.map((plan) => ({
            ...plan,
            value: plan.mrr,
            label: plan.plan,
            color: plan.color,
            type: 'plan' as const,
          })),
          total: data!.total_mrr,
          currency: data!.currency,
          title: 'Revenue by Plan',
          totalLabel: 'Total MRR',
        }
      : {
          items: moduleData!.modules.map((module, idx) => ({
            ...module,
            value: module.mrr,
            label: module.display_name,
            color: generateModuleColor(module.module_key, idx),
            type: 'module' as const,
          })),
          total: moduleData!.total_mrr,
          currency: moduleData!.currency,
          title: 'Revenue by Module',
          totalLabel: 'Total Module MRR',
        };

  const currencySymbol = getCurrencySymbol(currentData.currency);

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm">
          {currentData.title}
        </h3>
        <div className="flex bg-zinc-300 dark:bg-zinc-700 rounded-lg p-0.5 text-xs">
          {(['Plans', 'Models'] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                setActiveItem(null);
              }}
              disabled={
                (v === 'Plans' && !hasPlansData) ||
                (v === 'Models' && !hasModulesData)
              }
              className={cn(
                'px-3 py-1 rounded-md capitalize transition-all font-medium',
                view === v
                  ? 'bg-white dark:bg-zinc-600 text-zinc-800 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
                ((v === 'Plans' && !hasPlansData) ||
                  (v === 'Models' && !hasModulesData)) &&
                  'opacity-50 cursor-not-allowed hover:text-zinc-500',
              )}
            >
              By {v}
            </button>
          ))}
        </div>
      </div>

      <div className="xl:flex flex sm: items-center gap-2">
        <div className="flex-shrink-0">
          <PieChart
            series={[
              {
                data: currentData.items.map((item, i) => ({
                  id: i,
                  value: item.value,
                  label: item.label,
                  color: item.color,
                })),
                innerRadius: 30,
                outerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            width={140}
            height={122}
            hideLegend
            onHighlightChange={(highlight) => {
              if (highlight?.dataIndex !== undefined) {
                setActiveItem(currentData.items[highlight.dataIndex] ?? null);
              } else {
                setActiveItem(null);
              }
            }}
            slots={{ tooltip: () => null }}
          />
        </div>
        <div className="flex-1 min-w-0 h-[122px] flex mt-2 items-center">
          {activeItem ? (
            <div className="w-full animate-in fade-in slide-in-from-right-2 duration-150">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: activeItem.color }}
                />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm truncate">
                  {activeItem.label}
                </span>
              </div>

              <div>
                {activeItem.type === 'plan' ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        MRR
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {currencySymbol}
                        {activeItem.mrr.toLocaleString('de-DE', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Tenants
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {activeItem.tenants}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Percentage
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {activeItem.pct}%
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Avg/Tenant
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {currencySymbol}
                        {(
                          activeItem.mrr / (activeItem.tenants ?? 1)
                        ).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        MRR
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {currencySymbol}
                        {activeItem.mrr.toLocaleString('de-DE', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Subscribers
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {activeItem.subscribers}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Paying
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {activeItem.paying}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Trial
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {activeItem.trial}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Price
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {currencySymbol}
                        {activeItem.price_monthly}/mo
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Percentage
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {activeItem.pct}%
                      </span>
                    </div>
                  </>
                )}
                <div className="pt-1">
                  <div className="w-full bg-zinc-300 dark:bg-zinc-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${activeItem.pct}%`,
                        backgroundColor: activeItem.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-1.5">
              {currentData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="md:relative flex sm:items-center sm:gap-2"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-700">
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {currentData.totalLabel}
        </span>
        <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
          {currencySymbol}
          {currentData.total.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}
