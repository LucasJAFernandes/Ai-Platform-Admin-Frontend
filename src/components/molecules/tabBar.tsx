'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
};

type TabsBarProps = {
  tabs: Tab[];
  defaultTab?: string;
};

export default function TabsBar({
  tabs,
  defaultTab = 'overview',
}: TabsBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = searchParams.get('tab');
  const validTabs = tabs.map((t) => t.id);

  const activeTab = validTabs.includes(tabFromUrl || '')
    ? tabFromUrl
    : defaultTab;

  const handleChangeTab = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-b bg-zinc-200 rounded-md mb-4 border-gray-200 dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden">
      <div
        className="flex items-end gap-1 overflow-x-auto p-1
                [&::-webkit-scrollbar]:h-1.5
                [&::-webkit-scrollbar-thumb]:bg-gray-400
                dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
                [&::-webkit-scrollbar-thumb]:rounded-full
                snap-x snap-mandatory sm:snap-none"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleChangeTab(tab.id)}
              className={`
                                relative flex items-center gap-2 px-3 py-2 text-sm font-medium
                                rounded-md transition-all shrink-0 snap-start
                                ${
                                  isActive
                                    ? 'bg-white dark:text-white dark:bg-zinc-700 text-gray-900 border-b-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:bg-zinc-700'
                                }
                            `}
            >
              <span
                className={isActive ? 'text-blue-600 dark:text-blue-400' : ''}
              >
                {tab.icon}
              </span>

              <span className="hidden sm:inline whitespace-nowrap">
                {tab.label}
              </span>

              {tab.count !== undefined && (
                <span
                  className={`
                                        text-[11px] px-1.5 hidden sm:inline py-0.5 rounded
                                        ${
                                          isActive
                                            ? 'bg-blue-50 text-blue-900'
                                            : 'bg-gray-200 text-gray-600'
                                        }
                                    `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
