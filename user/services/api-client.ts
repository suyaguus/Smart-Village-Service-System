import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, ENDPOINTS, STORAGE_KEYS } from '@/constants/api';
import type { RefreshResponse } from '@/types';

// Buat instance

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper: baca token dari storage

async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

async function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

// Request Interceptor: inject Bearer token

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: auto-refresh jika 401

let isRefreshing = false;
// Queue request yang gagal selama refresh berlangsung
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Hanya retry untuk 401, dan hanya sekali per request
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Jika sedang refresh, queue request ini
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          (originalRequest.headers as Record<string, string>).Authorization =
            `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token');

      // Panggil endpoint refresh
      const { data } = await axios.post<RefreshResponse>(
        `${BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      );

      const newAccessToken = data.access_token;
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        (originalRequest.headers as Record<string, string>).Authorization =
          `Bearer ${newAccessToken}`;
      }

      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh gagal → logout paksa
      processQueue(refreshError, null);
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ]);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;