'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { preferencesApi } from '@healthcare-portal/api-client';
import { User } from '@healthcare-portal/shared-library';

interface ApplicationPreferencesProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export function ApplicationPreferences({ user, onUpdate }: ApplicationPreferencesProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const togglePreference = async (key: keyof User['preferences'], value: boolean) => {
    try {
      setIsUpdating(true);
      const updatedUser = await preferencesApi.updateUserPreferences(user.id, {
        [key]: value,
      });
      onUpdate(updatedUser);
    } catch (error) {
      console.error('Failed to update preference:', error);
      // TODO: Add error handling UI
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
          <p className="text-sm text-gray-500">Receive email notifications about your account</p>
        </div>
        <Switch
          checked={user.preferences.emailNotifications}
          onChange={(checked) => togglePreference('emailNotifications', checked)}
          disabled={isUpdating}
          className={`${
            user.preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              user.preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
          <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
        </div>
        <Switch
          checked={user.preferences.pushNotifications}
          onChange={(checked) => togglePreference('pushNotifications', checked)}
          disabled={isUpdating}
          className={`${
            user.preferences.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              user.preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Dark Mode</h3>
          <p className="text-sm text-gray-500">Enable dark mode for the application</p>
        </div>
        <Switch
          checked={user.preferences.darkMode}
          onChange={(checked) => togglePreference('darkMode', checked)}
          disabled={isUpdating}
          className={`${
            user.preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              user.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
} 