import apiClient from './api-client';
import { ENDPOINTS } from '@/constants/api';
import type { User, UpdateUserRequest } from '@/types';

export async function getUserById(id: string): Promise<User> {
  const { data } = await apiClient.get<User>(ENDPOINTS.USER.BY_ID(id));
  return data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserRequest,
): Promise<User> {
  const { data } = await apiClient.patch<User>(
    ENDPOINTS.USER.BY_ID(id),
    payload,
  );
  return data;
}