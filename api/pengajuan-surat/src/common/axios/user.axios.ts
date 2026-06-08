import { HttpException } from '@nestjs/common/exceptions/http.exception';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const user_api = axios.create({
  baseURL: 'http://localhost:3001/api/user',
  timeout: 5000,
});

user_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['x-internal-secret'] = process.env.INTERNAL_SECRET;
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

user_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.response?.data;

    throw new HttpException(message || error.message, status || 500);
  },
);
