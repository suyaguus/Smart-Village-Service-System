# Smart Village Service System (Sistem Layanan Desa Digital)

Smart Village Service System adalah platform digital terintegrasi yang dirancang untuk mempermudah tata kelola dan pelayanan masyarakat di tingkat desa. Sistem ini terdiri dari tiga bagian utama: Backend (Microservices API), Web CMS (untuk Admin/Perangkat Desa), dan Mobile App (untuk Warga).

## 🏗 Arsitektur Sistem

Proyek ini dibangun menggunakan arsitektur **Microservices** untuk memastikan skalabilitas, keandalan, dan kemudahan dalam pengembangan. Sistem dibagi menjadi tiga repositori/folder utama:

1. **`api/` (Backend Microservices)**
2. **`cms/` (Web Admin Dashboard)**
3. **`user/` (Mobile App Warga)**

---

### 1. Backend API (`/api`)
Dibangun menggunakan **NestJS**, **Prisma ORM**, dan database **Supabase (PostgreSQL)**. Terdiri dari sebuah API Gateway dan beberapa service independen yang saling berkomunikasi.

*   **API Gateway (`api/gateway`)**: Bertindak sebagai pintu masuk utama untuk semua request dari klien (CMS & Mobile). Menangani autentikasi (JWT) dan *Single Sign-On* (SSO) menggunakan Google OAuth2 untuk platform Web maupun Mobile (via Deep Linking).
*   **User Service (`api/user-service`)**: Mengelola data pengguna (warga dan admin), registrasi, sinkronisasi akun Google, serta profil pengguna.
*   **Jenis Surat Service (`api/jenis-surat-service`)**: Mengelola master data jenis-jenis surat yang dapat diajukan oleh warga (misal: Surat Keterangan Domisili, Surat Pengantar SKCK).
*   **Field Surat Service (`api/field-surat-service`)**: Mengelola format dan atribut dinamis (field/isian) yang dibutuhkan secara spesifik untuk setiap jenis surat.
*   **Pengajuan Surat Service (`api/pengajuan-surat-service`)**: Menangani proses alur pengajuan dokumen/surat oleh warga, mulai dari *draft*, verifikasi, hingga status disetujui atau ditolak oleh perangkat desa.
*   **Pengaduan Service (`api/pengaduan-service`)**: Mengelola laporan, keluhan, atau aspirasi yang dikirimkan oleh warga beserta riwayat status tindak lanjutnya.
*   **Informasi Service (`api/informasi-service`)**: Mengelola pengumuman, berita, dan informasi kegiatan desa yang akan dipublikasikan ke aplikasi warga.

### 2. CMS / Admin Dashboard (`/cms`)
Web aplikasi yang ditujukan untuk Kepala Desa, Staf Pelayanan, dan admin desa untuk mengelola seluruh data sistem dan menindaklanjuti permintaan warga.
*   **Teknologi**: Next.js (React), Tailwind CSS, TypeScript.
*   **Fitur Utama**: 
    *   Autentikasi admin (termasuk fitur Login praktis dengan Google).
    *   Verifikasi dan pemrosesan pengajuan surat warga.
    *   Manajemen pengaduan masuk dari warga.
    *   Publikasi informasi/berita desa.
    *   Manajemen master data jenis surat dan form dinamisnya.

### 3. Aplikasi Warga (`/user`)
Aplikasi mobile yang digunakan langsung oleh masyarakat desa untuk mendapatkan pelayanan tanpa harus datang secara fisik ke kantor desa.
*   **Teknologi**: React Native dengan framework **Expo**, TypeScript.
*   **Fitur Utama**:
    *   Login dan Registrasi (termasuk kelancaran Login dengan Google via Expo WebBrowser & Deep Linking).
    *   Mengajukan permohonan surat administrasi secara *online*.
    *   Melacak status pengajuan surat secara *real-time*.
    *   Mengirim pengaduan/keluhan beserta lampiran foto.
    *   Membaca berita dan pengumuman terbaru dari desa.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat
*   Node.js (versi 18 atau lebih baru)
*   `pnpm` (Package Manager)
*   Akun Supabase (untuk keperluan Database)
*   Android Studio / Xcode (untuk menjalankan emulator Mobile App)

### Menjalankan Backend (API Gateway & Services)
1. Buka terminal di masing-masing folder service (`api/gateway`, `api/user-service`, dsb).
2. Salin `.env.example` ke `.env` dan sesuaikan URL database (Supabase) dan *secrets* (termasuk `INTERNAL_SECRET`).
3. Instal dependensi: `pnpm install`
4. Jalankan service: `pnpm start:dev`
*(Pastikan semua service berjalan secara bersamaan di port yang berbeda sesuai konfigurasi di API Gateway).*

### Menjalankan Web CMS
1. Buka terminal baru dan masuk ke folder cms: `cd cms`
2. Instal dependensi: `pnpm install`
3. Konfigurasi file `.env` dengan `NEXT_PUBLIC_API_URL` yang mengarah ke port API Gateway lokal.
4. Jalankan server lokal: `pnpm dev`
5. Buka `http://localhost:3000` di browser.

### Menjalankan Aplikasi Mobile (User)
1. Buka terminal baru dan masuk ke folder user: `cd user`
2. Instal dependensi: `pnpm install`
3. Sesuaikan URL API di aplikasi agar mengarah ke API Gateway lokal. (Perhatian: Gunakan IP lokal laptop Anda, misal `10.0.2.2` untuk Android Emulator atau `192.168.x.x` jika menggunakan *device* fisik).
4. Jalankan Metro bundler: `pnpm android` atau `pnpm ios`.

---

## 🔐 Catatan: Konfigurasi Google OAuth2
Sistem ini memfasilitasi integrasi akun Google. Anda harus mendaftarkan **OAuth Client ID** di Google Cloud Console dan memasukkan 2 *Authorized Redirect URIs* berikut:
1. Untuk Web CMS: `http://localhost:3007/api/auth/google/callback`
2. Untuk Mobile Expo: `http://localhost:3007/api/auth/google/mobile/callback`

Lalu letakkan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` pada file `.env` di folder `api/gateway`.
