'use client';

import dynamic from 'next/dynamic';

const ICDTestsApp = dynamic(() => import('icdTests/ICDTestsApp'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function ICDTestsPage() {
  return <ICDTestsApp />;
} 