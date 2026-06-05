// buat variable untuk endpoint API kategori

import axios, { InternalAxiosRequestConfig } from 'axios';

export const user_api = axios.create({
  baseURL: 'http://localhost:3001/api/user',
  timeout: 5000,
});

// buat interceptor untuk request
user_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);
