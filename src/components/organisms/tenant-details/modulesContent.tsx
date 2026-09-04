'use client';
import { Box } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { TenantDetails } from '@/lib/types/tenant-details.types';

export function ModulesContent({ tenant }: { tenant: TenantDetails }) {
  return (
    <Card className="bg-zinc-200 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
          <Box className="w-5 h-5 text-blue-500" />
          Modules ({tenant.modules.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tenant.modules.map((module) => (
            <div
              key={module.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{module.display_name}</p>
                <p className="text-sm text-gray-500">{module.description}</p>
                <p className="text-xs text-gray-400">
                  Category: {module.category}
                </p>
              </div>
              <Badge className="self-start text-black dark:text-white sm:self-center shrink-0">
                {module.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
