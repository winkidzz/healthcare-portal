'use client';
import React from 'react';
import Link from 'next/link';
import { ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

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

export default function AppLauncher() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
      {apps.map((app) => {
        const Icon = app.icon;
        return (
          <div
            key={app.key}
            className="flex flex-col items-center bg-[var(--white)] rounded-2xl shadow-lg p-8 transition-transform hover:scale-105 focus-within:scale-105 border border-transparent hover:border-[var(--primary-blue)] focus-within:border-[var(--primary-blue)]"
            tabIndex={0}
            aria-label={`Launch ${app.name}`}
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[var(--primary-blue)] mb-4">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--primary-blue)] mb-2">{app.name}</h2>
            <p className="text-[var(--text-muted)] mb-6 text-center">{app.description}</p>
            <Link
              href={`/${app.key}`}
              className="mt-auto px-6 py-2 rounded-full bg-[var(--teal-accent)] text-white font-medium shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition"
            >
              Launch
            </Link>
          </div>
        );
      })}
    </div>
  );
} 