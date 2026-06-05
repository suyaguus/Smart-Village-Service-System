// buat variable untuk endpoint API jenis-surat
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

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

// buat interceptor untuk jenis_surat_api
jenis_surat_api.interceptors.response.use(
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
    throw new HttpException('Jenis Surat Service Error', 500);
  },
);
