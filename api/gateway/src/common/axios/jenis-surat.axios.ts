// buat variable untuk endpoint API jenis-surat
import axios, { InternalAxiosRequestConfig } from 'axios';

export const jenis_surat_api = axios.create({
  baseURL: 'http://localhost:3002/api/jenis-surat',
  timeout: 5000,
});
