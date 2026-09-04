'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/atoms/dropdownMenu';
import { FilterParams } from '@/lib/types/organization.types';

interface Props {
  filters: FilterParams;
  handleFilterChange: (key: keyof FilterParams, value: string) => void;
  clearAllFilters: () => void;
  activeFiltersCount: number;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  totalItems: number;
  statusOptions: string[];
  deploymentTypeOptions: string[];
  healthStatusOptions: string[];
  riskLevelOptions: string[];
  sortByOptions: { value: string; label: string }[];
}

export default function OrganizationToolbar({
  filters,
  handleFilterChange,
  clearAllFilters,
  activeFiltersCount,
  searchTerm,
  setSearchTerm,
  totalItems,
  statusOptions,
  deploymentTypeOptions,
  healthStatusOptions,
  riskLevelOptions,
  sortByOptions,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700 gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl dark:text-zinc-300 font-semibold text-gray-900">
          Organizations List
        </h2>
        {totalItems > 0 && (
          <div className="inline-flex items-center px-2 py-1 border rounded-md dark:border-zinc-700 text-sm text-gray-700 dark:text-gray-200">
            {totalItems} total
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0 relative">
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-64 dark:bg-zinc-800 border-white/5"
          >
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-gray-300">
                <span>Status</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="dark:bg-zinc-800 border-white/5">
                  <DropdownMenuRadioGroup
                    value={filters.status || ''}
                    onValueChange={(value) =>
                      handleFilterChange('status', value)
                    }
                  >
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    {statusOptions.map((status) => (
                      <DropdownMenuRadioItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-gray-300">
                <span>Deployment Type</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="dark:bg-zinc-800 border-white/5">
                  <DropdownMenuRadioGroup
                    value={filters.deployment_type || ''}
                    onValueChange={(value) =>
                      handleFilterChange('deployment_type', value)
                    }
                  >
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    {deploymentTypeOptions.map((type) => (
                      <DropdownMenuRadioItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-gray-300">
                <span>Health Status</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="dark:bg-zinc-800 border-white/5">
                  <DropdownMenuRadioGroup
                    value={filters.health_status || ''}
                    onValueChange={(value) =>
                      handleFilterChange('health_status', value)
                    }
                  >
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    {healthStatusOptions.map((status) => (
                      <DropdownMenuRadioItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-gray-300">
                <span>Risk Level</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="dark:bg-zinc-800 border-white/5">
                  <DropdownMenuRadioGroup
                    value={filters.risk_level || ''}
                    onValueChange={(value) =>
                      handleFilterChange('risk_level', value)
                    }
                  >
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    {riskLevelOptions.map((level) => (
                      <DropdownMenuRadioItem key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-gray-300">
                <span>
                  {
                    sortByOptions.find((opt) => opt.value === filters.sort_by)
                      ?.label
                  }
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="dark:bg-zinc-800 border-white/5">
                  <DropdownMenuRadioGroup
                    value={filters.sort_by}
                    onValueChange={(value) =>
                      handleFilterChange('sort_by', value)
                    }
                  >
                    {sortByOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-gray-300">
                <span>
                  Order:{' '}
                  {filters.sort_order === 'asc' ? 'Ascending' : 'Descending'}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="dark:bg-zinc-800 border-white/5">
                  <DropdownMenuRadioGroup
                    value={filters.sort_order}
                    onValueChange={(value) =>
                      handleFilterChange('sort_order', value as 'asc' | 'desc')
                    }
                  >
                    <DropdownMenuRadioItem value="asc">
                      Ascending
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="desc">
                      Descending
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="bg-white/5" />

            <DropdownMenuItem
              className="text-red-400 hover:text-red-300 focus:text-red-300"
              onSelect={clearAllFilters}
            >
              <X className="w-4 h-4 mr-2" />
              Clear all filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
