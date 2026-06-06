import { HttpException } from '@nestjs/common';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const pengaduan_api = axios.create({
  baseURL: process.env.PENGADUAN_SERVICE_URL!,
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

// buat interceptor untuk pengaduan_api
pengaduan_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // buat variable untuk response
    const status = error.response?.status;

    // pesan
    // const message = error.response?.data?.message;
    const message = error.response?.data;

    // jika status error (terdfinisi)
    if (status && message) {
      throw new HttpException(message, status);
    }

    // jika status tidak terdefinisi
    throw new HttpException('Pengaduan Service Error', 500);
  },
);
