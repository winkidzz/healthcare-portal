'use client';

import { ReactNode } from 'react';
import { AppRouterContextProvider } from './AppRouterContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AppRouterContextProvider>
      <PreferencesProvider>
        {children}
      </PreferencesProvider>
    </AppRouterContextProvider>
  );
} 