'use client';

import { useEffect, useState } from 'react';

export default function ICDTests() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">ICD Tests</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">ICD Tests content will be displayed here.</p>
      </div>
    </div>
  );
} 