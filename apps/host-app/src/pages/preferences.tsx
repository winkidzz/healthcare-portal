import { Preferences } from '../utils/loadMFEs';
import { useEffect } from 'react';

export default function PreferencesPage() {
  useEffect(() => {
    // Load the preferences MFE when the page mounts
    const loadMFE = async () => {
      try {
        const { loadPreferencesMFE } = await import('../utils/loadMFEs');
        await loadPreferencesMFE();
      } catch (error) {
        console.error('Failed to load preferences MFE:', error);
      }
    };
    loadMFE();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div id="preferences-mfe" className="container mx-auto px-4 py-8">
        <Preferences />
      </div>
    </div>
  );
} 