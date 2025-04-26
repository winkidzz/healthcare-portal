export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  lastUpdated: string;
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
} 