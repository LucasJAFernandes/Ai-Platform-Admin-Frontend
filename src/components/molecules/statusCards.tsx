'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import type { StatusCardsProps } from '@/lib/types/components/molecular';

export function StatsCards({
  stats,
  variant = 'horizontal',
  className,
  gridClassName,
  cardClassName,
  iconClassName,
  labelClassName,
  valueClassName,
}: StatusCardsProps) {
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
    if (variant === 'centered') return 'p-4 sm:p-6';
    if (variant === 'dot') return 'p-3 sm:p-4';
    if (count <= 3) return 'p-4 sm:p-8';
    if (count === 4) return 'p-4 sm:p-6';
    if (count <= 6) return 'p-4 sm:p-5';
    return 'p-3 sm:p-4';
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
    if (variant === 'centered') return 'text-2xl sm:text-3xl';
    if (variant === 'dot') return 'text-lg sm:text-xl';
    if (count <= 3) return 'text-2xl sm:text-3xl';
    if (count === 4) return 'text-xl sm:text-2xl';
    if (count <= 6) return 'text-lg sm:text-xl';
    return 'text-base sm:text-lg';
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
        'grid w-full min-w-0 gap-3',
        variant === 'dot' && 'gap-4',
        getGridClass(),
        className,
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label ?? index}
          className={cn(
            'group min-w-0 w-full rounded-xl border border-gray-200 bg-zinc-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800',
            getCardPadding(),
            clickable(stat.linked),
            cardClassName,
          )}
          onClick={() => stat.linked && router.push(stat.linked)}
        >
          {variant === 'dot' && (
            <>
              <div className="mb-2 flex min-w-0 items-center justify-between gap-2">
                <span
                  className={cn(
                    'min-w-0 break-words text-gray-400',
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
                  'mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-20 sm:w-20',
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
            <div className="flex min-w-0 items-start">
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
              <div className="ml-2 min-w-0 flex-1 sm:ml-3">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p
                      className={cn(
                        'break-words font-medium text-gray-600 dark:text-zinc-300',
                        getLabelSize(),
                        labelClassName,
                      )}
                    >
                      {stat.label}
                    </p>
                    <h3
                      className={cn(
                        'break-words font-bold tracking-tight text-gray-900 dark:text-zinc-100',
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
