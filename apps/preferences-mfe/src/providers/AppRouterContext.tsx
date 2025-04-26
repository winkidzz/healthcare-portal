'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface AppRouterContextType {
  pathname: string;
}

const AppRouterContext = createContext<AppRouterContextType | null>(null);

export function useAppRouter() {
  const context = useContext(AppRouterContext);
  if (!context) {
    throw new Error('useAppRouter must be used within an AppRouterContextProvider');
  }
  return context;
}

interface AppRouterContextProviderProps {
  children: ReactNode;
}

export function AppRouterContextProvider({ children }: AppRouterContextProviderProps) {
  const pathname = usePathname();
  
  return (
    <AppRouterContext.Provider value={{ pathname }}>
      {children}
    </AppRouterContext.Provider>
  );
} 