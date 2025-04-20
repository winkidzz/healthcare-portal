'use client';

import { useState } from 'react';
import { useEventBus } from '../shared/useEventBus';

interface SettingsProps {
  activeTab: string;
}

export default function Settings({ activeTab }: SettingsProps) {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
    dataSharing: false,
  });

  // Listen for theme changes from other micro-frontends
  useEventBus('settings:changed', ({ theme: newTheme, language: newLanguage }) => {
    setSettings((prev) => ({
      ...prev,
      theme: newTheme,
      language: newLanguage,
    }));
  });

  const handleChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Emit event for other micro-frontends
    eventBus.emit('settings:changed', { theme: settings.theme, language: settings.language });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Theme</label>
        <select
          value={settings.theme}
          onChange={(e) => handleChange('theme', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2">Email Notifications</span>
        </label>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => handleChange('pushNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2">Push Notifications</span>
        </label>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.dataSharing}
            onChange={(e) => handleChange('dataSharing', e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2">Data Sharing</span>
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Allow us to share your data with trusted partners to improve our
          services.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {activeTab === 'general' && renderGeneralSettings()}
      {activeTab === 'notifications' && renderNotificationSettings()}
      {activeTab === 'privacy' && renderPrivacySettings()}
    </div>
  );
} 