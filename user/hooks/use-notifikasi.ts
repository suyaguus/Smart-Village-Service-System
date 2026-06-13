/**
 * hooks/use-notifikasi.ts
 *
 * Backend belum punya endpoint notifikasi khusus, jadi notifikasi
 * disintesis dari status pengajuan surat & pengaduan milik user.
 * Setiap perubahan status menjadi satu item notifikasi.
 *
 * Mudah diperluas: kalau nanti ada endpoint /notifikasi, cukup
 * ganti sumber data di sini tanpa ubah UI.
 */

import { useAuth } from '@/hooks/use-auth';
import { useFetch } from '@/hooks/use-fetch';
import { getPengajuanByUser } from '@/services/pengajuan.service';
import { getPengaduanByUser } from '@/services/pengaduan.service';
import type { PengajuanSurat, Pengaduan, StatusPengajuan } from '@/types';

export interface NotifItem {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  tipe: 'surat' | 'pengaduan';
  status: StatusPengajuan;
  route: string;
}

// ── Mapper: pengajuan surat → notifikasi ─────────────────────────

function pengajuanToNotif(p: PengajuanSurat): NotifItem {
  const nama = p.jenis_surat?.nama ?? 'Surat';
  const pesanMap: Record<StatusPengajuan, string> = {
    menunggu: `Pengajuan ${nama} telah diterima dan menunggu diproses.`,
    diproses: `${nama} sedang diproses oleh admin desa.`,
    selesai: `${nama} telah selesai dan siap diambil.`,
    ditolak: `Pengajuan ${nama} ditolak. Lihat detail untuk keterangan.`,
  };

  return {
    id: `surat-${p.id}`,
    judul: 'Status Surat Diperbarui',
    pesan: pesanMap[p.status],
    waktu: p.updated_at,
    tipe: 'surat',
    status: p.status,
    route: `/status/${p.id}`,
  };
}

// ── Mapper: pengaduan → notifikasi ───────────────────────────────

function pengaduanToNotif(p: Pengaduan): NotifItem {
  const pesanMap: Record<StatusPengajuan, string> = {
    menunggu: `Pengaduan "${p.judul}" telah diterima.`,
    diproses: `Pengaduan "${p.judul}" sedang ditindaklanjuti admin.`,
    selesai: `Pengaduan "${p.judul}" telah selesai ditangani.`,
    ditolak: `Pengaduan "${p.judul}" ditolak.`,
  };

  return {
    id: `aduan-${p.id}`,
    judul: 'Update Pengaduan',
    pesan: pesanMap[p.status],
    waktu: p.updated_at,
    tipe: 'pengaduan',
    status: p.status,
    route: `/pengaduan/${p.id}`,
  };
}

// ── Hook ──────────────────────────────────────────────────────────

export function useNotifikasi() {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useFetch<NotifItem[]>(
    async () => {
      const userId = user?.id ?? '';

      // Ambil dua sumber paralel; tetap jalan walau salah satu gagal
      const [suratRes, aduanRes] = await Promise.allSettled([
        getPengajuanByUser(userId),
        getPengaduanByUser(userId),
      ]);

      const notifs: NotifItem[] = [];

      if (suratRes.status === 'fulfilled') {
        notifs.push(...suratRes.value.map(pengajuanToNotif));
      }
      if (aduanRes.status === 'fulfilled') {
        notifs.push(...aduanRes.value.map(pengaduanToNotif));
      }

      // Urutkan terbaru dulu
      notifs.sort(
        (a, b) => new Date(b.waktu).getTime() - new Date(a.waktu).getTime(),
      );

      return notifs;
    },
    [user?.id],
  );

  return { notifikasi: data, isLoading, error, refetch };
}