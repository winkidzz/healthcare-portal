declare module 'preferences_mfe/contexts/PreferencesContext' {
  import { ReactNode } from 'react';

  export interface PreferencesProviderProps {
    children: ReactNode;
  }

  export function PreferencesProvider(props: PreferencesProviderProps): JSX.Element;
}

declare module 'preferences_mfe/components/Preferences' {
  export function Preferences(): JSX.Element;
} 