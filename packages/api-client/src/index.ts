import axios from 'axios';
import { User } from '@healthcare-portal/shared-library';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const preferencesApi = {
  async getUserPreferences(userId: string): Promise<User> {
    const response = await apiClient.get(`/users/${userId}/preferences`);
    return response.data;
  },

  async updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User> {
    const response = await apiClient.patch(`/users/${userId}/preferences`, preferences);
    return response.data;
  },
}; 