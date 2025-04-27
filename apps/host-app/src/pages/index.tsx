import React from 'react';
import { PreferencesProvider, Preferences } from '../utils/loadMFEs';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Healthcare Portal</h1>
        <PreferencesProvider>
          <Preferences />
        </PreferencesProvider>
      </div>
    </div>
  );
};

export default HomePage; 