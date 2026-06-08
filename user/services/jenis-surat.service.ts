import apiClient from './api-client';
import { ENDPOINTS } from '@/constants/api';
import type { JenisSurat } from '@/types';

// Ambil semua jenis surat yang tersedia
export async function getAllJenisSurat(): Promise<JenisSurat[]> {
  const { data } = await apiClient.get<JenisSurat[]>(
    ENDPOINTS.JENIS_SURAT.BASE,
  );
  return data;
}

// Ambil detail satu jenis surat
export async function getJenisSuratById(id: string): Promise<JenisSurat> {
  const { data } = await apiClient.get<JenisSurat>(
    ENDPOINTS.JENIS_SURAT.BY_ID(id),
  );
  return data;
}