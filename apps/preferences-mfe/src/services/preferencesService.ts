import { Theme, UserPreferences } from '@/types/preferences';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class PreferencesServiceError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'PreferencesServiceError';
  }
}

export const preferencesService = {
  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const response = await fetch(`${API_BASE_URL}/preferences`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new PreferencesServiceError('Authentication required', 401);
        }
        throw new PreferencesServiceError('Failed to fetch user preferences', response.status);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error in getUserPreferences:', error);
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Error fetching user preferences');
    }
  },

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const response = await fetch(`${API_BASE_URL}/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(preferences),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new PreferencesServiceError('Authentication required', 401);
        }
        throw new PreferencesServiceError('Failed to update user preferences', response.status);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error in updateUserPreferences:', error);
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Error updating user preferences');
    }
  },

  async updateTheme(theme: Theme): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/preferences/theme?theme=${theme}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new PreferencesServiceError('Authentication required', 401);
        }
        throw new PreferencesServiceError('Failed to update theme', response.status);
      }
    } catch (error) {
      console.error('Error in updateTheme:', error);
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Error updating theme');
    }
  },

  async updateNotificationPreference(type: keyof UserPreferences['notifications'], enabled: boolean): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/preferences/notifications/${type}?enabled=${enabled}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new PreferencesServiceError('Authentication required', 401);
        }
        throw new PreferencesServiceError('Failed to update notification preference', response.status);
      }
    } catch (error) {
      console.error('Error in updateNotificationPreference:', error);
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Error updating notification preference');
    }
  },

  async updateSecurityPreference(type: keyof UserPreferences['security'], enabled: boolean): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/preferences/security/${type}?enabled=${enabled}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new PreferencesServiceError('Authentication required', 401);
        }
        throw new PreferencesServiceError('Failed to update security preference', response.status);
      }
    } catch (error) {
      console.error('Error in updateSecurityPreference:', error);
      if (error instanceof PreferencesServiceError) {
        throw error;
      }
      throw new PreferencesServiceError('Error updating security preference');
    }
  },
}; 