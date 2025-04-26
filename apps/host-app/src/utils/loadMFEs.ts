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

      const { mount: mountPreferences, unmount: unmountPreferences } = await import('preferences/Preferences');
      
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