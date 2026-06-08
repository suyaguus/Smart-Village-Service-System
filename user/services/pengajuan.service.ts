import apiClient from './api-client';
import { ENDPOINTS } from '@/constants/api';
import type { PengajuanSurat, CreatePengajuanRequest } from '@/types';

// Ambil semua pengajuan milik user tertentu
export async function getPengajuanByUser(
  userId: string,
): Promise<PengajuanSurat[]> {
  const { data } = await apiClient.get<PengajuanSurat[]>(
    ENDPOINTS.PENGAJUAN_SURAT.BY_USER(userId),
  );
  return data;
}

// Ambil detail satu pengajuan
export async function getPengajuanById(id: string): Promise<PengajuanSurat> {
  const { data } = await apiClient.get<PengajuanSurat>(
    ENDPOINTS.PENGAJUAN_SURAT.BY_ID(id),
  );
  return data;
}

// Buat pengajuan baru
export async function createPengajuan(
  payload: CreatePengajuanRequest,
): Promise<PengajuanSurat> {
  const { data } = await apiClient.post<PengajuanSurat>(
    ENDPOINTS.PENGAJUAN_SURAT.BASE,
    payload,
  );
  return data;
}

// Helper: hitung jumlah per status dari array pengajuan
export function countByStatus(list: PengajuanSurat[]) {
  return list.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    { menunggu: 0, diproses: 0, selesai: 0, ditolak: 0 } as Record<
      string,
      number
    >,
  );
}