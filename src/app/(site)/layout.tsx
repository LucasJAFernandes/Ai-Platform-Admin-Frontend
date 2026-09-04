import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-dvh flex flex-col">{children}</div>
    </ThemeProvider>
  );
}
