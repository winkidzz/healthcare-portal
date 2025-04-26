'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { PreferencesSidebar } from '@/features/preferences/components/PreferencesSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <AppShell>
      <div className="flex flex-1">
        <PreferencesSidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  );
} 