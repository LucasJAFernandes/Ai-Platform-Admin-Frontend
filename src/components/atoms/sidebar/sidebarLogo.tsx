import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { SidebarLogoProps } from '@/lib/types/components/atomic';

export function SidebarLogo({ collapsed }: SidebarLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Electo Logo"
      width={50}
      height={30}
      priority
      className={cn(
        'rounded-sm flex-shrink-0',
        collapsed ? 'item-center ml-1 mt-4' : 'mb-1',
      )}
    />
  );
}
