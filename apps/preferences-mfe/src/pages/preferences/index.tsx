'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { preferencesService } from '@/services/preferences';
import { UserPreferences } from '@/types/preferences';
import { PreferencesServiceError } from '@/services/preferences';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';

const ClientLayout = dynamic(
  () => import('@/components/layout/ClientLayout').then(mod => mod.ClientLayout),
  { ssr: false }
);

const ClientPreferences = dynamic(
  () => import('@/components/pages/ClientPreferences').then(mod => mod.ClientPreferences),
  { ssr: false }
);

const inter = localFont({
  src: [
    {
      path: '../../../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
});

const PreferencesPage: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!isRouterReady) return;

    const fetchPreferences = async () => {
      try {
        const data = await preferencesService.getUserPreferences();
        setPreferences(data);
      } catch (err) {
        if (err instanceof PreferencesServiceError) {
          if (err.status === 401) {
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

    fetchPreferences();
  }, [isRouterReady, router]);

  const handleThemeChange = async (theme: UserPreferences['theme']) => {
    try {
      await preferencesService.updateTheme(theme);
      setPreferences(prev => prev ? { ...prev, theme } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update theme');
    }
  };

  const handleNotificationChange = async (type: keyof UserPreferences['notifications'], value: boolean) => {
    try {
      await preferencesService.updateNotificationPreference(type, value);
      setPreferences(prev => {
        if (!prev) return null;
        return {
          ...prev,
          notifications: {
            ...prev.notifications,
            [type]: value
          }
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notification preference');
    }
  };

  const handleSecurityChange = async (type: keyof UserPreferences['security'], value: boolean) => {
    try {
      await preferencesService.updateSecurityPreference(type, value);
      setPreferences(prev => {
        if (!prev) return null;
        return {
          ...prev,
          security: {
            ...prev.security,
            [type]: value
          }
        };
      });
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
    <div className="preferences-container">
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
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.security.passwordChangeReminder}
              onChange={(e) => handleSecurityChange('passwordChangeReminder', e.target.checked)}
            />
            Password Change Reminder
          </label>
        </div>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              checked={preferences.security.loginAlerts}
              onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
            />
            Login Alerts
          </label>
        </div>
      </section>
    </div>
  );
};

export default PreferencesPage; 