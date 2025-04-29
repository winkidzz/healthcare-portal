'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode?: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during SSR and until mounted
  if (typeof window === 'undefined' || !mounted) {
    return null;
  }

  const errorMessage = statusCode === 404
    ? 'The page you are looking for does not exist.'
    : 'An error occurred on the server.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {statusCode || 'Error'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{errorMessage}</p>
        <div className="space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 