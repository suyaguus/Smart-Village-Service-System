import axios, { InternalAxiosRequestConfig } from 'axios';

export const informasi_api = axios.create({
  baseURL: 'http://localhost:3006/api/informasi',
  timeout: 5000,
});

// buat interceptor untuk request
informasi_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);
