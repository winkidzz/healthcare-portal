'use client';

import React from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { NotificationPreferences } from './preferences/NotificationPreferences';
import { SecurityPreferences } from './preferences/SecurityPreferences';
import { Theme } from '@/types/preferences';

const Preferences: React.FC = () => {
  const { preferences, loading, error, updateTheme } = usePreferences();

  if (loading) {
    return <div className="preferences-container">Loading preferences...</div>;
  }

  if (error) {
    return <div className="preferences-container">Error: {error}</div>;
  }

  if (!preferences) {
    return <div className="preferences-container">No preferences found</div>;
  }

  return (
    <div className="preferences-container">
      <h2>User Preferences</h2>
      <div className="preferences-content">
        <section className="preferences-section">
          <h3>Theme</h3>
          <select 
            value={preferences.theme} 
            onChange={(e) => updateTheme(e.target.value as Theme)}
            className="theme-selector"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </section>

        <section className="preferences-section">
          <h3>Notifications</h3>
          <NotificationPreferences />
        </section>

        <section className="preferences-section">
          <h3>Security</h3>
          <SecurityPreferences />
        </section>
      </div>
    </div>
  );
};

export { Preferences };
export default Preferences; 