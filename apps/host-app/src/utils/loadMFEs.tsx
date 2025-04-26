import React from 'react';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider = dynamic<PreferencesProviderProps>(() => {
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

export const Preferences = dynamic(() => {
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

export const loadPreferencesMFE = async () => {
  if (typeof window !== 'undefined') {
    try {
      const container = document.getElementById('preferences-mfe');
      if (!container) {
        console.error('Preferences MFE container not found');
        return;
      }

      // Show loading state
      container.innerHTML = '<div class="loading">Loading preferences...</div>';

      const { mount: mountPreferences, unmount: unmountPreferences } = await import('preferences_mfe/components/Preferences');
      
      // Store unmount function for cleanup
      (window as any).unmountPreferences = unmountPreferences;
      
      mountPreferences(container);
    } catch (error) {
      console.error('Failed to load preferences MFE:', error);
      const container = document.getElementById('preferences-mfe');
      if (container) {
        container.innerHTML = '<div class="error">Failed to load preferences</div>';
      }
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

      const { mount: mountICDTests, unmount: unmountICDTests } = await import('icdTests/ICDTests');
      
      // Store unmount function for cleanup
      (window as any).unmountICDTests = unmountICDTests;
      
      mountICDTests(container);
    } catch (error) {
      console.error('Failed to load ICD tests MFE:', error);
      const container = document.getElementById('icd-tests-mfe');
      if (container) {
        container.innerHTML = '<div class="error">Failed to load ICD tests</div>';
      }
    }
  }
}; 