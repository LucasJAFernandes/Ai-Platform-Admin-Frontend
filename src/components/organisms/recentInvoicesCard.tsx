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
            className="flex items-center justify-between p-4 rounded-xl bg-zinc-300 dark:bg-white/5 hover:bg-zinc-400 dark:hover:bg-white/10 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-zinc-900 dark:text-white font-medium">
                  {invoice.invoice_number}
                </p>
                <Badge
                  className={`dark:bg-zinc-900 bg-zinc-200 ${config.color} border-0`}
                >
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {invoice.tenant_name} • Due {formatDate(invoice.due_date)}
              </p>
            </div>
            <div className="flex items-center gap-4">
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
