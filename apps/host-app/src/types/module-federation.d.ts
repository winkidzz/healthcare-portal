declare module 'icd_tests_mfe/ICDTests' {
  const ICDTests: React.ComponentType;
  export default ICDTests;
}

declare module 'preferences_mfe/Preferences' {
  import { FC } from 'react';
  export interface PreferencesProps {
    onLoginRedirect?: () => void;
  }
  const Preferences: FC<PreferencesProps>;
  export default Preferences;
}

declare module 'preferences_mfe/contexts/PreferencesContext' {
  import { ReactNode } from 'react';
  
  interface PreferencesProviderProps {
    children: ReactNode;
  }
  
  export const PreferencesProvider: React.ComponentType<PreferencesProviderProps>;
} 