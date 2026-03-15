import { apiClient } from './client';
import { AuthorizeUserParams, RegisterUserParams, RegisterUserBody } from './types';
import { AxiosResponse } from 'axios';

export const authService = {
  /**
   * Login user
   * Note: The backend expects email and password as query parameters (params).
   */
  async login(params: AuthorizeUserParams): Promise<AxiosResponse<unknown>> {
    return apiClient.post('/api/v1/authorize-user', null, { params });
  },

  /**
   * Register a new user
   * Note: The backend expects name, surname, email, and password as query parameters (params).
   * Optionally accepts profile_image in the body as form-data.
   */
  async register(params: RegisterUserParams, body?: RegisterUserBody): Promise<AxiosResponse<unknown>> {
    let data: FormData | null = null;
    const headers: Record<string, string> = {};

    if (body?.profile_image) {
      data = new FormData();
      data.append('profile_image', body.profile_image);
      headers['Content-Type'] = 'multipart/form-data';
    }

    return apiClient.post('/api/v1/register-new-user', data, {
      params,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    });
  },
};
