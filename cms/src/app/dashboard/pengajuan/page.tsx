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
      </article>
    );
  }

}