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