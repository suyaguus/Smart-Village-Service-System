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
      </article>
    );
  }

}