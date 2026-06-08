# Dokumentasi API Endpoint (Gateway)

Semua endpoint di bawah ini diakses melalui API Gateway pada URL dasar:  
`http://localhost:3007/api`

Sebagian besar endpoint dilindungi oleh `JwtAccessGuard`, sehingga memerlukan header `Authorization: Bearer <access_token>`.

---

## 1. 🔐 Auth
Endpoint untuk autentikasi dan mendapatkan token akses.

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/auth/login` | Login user atau admin untuk mendapatkan token | ❌ No |
| `POST` | `/auth/refresh` | Mendapatkan access token baru menggunakan refresh token | ✅ Yes (Refresh Token) |

---

## 2. 👤 User
Endpoint untuk manajemen data pengguna (masyarakat & admin).

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/user` | Registrasi / Buat user baru | ❌ No |
| `GET` | `/user` | Ambil semua data user | ✅ Yes |
| `GET` | `/user/:id` | Ambil detail user berdasarkan ID | ✅ Yes |
| `PATCH` | `/user/:id` | Update data user | ✅ Yes |
| `DELETE` | `/user/:id` | Hapus user | ✅ Yes |

---

## 3. 📄 Jenis Surat
Endpoint untuk mengelola master data jenis surat (misal: Surat Keterangan Domisili, dll).

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/jenis-surat` | Buat jenis surat baru | ✅ Yes |
| `GET` | `/jenis-surat` | Ambil semua jenis surat | ✅ Yes |
| `GET` | `/jenis-surat/:id` | Ambil detail jenis surat | ✅ Yes |
| `PATCH` | `/jenis-surat/:id` | Update jenis surat | ✅ Yes |
| `DELETE` | `/jenis-surat/:id` | Hapus jenis surat | ✅ Yes |

---

## 4. 📋 Field Surat
Endpoint untuk mengelola field atau form isian dinamis untuk setiap jenis surat.

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/field-surat` | Tambah field surat baru | ✅ Yes |
| `GET` | `/field-surat` | Ambil semua field surat | ✅ Yes |
| `GET` | `/field-surat/jenis-surat/:jenis_surat_id` | Ambil daftar field untuk suatu jenis surat tertentu | ✅ Yes |
| `GET` | `/field-surat/:id` | Ambil detail spesifik field surat | ✅ Yes |
| `PATCH` | `/field-surat/:id` | Update field surat | ✅ Yes |
| `DELETE` | `/field-surat/:id` | Hapus field surat | ✅ Yes |

---

## 5. ✉️ Pengajuan Surat
Endpoint untuk masyarakat mengajukan surat dan admin memprosesnya.

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/pengajuan-surat` | Ajukan surat baru (oleh user) | ✅ Yes |
| `GET` | `/pengajuan-surat` | Ambil semua data pengajuan surat | ✅ Yes |
| `GET` | `/pengajuan-surat/user/:user_id` | Ambil semua pengajuan surat milik user tertentu | ✅ Yes |
| `GET` | `/pengajuan-surat/:id` | Ambil detail sebuah pengajuan surat | ✅ Yes |
| `PATCH` | `/pengajuan-surat/:id` | Update pengajuan surat (contoh: ubah status diproses/selesai) | ✅ Yes |
| `DELETE` | `/pengajuan-surat/:id` | Hapus pengajuan surat | ✅ Yes |

---

## 6. 📢 Pengaduan
Endpoint untuk masyarakat melaporkan aduan ke desa.

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/pengaduan` | Buat pengaduan baru (oleh user) | ✅ Yes |
| `GET` | `/pengaduan` | Ambil semua pengaduan | ✅ Yes |
| `GET` | `/pengaduan/user/:user_id` | Ambil semua pengaduan milik user tertentu | ✅ Yes |
| `GET` | `/pengaduan/:id` | Ambil detail spesifik sebuah pengaduan | ✅ Yes |
| `PATCH` | `/pengaduan/:id/status` | Update status pengaduan (diproses/selesai/dll) | ✅ Yes |
| `POST` | `/pengaduan/:id/respon` | Berikan balasan/respon terhadap pengaduan | ✅ Yes |
| `DELETE` | `/pengaduan/:id` | Hapus pengaduan | ✅ Yes |

---

## 7. 📰 Informasi
Endpoint untuk admin mempublikasikan berita, pengumuman, atau artikel informasi desa.

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| `POST` | `/informasi` | Buat artikel informasi baru | ✅ Yes |
| `GET` | `/informasi` | Ambil semua daftar informasi | ✅ Yes |
| `GET` | `/informasi/:id` | Ambil detail spesifik informasi | ✅ Yes |
| `PATCH` | `/informasi/:id` | Update data informasi | ✅ Yes |
| `DELETE` | `/informasi/:id` | Hapus informasi beserta foto-fotonya | ✅ Yes |
| `POST` | `/informasi/:id/foto` | Upload foto untuk artikel (menggunakan `form-data`, key: `foto`) | ✅ Yes |
| `DELETE` | `/informasi/:id/foto/:foto_id`| Hapus salah satu foto spesifik dari artikel informasi | ✅ Yes |

---

> [!TIP]
> **Format Header untuk endpoint yang membutuhkan autentikasi:**
> ```json
> {
>   "Authorization": "Bearer {access_token}"
> }
> ```
> Token akses bertahan selama 15 menit. Anda dapat menggunakan endpoint `/auth/refresh` dengan mengirimkan `refresh_token` untuk mendapatkan token yang baru tanpa perlu login ulang.
