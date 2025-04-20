import { ApiClient } from '../api/api-client';
import { ICDTest, TestResult, ApiResponse } from '../types';

export class TestService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getTests(): Promise<ApiResponse<ICDTest[]>> {
    return this.apiClient.get<ICDTest[]>('/tests');
  }

  async getTestById(id: string): Promise<ApiResponse<ICDTest>> {
    return this.apiClient.get<ICDTest>(`/tests/${id}`);
  }

  async getTestResults(testId: string): Promise<ApiResponse<TestResult[]>> {
    return this.apiClient.get<TestResult[]>(`/tests/${testId}/results`);
  }

  async createTest(test: Omit<ICDTest, 'id'>): Promise<ApiResponse<ICDTest>> {
    return this.apiClient.post<ICDTest>('/tests', test);
  }

  async updateTest(id: string, test: Partial<ICDTest>): Promise<ApiResponse<ICDTest>> {
    return this.apiClient.put<ICDTest>(`/tests/${id}`, test);
  }

  async deleteTest(id: string): Promise<ApiResponse<void>> {
    return this.apiClient.delete<void>(`/tests/${id}`);
  }
} 