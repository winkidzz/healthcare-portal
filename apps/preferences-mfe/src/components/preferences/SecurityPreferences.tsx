'use client';

import React, { useState, useEffect } from 'react';
import { preferencesService } from '@/services/preferencesService';

interface SecurityPreference {
  id: keyof typeof SECURITY_TYPES;
  label: string;
  description: string;
  enabled: boolean;
}

const SECURITY_TYPES = {
  twoFactorAuth: 'Two-Factor Authentication',
  passwordChangeReminder: 'Password Change Reminder',
  loginAlerts: 'Login Alerts',
} as const;

export const SecurityPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<SecurityPreference[]>([
    {
      id: 'twoFactorAuth',
      label: SECURITY_TYPES.twoFactorAuth,
      description: 'Add an extra layer of security to your account',
      enabled: false,
    },
    {
      id: 'passwordChangeReminder',
      label: SECURITY_TYPES.passwordChangeReminder,
      description: 'Get reminded to change your password periodically',
      enabled: true,
    },
    {
      id: 'loginAlerts',
      label: SECURITY_TYPES.loginAlerts,
      description: 'Receive alerts for new logins to your account',
      enabled: true,
    },
  ]);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const userPrefs = await preferencesService.getUserPreferences();
        setPreferences(prev =>
          prev.map(pref => ({
            ...pref,
            enabled: userPrefs.security[pref.id],
          }))
        );
      } catch (error) {
        console.error('Failed to load security preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  const togglePreference = async (id: keyof typeof SECURITY_TYPES) => {
    try {
      const preference = preferences.find(p => p.id === id);
      if (!preference) return;

      const newEnabled = !preference.enabled;
      await preferencesService.updateSecurityPreference(id, newEnabled);

      setPreferences(prev =>
        prev.map(pref =>
          pref.id === id ? { ...pref, enabled: newEnabled } : pref
        )
      );
    } catch (error) {
      console.error('Failed to update security preference:', error);
      // You might want to show a toast notification here
    }
  };

  return (
    <div className="space-y-4">
      {preferences.map(preference => (
        <div key={preference.id} className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {preference.label}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {preference.description}
            </p>
          </div>
          <button
            onClick={() => togglePreference(preference.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              preference.enabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                preference.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}; 