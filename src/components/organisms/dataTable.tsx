'use client';

import React from 'react';
import { ResponsiveList, Column } from '@/components/templates/responsiveList';
import { CardContent } from '@/components/atoms/card';
import { Button } from '../atoms/button';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getKey: (item: T) => string | number;

  renderMobileCard?: (item: T) => React.ReactNode;

  onRowClick?: (item: T) => void;

  emptyMessage?: string;

  className?: string;
  tableWrapperClassName?: string;
  theadClassName?: string;
  mobileListClassName?: string;
}

export function DataTable<T>({
  data,
  columns,
  getKey,
  renderMobileCard,
  onRowClick,
  emptyMessage = 'No results found',
  className = '',
  tableWrapperClassName = 'overflow-x-auto',
  theadClassName = 'bg-zinc-100 dark:bg-zinc-800',
  mobileListClassName = '',
}: DataTableProps<T>) {
  const defaultMobileCard = (item: T) => (
    <CardContent className="p-4">
      <div className="space-y-3 mt-3">
        {columns.map((column) => (
          <div
            key={column.key}
            className="flex items-start justify-between gap-4"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {column.header}
            </span>

            <div
              className={`text-sm ${
                column.align === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              {column.render(item)}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );

  return (
    <>
      <div
        className={`rounded-xl border border-white/5 overflow-hidden ${className}`}
      >
        <ResponsiveList
          data={data}
          getKey={getKey}
          columns={columns}
          renderMobileCard={renderMobileCard ?? defaultMobileCard}
          onRowClick={onRowClick}
          emptyMessage={emptyMessage}
          tableWrapperClassName={tableWrapperClassName}
          theadClassName={theadClassName}
          mobileListClassName={mobileListClassName}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 rounded-b-xl">
        <p className="text-sm text-gray-500">Page 1 of 10</p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
