'use client';

import dynamic from 'next/dynamic';
import type { FC, ReactNode } from 'react';
import { ClientSidebar } from '@/components/common/ClientSidebar';
import { Footer } from '@/components/common/Footer';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => <div className="h-16 bg-white shadow-sm" />
});

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <ClientSidebar />
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
}; 