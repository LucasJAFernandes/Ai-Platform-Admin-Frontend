import { UserIcon, Settings, Sun, Moon, LogOut } from 'lucide-react';

interface UserMenuDropdownProps {
  isDark: boolean;
  onProfile: () => void;
  onSettings: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
  collapsed: boolean;
}

export function UserMenuDropdown({
  isDark,
  onProfile,
  onSettings,
  collapsed,
  onToggleTheme,
  onLogout,
}: UserMenuDropdownProps) {
  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50">
      <button
        onClick={onProfile}
        className={`w-full px-3 py-2 flex items-center gap-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        <UserIcon className="h-4 w-4" />{' '}
        {!collapsed && <span className="truncate"> Profile </span>}
      </button>
      <button
        onClick={onSettings}
        className={`w-full px-3 py-2 flex items-center gap-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        <Settings className="h-4 w-4" />{' '}
        {!collapsed && <span className="truncate"> Settings </span>}
      </button>
      <button
        onClick={() => {
          console.log('theme toggle clicked');
          onToggleTheme();
        }}
        className={`w-full px-3 py-2 flex items-center gap-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {!collapsed && (
          <span className="truncate">
            {isDark ? 'Light mode' : 'Dark mode'}
          </span>
        )}
      </button>
      <button
        onClick={onLogout}
        className={`w-full px-3 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        <LogOut className="h-4 w-4" />{' '}
        {!collapsed && <span className="truncate"> Logout </span>}
      </button>
    </div>
  );
}
