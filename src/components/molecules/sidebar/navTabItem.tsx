'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavSubItemList } from './navSubitemList';
import type { NavTab, NavSubItem } from '@/lib/sidebar-config';

interface NavTabItemProps {
  tab: NavTab;
  isSelected: boolean;
  collapsed: boolean;
  isOpen: boolean;
  subItems?: NavSubItem[];
  onClick: () => void;
  onSubItemSelect: (item: NavSubItem) => void;
}

export function NavTabItem({
  tab,
  isSelected,
  collapsed,
  isOpen,
  subItems,
  onClick,
  onSubItemSelect,
}: NavTabItemProps) {
  const Icon = tab.icon;

  if (collapsed) {
    return (
      <div
        onClick={onClick}
        title={tab.name}
        className={cn(
          'group flex items-center justify-center p-2 cursor-pointer transition-all duration-200 border rounded-lg w-full',
          isSelected
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800'
            : 'hover:bg-gradient-to-r hover:from-zinc-50 hover:to-zinc-100 dark:hover:from-zinc-800 dark:hover:to-zinc-900 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700',
        )}
      >
        <div
          className={cn(
            'h-8 w-8 rounded-lg flex items-center justify-center',
            isSelected ? 'bg-blue-500' : 'bg-zinc-400 dark:bg-zinc-700',
          )}
        >
          <Icon className="h-4 w-4 min-h-4 min-w-4 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        onClick={onClick}
        className={cn(
          'group flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:border rounded-xl',
          isSelected
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800'
            : ' hover:dark:bg-zinc-900 dark:hover:bg-zinc-800',
        )}
      >
        <div
          className={cn(
            'h-10 w-10 rounded-lg flex items-center justify-center shadow-sm',
            isSelected
              ? 'bg-blue-500 group-hover:bg-blue-600 dark:group-hover:bg-blue-700'
              : 'bg-zinc-400 dark:bg-zinc-700 group-hover:bg-zinc-800 dark:group-hover:bg-zinc-600',
          )}
        >
          <Icon className="h-5 w-5 text-white min-h-5 min-w-5" />
        </div>
        <div className="flex-1">
          <div
            className={cn(
              'font-medium whitespace-nowrap',
              isSelected
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-800 dark:group-hover:text-zinc-300',
            )}
          >
            {tab.name}
          </div>
        </div>
        {isSelected && subItems && (
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        )}
      </div>

      {isSelected && isOpen && subItems && (
        <NavSubItemList items={subItems} onSelect={onSubItemSelect} />
      )}
    </div>
  );
}
