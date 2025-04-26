'use client';

import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Healthcare Portal
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link href="/preferences" className="text-gray-600 hover:text-gray-900">
              Preferences
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 