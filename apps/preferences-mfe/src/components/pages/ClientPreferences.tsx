'use client';

import React, { useState, useEffect } from 'react';
import type { User } from '@/types/user';

export function ClientPreferences() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Preferences</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">User Information</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 