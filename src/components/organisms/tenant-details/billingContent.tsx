'use client';
import { format } from 'date-fns';
import { CreditCard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { TenantDetails } from '@/lib/types/tenant-details.types';
export function BillingContent({ tenant }: { tenant: TenantDetails }) {
  return (
    <Card className="bg-zinc-200 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-500" />
          Usage & Billing Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Usage Statistics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tokens Used</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {tenant.usage.tokens_used.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Usage Cost</p>
                <p className="text-xl sm:text-2xl font-bold">
                  ${tenant.usage.usage_cost_usd}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gross Margin</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {tenant.usage.gross_margin}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cost to Serve</p>
                <p className="text-xl sm:text-2xl font-bold">
                  ${tenant.usage.cost_to_serve}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-zinc-700" />

          <div>
            <h3 className="text-lg font-semibold mb-3">Billing Information</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">MRR</p>
                <p className="text-xl sm:text-2xl font-bold">
                  ${tenant.billing.mrr}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <Badge>{tenant.billing.payment_status}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Billing Date</p>
                <p className="font-medium text-sm sm:text-base">
                  {format(
                    new Date(tenant.billing.next_billing_date),
                    'dd/MM/yyyy',
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding Balance</p>
                <p className="font-medium text-sm sm:text-base">
                  ${tenant.billing.outstanding_balance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
