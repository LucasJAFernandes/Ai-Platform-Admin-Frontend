'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { plans } from '@/components/molecules/planOptions';
import { StepCompany } from '@/components/organisms/tenant-creation/steps/stepCompany';
import { StepPayment } from '@/components/organisms/tenant-creation/steps/stepPayment';
import PlanMod from '@/components/organisms/tenant-creation/steps/stepModPlan';
import { TenantCreationStepper } from '@/components/molecules/tenant-creation/tenantCreationStepper';
import { TenantCreationSuccess } from '@/components/organisms/tenant-creation/tenantCreationSuccess';
import { TenantCreationSummary } from '@/components/organisms/tenant-creation/tenantCreationSummary';
import type {
  CreatedTenantResult,
  Step,
  TenantFormData,
} from '@/lib/types/tenant-creation.types';
import {
  validateStep,
  type ValidationError,
} from '@/lib/schemas/validate-step';
import { tenantFormSchema } from '@/lib/schemas/tenant-creation.schema';
import { mockCreatedTenantResult } from '@/mocks/tenant-creation';

const STEPS: Step[] = [
  { id: 1, title: 'Company', icon: Building2 },
  { id: 2, title: 'Plan and Modules', icon: CreditCard },
  { id: 3, title: 'Payment', icon: DollarSign },
  { id: 4, title: 'Confirm', icon: CheckCircle2 },
];

const INITIAL_FORM_DATA: TenantFormData = {
  companyName: '',
  industry: '',
  plan_id: 0,
  contactEmail: '',
  contactPhone: '',
  website: '',
  address: '',
  region: '',
  tier: 'professional',
  billingCycle: 'monthly',
  paymentMethod: 'card',
  adminName: '',
  adminEmail: '',
  adminRole: 'super_admin',
  adminJobTitle: '',
  state: '',
  city: '',
  zipCode: '',
  country: '',
};

export default function TenantCreation() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TenantFormData>(INITIAL_FORM_DATA);
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [createdResult, setCreatedResult] =
    useState<CreatedTenantResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = useCallback(
    (field: keyof TenantFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => prev.filter((error) => error.field !== field));
    },
    [],
  );

  const getFieldError = useCallback(
    (field: keyof TenantFormData): string | undefined =>
      errors.find((error) => error.field === field)?.message,
    [errors],
  );

  const currentStepErrors = useMemo(
    () => validateStep(currentStep, formData),
    [currentStep, formData],
  );

  const canProceed = useCallback(
    () => currentStepErrors.length === 0,
    [currentStepErrors],
  );

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      setErrors([]);
    }
  }, [currentStep, formData]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors([]);
      return;
    }

    router.back();
  }, [currentStep, router]);

  const getPlanById = useCallback((planId: number) => {
    return Object.values(plans).find((plan) => plan.id === planId);
  }, []);

  const handleCreateTenant = useCallback(() => {
    const result = tenantFormSchema.safeParse(formData);
    if (!result.success) {
      const formErrors: ValidationError[] = result.error.issues.map(
        (issue) => ({
          field: issue.path[0] as keyof TenantFormData,
          message: issue.message,
        }),
      );
      setErrors(formErrors);
      return;
    }

    setIsCreating(true);
    setTimeout(() => {
      setCreatedResult(mockCreatedTenantResult);
      setShowSuccess(true);
      setIsCreating(false);
    }, 800);
  }, [formData]);

  const handleCreateAnother = useCallback(() => {
    setShowSuccess(false);
    setCreatedResult(null);
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setErrors([]);
  }, []);

  const handleOpenTenant = useCallback(
    (tenantId: number) => {
      router.push(`/dashboard/${tenantId}`);
    },
    [router],
  );

  const handleViewAll = useCallback(() => {
    router.push('/dashboard/');
  }, [router]);

  if (showSuccess && createdResult) {
    return (
      <TenantCreationSuccess
        createdResult={createdResult}
        onCreateAnother={handleCreateAnother}
        onOpenTenant={handleOpenTenant}
        onViewAll={handleViewAll}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TenantCreationStepper steps={STEPS} currentStep={currentStep} />

        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden">
          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <StepCompany
                  formData={formData}
                  updateField={updateField}
                  error={getFieldError}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <PlanMod updateField={updateField} handleNext={handleNext} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <StepPayment
                  formData={formData}
                  updateField={updateField}
                  error={getFieldError}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <TenantCreationSummary
                  formData={formData}
                  getPlanById={getPlanById}
                />
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-white/5">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/5"
              >
                {currentStep === 1 ? (
                  'Cancel'
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </>
                )}
              </Button>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep} of {STEPS.length}
              </div>

              {currentStep < STEPS.length && currentStep !== 2 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-blue-500 hover:bg-blue-600 text-white min-w-[100px]"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : null}

              {currentStep === 4 ? (
                <Button
                  onClick={handleCreateTenant}
                  disabled={isCreating}
                  className="bg-teal-600 hover:bg-teal-700 text-white min-w-[140px]"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Create Tenant
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
