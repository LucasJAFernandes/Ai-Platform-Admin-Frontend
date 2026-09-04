'use client';

import { useState } from 'react';
import { SidebarProject } from '@/components/organisms/sidebar/sidebar';
import { type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<string | 'projects'>(
    'Users',
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen flex dark:bg-zinc-900 flex-col bg-[#f8fafc]">
        <div className="flex-1 flex overflow-hidden">
          <SidebarProject
            onProjectSelect={setSelectedProject}
            selectedProject={selectedProject}
          />
          <main className="flex-1 h-full bg-white dark:bg-zinc-900 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
