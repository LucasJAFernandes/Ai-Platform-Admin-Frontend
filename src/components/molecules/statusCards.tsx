'use client';

import { cn } from '@/lib/utils';
import { type Icon as LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Stat {
  label: string;
  linked?: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
  iconColor?: string;
  subLabel?: React.ReactNode;
  extraInfo?: React.ReactNode;
}

interface StatsCardsProps {
  stats: Stat[];
  variant?: 'horizontal' | 'centered' | 'dot';
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function StatsCards({
  stats,
  variant = 'horizontal',
  className,
  gridClassName,
  cardClassName,
  iconClassName,
  labelClassName,
  valueClassName,
}: StatsCardsProps) {
  const router = useRouter();
  const count = stats.length;

  const getGridClass = () => {
    if (gridClassName) return gridClassName;
    if (variant === 'centered') return 'grid-cols-1 lg:grid-cols-3';
    if (variant === 'dot') return 'grid-cols-1 md:grid-cols-3';

    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    if (count === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    if (count === 5)
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    if (count === 6)
      return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6';
    if (count === 7)
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7';
    if (count === 8)
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
  };

  const getCardPadding = () => {
    if (variant === 'centered') return 'p-6';
    if (variant === 'dot') return 'p-4';
    if (count <= 3) return 'p-8';
    if (count === 4) return 'p-6';
    if (count <= 6) return 'p-5';
    return 'p-4';
  };

  const getIconPadding = () =>
    count <= 4 ? 'p-3' : count <= 6 ? 'p-2.5' : 'p-2';

  const getIconSize = () => {
    if (variant === 'centered') return 'w-10 h-10';
    if (count <= 4) return 'w-6 h-6';
    if (count <= 6) return 'w-5 h-5';
    return 'w-4 h-4';
  };

  const getValueSize = () => {
    if (variant === 'centered') return 'text-3xl';
    if (variant === 'dot') return 'text-xl';
    if (count <= 3) return 'text-3xl';
    if (count === 4) return 'text-2xl';
    if (count <= 6) return 'text-xl';
    return 'text-lg';
  };

  const getLabelSize = () => {
    if (variant === 'centered') return 'text-sm';
    if (variant === 'dot') return 'text-sm';
    return count <= 4 ? 'text-sm' : 'text-xs';
  };

  const clickable = (linked?: string) => (linked ? 'cursor-pointer' : '');

  return (
    <div
      className={cn(
        'grid gap-3 w-full',
        variant === 'dot' && 'gap-4',
        getGridClass(),
        className,
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label ?? index}
          className={cn(
            'group bg-zinc-200 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 w-full',
            getCardPadding(),
            clickable(stat.linked),
            cardClassName,
          )}
          onClick={() => stat.linked && router.push(stat.linked)}
        >
          {variant === 'dot' && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={cn(
                    'text-gray-400',
                    getLabelSize(),
                    labelClassName,
                  )}
                >
                  {stat.label}
                </span>
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
              <p
                className={cn(
                  'font-bold text-zinc-800 dark:text-white',
                  getValueSize(),
                  valueClassName,
                )}
              >
                {stat.value}
              </p>
              {stat.subLabel && (
                <p className="text-xs text-gray-500">{stat.subLabel}</p>
              )}
              {stat.extraInfo}
            </>
          )}

          {variant === 'centered' && (
            <div className="text-center">
              <div
                className={cn(
                  'w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110',
                  stat.color,
                  iconClassName,
                )}
              >
                {stat.icon && (
                  <stat.icon
                    className={cn(
                      stat.iconColor ?? 'text-white',
                      getIconSize(),
                    )}
                  />
                )}
              </div>
              <h3
                className={cn(
                  'font-bold text-zinc-800 dark:text-white',
                  getValueSize(),
                  valueClassName,
                )}
              >
                {stat.value}
              </h3>
              <p
                className={cn(
                  'text-gray-500 dark:text-gray-400',
                  getLabelSize(),
                  labelClassName,
                )}
              >
                {stat.label}
              </p>
              {stat.extraInfo && <div className="mt-1">{stat.extraInfo}</div>}
            </div>
          )}

          {variant === 'horizontal' && (
            <div className="flex items-start">
              <div
                className={cn(
                  'rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0',
                  getIconPadding(),
                  stat.color,
                  iconClassName,
                )}
              >
                {stat.icon && (
                  <stat.icon className={cn('text-white', getIconSize())} />
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p
                      className={cn(
                        'text-gray-600 dark:text-zinc-300 whitespace-nowrap font-medium',
                        getLabelSize(),
                        labelClassName,
                      )}
                    >
                      {stat.label}
                    </p>
                    <h3
                      className={cn(
                        'font-bold text-gray-900 dark:text-zinc-100 tracking-tight',
                        getValueSize(),
                        valueClassName,
                      )}
                    >
                      {stat.value}
                    </h3>
                  </div>
                  {stat.extraInfo && <div>{stat.extraInfo}</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
