'use client';

import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Step } from '@/lib/types/tenant-creation.types';

interface TenantCreationStepperProps {
  steps: Step[];
  currentStep: number;
}

export function TenantCreationStepper({
  steps,
  currentStep,
}: TenantCreationStepperProps) {
  return (
    <div className="px-6 pt-3">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center relative">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
                    isCompleted
                      ? 'bg-teal-500 text-white'
                      : isActive
                        ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                        : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400',
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 width={20} height={20} />
                  ) : (
                    <Icon width={20} height={20} />
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 font-medium',
                    isActive
                      ? 'text-blue-500'
                      : isCompleted
                        ? 'text-teal-500'
                        : 'text-gray-500',
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-16 h-[2px] mx-2 mb-7 transition-colors',
                    currentStep > step.id
                      ? 'bg-teal-500'
                      : 'bg-gray-200 dark:bg-white/10',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
