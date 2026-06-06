import { HttpException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const pengajuan_surat_api = axios.create({
  baseURL: process.env.PENGAJUAN_SURAT_SERVICE_URL!,
  timeout: 5000,
});

// buat interceptor untuk request
pengajuan_surat_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

// buat interceptor untuk pengajuan_surat_api
pengajuan_surat_api.interceptors.response.use(
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
    throw new HttpException('Pengajuan Surat Service Error', 500);
  },
);
