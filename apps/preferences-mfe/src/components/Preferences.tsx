'use client';

import React, { useEffect, useState } from 'react';
import { preferencesService } from '@/services/preferencesService';
import type { UserPreferences } from '@healthcare-portal/shared-library/src/types';
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(
  () => import('@/components/layout/ClientLayout').then(mod => mod.ClientLayout),
  { ssr: false }
);

const ClientPreferences = dynamic(
  () => import('@/components/pages/ClientPreferences').then(mod => mod.ClientPreferences),
  { ssr: false }
);

interface PreferencesProps {
  onLoginRedirect?: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ onLoginRedirect }) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRouterReady, setIsRouterReady] = useState(true); // Always true now

  useEffect(() => {
    if (!isRouterReady) return;

    const fetchPreferences = async () => {
      try {
        const data = await preferencesService.getUserPreferences();
        console.log('[Preferences] fetched data:', data);
        setPreferences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [isRouterReady, onLoginRedirect]);

  const handleThemeChange = async (theme: UserPreferences['theme']) => {
    try {
      const updated = await preferencesService.updateUserPreferences({ theme });
      setPreferences(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update theme');
    }
  };

  const handleNotificationChange = async (type: keyof UserPreferences['notifications'], value: boolean) => {
    try {
      const notifications = {
        email: preferences?.notifications?.email ?? false,
        push: preferences?.notifications?.push ?? false,
        sms: preferences?.notifications?.sms ?? false,
        [type]: value
      };
      const updated = await preferencesService.updateUserPreferences({ notifications });
      setPreferences(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notification preference');
    }
  };

  const handleSecurityChange = async (type: keyof UserPreferences['security'], value: boolean) => {
    try {
      const security = {
        twoFactorAuth: preferences?.security?.twoFactorAuth ?? false,
        passwordChangeReminder: preferences?.security?.passwordChangeReminder ?? false,
        loginAlerts: preferences?.security?.loginAlerts ?? false,
        [type]: value
      };
      const updated = await preferencesService.updateUserPreferences({ security });
      setPreferences(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update security preference');
    }
  };

  if (loading) {
    return <div>Loading preferences...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!preferences) {
    return <div>No preferences found</div>;
  }

  return (
    <div className="preferences-container" data-testid="preferences-mfe">
      <h1>User Preferences</h1>
      <section className="preferences-section">
        <h2>Theme</h2>
        <select 
          value={preferences.theme} 
          onChange={(e) => handleThemeChange(e.target.value as UserPreferences['theme'])}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </section>
      <section className="preferences-section">
        <h2>Notifications</h2>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.notifications.push}
              onChange={(e) => handleNotificationChange('push', e.target.checked)}
            />
            Push Notifications
          </label>
        </div>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
            />
            Email Notifications
          </label>
        </div>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.notifications.sms}
              onChange={(e) => handleNotificationChange('sms', e.target.checked)}
            />
            SMS Notifications
          </label>
        </div>
      </section>
      <section className="preferences-section">
        <h2>Security</h2>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.security.twoFactorAuth}
              onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
            />
            Two-Factor Authentication
          </label>
        </div>
        {/* Add more security preferences as needed */}
      </section>
    </div>
  );
};

export default Preferences; 