'use client';
import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
// Import PreferencesProvider dynamically to avoid SSR issues
var PreferencesProvider = dynamic(function () { return import('preferences_mfe/contexts/PreferencesContext').then(function (mod) { return mod.PreferencesProvider; }); }, {
    ssr: false,
    loading: function () { return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>); },
});
// Import client-side components dynamically
var ClientLayout = dynamic(function () { return import('../components/ClientLayout').then(function (mod) { return mod.default; }); }, {
    ssr: false,
    loading: function () { return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>); },
});
var Layout = function (_a) {
    var children = _a.children;
    var _b = useState(false), isClient = _b[0], setIsClient = _b[1];
    var router = useRouter();
    useEffect(function () {
        setIsClient(true);
    }, []);
    if (!isClient) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>);
    }
    return (<Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>}>
      <PreferencesProvider>
        <ClientLayout>{children}</ClientLayout>
      </PreferencesProvider>
    </Suspense>);
};
export default Layout;
