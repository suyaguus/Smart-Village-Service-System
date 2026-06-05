import axios, { InternalAxiosRequestConfig } from 'axios';

export const pengaduan_api = axios.create({
  baseURL: 'http://localhost:3005/api/pengaduan',
  timeout: 5000,
});

// buat interceptor untuk request
pengaduan_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);
