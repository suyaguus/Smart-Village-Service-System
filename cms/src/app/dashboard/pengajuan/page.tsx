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
                            </Card>
                        </div>
                    </aside>
                </div>
            </article>
        );
    }

}