import {
  Activity,
  Building2,
  ChartColumnIncreasing,
  CreditCard,
  MessageSquare,
  Headset,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';

export interface NavSubItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface NavTab {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const NAV_TABS: NavTab[] = [
  { id: '', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'Organization', name: 'Organization', icon: Building2 },
  { id: 'Health', name: 'System Health', icon: Activity },
  { id: 'Analytics', name: 'Analytics', icon: ChartColumnIncreasing },
  { id: 'Billing', name: 'Billing', icon: CreditCard },
  { id: 'Logs', name: 'AI Logs', icon: MessageSquare },
  { id: 'Support', name: 'Support', icon: Headset },
];

export const NAV_SUB_ITEMS: Record<string, NavSubItem[]> = {
  '': [
    { id: 'tenants-details', name: 'Tenants details', icon: Building2 },
    { id: 'tenants-fix', name: 'Fix tenant', icon: Building2 },
  ],
};
