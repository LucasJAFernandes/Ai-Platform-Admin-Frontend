'use client';

import {
  Coins,
  Box,
  TrendingUp,
  TrendingDown,
  Cpu,
  Database,
  Image,
  Mic,
  Zap,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import type { TenantDetails } from '@/lib/types/tenant-details.types';

function pct(used: number, max: number) {
  if (!max) return 0;
  return Math.min(100, Math.round((used / max) * 100));
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return String(n);
}

function fmtCurrency(n: number, currency = '€') {
  return `${currency}${n.toFixed(2)}`;
}

function UsageBar({
  label,
  used,
  max,
  colorClass = 'bg-blue-500',
}: {
  label: string;
  used: number;
  max: number;
  colorClass?: string;
}) {
  const p = pct(used, max);
  const isWarning = p >= 80;
  const isDanger = p >= 95;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <span
          className={`font-medium ${
            isDanger
              ? 'text-red-500'
              : isWarning
                ? 'text-yellow-500'
                : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {fmt(used)} / {fmt(max)}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isDanger ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : colorClass
          }`}
          style={{ width: `${p}%` }}
        />
      </div>
    </div>
  );
}

function CostRow({
  icon: Icon,
  label,
  value,
  barPct,
  currency = '€',
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  barPct: number;
  currency?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 flex items-center gap-1.5 shrink-0">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {label}
        </span>
      </div>
      <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-500"
          style={{ width: `${barPct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-12 text-right shrink-0">
        {currency}
        {value.toFixed(2)}
      </span>
    </div>
  );
}

export function PlanLimitsCard({ tenant }: { tenant: TenantDetails }) {
  const { plan, billing, usage, modules } = tenant;

  const activeModules = modules.filter((m) => m.status === 'active');

  const totalAiCost = Object.values(usage.cost_breakdown).reduce(
    (a, b) => a + b,
    0,
  );

  const costRows = [
    { icon: Zap, label: 'LLM Tokens', value: usage.cost_breakdown.llm_tokens },
    {
      icon: Database,
      label: 'Embeddings',
      value: usage.cost_breakdown.embeddings,
    },
    {
      icon: Cpu,
      label: 'Vector Storage',
      value: usage.cost_breakdown.vector_storage,
    },
    {
      icon: Image,
      label: 'Image Generation',
      value: usage.cost_breakdown.image_generation,
    },
    {
      icon: Mic,
      label: 'Speech to Text',
      value: usage.cost_breakdown.speech_to_text,
    },
  ];

  const tokenBudget = billing.mrr;

  return (
    <Card className="bg-zinc-200 mt-3 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2 text-base">
          <Coins className="w-4 h-4 text-blue-500" />
          Plan &amp; Limits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Plan
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              {plan.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 capitalize">
              {plan.billing_cycle} billing
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {plan.features.rag && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  RAG
                </Badge>
              )}
              {plan.features.sso && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  SSO
                </Badge>
              )}
              {plan.features.analytics && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  Analytics
                </Badge>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4">
            <p className="text-xs text-green-600 dark:text-green-400 mb-1">
              Gross Margin MTD
            </p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {fmtCurrency(usage.gross_margin)}
            </p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
              {usage.usage_pct.toFixed(0)}% · cost{' '}
              {fmtCurrency(usage.cost_to_serve)}
            </p>
            <div className="mt-3 flex items-center gap-1">
              {usage.trend_pct >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  usage.trend_pct >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {usage.trend_pct > 0 ? '+' : ''}
                {usage.trend_pct.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI Cost MTD
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {fmtCurrency(totalAiCost)} / {fmtCurrency(tokenBudget)} budget
              </span>
            </div>
            <div className="space-y-2">
              {costRows.map(({ icon, label, value }) => (
                <CostRow
                  key={label}
                  icon={icon}
                  label={label}
                  value={value}
                  barPct={totalAiCost > 0 ? (value / totalAiCost) * 100 : 0}
                />
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-zinc-700 flex justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Total
              </span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {fmtCurrency(totalAiCost)}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Resource Usage
            </p>
            <UsageBar
              label="Users"
              used={plan.consumed.users}
              max={plan.limits.max_users}
              colorClass="bg-blue-500"
            />
            <UsageBar
              label="Documents"
              used={plan.consumed.documents}
              max={plan.limits.max_documents}
              colorClass="bg-blue-500"
            />
            <UsageBar
              label="Connectors"
              used={plan.consumed.connectors}
              max={plan.limits.max_connectors}
              colorClass="bg-blue-500"
            />
            <UsageBar
              label="Tokens"
              used={plan.consumed.tokens_used}
              max={plan.limits.token_limit}
              colorClass="bg-amber-500"
            />
          </div>
        </div>

        {activeModules.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Modules
            </p>
            <div className="flex flex-wrap gap-2">
              {activeModules.map((m) => (
                <span
                  key={m.id}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                >
                  <Box className="w-3 h-3" />
                  {m.display_name}
                  {m.is_trial && (
                    <span className="ml-1 text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 px-1 rounded">
                      Trial
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
