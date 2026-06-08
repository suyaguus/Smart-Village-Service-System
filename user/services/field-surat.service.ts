import apiClient from './api-client';
import { ENDPOINTS } from '@/constants/api';
import type { FieldSurat } from '@/types';

// Ambil semua field untuk satu jenis surat — diurutkan by `urutan`
export async function getFieldsByJenisSurat(
  jenisSuratId: string,
): Promise<FieldSurat[]> {
  const { data } = await apiClient.get<FieldSurat[]>(
    ENDPOINTS.FIELD_SURAT.BY_JENIS_SURAT(jenisSuratId),
  );
  // Pastikan urutan tampil konsisten
  return data.sort((a, b) => a.urutan - b.urutan);
}