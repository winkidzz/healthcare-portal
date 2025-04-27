'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
              <h1 className="text-2xl font-bold text-gray-900">Healthcare Portal</h1>
              <Link href="/preferences" className="text-blue-600 hover:text-blue-800">
                Preferences
              </Link>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow">
            <nav className="mt-5 px-2">
              <Link
                href="/"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  pathname === '/'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/icd-tests"
                className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  pathname === '/icd-tests'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                ICD Tests
              </Link>
              <Link
                href="/preferences"
                className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  pathname === '/preferences'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Preferences
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