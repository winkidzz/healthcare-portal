'use client';

import { useState, useEffect } from 'react';
import { User } from '@healthcare-portal/shared-library';

export default function UserPreferences() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      preferences: {
        emailNotifications: true,
        pushNotifications: false,
        darkMode: false
      }
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Preferences</h1>
      {user ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={user.preferences.emailNotifications} />
                Email Notifications
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={user.preferences.pushNotifications} />
                Push Notifications
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={user.preferences.darkMode} />
                Dark Mode
              </label>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading preferences...</p>
      )}
    </div>
  );
} 