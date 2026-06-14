export const mockStats = { menunggu: 12, diproses: 8, selesai: 145, pengaduanBaru: 3 };

export const mockPengajuan = [
    {
        id: 'REQ-001', user: 'Budi Santoso', jenisSurat: 'Surat Keterangan Usaha', tanggal: '2026-05-08', status: 'MENUNGGU',
        details: [
            { label: 'Nama Usaha', value: 'Toko Kelontong Berkah' },
            { label: 'Bidang Usaha', value: 'Perdagangan Eceran Sembako' },
            { label: 'Alamat Usaha', value: 'Jl. Merdeka No. 45, Desa Maju Jaya, RT 02/RW 01' }
        ],
        dokumen: [
            { nama: 'Foto KTP', file: 'ktp_budi_santoso.jpg', size: '1.2 MB' },
            { nama: 'Foto Tempat Usaha', file: 'toko_depan.jpg', size: '2.5 MB' }
        ]
    },
    {
        id: 'REQ-002', user: 'Siti Aminah', jenisSurat: 'Surat Ket. Tidak Mampu', tanggal: '2026-05-08', status: 'MENUNGGU',
        details: [{ label: 'Keperluan', value: 'Pendaftaran Beasiswa Sekolah Anak' }],
        dokumen: [{ nama: 'Scan Kartu Keluarga', file: 'kk_siti_aminah.pdf', size: '800 KB' }]
    },
    { id: 'REQ-003', user: 'Ahmad Dahlan', jenisSurat: 'Surat Pengantar Nikah', tanggal: '2026-05-07', status: 'DIPROSES', details: [], dokumen: [] },
    { id: 'REQ-004', user: 'Rina Melati', jenisSurat: 'Surat Keterangan Domisili', tanggal: '2026-05-06', status: 'SELESAI', details: [], dokumen: [] },
    { id: 'REQ-005', user: 'Joko Widodo', jenisSurat: 'Surat Keterangan Usaha', tanggal: '2026-05-05', status: 'DITOLAK', details: [], dokumen: [] },
];

export const mockJenisSurat = [
    {
        id: 'SUR-001', nama_surat: 'Surat Keterangan Usaha', kode_surat: 'SKU', deskripsi: 'Surat pengantar untuk keperluan izin usaha warga.',
        fields: [
            { id: 'F-01', field_name: 'nama_usaha', field_label: 'Nama Usaha', field_type: 'text', is_required: true },
            { id: 'F-02', field_name: 'bidang_usaha', field_label: 'Bidang Usaha', field_type: 'text', is_required: true },
            { id: 'F-03', field_name: 'foto_tempat', field_label: 'Foto Tempat Usaha', field_type: 'file', is_required: true },
        ]
    },
    {
        id: 'SUR-002', nama_surat: 'Surat Keterangan Tidak Mampu', kode_surat: 'SKTM', deskripsi: 'Surat keterangan untuk warga kurang mampu.',
        fields: [
            { id: 'F-04', field_name: 'keperluan', field_label: 'Tujuan/Keperluan', field_type: 'textarea', is_required: true },
            { id: 'F-05', field_name: 'scan_kk', field_label: 'Scan Kartu Keluarga', field_type: 'file', is_required: true },
        ]
    }
];

export const mockPengaduan = [
    { id: 'TKT-001', user: 'Agus Setiawan', judul: 'Lampu Jalan Mati di RT 03', tanggal: '2026-05-08', status: 'MENUNGGU', deskripsi: 'Pak, lampu jalan di depan gapura RT 03 sudah mati sejak 3 hari lalu. Mohon segera diperbaiki.' },
    { id: 'TKT-002', user: 'Lina Marlina', judul: 'Jalan Berlubang', tanggal: '2026-05-07', status: 'DIPROSES', deskripsi: 'Ada jalan berlubang cukup dalam di simpang empat desa.' },
];

export const mockUsers = [
    { id: 1, name: 'Budi Santoso', email: 'budi@gmail.com', phone: '08123456789', role: 'USER', status: 'ACTIVE' },
    { id: 2, name: 'Siti Aminah', email: 'siti_aminah@gmail.com', phone: '08571234567', role: 'USER', status: 'PENDING' },
    { id: 3, name: 'Andi Wijaya', email: 'andi_admin@desa.id', phone: '08119876543', role: 'ADMIN', status: 'ACTIVE' },
  ];
