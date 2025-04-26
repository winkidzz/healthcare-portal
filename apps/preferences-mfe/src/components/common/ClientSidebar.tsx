'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

const Sidebar = dynamic(() => import('./Sidebar').then(mod => mod.Sidebar), {
  ssr: false,
  loading: () => (
    <div className="w-64 bg-white shadow-sm">
      <div className="h-16 border-b border-gray-200" />
    </div>
  )
});

export const ClientSidebar: FC = () => {
  return <Sidebar />;
}; 