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
): Promise<Pengaduan> {
  const { data } = await apiClient.post<Pengaduan>(
    ENDPOINTS.PENGADUAN.BASE,
    payload,
  );
  return data;
}

// Upload foto pengaduan (multipart/form-data)
export async function uploadFotoPengaduan(
  pengaduanId: string,
  fotoUri: string,
): Promise<Pengaduan> {
  const formData = new FormData();
  formData.append('foto', {
    uri: fotoUri,
    type: 'image/jpeg',
    name: 'foto.jpg',
  } as unknown as Blob);

  const { data } = await apiClient.post<Pengaduan>(
    // Endpoint upload foto pengaduan — sesuaikan jika backend beda
    `${ENDPOINTS.PENGADUAN.BY_ID(pengaduanId)}/foto`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}