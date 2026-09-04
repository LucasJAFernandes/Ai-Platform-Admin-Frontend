'use client';
import { format } from 'date-fns';
import { Plug } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { TenantDetails } from '@/lib/types/tenant-details.types';

export function ConnectorsContent({ tenant }: { tenant: TenantDetails }) {
  return (
    <Card className="bg-zinc-200 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
          <Plug className="w-5 h-5 text-blue-500" />
          Connectors ({tenant.connectors.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tenant.connectors.map((connector) => (
            <div
              key={connector.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{connector.display_name}</p>
                <p className="text-sm text-gray-500">
                  Type: {connector.connector_type}
                </p>
                <p className="text-xs text-gray-400">
                  Last sync:{' '}
                  {format(new Date(connector.last_sync_at), 'dd/MM/yyyy')}
                </p>
              </div>
              <Badge className="self-start text-black dark:text-white sm:self-center shrink-0">
                {connector.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
