import { HttpException } from '@nestjs/common/exceptions/http.exception';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const field_surat_api = axios.create({
  baseURL: 'http://localhost:3003/api/field-surat',
  timeout: 5000,
});

field_surat_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

field_surat_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.response?.data;

    throw new HttpException(message || error.message, status || 500);
  },
);
