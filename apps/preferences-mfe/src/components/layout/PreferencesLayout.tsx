'use client';

import React from 'react';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { Footer } from '@/components/common/Footer';

interface PreferencesLayoutProps {
  children: React.ReactNode;
}

export function PreferencesLayout({ children }: PreferencesLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
} 