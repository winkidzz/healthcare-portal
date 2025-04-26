'use client';

import React from 'react';

interface PreferencesLayoutProps {
  children: React.ReactNode;
}

export function PreferencesLayout({ children }: PreferencesLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
} 