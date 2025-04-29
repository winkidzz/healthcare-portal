'use client';

import dynamic from 'next/dynamic';

const PreferencesComponent = dynamic(
  () => import('../utils/loadMFEs').then(mod => mod.Preferences),
  { ssr: false }
);

export default function PreferencesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div id="preferences-mfe" className="container mx-auto px-4 py-8">
        <PreferencesComponent />
      </div>
    </div>
  );
} 