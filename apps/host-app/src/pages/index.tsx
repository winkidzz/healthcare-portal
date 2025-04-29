'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { log } from '@/utils/logger';

// Import ICD Tests component with proper error handling and SSR disabled
const ICDTests = dynamic(
  () => import('icd_tests_mfe/ICDTests').catch((err) => {
    console.error('Failed to load ICDTests:', err);
    return () => <div className="text-red-500 p-4">Failed to load ICD Tests: {err.message}</div>;
  }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading ICD Tests...</span>
      </div>
    ),
  }
);

// Import Preferences component with proper error handling and SSR disabled
const Preferences = dynamic(
  () => import('preferences_mfe/pages/preferences').catch((err) => {
    console.error('Failed to load Preferences:', err);
    return () => <div className="text-red-500 p-4">Failed to load Preferences: {err.message}</div>;
  }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading Preferences...</span>
      </div>
    ),
  }
);

// Create an error boundary component
const ErrorBoundary = dynamic(
  () => import('../components/ErrorBoundary'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Healthcare Portal</h1>
          <p className="mt-2 text-gray-600">Your one-stop solution for healthcare management</p>
        </div>

        {/* ICD Tests Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ICD Tests</h2>
          <ErrorBoundary
            onError={(error, componentStack) => {
              log.error('Error in ICD Tests component', {
                error: error.message,
                stack: error.stack,
                componentStack
              });
            }}
          >
            <Suspense fallback={
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2 text-gray-600">Loading ICD Tests...</span>
              </div>
            }>
              <ICDTests />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
          <ErrorBoundary
            onError={(error, componentStack) => {
              log.error('Error in Preferences component', {
                error: error.message,
                stack: error.stack,
                componentStack
              });
            }}
          >
            <Suspense fallback={
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2 text-gray-600">Loading Preferences...</span>
              </div>
            }>
              <Preferences />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
} 