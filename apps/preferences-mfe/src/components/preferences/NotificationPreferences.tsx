'use client';

import React, { useState, useEffect } from 'react';
import { preferencesService } from '@/services/preferencesService';

interface NotificationPreference {
  id: keyof typeof NOTIFICATION_TYPES;
  label: string;
  description: string;
  enabled: boolean;
}

const NOTIFICATION_TYPES = {
  email: 'Email Notifications',
  push: 'Push Notifications',
  sms: 'SMS Notifications',
} as const;

export const NotificationPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'email',
      label: NOTIFICATION_TYPES.email,
      description: 'Receive notifications via email',
      enabled: true,
    },
    {
      id: 'push',
      label: NOTIFICATION_TYPES.push,
      description: 'Receive push notifications on your device',
      enabled: true,
    },
    {
      id: 'sms',
      label: NOTIFICATION_TYPES.sms,
      description: 'Receive notifications via SMS',
      enabled: false,
    },
  ]);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const userPrefs = await preferencesService.getUserPreferences();
        setPreferences(prev =>
          prev.map(pref => ({
            ...pref,
            enabled: userPrefs.notifications[pref.id],
          }))
        );
      } catch (error) {
        console.error('Failed to load notification preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  const togglePreference = async (id: keyof typeof NOTIFICATION_TYPES) => {
    try {
      const preference = preferences.find(p => p.id === id);
      if (!preference) return;

      const newEnabled = !preference.enabled;
      await preferencesService.updateNotificationPreference(id, newEnabled);

      setPreferences(prev =>
        prev.map(pref =>
          pref.id === id ? { ...pref, enabled: newEnabled } : pref
        )
      );
    } catch (error) {
      console.error('Failed to update notification preference:', error);
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