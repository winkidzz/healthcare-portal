'use client';

import React from 'react';
import Header from './Header';
import { Footer } from './Footer';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
} 