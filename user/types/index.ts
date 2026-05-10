// Status Pengajuan 
 
export type StatusPengajuan = 'diproses' | 'menunggu' | 'selesai' | 'ditolak';
 
// Pengajuan (Surat) 
 
export interface Pengajuan {
  id: string;
  jenisSurat: string;
  nomorSurat: string;
  tanggal: string;
  jam: string;
  status: StatusPengajuan;
  keterangan?: string;
}
 
// Jenis Surat
 
export type JenisSurat = 'SKD' | 'SKTM' | 'SPK';
 
export interface JenisSuratItem {
  id: JenisSurat;
  label: string;
  deskripsi: string;
  icon: string;
  route: string;
}
 
// User / Warga
 
export interface Warga {
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  agama: string;
  pekerjaan: string;
  statusPerkawinan: string;
}
 
// Pengaduan
 
export type KategoriPengaduan =
  | 'infrastruktur'
  | 'sosial'
  | 'kebersihan'
  | 'keamanan'
  | 'lainnya';
 
export interface Pengaduan {
  id: string;
  judul: string;
  kategori: KategoriPengaduan;
  deskripsi: string;
  tanggal: string;
  status: StatusPengajuan;
  fotoUrl?: string;
}
 
// Informasi / Berita
 
export interface Informasi {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
  kategori: string;
  gambarUrl?: string;
}
 
// Notifikasi
 
export interface Notifikasi {
  id: string;
  judul: string;
  pesan: string;
  tanggal: string;
  dibaca: boolean;
  tipe: 'status' | 'pengumuman' | 'sistem';
}