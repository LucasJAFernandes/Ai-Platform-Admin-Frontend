import { useEffect, useState } from 'react';
import {
  Users,
  MessageSquare,
  Phone,
  FileText,
  Video,
  Calendar,
  Mail,
  Layout,
  Award,
  Shield,
  Cloud,
  Globe,
  Lock,
  Zap,
  Network,
  Users2,
  Briefcase,
  Target,
  PieChart,
  Star,
  Building2,
} from 'lucide-react';
import { TenantFormData } from '@/lib/types/tenant-creation.types';

interface Props {
  optional: boolean;
  updateField?: (field: keyof TenantFormData, value: string) => void;
  formData?: TenantFormData;
  onPlanSelect?: (planKey: string | undefined) => void;
}

export const plans = {
  basic: {
    id: 1,
    name: 'Basic',
    icon: <Zap className="w-6 h-6" />,
    price: '30',
    currency: '€',
    period: '/month',
    yearlyPrice: '300',
    selected: true,
    description: 'Perfect for small teams getting started',
    badge: undefined,
    features: [
      { icon: Video, text: '24/7 Support' },
      { icon: Users, text: 'Up to 10 Users' },
      { icon: Award, text: 'AI Companion - Limited usage' },
      { icon: MessageSquare, text: 'Team Chat' },
      { icon: Phone, text: 'VoIP Calling' },
      { icon: Layout, text: 'Whiteboard - 3 boards' },
      { icon: FileText, text: 'Docs - Up to 10 documents' },
      { icon: Mail, text: 'Email Integration (Gmail/Outlook)' },
      { icon: Calendar, text: 'Calendar Sync' },
      { icon: Briefcase, text: 'Basic Company Directory' },
    ],
    color: 'gray',
  },
  professional: {
    id: 2,
    name: 'Professional',
    icon: <Star className="w-6 h-6" />,
    price: '62,49',
    currency: '€',
    selected: false,
    period: '/month',
    yearlyPrice: '625,00',
    description: 'For professionals and growing teams',
    badge: 'Popular',
    features: [
      { icon: Video, text: 'Priority 24/7 Support' },
      { icon: Users, text: 'Up to 50 Users' },
      { icon: Calendar, text: 'Advanced Scheduler' },
      { icon: Layout, text: 'Unlimited Whiteboards' },
      { icon: Shield, text: 'SSO & Managed Domains' },
      { icon: Building2, text: 'Department Management' },
      { icon: Globe, text: 'Multi-region Storage' },
      { icon: Lock, text: 'Information Barriers' },
      { icon: FileText, text: 'Archiving APIs' },
      { icon: Users2, text: 'Team Workspaces' },
      { icon: Target, text: 'Project Milestones' },
    ],
    color: 'blue',
  },
  enterprise: {
    id: 3,
    name: 'Enterprise',
    icon: <Building2 className="w-6 h-6" />,
    price: '170,49',
    currency: '€',
    period: '/month',
    yearlyPrice: '1750,00',
    selected: false,
    badge: undefined,
    description: 'For large organizations with complex needs',
    features: [
      { icon: Video, text: 'Meetings - Up to 1,000 participants' },
      { icon: Phone, text: 'Complete PBX Phone System' },
      { icon: Users, text: 'Unlimited Users' },
      { icon: Layout, text: 'Meeting Rooms Management' },
      { icon: Calendar, text: 'Workspace Reservation' },
      { icon: Users, text: 'Visitor Management System' },
      { icon: FileText, text: 'Multi-language Support' },
      { icon: Award, text: 'Managed Encryption Keys' },
      { icon: Cloud, text: 'Hybrid Cloud Deployment' },
      { icon: Globe, text: 'Global Contact Network' },
      { icon: Network, text: 'Organizational Chart' },
      { icon: Shield, text: 'Advanced Compliance Tools' },
      { icon: PieChart, text: 'Analytics & Reporting' },
    ],
    color: 'yellow',
  },
};

export function PlanOptions({
  optional,
  formData,
  updateField,
  onPlanSelect,
}: Props) {
  const [selectedPlan, setSelectedPlan] = useState<string>(
    !optional && formData?.tier ? formData.tier : '',
  );
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handlePlanSelect = (key: string) => {
    setSelectedPlan(key);
    if (!optional && updateField) {
      updateField('tier', key);
    } else if (onPlanSelect) {
      if (!plans[key as keyof typeof plans].selected || optional) {
        onPlanSelect(plans[key as keyof typeof plans].id.toString());
      } else {
        onPlanSelect(undefined);
      }
    }
  };
  useEffect(() => {
    Object.entries(plans).forEach(([key, plan]) => {
      if (plan.selected) {
        setSelectedPlan(key);
      }
    });
  }, []);

  const handleBillingCycleChange = (cycle: string) => {
    setBillingCycle(cycle);
    if (!optional && updateField) {
      updateField('billingCycle', cycle);
    }
  };

  const getPrice = (plan: {
    currency: string;
    price: string;
    yearlyPrice?: string;
    period?: string;
  }) => {
    if (billingCycle === 'yearly' && plan.yearlyPrice) {
      return (
        <>
          <span className="text-2xl font-bold">
            {plan.currency}
            {plan.yearlyPrice}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
            /year
          </span>
        </>
      );
    }
    return (
      <>
        <span className="text-2xl font-bold">
          {plan.currency}
          {plan.price}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
          {plan.period}
        </span>
      </>
    );
  };

  if (optional) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 p-1 bg-gray-100 dark:bg-zinc-900 rounded-lg">
            <button
              onClick={() => handleBillingCycleChange('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`
                            relative group
                            bg-white dark:bg-zinc-800 
                            rounded-xl border 
                            transition-all duration-200
                            hover:shadow-xl
                            ${
                              selectedPlan === key
                                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20'
                                : 'border-gray-200 dark:border-zinc-700 hover:border-blue-200 dark:hover:border-blue-800'
                            }
                        `}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`
                                        p-2 rounded-lg
                                        ${plan.color === 'gray' ? 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300' : ''}
                                        ${plan.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                                        ${plan.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : ''}
                                    `}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">
                      {plan.currency}
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlanSelect(key)}
                  className={`
                                    w-full py-2.5 px-4 rounded-lg font-medium transition-all mb-6
                                    ${
                                      plan.color === 'blue'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        : plan.color === 'gray'
                                          ? 'bg-gray-900 hover:bg-gray-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white'
                                          : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
                                    }
                                `}
                >
                  Select
                </button>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <feature.icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            className={`
                            relative group
                            bg-white dark:bg-zinc-800 
                            rounded-xl border 
                            transition-all duration-200
                            hover:shadow-xl
                            ${
                              selectedPlan === key
                                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20'
                                : 'border-gray-200 dark:border-zinc-700 hover:border-blue-200 dark:hover:border-blue-800'
                            }
                        `}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`
                                    p-2 rounded-lg
                                    ${plan.color === 'gray' ? 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300' : ''}
                                    ${plan.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                                    ${plan.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : ''}
                                `}
                >
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline">{getPrice(plan)}</div>
              </div>

              <button
                onClick={() => handlePlanSelect(key)}
                className={`
                                    w-full py-2.5 px-4 rounded-lg font-medium transition-all mb-6
                                    ${
                                      plan.color === 'blue'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        : plan.color === 'gray'
                                          ? 'bg-gray-900 hover:bg-gray-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white'
                                          : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
                                    }
                                `}
              >
                Select
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <feature.icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
