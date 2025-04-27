'use client';
import React, { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Import ICD Tests component with proper error handling and SSR disabled
var ICDTests = dynamic(function () { return import('icd_tests_mfe/ICDTests').catch(function (err) {
    console.error('Failed to load ICDTests:', err);
    return function () { return <div className="text-red-500 p-4">Failed to load ICD Tests: {err.message}</div>; };
}); }, {
    ssr: false,
    loading: function () { return (<div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading ICD Tests...</span>
      </div>); },
});
// Import Preferences component with proper error handling and SSR disabled
var Preferences = dynamic(function () { return import('preferences_mfe/pages/preferences').catch(function (err) {
    console.error('Failed to load Preferences:', err);
    return function () { return <div className="text-red-500 p-4">Failed to load Preferences: {err.message}</div>; };
}); }, {
    ssr: false,
    loading: function () { return (<div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading Preferences...</span>
      </div>); },
});
// Create an error boundary component
var ErrorBoundary = function (_a) {
    var children = _a.children;
    var _b = React.useState(false), hasError = _b[0], setHasError = _b[1];
    var _c = React.useState(null), error = _c[0], setError = _c[1];
    React.useEffect(function () {
        if (hasError) {
            console.error('Error in component:', error);
        }
    }, [hasError, error]);
    if (hasError) {
        return (<div className="text-red-500 p-4">
        <p>Something went wrong:</p>
        <pre>{error === null || error === void 0 ? void 0 : error.message}</pre>
      </div>);
    }
    return <>{children}</>;
};
export default function Home() {
    useEffect(function () {
        // Log when the page mounts
        console.log('Home page mounted');
    }, []);
    return (<div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Healthcare Portal</h1>
          <p className="mt-2 text-gray-600">Your one-stop solution for healthcare management</p>
        </div>

        {/* ICD Tests Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ICD Tests</h2>
          <ErrorBoundary>
            <Suspense fallback={<div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2 text-gray-600">Loading ICD Tests...</span>
              </div>}>
              <ICDTests />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
          <ErrorBoundary>
            <Suspense fallback={<div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2 text-gray-600">Loading Preferences...</span>
              </div>}>
              <Preferences />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>);
}
