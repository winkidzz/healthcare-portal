import { UserPreferences } from '@/types/preferences';

export class PreferencesServiceError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'PreferencesServiceError';
  }
}

export const preferencesService = {
  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const response = await fetch('/api/preferences');
      if (!response.ok) {
        throw new PreferencesServiceError('Failed to fetch preferences', response.status);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Failed to fetch preferences');
    }
  },

  async updateTheme(theme: UserPreferences['theme']): Promise<void> {
    try {
      const response = await fetch('/api/preferences/theme', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme }),
      });
      if (!response.ok) {
        throw new PreferencesServiceError('Failed to update theme', response.status);
      }
    } catch (error) {
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Failed to update theme');
    }
  },

  async updateNotificationPreference(
    type: keyof UserPreferences['notifications'],
    value: boolean
  ): Promise<void> {
    try {
      const response = await fetch('/api/preferences/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, value }),
      });
      if (!response.ok) {
        throw new PreferencesServiceError('Failed to update notification preference', response.status);
      }
    } catch (error) {
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Failed to update notification preference');
    }
  },

  async updateSecurityPreference(
    type: keyof UserPreferences['security'],
    value: boolean
  ): Promise<void> {
    try {
      const response = await fetch('/api/preferences/security', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, value }),
      });
      if (!response.ok) {
        throw new PreferencesServiceError('Failed to update security preference', response.status);
      }
    } catch (error) {
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Failed to update security preference');
    }
  },
}; 