import React, { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface PreferencesProviderProps {
  children: ReactNode;
}

// @ts-ignore - Module federation type issues
const PreferencesProvider = dynamic<PreferencesProviderProps>(() => {
  console.log('Loading PreferencesProvider module');
  return import('preferences_mfe/contexts/PreferencesContext')
    .then(mod => {
      console.log('PreferencesProvider module loaded successfully');
      return mod.PreferencesProvider;
    })
    .catch(error => {
      console.error('Failed to load PreferencesProvider module:', error);
      throw error;
    });
}, {
  ssr: false,
  loading: () => {
    console.log('Showing PreferencesProvider loading state');
    return <div>Loading preferences provider...</div>;
  }
});

// @ts-ignore - Module federation type issues
const Preferences = dynamic(() => {
  console.log('Loading Preferences module');
  return import('preferences_mfe/components/Preferences')
    .then(mod => {
      console.log('Preferences module loaded successfully');
      return mod.Preferences;
    })
    .catch(error => {
      console.error('Failed to load Preferences module:', error);
      throw error;
    });
}, {
  ssr: false,
  loading: () => {
    console.log('Showing Preferences loading state');
    return <div>Loading preferences...</div>;
  }
});

const HomePage = () => {
  useEffect(() => {
    console.log('HomePage mounted');
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Healthcare Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>
          <PreferencesProvider>
            <Preferences />
          </PreferencesProvider>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">ICD Tests</h2>
          <div>Loading ICD Tests...</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 