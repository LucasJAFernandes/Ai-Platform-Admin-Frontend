'use client';
import { PieChart } from '@mui/x-charts';
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type {
  ByStatus,
  HealthSummary,
  PlanStat,
} from '@/lib/types/organization.types';

interface TenantStatusChartProps {
  data?: ByStatus;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#10B981',
  trial: '#3B82F6',
  suspended: '#F59E0B',
  cancelled: '#EF4444',
};

export function TenantStatusChart({ data }: TenantStatusChartProps) {
  const [activeItem, setActiveItem] = useState<{
    label: string;
    value: number;
    color: string;
  } | null>(null);

  if (!data) {
    return (
      <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm border border-gray-200 dark:border-zinc-700">
        <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm mb-4">
          Tenant Status
        </h3>
        <div className="flex items-center justify-center h-32 text-zinc-500 dark:text-zinc-400">
          No status data available
        </div>
      </div>
    );
  }

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const items = Object.entries(data).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: STATUS_COLORS[key] ?? '#888',
    pct: total > 0 ? Math.round((value / total) * 100) : 0,
  }));

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300">
      <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm mb-4">
        Tenant Status
      </h3>

      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <PieChart
            series={[
              {
                data: items.map((item, i) => ({
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
                setActiveItem(items[highlight.dataIndex] ?? null);
              } else {
                setActiveItem(null);
              }
            }}
            slots={{ tooltip: () => null }}
          />
        </div>

        <div className="flex-1 min-w-0 h-[122px] flex items-center">
          {activeItem ? (
            <div className="w-full animate-in fade-in slide-in-from-right-2 duration-150">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: activeItem.color }}
                />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                  {activeItem.label}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Count
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                    {activeItem.value}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Percentage
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                    {Math.round((activeItem.value / total) * 100)}%
                  </span>
                </div>
                <div className="pt-1">
                  <div className="w-full bg-zinc-300 dark:bg-zinc-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round((activeItem.value / total) * 100)}%`,
                        backgroundColor: activeItem.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-1.5">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                    {item.label}
                  </span>
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
          Total Tenants
        </span>
        <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
          {total}
        </span>
      </div>
    </div>
  );
}

interface HealthSummaryChartProps {
  data?: HealthSummary;
}

const HEALTH_COLORS: Record<string, string> = {
  healthy: '#10B981',
  degraded: '#F59E0B',
  critical: '#EF4444',
  offline: '#6B7280',
};

export function HealthSummaryChart({ data }: HealthSummaryChartProps) {
  const [activeItem, setActiveItem] = useState<{
    label: string;
    value: number;
    color: string;
  } | null>(null);

  if (!data) {
    return (
      <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm border border-gray-200 dark:border-zinc-700">
        <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm mb-4">
          Health Summary
        </h3>
        <div className="flex items-center justify-center h-32 text-zinc-500 dark:text-zinc-400">
          No health data available
        </div>
      </div>
    );
  }

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const items = Object.entries(data).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color: HEALTH_COLORS[key] ?? '#888',
    pct: total > 0 ? Math.round((value / total) * 100) : 0,
  }));

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300">
      <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm mb-4">
        Health Summary
      </h3>

      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <PieChart
            series={[
              {
                data: items.map((item, i) => ({
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
                setActiveItem(items[highlight.dataIndex] ?? null);
              } else {
                setActiveItem(null);
              }
            }}
            slots={{ tooltip: () => null }}
          />
        </div>

        <div className="flex-1 min-w-0 h-[122px] flex items-center">
          {activeItem ? (
            <div className="w-full animate-in fade-in slide-in-from-right-2 duration-150">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: activeItem.color }}
                />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                  {activeItem.label}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Count
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                    {activeItem.value}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Percentage
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                    {Math.round((activeItem.value / total) * 100)}%
                  </span>
                </div>
                <div className="pt-1">
                  <div className="w-full bg-zinc-300 dark:bg-zinc-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round((activeItem.value / total) * 100)}%`,
                        backgroundColor: activeItem.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-1.5">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                    {item.label}
                  </span>
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
          Total Systems
        </span>
        <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
          {total}
        </span>
      </div>
    </div>
  );
}

interface ByPlanChartProps {
  data?: PlanStat[];
}

export function ByPlanChart({ data }: ByPlanChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const totalTenants = data?.reduce((a, p) => a + p.count, 0) ?? 0;
  const totalMrr = data?.reduce((a, p) => a + p.mrr, 0) ?? 0;

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const tickColor = isDark ? '#a1a1aa' : '#71717a';

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map((p) => p.plan_name),
        datasets: [
          {
            type: 'bar',
            label: 'Tenants',
            data: data.map((p) => p.count),
            backgroundColor: data.map((p) => p.plan_color || '#3B82F6'),
            borderRadius: 4,
            yAxisID: 'y',
            order: 2,
          },
          {
            type: 'line',
            label: 'MRR',
            data: data.map((p) => p.mrr),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#10B981',
            tension: 0.4,
            fill: false,
            yAxisID: 'y2',
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ctx.datasetIndex === 0
                  ? `Tenants: ${ctx.parsed.y}`
                  : `MRR: $${(ctx.parsed.y ?? 0).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            type: 'category',
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { size: 11 } },
          },
          y: {
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 11 },
              stepSize: 1,
              callback: (v) => (Number.isInteger(Number(v)) ? `${v}` : ''),
            },
          },

          y2: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#10B981',
              font: { size: 11 },
              callback: (v) => `$${Number(v).toLocaleString()}`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm border border-gray-200 dark:border-zinc-700">
        <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm mb-4">
          By Plan
        </h3>
        <div className="flex items-center justify-center h-32 text-zinc-500 dark:text-zinc-400">
          No plan data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl w-full shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-zinc-700 dark:text-zinc-100 text-sm">
          By Plan
        </h3>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-sm inline-block"
              style={{ backgroundColor: data[0]?.plan_color || '#3B82F6' }}
            />
            Tenants
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block bg-emerald-500" />
            MRR
          </span>
        </div>
      </div>

      <div style={{ height: 130 }}>
        <canvas ref={canvasRef} />
      </div>

      <div className="flex justify-between items-center mt-2 pt-3 border-t border-zinc-300 dark:border-zinc-700">
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {totalTenants} tenants · ${totalMrr.toLocaleString()} MRR
        </span>
      </div>
    </div>
  );
}
