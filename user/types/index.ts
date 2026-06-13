export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth

export interface LoginRequest {
  nik: string;
  password: string;
}

/** Shape yang dikembalikan oleh backend (terbungkus dalam wrapper) */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  type: string;
  user: User;
}

/** Wrapper response dari backend */
export interface ApiLoginResponse {
  success: boolean;
  message: string;
  metadata: { status: number };
  data: LoginResponse;
}

export interface RefreshResponse {
  access_token: string;
}

// User / Warga

export interface User {
  id: string;
  nik?: string;
  name: string;
  email?: string;
  phone?: string;
  alamat?: string;
  rt?: string;
  rw?: string;
  kelurahan?: string;
  kecamatan?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserRequest {
  nik: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateUserRequest {
  nama?: string;
  no_telepon?: string;
  alamat?: string;
  rt?: string;
  rw?: string;
  kelurahan?: string;
  kecamatan?: string;
  password?: string;
}

// Jenis Surat

export interface JenisSurat {
  id: string;
  nama: string;
  kode?: string;
  deskripsi?: string;
  created_at?: string;
}

// Field Surat

export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'radio';

export interface FieldSurat {
  id: string;
  jenis_surat_id: string;
  nama_field: string;       // label yang ditampilkan di form
  key: string;              // key untuk payload
  tipe: FieldType;
  wajib: boolean;
  urutan: number;
  opsi?: string[];          // untuk tipe select/radio
}

// Pengajuan Surat

export type StatusPengajuan = 'menunggu' | 'diproses' | 'selesai' | 'ditolak';

export interface PengajuanSurat {
  id: string;
  user_id: string;
  jenis_surat_id: string;
  jenis_surat?: JenisSurat;
  nomor_surat?: string;
  status: StatusPengajuan;
  data_isian: Record<string, string>;   // dynamic form values
  keterangan?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePengajuanRequest {
  jenis_surat_id: string;
  data_isian: Record<string, string>;
}

// Pengaduan

export type StatusPengaduan = 'menunggu' | 'diproses' | 'selesai' | 'ditolak';

export type KategoriPengaduan =
  | 'infrastruktur'
  | 'sosial'
  | 'kebersihan'
  | 'keamanan'
  | 'lainnya';

export interface ResponPengaduan {
  id: string;
  pengaduan_id: string;
  pesan: string;
  created_at: string;
}

export interface Pengaduan {
  id: string;
  user_id: string;
  judul: string;
  kategori: KategoriPengaduan;
  deskripsi: string;
  status: StatusPengaduan;
  foto_url?: string;
  respon?: ResponPengaduan[];
  created_at: string;
  updated_at: string;
}

export interface CreatePengaduanRequest {
  judul: string;
  kategori: KategoriPengaduan;
  deskripsi: string;
}

// Informasi / Berita

export interface FotoInformasi {
  id: string;
  url: string;
}

export interface Informasi {
  id: string;
  judul: string;
  ringkasan?: string;
  konten: string;
  kategori?: string;
  foto?: FotoInformasi[];
  created_at: string;
  updated_at: string;
}

// UI Helpers

export type ColorScheme = 'light' | 'dark';