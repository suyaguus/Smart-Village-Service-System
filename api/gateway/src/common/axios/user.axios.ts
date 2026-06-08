// buat variable untuk endpoint API kategori

import { HttpException } from '@nestjs/common/exceptions/http.exception';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const user_api = axios.create({
  baseURL: process.env.USER_SERVICE_URL!,
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

// buat interceptor untuk kategori_api
user_api.interceptors.response.use(
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

    // jika status tidak terdefinisi (bisa jadi ECONNREFUSED, timeout, dll)
    console.error(`Axios Error (${error.code}):`, error.message);
    throw new HttpException('User Service Error', 500);
  },
);
