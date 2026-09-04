import type { NavSubItem } from '@/lib/sidebar-config';

interface NavSubItemListProps {
  items: NavSubItem[];
  onSelect: (item: NavSubItem) => void;
}

export function NavSubItemList({ items, onSelect }: NavSubItemListProps) {
  return (
    <div className="left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50">
      <div className="py-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
