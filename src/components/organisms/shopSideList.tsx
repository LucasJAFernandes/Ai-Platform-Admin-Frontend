'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import type { CartItem } from '@/lib/types/tenant-creation.types';

interface ShopSideListProps {
  inside: boolean;
  planId?: number;
  cartItems: CartItem[];
  onWidthChange?: (width: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onClose?: () => void;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
}

function CartSection({
  title,
  items,
  onRemoveItem,
}: {
  title: string;
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4">
      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-2">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700"
          >
            <div className="p-2 rounded-lg bg-blue-500 shrink-0">
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
                  {item.name}
                </p>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                {item.price}
                {item.period ? `/${item.period}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopSideList({
  inside,
  cartItems,
  onWidthChange,
  onRemoveItem,
  onCheckout,
  onClose,
  minWidth = 280,
  maxWidth = 480,
  defaultWidth = 320,
}: ShopSideListProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0,
  );
  const modules = cartItems.filter((i) => i.type === 'module');
  const addons = cartItems.filter((i) => i.type === 'addon');
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;
      const newWidth = window.innerWidth - e.clientX;
      const clamped = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setWidth(clamped);
      onWidthChange?.(clamped);
    };
    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth, onWidthChange]);

  useEffect(() => {
    onWidthChange?.(width);
  });

  if (!inside) return null;

  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 h-screen z-40 flex bg-zinc-50 dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800 shadow-xl
                       w-full sm:w-auto"
      style={{
        width:
          typeof window !== 'undefined' && window.innerWidth >= 640
            ? width
            : undefined,
      }}
    >
      <div
        onMouseDown={() => setIsResizing(true)}
        className="hidden sm:block w-1.5 cursor-col-resize hover:bg-blue-500/30 transition-colors shrink-0"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-zinc-100">
              Your Selection
            </h3>
            <span className="text-xs text-gray-500 dark:text-zinc-400">
              ({cartItems.length})
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-500 dark:text-zinc-400">
              Your cart is empty. Pick a plan, module or addon to get started.
            </div>
          ) : (
            <>
              <CartSection
                title="Modules"
                items={modules}
                onRemoveItem={onRemoveItem}
              />
              <CartSection
                title="Addons"
                items={addons}
                onRemoveItem={onRemoveItem}
              />
            </>
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800 px-4 py-4 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-zinc-400">
              Total
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-zinc-100">
              ${total.toLocaleString()}
            </span>
          </div>
          <Button
            variant="gradient"
            className="w-full"
            disabled={cartItems.length === 0}
            onClick={onCheckout}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
