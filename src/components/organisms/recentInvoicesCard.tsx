import { Download } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { formatDate } from '@/lib/utils';
import type { Invoice } from '@/lib/types/billing.types';

interface StatsCardsProps {
  filteredInvoices: Invoice[];
  statusConfig: Record<
    string,
    { color: string; bgColor: string; icon: React.ElementType; label: string }
  >;
}
export function RecentInvoices({
  filteredInvoices,
  statusConfig,
}: StatsCardsProps) {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {filteredInvoices.slice(0, 10).map((invoice) => {
        const status = invoice.is_overdue ? 'overdue' : invoice.status;
        const config = statusConfig[status] || statusConfig.pending;
        const StatusIcon = config.icon;

        return (
          <div
            key={invoice.id}
            className="flex flex-col gap-3 rounded-xl bg-zinc-300 p-3 transition-colors hover:bg-zinc-400 dark:bg-white/5 dark:hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="break-all font-medium text-zinc-900 dark:text-white">
                  {invoice.invoice_number}
                </p>
                <Badge
                  className={`shrink-0 border-0 bg-zinc-200 dark:bg-zinc-900 ${config.color}`}
                >
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
              </div>
              <p className="break-words text-sm text-gray-500 dark:text-gray-400">
                {invoice.tenant_name} • Due {formatDate(invoice.due_date)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
              <div className="text-right">
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  ${invoice.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{invoice.currency}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => window.open(invoice.pdf_url, '_blank')}
              >
                <Download className="w-4 h-4 text-zinc-800 dark:text-zinc-400" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
