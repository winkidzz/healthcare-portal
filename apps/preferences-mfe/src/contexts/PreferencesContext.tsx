'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { preferencesService } from '@/services/preferencesService';
import type { UserPreferences, Theme } from '@/types/preferences';

interface PreferencesContextType {
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
  updateTheme: (theme: Theme) => Promise<void>;
  updateNotificationPreference: (type: keyof UserPreferences['notifications'], enabled: boolean) => Promise<void>;
  updateSecurityPreference: (type: keyof UserPreferences['security'], enabled: boolean) => Promise<void>;
  refreshPreferences: () => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}

interface PreferencesProviderProps {
  children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const refreshPreferences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await preferencesService.getUserPreferences();
      setPreferences(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Authentication required')) {
          router.push('/login');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPreferences();
  }, []);

  const updateTheme = async (theme: Theme) => {
    try {
      await preferencesService.updateTheme(theme);
      setPreferences(prev => prev ? { ...prev, theme } : null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update theme');
      }
    }
  };

  const updateNotificationPreference = async (type: keyof UserPreferences['notifications'], enabled: boolean) => {
    try {
      await preferencesService.updateNotificationPreference(type, enabled);
      setPreferences(prev => {
        if (!prev) return null;
        return {
          ...prev,
          notifications: {
            ...prev.notifications,
            [type]: enabled
          }
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update notification preference');
      }
    }
  };

  const updateSecurityPreference = async (type: keyof UserPreferences['security'], enabled: boolean) => {
    try {
      await preferencesService.updateSecurityPreference(type, enabled);
      setPreferences(prev => {
        if (!prev) return null;
        return {
          ...prev,
          security: {
            ...prev.security,
            [type]: enabled
          }
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update security preference');
      }
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        loading,
        error,
        updateTheme,
        updateNotificationPreference,
        updateSecurityPreference,
        refreshPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
} 