'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PreferencesSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'General', href: '/preferences' },
    { name: 'Notifications', href: '/preferences/notifications' },
    { name: 'Privacy', href: '/preferences/privacy' },
    { name: 'Security', href: '/preferences/security' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
} 