// buat variable untuk endpoint API jenis-surat
import axios, { InternalAxiosRequestConfig } from 'axios';

export const jenis_surat_api = axios.create({
  baseURL: 'http://localhost:3002/api/jenis-surat',
  timeout: 5000,
});

// buat interceptor untuk request
jenis_surat_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);
