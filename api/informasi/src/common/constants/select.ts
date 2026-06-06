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
      url: true,
      public_id: true,
      created_at: true,
    },
  },
};

// refactor: update select object for informasi list
export const INFORMASI_LIST_SELECT = {
  id: true,
  admin_id: true,
  judul: true,
  created_at: true,
  // refactor menambahkan field foto
  foto: {
    select: {
      id: true,
      url: true,
    },
  },
};

// select object for informasi foto
export const INFORMASI_FOTO_SELECT = {
  id: true,
  informasi_id: true,
  url: true,
  public_id: true,
  created_at: true,
};
