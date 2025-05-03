// This type is the single source of truth for user preferences across the portal and all MFEs.
export type Theme = 'light' | 'dark' | 'system';

export interface UserPreferences {
  theme: Theme;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    passwordChangeReminder: boolean;
    loginAlerts: boolean;
  };
} 