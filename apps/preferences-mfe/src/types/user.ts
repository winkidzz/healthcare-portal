export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  lastUpdated: string;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    darkMode: boolean;
  };
} 