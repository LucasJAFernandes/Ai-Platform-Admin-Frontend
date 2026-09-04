'use client';
import { DailyRunsTokensChart } from '@/components/organisms/charts/dailyRunsTokensChart';
import { DailyCostChart } from '@/components/organisms/charts/dailyCostChart';
import { RunStatusPieChart } from '@/components/organisms/charts/runStatusPieChart';
import { StatsCards } from '@/components/molecules/statusCards';
import { MOCK_OVERVIEW_DATA, OVERVIEW_STATS } from '@/mocks/analytics';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table';
export function UsageOverviewTab() {
  const successRate = (
    (MOCK_OVERVIEW_DATA.completed_runs / MOCK_OVERVIEW_DATA.total_runs) *
    100
  ).toFixed(1);
  const avgTokensPerRun = Math.round(
    MOCK_OVERVIEW_DATA.total_tokens / MOCK_OVERVIEW_DATA.total_runs,
  );
  const avgCostPerRun = (
    MOCK_OVERVIEW_DATA.total_cost_usd / MOCK_OVERVIEW_DATA.total_runs
  ).toFixed(3);

  return (
    <div className="space-y-6">
      <StatsCards
        variant="dot"
        stats={OVERVIEW_STATS}
        gridClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        cardClassName="bg-zinc-300 border-white/5 hover:border-white/10"
        valueClassName="text-zinc-800 dark:text-white"
      />

      <div className="grid grid-cols-3 gap-4 px-4 py-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg border border-white/5">
        <div className="text-center">
          <p className="text-xs dark:text-gray-500">Success Rate</p>
          <p className="text-sm font-semibold dark:text-green-400">
            {successRate}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs dark:text-gray-500">Avg Tokens/Run</p>
          <p className="text-sm font-semibold dark:text-white">
            {avgTokensPerRun.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs dark:text-gray-500">Avg Cost/Run</p>
          <p className="text-sm font-semibold dark:text-white">
            ${avgCostPerRun}
          </p>
        </div>
      </div>

      {MOCK_OVERVIEW_DATA?.daily_breakdown.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-zinc-300 dark:bg-zinc-800 rounded-xl border border-white/5 p-4 overflow-x-auto">
              <h3 className="text-sm font-semibold dark:text-white mb-3">
                Daily Runs & Tokens
              </h3>
              <DailyRunsTokensChart data={MOCK_OVERVIEW_DATA.daily_breakdown} />
            </div>
            <div className="bg-zinc-300 dark:bg-zinc-800 rounded-xl border border-white/5 p-4">
              <h3 className="text-sm font-semibold dark:text-white mb-3">
                Run Status Distribution
              </h3>
              <div className="flex items-center justify-center h-64">
                <RunStatusPieChart
                  completed={MOCK_OVERVIEW_DATA.completed_runs}
                  failed={MOCK_OVERVIEW_DATA.failed_runs}
                  running={MOCK_OVERVIEW_DATA.running_runs}
                  cancelled={MOCK_OVERVIEW_DATA.cancelled_runs}
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-300 dark:bg-zinc-800 rounded-xl border border-white/5 p-4 overflow-x-auto">
            <h3 className="text-sm font-semibold dark:text-white mb-3">
              Daily Cost
            </h3>
            <DailyCostChart data={MOCK_OVERVIEW_DATA.daily_breakdown} />
          </div>

          <div className="bg-zinc-300 dark:bg-zinc-800 rounded-xl border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold dark:text-white">
                Daily Breakdown
              </h3>
              <p className="text-xs text-gray-500">
                Total: {MOCK_OVERVIEW_DATA.daily_breakdown.length} days
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="sm:hidden space-y-2">
                {MOCK_OVERVIEW_DATA.daily_breakdown.map((row, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/5 bg-white/5 p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="dark:text-white font-medium text-sm">
                        {row.day}
                      </span>
                      <span className="dark:text-white font-medium text-sm">
                        ${row.cost_usd.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{row.runs.toLocaleString()} runs</span>
                      <span>{row.tokens.toLocaleString()} tokens</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-gray-600 dark:text-gray-400">
                        Day
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                        Runs
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                        Tokens
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                        Cost ($)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_OVERVIEW_DATA.daily_breakdown.map((row, i) => (
                      <TableRow
                        key={i}
                        className="border-white/5 hover:bg-white/5"
                      >
                        <TableCell className="dark:text-white font-medium">
                          {row.day}
                        </TableCell>
                        <TableCell className="dark:text-white text-right">
                          {row.runs.toLocaleString()}
                        </TableCell>
                        <TableCell className="dark:text-white text-right">
                          {row.tokens.toLocaleString()}
                        </TableCell>
                        <TableCell className="dark:text-white text-right">
                          ${row.cost_usd.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
