import { ApiClient } from '../api/api-client';
import { Settings, ApiResponse } from '../types';

export class SettingsService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getSettings(): Promise<ApiResponse<Settings>> {
    return this.apiClient.get<Settings>('/settings');
  }

  async updateSettings(settings: Partial<Settings>): Promise<ApiResponse<Settings>> {
    return this.apiClient.put<Settings>('/settings', settings);
  }

  async resetSettings(): Promise<ApiResponse<Settings>> {
    return this.apiClient.post<Settings>('/settings/reset', {});
  }
} 