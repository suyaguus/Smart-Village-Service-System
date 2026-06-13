import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './api-client';
import { ENDPOINTS, STORAGE_KEYS } from '@/constants/api';
import type {
  LoginRequest,
  LoginResponse,
  ApiLoginResponse,
  CreateUserRequest,
  User,
} from '@/types';

// Login

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data: body } = await apiClient.post<ApiLoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    credentials,
  );

  const { access_token, refresh_token, user } = body.data;

  await AsyncStorage.multiSet([
    [STORAGE_KEYS.ACCESS_TOKEN, access_token],
    [STORAGE_KEYS.REFRESH_TOKEN, refresh_token],
    [STORAGE_KEYS.USER, JSON.stringify(user)],
  ]);

  return body.data;
}

// Register

export async function register(payload: CreateUserRequest): Promise<void> {
  await apiClient.post(ENDPOINTS.USER.BASE, payload);
}

// Logout

export async function logout(): Promise<void> {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
    STORAGE_KEYS.USER,
  ]);
}

// Restore session dari storage

export async function getStoredUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
