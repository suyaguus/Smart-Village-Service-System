/**
 * services/auth.service.ts
 * Semua API call yang berhubungan dengan autentikasi.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './api-client';
import { ENDPOINTS, STORAGE_KEYS } from '@/constants/api';
import type {
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  User,
} from '@/types';

// Login

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    credentials,
  );

  // Simpan token dan user ke storage
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.ACCESS_TOKEN,  data.access_token],
    [STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token],
    [STORAGE_KEYS.USER,          JSON.stringify(data.user)],
  ]);

  return data;
}

// Register

export async function register(payload: CreateUserRequest): Promise<User> {
  // POST /user tidak butuh auth
  const { data } = await apiClient.post<User>(
    ENDPOINTS.USER.BASE,
    payload,
  );
  return data;
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

// Update user tersimpan (mis. setelah edit profil) 

export async function setStoredUser(user: User): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}