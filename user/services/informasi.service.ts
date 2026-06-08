import apiClient from './api-client';
import { ENDPOINTS } from '@/constants/api';
import type { Informasi } from '@/types';

export async function getAllInformasi(): Promise<Informasi[]> {
  const { data } = await apiClient.get<Informasi[]>(ENDPOINTS.INFORMASI.BASE);
  return data;
}

export async function getInformasiById(id: string): Promise<Informasi> {
  const { data } = await apiClient.get<Informasi>(
    ENDPOINTS.INFORMASI.BY_ID(id),
  );
  return data;
}