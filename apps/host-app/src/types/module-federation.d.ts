declare module 'icd_tests_mfe/ICDTests' {
  const ICDTests: React.ComponentType;
  export default ICDTests;
}

declare module 'preferences_mfe/pages/preferences' {
  const Preferences: React.ComponentType;
  export default Preferences;
}

declare module 'preferences_mfe/contexts/PreferencesContext' {
  import { ReactNode } from 'react';
  
  interface PreferencesProviderProps {
    children: ReactNode;
  }
  
  export const PreferencesProvider: React.ComponentType<PreferencesProviderProps>;
} 