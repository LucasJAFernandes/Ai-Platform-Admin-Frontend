'use client';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { TenantDetails } from '@/lib/types/tenant-details.types';
export function ActivityContent({ tenant }: { tenant: TenantDetails }) {
  return (
    <Card className="bg-zinc-200 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 border rounded-lg">
            <p className="text-sm text-gray-500">Account created</p>
            <p className="font-medium">
              {format(
                new Date(tenant.profile.created_at),
                "dd/MM/yyyy 'at' HH:mm",
              )}
            </p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="text-sm text-gray-500">Last activity</p>
            <p className="font-medium">
              {format(
                new Date(tenant.profile.last_activity_at),
                "dd/MM/yyyy 'at' HH:mm",
              )}
            </p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="text-sm text-gray-500">Onboarded at</p>
            <p className="font-medium">
              {format(
                new Date(tenant.profile.onboarded_at),
                "dd/MM/yyyy 'at' HH:mm",
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
