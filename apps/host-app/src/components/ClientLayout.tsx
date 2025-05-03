'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/outline';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">HealthPortal</h1>
              <Link href="/preferences" className="flex items-center text-blue-600 hover:text-blue-800">
                <UserIcon className="h-6 w-6 mr-1" aria-hidden="true" />
                <span className="sr-only">Preferences</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow">
            <nav className="mt-5 px-2">
              <Link
                href="/icd-tests"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  pathname === '/icd-tests'
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                ICD Tests
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default ClientLayout; 