'use client';

import { Button } from '@/components/atoms/button';
import { CheckCircle2 } from 'lucide-react';
import type { CreatedTenantResult } from '@/lib/types/tenant-creation.types';

interface TenantCreationSuccessProps {
  createdResult: CreatedTenantResult;
  onCreateAnother: () => void;
  onOpenTenant: (tenantId: number) => void;
  onViewAll: () => void;
}

export function TenantCreationSuccess({
  createdResult,
  onCreateAnother,
  onOpenTenant,
  onViewAll,
}: TenantCreationSuccessProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tenant Created Successfully
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  The new tenant has been set up and is ready to use
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#252b3b] border border-gray-200 dark:border-white/5">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Tenant Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-400 block">Name</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {createdResult.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-gray-400 block">Plan</span>
                      <span className="text-sm font-medium text-white capitalize bg-blue-500/20 px-2 py-1 rounded-full inline-block">
                        {createdResult.plan.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">
                      Tenant ID
                    </span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-black/30 px-2 py-1 rounded">
                      {createdResult.id}
                    </span>
                  </div>
                </div>
              </div>

              {createdResult.credentials && (
                <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30">
                  <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
                    Admin Login Credentials
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Share these credentials with the tenant admin
                  </p>
                  <div className="space-y-3 font-mono bg-white dark:bg-[#1a1f2e] p-3 rounded-lg border border-blue-200 dark:border-blue-500/30">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Email
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white select-all">
                        {createdResult.contact_email}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-200 dark:border-white/5">
              <Button
                variant="outline"
                onClick={onCreateAnother}
                className="border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Create Another Tenant
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenTenant(createdResult.id)}
                className="border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Open Tenant
              </Button>
              <Button
                onClick={onViewAll}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                View All Tenants
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
