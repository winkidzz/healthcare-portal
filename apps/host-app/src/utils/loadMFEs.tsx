import React from 'react';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface PreferencesProviderProps {
  children: ReactNode;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const loadWithRetry = async (importFn: () => Promise<any>, retries = MAX_RETRIES) => {
  try {
    return await importFn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying import, ${retries} attempts remaining...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return loadWithRetry(importFn, retries - 1);
    }
    throw error;
  }
};

export const PreferencesProvider = dynamic<PreferencesProviderProps>(() => {
  console.log('Loading PreferencesProvider module');
  return loadWithRetry(() => import('preferences_mfe/contexts/PreferencesContext'))
    .then(mod => {
      console.log('PreferencesProvider module loaded successfully');
      return mod.PreferencesProvider;
    })
    .catch(error => {
      console.error('Failed to load PreferencesProvider module:', error);
      return () => ({ children }: PreferencesProviderProps) => <>{children}</>;
    });
}, {
  ssr: false,
  loading: () => {
    console.log('Showing PreferencesProvider loading state');
    return <div>Loading preferences provider...</div>;
  }
});

export const Preferences = dynamic(() => {
  console.log('Loading Preferences module');
  return loadWithRetry(() => import('preferences_mfe/pages/preferences'))
    .then(mod => {
      console.log('Preferences module loaded successfully');
      return mod.default;
    })
    .catch(error => {
      console.error('Failed to load Preferences module:', error);
      return () => <div>Failed to load preferences. Please try again later.</div>;
    });
}, {
  ssr: false,
  loading: () => {
    console.log('Showing Preferences loading state');
    return <div>Loading preferences...</div>;
  }
});

export const loadPreferencesMFE = async () => {
  if (typeof window !== 'undefined') {
    try {
      const container = document.getElementById('preferences-mfe');
      if (!container) {
        console.error('Preferences MFE container not found');
        return;
      }
      console.log('Loading preferences MFE...');
      // The remoteEntry is automatically loaded by Module Federation
      console.log('Preferences MFE loaded successfully');
    } catch (error) {
      console.error('Failed to load preferences MFE:', error);
    }
  }
};

export const loadICDTestsMFE = async () => {
  if (typeof window !== 'undefined') {
    try {
      const container = document.getElementById('icd-tests-mfe');
      if (!container) {
        console.error('ICD Tests MFE container not found');
        return;
      }

      // Show loading state
      container.innerHTML = '<div class="loading">Loading ICD tests...</div>';

      const { default: ICDTests } = await import('icd_tests_mfe/ICDTests');
      
      // Create a React root and render the component
      const root = document.createElement('div');
      container.innerHTML = '';
      container.appendChild(root);
      
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(React.createElement(ICDTests));
      
      // Store root for cleanup
      (window as any).icdTestsRoot = reactRoot;
    } catch (error) {
      console.error('Failed to load ICD tests MFE:', error);
      const container = document.getElementById('icd-tests-mfe');
      if (container) {
        container.innerHTML = '<div class="error">Failed to load ICD tests</div>';
      }
    }
  }
}; 