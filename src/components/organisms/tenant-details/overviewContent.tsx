'use client';
import { ExternalLink, Copy, CheckCircle, Globe } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { PlanLimitsCard } from '@/components/molecules/plansLimitsCard';
import { TenantDetails } from '@/lib/types/tenant-details.types';

export function OverviewContent({
  tenant,
  copied,
  copyToClipboard,
}: {
  tenant: TenantDetails;
  copied: string | null;
  copyToClipboard: (text: string, field: string) => void;
}) {
  return (
    <>
      <Card className="bg-zinc-200 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Business Area</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                  {tenant.profile.industry || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Country</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tenant.profile.country || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm text-gray-900 dark:text-white break-words">
                  {tenant.profile.address || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Website</p>
                {tenant.profile.website ? (
                  <a
                    href={
                      tenant.profile.website.startsWith('http')
                        ? tenant.profile.website
                        : `https://${tenant.profile.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline flex items-center gap-1 break-all"
                  >
                    {tenant.profile.website}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ) : (
                  <p className="text-gray-500 text-sm">Not specified</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Industry</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tenant.profile.industry || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tax / VAT Number</p>
                <p className="text-sm text-gray-900 dark:text-white break-words">
                  {tenant.profile.vat_number || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Platform Domain</p>
                {tenant.profile.domain ? (
                  <div className="flex items-center justify-between gap-2 group">
                    <span className="text-sm text-gray-900 dark:text-white break-all">
                      {tenant.profile.domain}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      onClick={() =>
                        copyToClipboard(tenant.profile.domain!, 'domain')
                      }
                    >
                      {copied === 'domain' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Not specified</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-zinc-700" />

          <div>
            <p className="text-xs text-gray-500 mb-3 font-semibold tracking-wide">
              PRIMARY CONTACT
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {tenant.profile.contact_name || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                {tenant.profile.contact_email ? (
                  <a
                    href={`mailto:${tenant.profile.contact_email}`}
                    className="text-blue-600 text-sm hover:underline break-all"
                  >
                    {tenant.profile.contact_email}
                  </a>
                ) : (
                  <p className="text-gray-500 text-sm">Not specified</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tenant.profile.contact_phone || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PlanLimitsCard tenant={tenant} />
    </>
  );
}
