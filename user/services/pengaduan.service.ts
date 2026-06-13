/**
 * services/pengaduan.service.ts
 * API call untuk pengaduan masyarakat.
 *
 * createPengaduan mendukung foto opsional:
 *  - Tanpa foto → kirim JSON biasa
 *  - Dengan foto → kirim multipart/form-data (field: judul, kategori, deskripsi, foto)
 */

import apiClient from './api-client';
import { ENDPOINTS } from '@/constants/api';
import type { Pengaduan, CreatePengaduanRequest } from '@/types';

export async function getPengaduanByUser(userId: string): Promise<Pengaduan[]> {
  const { data } = await apiClient.get<Pengaduan[]>(
    ENDPOINTS.PENGADUAN.BY_USER(userId),
  );
  return data;
}

export async function getPengaduanById(id: string): Promise<Pengaduan> {
  const { data } = await apiClient.get<Pengaduan>(
    ENDPOINTS.PENGADUAN.BY_ID(id),
  );
  return data;
}

export async function createPengaduan(
  payload: CreatePengaduanRequest,
  fotoUri?: string,
): Promise<Pengaduan> {
  // Dengan foto → multipart
  if (fotoUri) {
    const formData = new FormData();
    formData.append('judul', payload.judul);
    formData.append('kategori', payload.kategori);
    formData.append('deskripsi', payload.deskripsi);
    formData.append('foto', {
      uri: fotoUri,
      type: 'image/jpeg',
      name: `pengaduan_${Date.now()}.jpg`,
    } as unknown as Blob);

    const { data } = await apiClient.post<Pengaduan>(
      ENDPOINTS.PENGADUAN.BASE,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return data;
  }

  // Tanpa foto → JSON
  const { data } = await apiClient.post<Pengaduan>(
    ENDPOINTS.PENGADUAN.BASE,
    payload,
  );
  return data;
}