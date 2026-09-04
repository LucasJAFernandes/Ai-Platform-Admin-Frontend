'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { SidebarLogo } from '@/components/atoms/sidebar/sidebarLogo';
import { CollapseToggle } from '@/components/atoms/sidebar/collapseToggle';
import { NavTabItem } from '@/components/molecules/sidebar/navTabItem';
import { UserMenuSection } from '@/components/molecules/sidebar/userMenuSection';
import { NAV_TABS, NAV_SUB_ITEMS, type NavSubItem } from '@/lib/sidebar-config';
import useWindowSize from '@/lib/screenhelper';

const MIN_WIDTH_FOR_EXPANDED = 1200;

interface SidebarProjectProps {
  selectedProject?: string;
  onProjectSelect: (projectId: string) => void;
  forceCollapsed?: boolean;
  onLogout?: () => void;
  userName?: string;
  userEmail?: string;
}

export function SidebarProject({
  onProjectSelect,
  forceCollapsed = false,
  onLogout,
  userName = 'User',
  userEmail = 'user@electo.com',
}: SidebarProjectProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowSize();

  const [collapsed, setCollapsed] = useState(forceCollapsed);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const widthCollapsed = width !== undefined && width < MIN_WIDTH_FOR_EXPANDED;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (forceCollapsed) setCollapsed(true);
  }, [forceCollapsed]);

  const effectiveCollapsed = forceCollapsed || collapsed || widthCollapsed;

  const handleToggleCollapse = useCallback(
    (value: boolean) => {
      if (widthCollapsed) return;
      setCollapsed(value);
    },
    [widthCollapsed],
  );

  const selectedProject = useMemo(() => {
    if (!pathname) return '';
    const segments = pathname.split('/').filter(Boolean);
    const dashboardIndex = segments.indexOf('dashboard');
    if (dashboardIndex === -1) return '';
    return segments[dashboardIndex + 1] ?? '';
  }, [pathname]);

  function handleTabClick(tabId: string) {
    const isSelected = tabId === selectedProject;
    const hasSubItems = Boolean(NAV_SUB_ITEMS[tabId]);
    if (isSelected && hasSubItems) {
      setOpenDropdownId((current) => (current === tabId ? null : tabId));
      return;
    }

    setOpenDropdownId(null);
    onProjectSelect(tabId);
    router.push(`/dashboard/${tabId}`);
  }

  function handleSubItemSelect(tabId: string, subItem: NavSubItem) {
    router.push(`/dashboard/${tabId}/${subItem.id}`);
    setOpenDropdownId(null);
  }

  return (
    <aside
      className={cn(
        effectiveCollapsed ? 'w-16' : 'w-72',
        'bg-[#ffffff] border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950',
        'transition-[width] duration-300 ease-in-out overflow-auto',
        'flex flex-col h-full relative',
      )}
    >
      <div className="flex-1 overflow-y-auto">
        <div className={cn(effectiveCollapsed ? '' : 'p-6 mb-4')}>
          <div className="relative flex items-start gap-3">
            <SidebarLogo collapsed={effectiveCollapsed} />

            {!effectiveCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1 truncate">
                      Electo
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                      Administration
                    </p>
                  </div>
                  <CollapseToggle
                    collapsed={false}
                    onToggle={() => handleToggleCollapse(true)}
                  />
                </div>
              </div>
            )}
          </div>

          {effectiveCollapsed && !widthCollapsed && (
            <CollapseToggle
              collapsed
              onToggle={() => handleToggleCollapse(false)}
            />
          )}

          <div className="space-y-2 mb-8 relative pt-3">
            {NAV_TABS.map((tab) => (
              <NavTabItem
                key={tab.id || 'root'}
                tab={tab}
                isSelected={selectedProject === tab.id}
                collapsed={effectiveCollapsed}
                isOpen={openDropdownId === tab.id}
                subItems={NAV_SUB_ITEMS[tab.id]}
                onClick={() => handleTabClick(tab.id)}
                onSubItemSelect={(subItem) =>
                  handleSubItemSelect(tab.id, subItem)
                }
              />
            ))}
          </div>
        </div>
      </div>

      <UserMenuSection
        collapsed={effectiveCollapsed}
        userName={userName}
        userEmail={userEmail}
        isDark={theme === 'dark'}
        onProfile={() => router.push('/dashboard/profile')}
        onSettings={() => router.push('/dashboard/Users')}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onLogout={() => onLogout?.()}
      />
    </aside>
  );
}
