/**
 * constants/api.ts
 * Semua URL dan endpoint API terpusat di sini.
 * Ganti BASE_URL saat deploy ke production.
 */

export const BASE_URL = 'http://localhost:3007/api';

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN:   '/auth/login',
    REFRESH: '/auth/refresh',
  },

  // User
  USER: {
    BASE:       '/user',
    BY_ID:      (id: string) => `/user/${id}`,
  },

  // Jenis Surat
  JENIS_SURAT: {
    BASE:       '/jenis-surat',
    BY_ID:      (id: string) => `/jenis-surat/${id}`,
  },

  // Field Surat
  FIELD_SURAT: {
    BASE:               '/field-surat',
    BY_ID:              (id: string) => `/field-surat/${id}`,
    BY_JENIS_SURAT:     (jenisSuratId: string) =>
                          `/field-surat/jenis-surat/${jenisSuratId}`,
  },

  // Pengajuan Surat
  PENGAJUAN_SURAT: {
    BASE:       '/pengajuan-surat',
    BY_ID:      (id: string) => `/pengajuan-surat/${id}`,
    BY_USER:    (userId: string) => `/pengajuan-surat/user/${userId}`,
  },

  // Pengaduan 
  PENGADUAN: {
    BASE:       '/pengaduan',
    BY_ID:      (id: string) => `/pengaduan/${id}`,
    BY_USER:    (userId: string) => `/pengaduan/user/${userId}`,
    STATUS:     (id: string) => `/pengaduan/${id}/status`,
    RESPON:     (id: string) => `/pengaduan/${id}/respon`,
  },

  // Informasi 
  INFORMASI: {
    BASE:       '/informasi',
    BY_ID:      (id: string) => `/informasi/${id}`,
    FOTO:       (id: string) => `/informasi/${id}/foto`,
    FOTO_BY_ID: (id: string, fotoId: string) => `/informasi/${id}/foto/${fotoId}`,
  },
} as const;

// Token storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN:  'sv_access_token',
  REFRESH_TOKEN: 'sv_refresh_token',
  USER:          'sv_user',
} as const;