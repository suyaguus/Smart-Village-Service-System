"use client";

import React, { useState } from 'react';
import { Eye, ArrowLeft, FileText, FileUp, Download, UploadCloud, XCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPengajuan } from '@/lib/mockData';

interface Pengajuan {
    id: string;
    tanggal: string;
    user: string;
    jenisSurat: string;
    status: string;
    details?: { label: string; value: string }[];
    dokumen?: { nama: string; file: string; size: string }[];
}

// Helper untuk memberikan warna pada Badge shadcn/ui sesuai status
const getBadgeStyle = (status: string) => {
    switch (status) {
        case 'MENUNGGU': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200';
        case 'DIPROSES': return 'bg-[#D6E6F2] text-[#769FCD] hover:bg-[#B9D7EA] border-[#B9D7EA]';
        case 'SELESAI': return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
        case 'DITOLAK': return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
        default: return 'bg-slate-100 text-slate-800';
    }
};

export default function PengajuanPage() {
    const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(null);

    // VIEW 1: DETAIL VERIFIKASI (SPLIT SCREEN)

    if (selectedPengajuan) {
        const data = selectedPengajuan;
        return (
            <article className="space-y-6 max-w-7xl mx-auto" aria-label="Detail Verifikasi Pengajuan">
                <nav aria-label="Navigasi kembali">
                    <button onClick={() => setSelectedPengajuan(null)} className="flex items-center text-sm font-medium text-slate-500 hover:text-[#769FCD] transition-colors w-fit">
                        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Kembali ke Daftar Pengajuan
                    </button>
                </nav>

                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#D6E6F2] pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Verifikasi: {data.id}</h1>
                        <p className="text-slate-500 mt-1">
                            Diajukan pada <time dateTime={data.tanggal}>{data.tanggal}</time> oleh <span className="font-semibold text-slate-700">{data.user}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-500">Status saat ini:</span>
                        <Badge className={getBadgeStyle(data.status)} variant="outline">{data.status}</Badge>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* KARTU DATA FORMULIR */}
                        <Card aria-label="Data Formulir Warga" className="overflow-hidden">
                            <header className="p-5 border-b border-[#D6E6F2] bg-[#F7FBFC]">
                                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-[#769FCD]" aria-hidden="true" /> Data Formulir (Dynamic Form)
                                </h2>
                            </header>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1 md:col-span-2">
                                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Jenis Surat</h3>
                                    <p className="text-sm font-bold text-slate-800">{data.jenisSurat}</p>
                                </div>
                                {data.details && data.details.map((detail, idx) => (
                                    <div key={idx} className={detail.value.length > 30 ? "col-span-1 md:col-span-2" : ""}>
                                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{detail.label}</h3>
                                        <p className="p-3 bg-[#F7FBFC] border border-[#D6E6F2] rounded-lg text-sm text-slate-700">{detail.value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* KARTU DOKUMEN PERSYARATAN */}
                        <Card aria-label="Dokumen Persyaratan Pemohon" className="overflow-hidden">
                            <header className="p-5 border-b border-[#D6E6F2] bg-[#F7FBFC]">
                                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                    <FileUp className="w-5 h-5 text-[#769FCD]" aria-hidden="true" /> Dokumen Persyaratan
                                </h2>
                            </header>
                            <div className="p-6 space-y-3">
                                {data.dokumen && data.dokumen.map((dok, idx) => (
                                    <article key={idx} className="flex items-center justify-between p-3 border border-[#B9D7EA] rounded-lg bg-white hover:border-[#769FCD] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#D6E6F2]/50 text-[#769FCD] rounded-md"><FileText className="w-5 h-5" aria-hidden="true" /></div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-700">{dok.nama}</h3>
                                                <p className="text-xs text-slate-500">{dok.file} ({dok.size})</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button aria-label="Lihat dokumen" className="text-[#769FCD] bg-[#F7FBFC] hover:bg-[#D6E6F2] p-2 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                                            <button aria-label="Unduh dokumen" className="text-[#769FCD] bg-[#F7FBFC] hover:bg-[#D6E6F2] p-2 rounded-md transition-colors"><Download className="w-4 h-4" /></button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <aside className="w-full lg:w-1/3" aria-label="Panel Aksi Verifikasi">
                        <div className="sticky top-6">
                            <Card className="border-[#769FCD] shadow-md overflow-hidden">
                                <header className="p-5 border-b border-[#D6E6F2] bg-[#769FCD] text-white">
                                    <h2 className="font-bold text-lg">Panel Verifikasi</h2>
                                </header>
                                <div className="p-6">
                                    {data.status === 'MENUNGGU' && (
                                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed" role="alert">
                                                Mohon periksa kesesuaian <b>Data Formulir</b> dengan <b>Dokumen Persyaratan</b> sebelum memproses surat.
                                            </div>
                                            <div>
                                                <label htmlFor="catatanAdmin" className="block text-xs font-semibold text-slate-600 mb-2">Catatan Admin</label>
                                                <textarea id="catatanAdmin" className="w-full p-3 border border-[#B9D7EA] rounded-lg focus:ring-2 focus:ring-[#769FCD] focus:outline-none bg-[#F7FBFC] text-sm" rows={3}></textarea>
                                            </div>
                                            <div className="flex gap-3 pt-2">
                                                <button type="button" className="flex-1 py-2.5 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                                                    <XCircle className="w-4 h-4" aria-hidden="true" /> Tolak
                                                </button>
                                                <button type="button" className="flex-1 py-2.5 bg-[#769FCD] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#6086b3] transition-colors">
                                                    <CheckCircle className="w-4 h-4" aria-hidden="true" /> Proses Surat
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                    {data.status === 'DIPROSES' && (
                                        <div className="space-y-5">
                                            <label htmlFor="file-upload" className="border-2 border-dashed border-[#B9D7EA] rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#F7FBFC] transition-colors cursor-pointer group">
                                                <div className="p-3 bg-[#D6E6F2] rounded-full text-[#769FCD] group-hover:scale-110 transition-transform mb-3">
                                                    <UploadCloud className="w-6 h-6" aria-hidden="true" />
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">Upload Hasil Surat (PDF)</span>
                                                <input id="file-upload" type="file" className="hidden" accept=".pdf" />
                                            </label>
                                            <button className="w-full py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                                                <CheckCircle className="w-4 h-4" aria-hidden="true" /> Selesaikan Pengajuan
                                            </button>
                                        </div>
                                    )}
                                    {data.status === 'SELESAI' && (
                                        <div className="text-center py-6">
                                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
                                                <CheckCircle className="w-8 h-8" aria-hidden="true" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">Selesai</h3>
                                            <button className="mt-6 px-4 py-2 bg-white border border-[#D6E6F2] text-slate-600 text-sm font-medium rounded-lg hover:bg-[#F7FBFC] transition-colors">Lihat File Hasil</button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </aside>
                </div>
            </article>
        );
    }

    // VIEW 2: DAFTAR PENGAJUAN (TABEL)
    return (
        <section className="space-y-6 max-w-7xl mx-auto" aria-label="Halaman Pengajuan Surat">
            <header className="flex justify-between items-center">
                <section>
                    <h1 className="text-2xl font-bold text-slate-800">Daftar Pengajuan Surat</h1>
                    <p className="text-sm text-slate-500 mt-1">Verifikasi dan proses permintaan surat dari warga.</p>
                </section>
                <form className="flex gap-2">
                    <select aria-label="Filter status pengajuan" className="border border-[#B9D7EA] bg-white text-sm text-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#769FCD]">
                        <option value="all">Semua Status</option>
                        <option value="MENUNGGU">Menunggu</option>
                        <option value="DIPROSES">Diproses</option>
                        <option value="SELESAI">Selesai</option>
                    </select>
                </form>
            </header>

            <Card className="overflow-hidden">
                <section className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#D6E6F2]/50 text-slate-700 border-b border-[#D6E6F2]">
                            <tr>
                                <th scope="col" className="h-12 px-6 font-semibold">ID Pengajuan</th>
                                <th scope="col" className="h-12 px-6 font-semibold">Tanggal</th>
                                <th scope="col" className="h-12 px-6 font-semibold">Pemohon</th>
                                <th scope="col" className="h-12 px-6 font-semibold">Jenis Surat</th>
                                <th scope="col" className="h-12 px-6 font-semibold">Status</th>
                                <th scope="col" className="h-12 px-6 font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D6E6F2]">
                            {mockPengajuan.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F7FBFC] transition-colors bg-white">
                                    <td className="p-4 px-6 font-medium text-slate-600">{item.id}</td>
                                    <td className="p-4 px-6 text-slate-500"><time dateTime={item.tanggal}>{item.tanggal}</time></td>
                                    <td className="p-4 px-6 font-bold text-slate-800">{item.user}</td>
                                    <td className="p-4 px-6 text-slate-600">{item.jenisSurat}</td>
                                    <td className="p-4 px-6">
                                        <Badge className={getBadgeStyle(item.status)} variant="outline">
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 px-6 text-center">
                                        <button
                                            onClick={() => setSelectedPengajuan(item)}
                                            aria-label={`Lihat detail pengajuan ${item.id}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#769FCD] border border-[#B9D7EA] rounded-md hover:bg-[#769FCD] hover:text-white transition-colors text-xs font-semibold shadow-sm"
                                        >
                                            <Eye className="w-3.5 h-3.5" aria-hidden="true" /> Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </Card>
        </section>
    );
}