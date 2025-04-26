'use client';

import React from 'react';
import Link from 'next/link';
import { navigationConfig, isActiveRoute } from '@/lib/navigation';
import { useAppRouter } from '@/providers/AppRouterContext';

const Header: React.FC = () => {
  const { pathname } = useAppRouter();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Healthcare Portal
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              {navigationConfig.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActiveRoute(pathname, item)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 