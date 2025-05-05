'use client';
import dynamic from 'next/dynamic';

const PreferencesApp = dynamic(() => import('preferences_mfe/Preferences'), { ssr: false });

export default function PreferencesPage() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PreferencesApp />
    </div>
  );
} 