'use client';

import React from 'react';
import { CardHeader, CardTitle } from '@/components/atoms/card';
import { Users, CreditCard } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Subscription } from '@/lib/types/billing.types';

interface ListSubsProps {
  subscriptions: Subscription[];
}

const paymentMethodIcons: Record<string, React.ElementType> = {
  card: CreditCard,
  bank_transfer: CreditCard,
  invoice: CreditCard,
};

export function ListSubs({ subscriptions }: ListSubsProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="mt-6 group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm border border-gray-200 dark:border-zinc-700 p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No subscriptions found
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-zinc-800 dark:text-gray-200 flex items-center gap-2">
          <Users className="w-5 h-5 text-red-500" />
          Active Subscriptions
        </CardTitle>
      </CardHeader>
      <div className="md:hidden px-4 pb-4 space-y-3">
        {subscriptions.map((sub) => {
          const PaymentIcon =
            paymentMethodIcons[sub.payment_method] || CreditCard;
          return (
            <div
              key={sub.tenant_id}
              className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-zinc-900 dark:text-white">
                  {sub.tenant_name}
                </span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  ${sub.monthly_fee.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: sub.plan_color }}
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {sub.plan_name}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${sub.usage_pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">
                    {sub.usage_pct}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{sub.token_usage}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                  <PaymentIcon className="w-4 h-4 text-gray-400" />
                  <span className="capitalize">
                    {sub.payment_method.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-gray-500">
                  {formatDate(sub.next_billing)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden md:block p-4 pt-0">
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Tenant</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Monthly Fee</th>
                <th className="pb-3">Token Usage</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Next Billing</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {subscriptions.map((sub) => {
                const PaymentIcon =
                  paymentMethodIcons[sub.payment_method] || CreditCard;
                return (
                  <tr
                    key={sub.tenant_id}
                    className="border-t border-zinc-300 dark:border-zinc-700"
                  >
                    <td className="py-3 text-zinc-900 dark:text-white">
                      {sub.tenant_name}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: sub.plan_color }}
                        />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {sub.plan_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 font-medium text-zinc-900 dark:text-white">
                      ${sub.monthly_fee.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${sub.usage_pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {sub.usage_pct}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {sub.token_usage}
                      </p>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <PaymentIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs capitalize text-zinc-700 dark:text-zinc-300">
                          {sub.payment_method.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">
                      {formatDate(sub.next_billing)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
