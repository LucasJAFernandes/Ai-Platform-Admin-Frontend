'use client';

import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/atoms/sidebar/userAvatar';
import { UserMenuDropdown } from './userMenuDropdown';
import { useClickOutside } from '@/hooks/use-click-outside';

interface UserMenuSectionProps {
  collapsed: boolean;
  userName: string;
  userEmail: string;
  isDark: boolean;
  onProfile: () => void;
  onSettings: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function UserMenuSection({
  collapsed,
  userName,
  userEmail,
  isDark,
  onProfile,
  onSettings,
  onToggleTheme,
  onLogout,
}: UserMenuSectionProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  return (
    <div
      ref={containerRef}
      className="border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0 relative p-2"
    >
      {open && (
        <UserMenuDropdown
          collapsed={collapsed}
          isDark={isDark}
          onProfile={() => {
            setOpen(false);
            onProfile();
          }}
          onSettings={() => {
            setOpen(false);
            onSettings();
          }}
          onToggleTheme={() => {
            setOpen(false);
            onToggleTheme();
          }}
          onLogout={() => {
            setOpen(false);
            onLogout();
          }}
        />
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <UserAvatar initials={getInitials(userName)} />
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">
                {userName}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {userEmail}
              </div>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200 text-zinc-400',
                open && 'rotate-180',
              )}
            />
          </>
        )}
      </button>
    </div>
  );
}
