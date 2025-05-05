'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserIcon, XMarkIcon, HomeModernIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

const Preferences = dynamic(
  () => import('preferences_mfe/Preferences').catch(() => () => <div className="text-red-500 p-4">Failed to load Preferences</div>),
  { ssr: false, loading: () => <div className="p-8">Loading Preferences...</div> }
);

interface ClientLayoutProps {
  children: React.ReactNode;
}

const apps = [
  {
    key: 'icd-tests',
    name: 'ICD Tests',
    icon: ClipboardDocumentListIcon,
    description: 'Browse and manage ICD test codes.'
  },
  {
    key: 'preferences',
    name: 'Preferences',
    icon: Cog6ToothIcon,
    description: 'Manage your user and portal preferences.'
  }
];

const navApps = [
  {
    key: '',
    name: 'Home',
    icon: HomeModernIcon,
    route: '/',
  },
  ...apps.map(app => ({
    key: app.key,
    name: app.name,
    icon: app.icon,
    route: `/${app.key}`,
  })),
];

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-[var(--background-soft)]">
        {/* Banner Bar */}
        <header className="bg-[var(--white)] shadow flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 border-b-2 border-[var(--teal-accent)]">
            <div className="flex items-center gap-2">
              <HomeModernIcon className="h-8 w-8 text-[var(--primary-blue)]" />
              <span className="text-2xl font-bold text-[var(--primary-blue)] tracking-tight">HealthPortal</span>
            </div>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-full bg-[var(--teal-accent)] text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
              onClick={() => setShowPreferences(true)}
              aria-label="Open Preferences"
            >
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* Optional tagline */}
          <div className="px-6 py-1 text-[var(--text-muted)] text-sm bg-[var(--background-soft)] border-b border-[var(--background-soft)]">
            Welcome to your secure healthcare portal
          </div>
        </header>

        {/* Preferences Modal */}
        {showPreferences && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-[var(--white)] rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={() => setShowPreferences(false)}
                aria-label="Close Preferences"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Suspense fallback={<div>Loading Preferences...</div>}>
                <Preferences />
              </Suspense>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Left Navigation */}
          <aside className="w-64 bg-[var(--white)] shadow-lg min-h-[calc(100vh-72px)] border-r border-[var(--background-soft)] flex flex-col py-6">
            <nav className="flex flex-col gap-2">
              {navApps.map((nav) => {
                const Icon = nav.icon;
                const isActive = nav.route === '/' ? pathname === '/' : pathname.startsWith(nav.route);
                return (
                  <Link
                    key={nav.key}
                    href={nav.route}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium relative
                      ${isActive ? 'text-[var(--primary-blue)] font-semibold bg-[var(--background-soft)]' : 'text-[var(--text-muted)] hover:bg-[var(--background-soft)] hover:text-[var(--primary-blue)]'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Vertical accent bar for active item */}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded bg-[var(--teal-accent)]" aria-hidden="true" />
                    )}
                    <Icon className="h-6 w-6 z-10" />
                    <span className="z-10">{nav.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content area with card style */}
          <main className="flex-1 flex flex-col items-center justify-start p-8">
            <div className="w-full max-w-5xl bg-[var(--white)] rounded-2xl shadow-xl p-8 min-h-[60vh]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default ClientLayout; 