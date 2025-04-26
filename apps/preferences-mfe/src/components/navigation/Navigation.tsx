'use client';

import React from 'react';
import Link from 'next/link';
import { useAppRouter } from '@/providers/AppRouterContext';

export const Navigation: React.FC = () => {
  const { pathname } = useAppRouter();

  return (
    <nav className="flex space-x-4">
      <Link 
        href="/preferences" 
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          pathname === '/preferences' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        Preferences
      </Link>
      <Link 
        href="/profile" 
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          pathname === '/profile' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        Profile
      </Link>
    </nav>
  );
}; 