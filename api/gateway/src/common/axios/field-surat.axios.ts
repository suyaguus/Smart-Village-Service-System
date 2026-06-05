import { HttpException } from '@nestjs/common';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const field_surat_api = axios.create({
  baseURL: 'http://localhost:3003/api/field-surat',
  timeout: 5000,
});

// buat interceptor untuk request
field_surat_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

// buat interceptor untuk field_surat_api
field_surat_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.response?.data;

    if (status && message) {
      throw new HttpException(message, status);
    }

    throw new HttpException('Field Surat Service Error', 500);
  },
);
