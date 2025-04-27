'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import PreferencesProvider dynamically to avoid SSR issues
const PreferencesProvider = dynamic(
  () => import('preferences_mfe/contexts/PreferencesContext').then(mod => mod.PreferencesProvider),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

// Import client-side components dynamically
const ClientLayout = dynamic(
  () => import('../components/ClientLayout').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <PreferencesProvider>
        <ClientLayout>{children}</ClientLayout>
      </PreferencesProvider>
    </Suspense>
  );
};

export default Layout; 