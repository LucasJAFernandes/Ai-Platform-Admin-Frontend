import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SidebarLogoProps {
  collapsed: boolean;
}

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
