/**
 * constants/pengaduan.ts
 * Metadata kategori pengaduan (label + ikon).
 * Dipakai di form (selector), card (badge), dan detail.
 */

import type { KategoriPengaduan } from '@/types';

export interface KategoriMeta {
  value: KategoriPengaduan;
  label: string;
  icon: string;
}

export const KATEGORI_PENGADUAN: KategoriMeta[] = [
  { value: 'infrastruktur', label: 'Infrastruktur', icon: '🏗️' },
  { value: 'sosial',        label: 'Sosial',        icon: '👥' },
  { value: 'kebersihan',    label: 'Kebersihan',    icon: '🧹' },
  { value: 'keamanan',      label: 'Keamanan',      icon: '🛡️' },
  { value: 'lainnya',       label: 'Lainnya',       icon: '📌' },
];

// Cari metadata dari value; fallback ke "Lainnya"
export function getKategoriMeta(value: string): KategoriMeta {
  return (
    KATEGORI_PENGADUAN.find((k) => k.value === value) ??
    KATEGORI_PENGADUAN[KATEGORI_PENGADUAN.length - 1]
  );
}