'use client';
import { DateRangePicker } from '@/components/atoms/dateRangePicker';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ListTenants } from '@/components/organisms/listTenants';
import { Button } from '@/components/atoms/button';
import {
  HealthSummaryChart,
  TenantStatusChart,
} from '@/components/organisms/tenantCharts';
import OrganizationToolbar from '@/components/molecules/organizationToolbar';
import {
  mockPagination,
  mockStatsData,
  mockTenants,
} from '@/mocks/organization';
import { FilterParams } from '@/lib/types/organization.types';
export default function Organization() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const router = useRouter();
  const [filters, setFilters] = useState<FilterParams>({
    search: null,
    status: null,
    deployment_type: null,
    health_status: null,
    plan_id: null,
    risk_level: null,
    sort_by: 'created_at',
    sort_order: 'desc',
    page: 1,
    page_size: 20,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const statusOptions = ['active', 'inactive', 'suspended', 'pending'];
  const deploymentTypeOptions = ['cloud', 'on-premise', 'hybrid'];
  const healthStatusOptions = ['healthy', 'degraded', 'down', 'maintenance'];
  const riskLevelOptions = ['low', 'medium', 'high', 'critical'];
  const sortByOptions = [
    { value: 'created_at', label: 'Created At' },
    { value: 'name', label: 'Name' },
    { value: 'status', label: 'Status' },
    { value: 'risk_level', label: 'Risk Level' },
  ];
  const loadTenants = useCallback(async () => {
    setLoading(true);

    try {
      const params: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params[key] = String(value);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);
  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const updateActiveFiltersCount = useCallback(() => {
    let count = 0;
    if (filters.status) count++;
    if (filters.deployment_type) count++;
    if (filters.health_status) count++;
    if (filters.plan_id) count++;
    if (filters.risk_level) count++;
    if (filters.search) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  useEffect(() => {
    updateActiveFiltersCount();
  }, [updateActiveFiltersCount]);

  const clearAllFilters = () => {
    setFilters({
      search: null,
      status: null,
      deployment_type: null,
      health_status: null,
      plan_id: null,
      risk_level: null,
      sort_by: 'created_at',
      sort_order: 'desc',
      page: 1,
      page_size: 20,
    });
    setSearchTerm('');
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
          <div>
            <div className=" items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">
                Organizations Management
              </h1>
              <p className="text-gray-400 mb-4 mt-1">
                Overview about all informations
              </p>
            </div>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push('/dashboard/newtenant')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              + Add Tenant
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TenantStatusChart data={mockStatsData?.by_status} />
          <HealthSummaryChart data={mockStatsData?.health_summary} />
        </div>
        <div className="bg-zinc-200 mt-3 dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-300 dark:border-zinc-700 overflow-hidden">
          <OrganizationToolbar
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
            activeFiltersCount={activeFiltersCount}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalItems={mockPagination.totalItems}
            statusOptions={statusOptions}
            deploymentTypeOptions={deploymentTypeOptions}
            healthStatusOptions={healthStatusOptions}
            riskLevelOptions={riskLevelOptions}
            sortByOptions={sortByOptions}
          />
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-140 overflow-y-auto">
                <ListTenants tenants={mockTenants} />
              </div>

              {mockPagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 dark:border-zinc-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handlePageChange(mockPagination.currentPage - 1)
                    }
                    disabled={mockPagination.currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {mockPagination.currentPage} of{' '}
                    {mockPagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handlePageChange(mockPagination.currentPage + 1)
                    }
                    disabled={
                      mockPagination.currentPage === mockPagination.totalPages
                    }
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
