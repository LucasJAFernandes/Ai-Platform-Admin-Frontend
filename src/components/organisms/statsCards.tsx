import { cn } from '@/lib/utils';
import { type Icon as LucideIcon } from 'lucide-react';

import { useRouter } from 'next/navigation';
interface Stat {
  label: string;
  linked?: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  extraInfo?: React.ReactNode;
}

interface StatsCardsProps {
  stats: Stat[];
  className?: string;
  cardClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function StatsCards({
  stats,
  className,
  cardClassName,
  iconClassName,
  labelClassName,
  valueClassName,
}: StatsCardsProps) {
  const router = useRouter();
  const getGridClass = () => {
    const count = stats.length;

    if (count <= 2) {
      return 'grid-cols-1 sm:grid-cols-2';
    }

    if (count === 3) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }

    if (count === 4) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    }

    if (count === 5) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    }

    if (count === 6) {
      return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6';
    }

    if (count === 7) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7';
    }

    if (count === 8) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8';
    }

    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
  };
  const getCardPadding = () => {
    const count = stats.length;

    if (count <= 3) return 'p-8';
    if (count === 4) return 'p-6';
    if (count <= 6) return 'p-5';
    return 'p-4';
  };
  const getIconSize = () => {
    const count = stats.length;

    if (count <= 4) return 'w-6 h-6';
    if (count <= 6) return 'w-5 h-5';
    return 'w-4 h-4';
  };

  const getIconPadding = () => {
    const count = stats.length;

    if (count <= 4) return 'p-3';
    if (count <= 6) return 'p-2.5';
    return 'p-2';
  };

  const getValueSize = () => {
    const count = stats.length;

    if (count <= 3) return 'text-3xl';
    if (count === 4) return 'text-2xl';
    if (count <= 6) return 'text-xl';
    return 'text-lg';
  };

  const getLabelSize = () => {
    const count = stats.length;
    if (count <= 4) return 'text-sm';
    if (count <= 6) return 'text-xs';
    return 'text-xs';
  };
  const clickpointer = (linked: unknown) => {
    console.log(linked);
    if (linked) {
      return 'cursor-pointer';
    }
    return '';
  };
  return (
    <div className={cn('grid gap-3 w-full', getGridClass(), className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'group bg-zinc-200  rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 w-full',
            getCardPadding(),
            clickpointer(stat.linked),
            cardClassName,
          )}
          onClick={() => {
            if (stat.linked) {
              router.push(stat.linked);
            }
          }}
        >
          <div className="flex items-start">
            <div
              className={cn(
                'rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0',
                getIconPadding(),
                stat.color,
                iconClassName,
              )}
            >
              <stat.icon className={cn('text-white', getIconSize())} />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex flex-col h-full justify-between">
                <div className="flex w-full justify-between">
                  <div className="items-start">
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
                </div>

                {stat.extraInfo && <div className="">{stat.extraInfo}</div>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
