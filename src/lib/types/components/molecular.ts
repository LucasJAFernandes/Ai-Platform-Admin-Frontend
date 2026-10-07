import type { ReactNode } from 'react';
import type { Icon } from 'lucide-react';
import type { Module } from '@/lib/types/tenant-creation.types';
import type { NavSubItem, NavTab } from '@/lib/sidebar-config';
import type { DisplayIncident, ServiceAlert } from '@/lib/types/healty.types';

export type Addon = Module;

export interface AddonsOptionsProps {
  cartItems?: Addon[];
  onCartUpdate?: (items: Addon[]) => void;
}

export interface ModulesOptionsProps {
  cartItems?: Module[];
  onCartUpdate?: (items: Module[]) => void;
}

export interface AlertCardProps {
  overallStatus: 'operational' | 'degraded' | 'outage';
  operationalCount: number;
  totalServices: number;
}

export interface ServiceAlertListProps {
  loading: boolean;
  displayIncidents: DisplayIncident[];
  alerts?: ServiceAlert[] | null;
}

export interface StatusCardStat {
  label: string;
  linked?: string;
  value: string | number;
  icon?: Icon;
  color?: string;
  iconColor?: string;
  subLabel?: ReactNode;
  extraInfo?: ReactNode;
}

export interface StatusCardsProps {
  stats: StatusCardStat[];
  variant?: 'horizontal' | 'centered' | 'dot';
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export interface UserMenuDropdownProps {
  isDark: boolean;
  onProfile: () => void;
  onSettings: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
  collapsed: boolean;
}

export interface UserMenuSectionProps extends UserMenuDropdownProps {
  userName: string;
  userEmail: string;
}

export interface NavSubItemListProps {
  items: NavSubItem[];
  onSelect: (item: NavSubItem) => void;
}

export interface NavTabItemProps {
  tab: NavTab;
  isSelected: boolean;
  collapsed: boolean;
  isOpen: boolean;
  subItems?: NavSubItem[];
  onClick: () => void;
  onSubItemSelect: (item: NavSubItem) => void;
}