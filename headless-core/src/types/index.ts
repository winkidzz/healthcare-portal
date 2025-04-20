export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

export interface ICDTest {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  result: any;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  dataSharing: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
} 