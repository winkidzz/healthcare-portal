'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { preferencesService } from '@/services/preferencesService';
import type { Theme } from '@healthcare-portal/shared-library/src/types/preferences';

export const ThemeSelector: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async (newTheme: Theme) => {
    try {
      await preferencesService.updateTheme(newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to update theme preference:', error);
      // You might want to show a toast notification here
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleThemeChange('light')}
          className={`px-4 py-2 rounded-md ${
            theme === 'light'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={`px-4 py-2 rounded-md ${
            theme === 'dark'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Dark
        </button>
        <button
          onClick={() => handleThemeChange('system')}
          className={`px-4 py-2 rounded-md ${
            theme === 'system'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          System
        </button>
      </div>
    </div>
  );
}; 