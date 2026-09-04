'use client';

import React from 'react';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'right';
  hideBelow?: 'lg' | 'xl';
  render: (item: T) => React.ReactNode;
}

interface ResponsiveListProps<T> {
  data: T[];
  getKey: (item: T) => string | number;
  columns: Column<T>[];
  renderMobileCard: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  className?: string;
  theadClassName?: string;
  mobileListClassName?: string;
  tableWrapperClassName?: string;
}

const hideClass: Record<string, string> = {
  lg: 'hidden lg:table-cell',
  xl: 'hidden xl:table-cell',
};

export function ResponsiveList<T>({
  data,
  getKey,
  columns,
  renderMobileCard,
  onRowClick,
  emptyMessage = 'No results found',
  className = '',
  theadClassName = 'bg-zinc-100 dark:bg-zinc-800',
  mobileListClassName = '',
  tableWrapperClassName = 'overflow-x-auto',
}: ResponsiveListProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={`py-8 text-center text-gray-500 dark:text-gray-400 ${className}`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div
        className={`md:hidden divide-y divide-gray-200 dark:divide-zinc-700 ${mobileListClassName}`}
      >
        {data.map((item) => (
          <div
            key={getKey(item)}
            className={onRowClick ? 'cursor-pointer' : undefined}
            onClick={() => onRowClick?.(item)}
          >
            {renderMobileCard(item)}
          </div>
        ))}
      </div>

      <div className={`hidden md:block ${tableWrapperClassName}`}>
        <table className="w-full">
          <thead className={theadClassName}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 lg:px-6 text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  } ${col.hideBelow ? hideClass[col.hideBelow] : ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
            {data.map((item) => (
              <tr
                key={getKey(item)}
                className={`hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-4 px-4 lg:px-6 ${
                      col.align === 'right' ? 'text-right' : 'text-left'
                    } ${col.hideBelow ? hideClass[col.hideBelow] : ''}`}
                  >
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
