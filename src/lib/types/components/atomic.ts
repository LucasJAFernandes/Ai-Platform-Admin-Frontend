import { subDays } from 'date-fns';
import type { ElementType } from 'react';

export interface CollapseToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

export interface SidebarLogoProps {
  collapsed: boolean;
}

export interface UserAvatarProps {
  initials: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export interface OverviewStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  icon: ElementType;
}

export interface StatsInfoCardsProps {
  overviewStats: OverviewStat[];
}

export function dateRangeToPeriodDays(range: DateRange): number {
  const ms = range.to.getTime() - range.from.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function defaultDateRange(days = 30): DateRange {
  const to = new Date();
  const from = subDays(to, days);
  return { from, to };
}