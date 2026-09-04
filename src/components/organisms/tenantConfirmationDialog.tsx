'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog';
import { Button } from '@/components/atoms/button';
import {
  CheckCircle,
  Building,
  User,
  CreditCard,
  Mail,
  Phone,
  Globe,
  MapPin,
} from 'lucide-react';
import type {
  TenantBasicData,
  TenantAdminData,
} from '@/lib/types/tenant-creation.types';

interface TenantConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  basicData: TenantBasicData;
  adminData: TenantAdminData;
  loading?: boolean;
}

export function TenantConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  basicData,
  adminData,
  loading,
}: TenantConfirmationDialogProps) {
  const getPlanName = (planId: number) => {
    const plans = {
      1: 'Basic Plan',
      2: 'Professional Plan',
      3: 'Enterprise Plan',
    };
    return plans[planId as keyof typeof plans] || 'Unknown Plan';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Building className="w-6 h-6" />
            Confirm Tenant Creation
          </DialogTitle>
          <DialogDescription>
            Please review all the information before creating this tenant.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-500" />
              Tenant Information
            </h3>
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tenant Name</p>
                  <p className="font-medium">{basicData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">
                    {basicData.industry || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="font-medium">{basicData.contact_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </p>
                  <p className="font-medium">
                    {basicData.contact_phone || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Website
                  </p>
                  <p className="font-medium">
                    {basicData.website || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium">
                    {basicData.region || 'Not specified'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Address
                  </p>
                  <p className="font-medium">
                    {basicData.address || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-500" />
              Plan & Billing
            </h3>
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium">
                    {getPlanName(basicData.plan_id)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Token Limit</p>
                  <p className="font-medium">
                    {basicData.token_limit.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Billing Cycle</p>
                  <p className="font-medium capitalize">
                    {basicData.billing_cycle}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium capitalize">
                    {basicData.payment_method.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-purple-500" />
              Administrator
            </h3>
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{adminData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{adminData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-medium">
                    {adminData.job_title || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{adminData.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>Creating...</>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm & Create Tenant
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
