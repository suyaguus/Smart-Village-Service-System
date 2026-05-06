// membuat refacotor untuk select data pengaduan
export const PENGADUAN_LIST_SELECT = {
  id: true,
  user_id: true,
  judul: true,
  status: true,
  created_at: true,
  updated_at: true,
};

export const PENGADUAN_SELECT = {
  id: true,
  user_id: true,
  judul: true,
  deskripsi: true,
  status: true,
  created_at: true,
  updated_at: true,
  respon: {
    select: {
      id: true,
      admin_id: true,
      text: true,
      created_at: true,
    },
    orderBy: { created_at: 'asc' as const },
  },
};
