'use client';

import { Button } from '@/components/atoms/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CollapseToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function CollapseToggle({ collapsed, onToggle }: CollapseToggleProps) {
  if (collapsed) {
    return (
      <div className="mb-2 relative pt-10">
        <Button
          variant="ghost"
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="absolute h-8 w-8 p-0 mt-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <ChevronRight className="h-4 w-4 hover:text-zinc-100" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 p-0 flex-shrink-0"
      onClick={onToggle}
      aria-label="Collapse sidebar"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}
