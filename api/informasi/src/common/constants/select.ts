// refactor: update select object for informasi
export const INFORMASI_SELECT = {
  id: true,
  admin_id: true,
  judul: true,
  isi: true,
  created_at: true,
  updated_at: true,
  // refactor menambahkan field foto
  foto: {
    select: {
      id: true,
      filename: true,
      created_at: true,
    },
  },
};

// refactor: update select object for informasi list
export const INFORMASI_LIST_SELECT = {
  id: true,
  admin_id: true,
  judul: true,
  foto: true,
  created_at: true,
};
