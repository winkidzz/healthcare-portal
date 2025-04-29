export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    darkMode: boolean;
  };
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  medicalRecordNumber: string;
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const formatName = (firstName: string, lastName: string): string => {
  return `${lastName}, ${firstName}`;
};

export * from './context';
export * from './types'; 