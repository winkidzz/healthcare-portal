'use client';

import React from 'react';

// Mock data until we have the actual API client
const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  preferences: {
    theme: 'light',
    notifications: true
  }
};

export function PreferencesContent() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Preferences</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-gray-900">{mockUser.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{mockUser.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <p className="mt-1 text-gray-900">{mockUser.preferences.theme}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notifications</label>
            <p className="mt-1 text-gray-900">{mockUser.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 