'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'General', href: '/preferences' },
  { name: 'Notifications', href: '/preferences/notifications' },
  { name: 'Security', href: '/preferences/security' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="h-16 border-b border-gray-200 flex items-center px-4">
        <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 