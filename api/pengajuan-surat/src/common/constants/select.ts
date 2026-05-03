// membuat select untuk pengajuan surat
export const PENGAJUAN_SURAT_SELECT = {
  id: true,
  user_id: true,
  jenis_surat_id: true,
  status: true,
  catatan_admin: true,
  file_surat: true,
  estimasi_selesai: true,
  created_at: true,
  updated_at: true,
  detail: {
    select: {
      id: true,
      field_id: true,
      value: true,
    },
  },
  dokumen: {
    select: {
      id: true,
      field_id: true,
      file_url: true,
      created_at: true,
    },
  },
  status_log: {
    select: {
      id: true,
      status: true,
      keterangan: true,
      created_at: true,
    },
    orderBy: { created_at: 'asc' as const },
  },
};
